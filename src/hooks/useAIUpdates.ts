import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface AIUpdateRow {
  id: string;
  category: "model" | "tool" | "tutorial" | "analysis";
  title: string;
  summary: string;
  sources: { label: string; url: string; platform: string }[];
  tags: string[];
  tutorial_content: any;
  published_date: string;
}

export function useAIUpdates() {
  return useQuery({
    queryKey: ["ai-updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_updates")
        .select("*")
        .order("published_date", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as unknown as AIUpdateRow[];
    },
  });
}

export function useRefreshAIUpdates() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke("refresh-ai-updates");
      if (error) throw error;
      toast({ title: "AI Updates refreshed", description: `${data.count} updates fetched.` });
      queryClient.invalidateQueries({ queryKey: ["ai-updates"] });
    } catch (e) {
      toast({ title: "Refresh failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refresh, isRefreshing };
}
