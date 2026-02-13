import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { aiUpdates, type AIUpdate } from "@/data/aiUpdates";
import { ExternalLink, Zap, Wrench, GraduationCap, BarChart3, ArrowRight } from "lucide-react";

const categoryConfig: Record<AIUpdate["category"], { label: string; icon: React.ElementType }> = {
  model: { label: "New Model", icon: Zap },
  tool: { label: "Tool", icon: Wrench },
  tutorial: { label: "Tutorial", icon: GraduationCap },
  analysis: { label: "Analysis", icon: BarChart3 },
};

const platformLabel: Record<string, string> = {
  x: "𝕏",
  substack: "Substack",
  blog: "Blog",
  paper: "Paper",
  youtube: "YouTube",
};

const AIUpdates = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<AIUpdate["category"] | "all">("all");

  const filtered = filter === "all" ? aiUpdates : aiUpdates.filter((u) => u.category === filter);
  const categories: (AIUpdate["category"] | "all")[] = ["all", "model", "tool", "tutorial", "analysis"];

  return (
    <div>
      <div className="mb-12">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
          Intelligence Feed
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif mb-3">AI Updates</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          The newest models, tools, and tutorials — sourced from 𝕏, Substack,
          research blogs, and technical publications. Each entry includes strategic context
          and multi-source citations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-10 border-b border-border">
        {categories.map((cat) => {
          const isActive = filter === cat;
          const config = cat !== "all" ? categoryConfig[cat] : null;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                isActive
                  ? "border-champagne text-champagne"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {config && <config.icon className="w-3 h-3" />}
              {cat === "all" ? "All" : config?.label}
            </button>
          );
        })}
      </div>

      {/* Updates */}
      <div className="space-y-5">
        {filtered.map((update, i) => {
          const config = categoryConfig[update.category];
          const Icon = config.icon;

          return (
            <article
              key={update.id}
              onClick={update.tutorialContent ? () => navigate(`/ai-updates/${update.id}`) : undefined}
              className={`border border-border rounded bg-card p-6 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors ${update.tutorialContent ? "cursor-pointer" : ""}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-champagne" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim">
                    {config.label}
                  </span>
                </div>
                <time className="text-[10px] font-mono text-muted-foreground tracking-wide">
                  {format(parseISO(update.date), "MMM d, yyyy")}
                </time>
              </div>

              <h3 className="font-serif text-xl mb-3 leading-snug">{update.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed mb-5">{update.summary}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {update.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Sources */}
              <div className="border-t border-border pt-4">
                <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim mb-2">Sources</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {update.sources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-foreground/55 hover:text-champagne transition-colors group"
                    >
                      <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
                      <span>{src.label}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1 py-0.5 rounded bg-secondary text-muted-foreground">
                        {platformLabel[src.platform]}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tutorial CTA */}
              {update.tutorialContent && (
                <div className="border-t border-border pt-4 mt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-champagne hover:text-champagne-dim transition-colors">
                    Read full tutorial <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AIUpdates;
