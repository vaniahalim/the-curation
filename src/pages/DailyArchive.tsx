import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import IntelCard from "@/components/IntelCard";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { format, subDays, parseISO } from "date-fns";
import type { DailyBriefing } from "@/hooks/useDailyBriefings";

const DailyArchive = () => {
  const { date } = useParams<{ date: string }>();

  // Fetch all unique dates with briefings (last 30 days)
  const { data: archiveDates, isLoading: datesLoading } = useQuery({
    queryKey: ["archive-dates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_briefings")
        .select("briefing_date")
        .order("briefing_date", { ascending: false })
        .limit(200);
      if (error) throw error;
      // Get unique dates
      const unique = [...new Set(data.map((d: any) => d.briefing_date))];
      return unique as string[];
    },
    enabled: !date,
  });

  // Fetch briefings for a specific date
  const { data: dateBriefings, isLoading: briefingsLoading } = useQuery({
    queryKey: ["archive-briefings", date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_briefings")
        .select("*")
        .eq("briefing_date", date!)
        .order("created_at");
      if (error) throw error;
      return data as unknown as DailyBriefing[];
    },
    enabled: !!date,
  });

  if (!date) {
    return (
      <div>
        <div className="mb-12">
          <Link
            to="/pillars"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-champagne transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Pillars
          </Link>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
            Intelligence Archive
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif mb-3">Daily Briefings</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            A rolling archive of strategic intelligence briefings.
          </p>
        </div>

        {datesLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-champagne" /></div>
        ) : !archiveDates || archiveDates.length === 0 ? (
          <p className="text-center text-muted-foreground py-20 text-sm">No archived briefings yet.</p>
        ) : (
          <div className="space-y-3">
            {archiveDates.map((d, i) => (
              <Link
                key={d}
                to={`/daily-archive/${d}`}
                className="flex items-center justify-between border border-border rounded bg-card p-5 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors group"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-champagne transition-colors" />
                  <p className="font-serif text-base">{format(parseISO(d), "EEEE, MMMM d, yyyy")}</p>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-champagne transition-colors">View →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <Link
          to="/daily-archive"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-champagne transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Archive
        </Link>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">Daily Intel</p>
        <h1 className="text-3xl sm:text-4xl font-serif mb-3">{format(parseISO(date), "EEEE, MMMM d, yyyy")}</h1>
      </div>

      {briefingsLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-champagne" /></div>
      ) : !dateBriefings || dateBriefings.length === 0 ? (
        <p className="text-center text-muted-foreground py-20 text-sm">No briefings for this date.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {dateBriefings.map((brief, i) => (
            <IntelCard key={brief.id} brief={brief} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyArchive;
