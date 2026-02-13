import { useParams, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { aiUpdates } from "@/data/aiUpdates";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";

const platformLabel: Record<string, string> = {
  x: "𝕏",
  substack: "Substack",
  blog: "Blog",
  paper: "Paper",
  youtube: "YouTube",
};

const AIUpdateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const update = aiUpdates.find((u) => u.id === id);

  if (!update) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground mb-4">Update not found.</p>
        <Link to="/ai-updates" className="text-champagne hover:underline text-sm font-mono">
          ← Back to AI Updates
        </Link>
      </div>
    );
  }

  const tc = update.tutorialContent;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back nav */}
      <Link
        to="/ai-updates"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-champagne transition-colors mb-8"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to AI Updates
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim">
            {update.category}
          </span>
          <span className="text-[10px] text-muted-foreground">·</span>
          <time className="text-[10px] font-mono text-muted-foreground tracking-wide">
            {format(parseISO(update.date), "MMMM d, yyyy")}
          </time>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif mb-4 leading-tight">{update.title}</h1>
        <p className="text-foreground/70 leading-relaxed">{update.summary}</p>
      </header>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {update.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-secondary-foreground tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Tutorial content */}
      {tc && (
        <article className="space-y-10">
          {/* Video embed */}
          {tc.videoUrl && (
            <div className="border border-border rounded overflow-hidden bg-card">
              <a
                href={tc.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-16 hover:bg-secondary/30 transition-colors group"
              >
                <Play className="w-8 h-8 text-champagne group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Watch tutorial video
                </span>
              </a>
            </div>
          )}

          {/* Introduction */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim mb-3">Introduction</p>
            <p className="text-sm leading-relaxed text-foreground/80">{tc.introduction}</p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim">Step by Step</p>
            {tc.steps.map((step, i) => (
              <div key={i} className="border-l-2 border-champagne-dim/30 pl-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs text-champagne tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-lg">{step.title}</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.content}</p>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="border-t border-border pt-8">
            <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim mb-3">Takeaway</p>
            <p className="text-sm leading-relaxed text-foreground/80 italic">{tc.conclusion}</p>
          </div>
        </article>
      )}

      {/* Sources */}
      <div className="border-t border-border pt-6 mt-10">
        <p className="text-[10px] font-mono tracking-widest uppercase text-champagne-dim mb-3">Sources & References</p>
        <div className="space-y-2">
          {update.sources.map((src) => (
            <a
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/55 hover:text-champagne transition-colors group"
            >
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
              <span>{src.label}</span>
              <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                {platformLabel[src.platform]}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIUpdateDetail;
