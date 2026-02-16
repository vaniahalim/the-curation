import { useState } from "react";
import { ExternalLink, MessageCircle, Lightbulb, ChevronDown } from "lucide-react";
import type { DailyBriefing } from "@/hooks/useDailyBriefings";

const pillarColors: Record<string, string> = {
  money: "pillar-indicator-money",
  power: "pillar-indicator-power",
  world: "pillar-indicator-world",
  career: "pillar-indicator-career",
  tech: "pillar-indicator-tech",
  self: "pillar-indicator-self",
};

const IntelCard = ({ brief, index }: { brief: DailyBriefing; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="border border-border rounded bg-card p-6 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-1.5 h-1.5 rounded-full ${pillarColors[brief.pillar] || ""}`} />
        <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
          {brief.pillar_label}
        </span>
      </div>

      <h3 className="font-serif text-xl mb-3 leading-snug">{brief.headline}</h3>
      <p className="text-sm leading-relaxed text-foreground/75 mb-4">{brief.briefing}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-champagne-dim hover:text-champagne transition-colors mb-1"
      >
        <span>{expanded ? "Less" : "Sources & Reflection"}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div>
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
                </a>
              ))}
            </div>
          </div>
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
        </div>
      )}
    </article>
  );
};

export default IntelCard;
