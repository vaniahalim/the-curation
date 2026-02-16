import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDailyBriefings } from "@/hooks/useDailyBriefings";
import IntelCard from "@/components/IntelCard";
import { ArrowLeft, Zap, Loader2 } from "lucide-react";

const TodayBriefings = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const { data: briefings, isLoading } = useDailyBriefings();

  return (
    <div>
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-champagne transition-colors mb-6"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Home
        </Link>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-champagne" />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne">
              Daily Intelligence
            </p>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif mb-2">Today's Briefings</h1>
        <p className="text-sm text-muted-foreground font-mono tracking-wide">{today}</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 animate-spin text-champagne" />
        </div>
      ) : !briefings || briefings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-sm">No briefings for today yet. Briefings refresh automatically at midnight.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {briefings.map((brief, i) => (
            <IntelCard key={brief.id} brief={brief} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayBriefings;
