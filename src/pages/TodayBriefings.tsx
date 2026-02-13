import { Link } from "react-router-dom";
import { todayIntel, pillarMeta } from "@/data/dailyIntel";
import IntelCard from "@/components/IntelCard";
import { ArrowLeft, Zap } from "lucide-react";

const TodayBriefings = () => {
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
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-champagne" />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne">
            Daily Intelligence
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif mb-3">Today's Briefings</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Six strategic briefings across Money, Power, World, Career, Tech, and Self—updated daily
          with curated sources and actionable insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {todayIntel.map((brief, i) => (
          <IntelCard key={brief.pillar} brief={brief} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TodayBriefings;
