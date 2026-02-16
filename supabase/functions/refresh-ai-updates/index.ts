import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.25.76";

const AIUpdateSchema = z.object({
  category: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  summary: z.string().min(1).max(5000),
  sources: z.array(z.object({
    label: z.string().min(1).max(200),
    url: z.string().url(),
    platform: z.enum(["x", "substack", "blog", "paper", "youtube"]),
  })).default([]),
  tags: z.array(z.string().max(50)).default([]),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const categories = [
  { key: "model", topic: "new AI model releases, benchmarks, frontier model updates from OpenAI, Google, Anthropic, Meta, Mistral" },
  { key: "tool", topic: "new AI developer tools, AI-native IDEs, coding assistants, AI productivity tools, MCP integrations" },
  { key: "analysis", topic: "AI industry analysis, strategic implications of AI developments, open source vs closed source AI, AI regulation, compute economics" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Validate authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify the JWT token
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) throw new Error("PERPLEXITY_API_KEY not configured");

    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const today = new Date().toISOString().split("T")[0];

    // Rate limiting: check last refresh timestamp (1 hour minimum)
    const { data: recent } = await supabase
      .from("ai_updates")
      .select("created_at")
      .eq("published_date", today)
      .order("created_at", { ascending: false })
      .limit(1);

    if (recent && recent.length > 0) {
      const lastRefresh = new Date(recent[0].created_at).getTime();
      const oneHourAgo = Date.now() - 60 * 60 * 1000;
      if (lastRefresh > oneHourAgo) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please wait before refreshing again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Check if today's updates already exist
    const { data: existing } = await supabase
      .from("ai_updates")
      .select("id")
      .eq("published_date", today)
      .limit(1);

    if (existing && existing.length > 0) {
      await supabase.from("ai_updates").delete().eq("published_date", today);
    }

    const updates = [];

    for (const cat of categories) {
      const prompt = `Find the 2 most significant AI industry developments from the last 48 hours in this category: ${cat.topic}.

For each, return a JSON array of objects with:
- "category": "${cat.key}"
- "title": Concise but descriptive title (max 10 words)
- "summary": 3-4 sentence strategic analysis. Focus on WHY this matters, who benefits, and second-order effects. Be specific.
- "sources": Array of 2-3 objects with "label" (name), "url" (real URL), "platform" (one of: x, substack, blog, paper, youtube)
- "tags": Array of 2-3 relevant tags

Return ONLY a JSON array. No markdown wrapping. Use real, verifiable sources and URLs.`;

      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            { role: "system", content: "Return valid JSON arrays only. No markdown. No explanation." },
            { role: "user", content: prompt },
          ],
          search_recency_filter: "day",
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        console.error(`Perplexity error for ${cat.key}:`, await response.text());
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) continue;

      try {
        const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const rawParsed = JSON.parse(jsonStr);
        const items = Array.isArray(rawParsed) ? rawParsed : [rawParsed];

        for (const item of items) {
          try {
            const validated = AIUpdateSchema.parse(item);
            updates.push({
              category: cat.key,
              title: validated.title,
              summary: validated.summary,
              sources: validated.sources,
              tags: validated.tags,
              published_date: today,
            });
          } catch (itemErr) {
            console.error(`Item validation error for ${cat.key}:`, itemErr instanceof z.ZodError ? itemErr.issues : itemErr);
          }
        }
      } catch (parseErr) {
        console.error(`JSON parse error for ${cat.key}:`, parseErr);
      }
    }

    if (updates.length > 0) {
      const { error } = await supabase.from("ai_updates").insert(updates);
      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ success: true, count: updates.length, date: today }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("refresh-ai-updates error:", e);
    return new Response(
      JSON.stringify({ error: "Failed to refresh updates. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
