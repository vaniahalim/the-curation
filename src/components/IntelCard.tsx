import { type IntelBrief, type PillarKey } from "@/data/dailyIntel";
import { ExternalLink, MessageCircle, Lightbulb } from "lucide-react";

const pillarColors: Record<PillarKey, string> = {
  money: "pillar-indicator-money",
  power: "pillar-indicator-power",
  world: "pillar-indicator-world",
  career: "pillar-indicator-career",
  tech: "pillar-indicator-tech",
  self: "pillar-indicator-self",
};

const IntelCard = ({ brief, index }: { brief: IntelBrief; index: number }) => {
  return (
    <article
      className="border border-border rounded-lg bg-card p-6 opacity-0 animate-fade-in hover:border-gold-dim transition-colors duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Pillar tag */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${pillarColors[brief.pillar]}`} />
        <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
          {brief.pillarLabel}
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-serif text-xl mb-4 leading-snug">{brief.headline}</h3>

      {/* Briefing */}
      <p className="text-sm leading-relaxed text-foreground/80 mb-5">
        {brief.briefing}
      </p>

      {/* Source */}
      <a
        href={brief.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 transition-colors mb-5 font-mono"
      >
        <ExternalLink className="w-3 h-3" />
        {brief.sourceLabel}
      </a>

      {/* Question */}
      <div className="border-t border-border pt-4 mt-1 space-y-3">
        <div className="flex items-start gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
          <p className="text-sm text-ivory-dim italic">{brief.question}</p>
        </div>

        {/* Reflection */}
        <div className="flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-gold-dim mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{brief.reflection}</p>
        </div>
      </div>
    </article>
  );
};

export default IntelCard;
