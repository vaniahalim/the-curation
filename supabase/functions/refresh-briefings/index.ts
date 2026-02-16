import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.25.76";

const BriefingSchema = z.object({
  headline: z.string().min(1).max(200),
  briefing: z.string().min(1).max(5000),
  sources: z.array(z.object({
    label: z.string().min(1).max(200),
    url: z.string().url(),
    type: z.enum(["report", "analysis", "data", "opinion", "policy", "academic"]),
  })).default([]),
  question: z.string().min(1).max(1000),
  reflection: z.string().min(1).max(1000),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const pillars = [
  { key: "money", label: "Money & Financial Power", topic: "financial markets, central bank policy, monetary systems, capital flows, inflation" },
  { key: "power", label: "Power, Institutions & Incentives", topic: "institutional power, regulatory capture, lobbying, governance, political incentives" },
  { key: "world", label: "World News & Current Affairs", topic: "geopolitics, international relations, trade wars, military strategy, global conflicts" },
  { key: "career", label: "Career Strategy & Leverage", topic: "career strategy, job market trends, skill development, professional leverage, remote work" },
  { key: "tech", label: "Technology & AI Literacy", topic: "AI developments, tech industry, computing infrastructure, software tools, digital transformation" },
  { key: "self", label: "Self-Mastery & Long-Game Design", topic: "productivity, mental models, discipline, long-term thinking, personal development frameworks" },
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
      .from("daily_briefings")
      .select("created_at")
      .eq("briefing_date", today)
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

    // Check if today's briefings already exist
    const { data: existing } = await supabase
      .from("daily_briefings")
      .select("id")
      .eq("briefing_date", today)
      .limit(1);

    if (existing && existing.length > 0) {
      await supabase.from("daily_briefings").delete().eq("briefing_date", today);
    }

    const briefings = [];

    for (const pillar of pillars) {
      const prompt = `You are a strategic intelligence analyst. Provide today's most important briefing for the domain: "${pillar.label}" (covering: ${pillar.topic}).

Return a JSON object with these exact fields:
- "headline": A sharp, analytical headline (max 12 words)
- "briefing": A 3-4 sentence strategic analysis focusing on incentives, second-order effects, and structural implications. Be specific with data points and names. Do NOT be generic.
- "sources": An array of 3-4 objects with "label" (source name), "url" (real URL), and "type" (one of: report, analysis, data, opinion, policy, academic)
- "question": A provocative analytical question that forces deeper thinking
- "reflection": A one-sentence actionable takeaway

Focus on what happened in the last 24-48 hours. Be specific, cite real events and real sources. Do not fabricate URLs.`;

      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            { role: "system", content: "You are a strategic intelligence analyst. Always return valid JSON only, no markdown wrapping." },
            { role: "user", content: prompt },
          ],
          search_recency_filter: "day",
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        console.error(`Perplexity error for ${pillar.key}:`, await response.text());
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) continue;

      try {
        const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = BriefingSchema.parse(JSON.parse(jsonStr));

        briefings.push({
          pillar: pillar.key,
          pillar_label: pillar.label,
          headline: parsed.headline,
          briefing: parsed.briefing,
          sources: parsed.sources,
          question: parsed.question,
          reflection: parsed.reflection,
          briefing_date: today,
        });
      } catch (parseErr) {
        console.error(`Validation/parse error for ${pillar.key}:`, parseErr instanceof z.ZodError ? parseErr.issues : parseErr);
      }
    }

    if (briefings.length > 0) {
      const { error } = await supabase.from("daily_briefings").insert(briefings);
      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ success: true, count: briefings.length, date: today }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("refresh-briefings error:", e);
    return new Response(
      JSON.stringify({ error: "Failed to refresh briefings. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
