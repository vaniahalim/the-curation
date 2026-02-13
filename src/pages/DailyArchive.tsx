import { useParams, Link } from "react-router-dom";
import { getArchiveByDate, dailyArchive } from "@/data/dailyArchive";
import IntelCard from "@/components/IntelCard";
import { ArrowLeft, Calendar } from "lucide-react";

const DailyArchive = () => {
  const { date } = useParams<{ date: string }>();

  // If no date, show archive index
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
            A rolling archive of strategic intelligence briefings from the past week.
          </p>
        </div>

        <div className="space-y-3">
          {dailyArchive.map((entry, i) => (
            <Link
              key={entry.date}
              to={`/daily-archive/${entry.date}`}
              className="flex items-center justify-between border border-border rounded bg-card p-5 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors group"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-champagne transition-colors" />
                <div>
                  <p className="font-serif text-base">{entry.dateLabel}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {entry.briefs.length} briefing{entry.briefs.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-champagne transition-colors">
                View →
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const entry = getArchiveByDate(date);

  if (!entry) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">No briefings found for this date.</p>
        <Link to="/daily-archive" className="text-sm text-champagne hover:underline">
          Browse archive
        </Link>
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
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
          Daily Intel
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif mb-3">{entry.dateLabel}</h1>
        <p className="text-sm text-muted-foreground">
          {entry.briefs.length} strategic briefing{entry.briefs.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {entry.briefs.map((brief, i) => (
          <IntelCard key={brief.pillar} brief={brief} index={i} />
        ))}
      </div>
    </div>
  );
};

export default DailyArchive;
