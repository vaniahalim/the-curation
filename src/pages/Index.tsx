import { format } from "date-fns";
import { todayIntel } from "@/data/dailyIntel";
import IntelCard from "@/components/IntelCard";

const Index = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-gold mb-2">
          Daily Intel
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif mb-2">
          Strategic Briefing
        </h1>
        <p className="text-sm text-muted-foreground font-mono">{today}</p>
      </div>

      {/* Subtitle */}
      <div className="border-l-2 border-gold-dim pl-4 mb-10">
        <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
          Six high-signal briefings across money, power, world affairs, career strategy,
          technology, and self-mastery. Each includes context, incentive analysis, what most
          people are missing, and long-term implications.
        </p>
      </div>

      {/* Intel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {todayIntel.map((brief, i) => (
          <IntelCard key={brief.pillar} brief={brief} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Index;
