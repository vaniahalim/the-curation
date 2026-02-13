import { type IntelBrief, type PillarKey, type SourceLink } from "@/data/dailyIntel";
import { ExternalLink, MessageCircle, Lightbulb } from "lucide-react";

const pillarColors: Record<PillarKey, string> = {
  money: "pillar-indicator-money",
  power: "pillar-indicator-power",
  world: "pillar-indicator-world",
  career: "pillar-indicator-career",
  tech: "pillar-indicator-tech",
  self: "pillar-indicator-self",
};

const sourceTypeBadge: Record<SourceLink["type"], string> = {
  report: "bg-secondary text-secondary-foreground",
  analysis: "bg-secondary text-secondary-foreground",
  data: "bg-secondary text-secondary-foreground",
  opinion: "bg-secondary text-secondary-foreground",
  policy: "bg-secondary text-secondary-foreground",
  academic: "bg-secondary text-secondary-foreground",
};

const IntelCard = ({ brief, index }: { brief: IntelBrief; index: number }) => {
  return (
    <article
      className="border border-border rounded bg-card p-6 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Pillar tag */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-1.5 h-1.5 rounded-full ${pillarColors[brief.pillar]}`} />
        <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
          {brief.pillarLabel}
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-serif text-xl mb-4 leading-snug">{brief.headline}</h3>

      {/* Briefing */}
      <p className="text-sm leading-relaxed text-foreground/75 mb-5">
        {brief.briefing}
      </p>

      {/* Sources */}
      <div className="mb-5">
        <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim mb-2">Sources</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {brief.sources.map((src) => (
            <a
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-foreground/60 hover:text-champagne transition-colors group"
            >
              <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
              <span>{src.label}</span>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${sourceTypeBadge[src.type]} opacity-60`}>
                {src.type}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Question & Reflection */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-start gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-champagne mt-0.5 shrink-0" />
          <p className="text-sm text-ivory-dim italic">{brief.question}</p>
        </div>
        <div className="flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-champagne-dim mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{brief.reflection}</p>
        </div>
      </div>
    </article>
  );
};

export default IntelCard;
