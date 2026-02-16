import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface DailyBriefing {
  id: string;
  pillar: string;
  pillar_label: string;
  headline: string;
  briefing: string;
  sources: { label: string; url: string; type: string }[];
  question: string;
  reflection: string;
  briefing_date: string;
}

export function useDailyBriefings(date?: string) {
  const today = date || new Date().toISOString().split("T")[0];

  return useQuery({
    queryKey: ["daily-briefings", today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_briefings")
        .select("*")
        .eq("briefing_date", today)
        .order("created_at");

      if (error) throw error;
      return data as unknown as DailyBriefing[];
    },
  });
}

export function useRefreshBriefings() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke("refresh-briefings");
      if (error) throw error;
      toast({ title: "Briefings refreshed", description: `${data.count} briefings updated for today.` });
      queryClient.invalidateQueries({ queryKey: ["daily-briefings"] });
    } catch (e) {
      toast({ title: "Refresh failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refresh, isRefreshing };
}
