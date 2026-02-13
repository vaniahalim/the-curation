import { Link } from "react-router-dom";
import { pillarMeta, type PillarKey } from "@/data/dailyIntel";
import { getBriefsByPillar, dailyArchive } from "@/data/dailyArchive";
import { DollarSign, Building2, Globe, TrendingUp, Cpu, Target, Calendar, ArrowRight } from "lucide-react";

const pillarIcons: Record<PillarKey, React.ElementType> = {
  money: DollarSign, power: Building2, world: Globe,
  career: TrendingUp, tech: Cpu, self: Target,
};

const pillarColors: Record<PillarKey, string> = {
  money: "pillar-indicator-money", power: "pillar-indicator-power",
  world: "pillar-indicator-world", career: "pillar-indicator-career",
  tech: "pillar-indicator-tech", self: "pillar-indicator-self",
};

const pillarDescriptions: Record<PillarKey, string> = {
  money: "Capital flows, monetary systems, and wealth architecture",
  power: "Institutional incentives, regulatory capture, and elite dynamics",
  world: "Geopolitical strategy and second-order effects behind headlines",
  career: "Leverage points, skill stacking, and optionality mapping",
  tech: "AI infrastructure, compute constraints, and governance fragmentation",
  self: "Long-horizon discipline, identity design, and compounding beyond finance",
};

const Pillars = () => {
  const keys = Object.keys(pillarMeta) as PillarKey[];

  return (
    <div>
      <div className="mb-12">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
          System Architecture
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif mb-3">The Six Pillars</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Structured education across the domains that determine agency, leverage, and
          independent judgment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {keys.map((key, i) => {
          const meta = pillarMeta[key];
          const Icon = pillarIcons[key];
          const description = pillarDescriptions[key];
          const recentBriefs = getBriefsByPillar(key).slice(0, 3);

          return (
            <div
              key={key}
              className="border border-border rounded bg-card p-6 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${pillarColors[key]}`} />
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-lg leading-tight">{meta.label}</h3>
              </div>
              <p className="text-sm text-foreground/60 mb-4">{description}</p>

              {/* Recent briefs for this pillar */}
              {recentBriefs.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim mb-3">
                    Recent Briefs
                  </p>
                  <div className="space-y-2">
                    {recentBriefs.map((entry) => (
                      <Link
                        key={entry.date}
                        to={`/daily-archive/${entry.date}`}
                        className="flex items-start gap-2 group"
                      >
                        <Calendar className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0 group-hover:text-champagne transition-colors" />
                        <div className="min-w-0">
                          <p className="text-sm text-foreground/75 group-hover:text-champagne transition-colors leading-snug truncate">
                            {entry.brief.headline}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                            {entry.dateLabel}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full Archive Link */}
      <div className="mt-10 text-center">
        <Link
          to="/daily-archive"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-champagne transition-colors group"
        >
          <Calendar className="w-4 h-4" />
          Browse full briefing archive
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Pillars;
