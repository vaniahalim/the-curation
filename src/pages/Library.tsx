import { useState } from "react";
import { books, podcasts, documentaries } from "@/data/library";
import { type PillarKey, pillarMeta } from "@/data/dailyIntel";
import { BookOpen, Headphones, Film, ChevronDown, ChevronUp } from "lucide-react";

const pillarColors: Record<PillarKey, string> = {
  money: "pillar-indicator-money", power: "pillar-indicator-power",
  world: "pillar-indicator-world", career: "pillar-indicator-career",
  tech: "pillar-indicator-tech", self: "pillar-indicator-self",
};

const BookCard = ({ book, index }: { book: typeof books[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-border rounded bg-card p-5 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full ${pillarColors[book.pillar]}`} />
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {pillarMeta[book.pillar].label}
            </span>
          </div>
          <h4 className="font-serif text-base mb-0.5">{book.title}</h4>
          <p className="text-xs text-muted-foreground">{book.author}</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
          <div>
            <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Why it matters</span>
            <p className="text-foreground/65 mt-1">{book.whyItMatters}</p>
          </div>
          <div>
            <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Reading lens</span>
            <p className="text-foreground/65 mt-1">{book.lens}</p>
          </div>
          <div>
            <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Ideological beneficiary</span>
            <p className="text-foreground/65 mt-1">{book.ideologicalBeneficiary}</p>
          </div>
          <div>
            <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Key takeaway</span>
            <p className="text-ivory-dim mt-1 italic">{book.keyTakeaway}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Library = () => {
  const [activeTab, setActiveTab] = useState<"books" | "podcasts" | "docs">("books");

  const tabs = [
    { key: "books" as const, label: "Books", icon: BookOpen, count: books.length },
    { key: "podcasts" as const, label: "Podcasts", icon: Headphones, count: podcasts.length },
    { key: "docs" as const, label: "Film & Series", icon: Film, count: documentaries.length },
  ];

  return (
    <div>
      <div className="mb-12">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
          Curated Intelligence
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif mb-3">Library</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Every entry includes critical context: why it matters, what lens to read it through,
          who it benefits ideologically, and extracted key takeaways.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-10 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-champagne text-champagne"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            <span className="text-[10px] font-mono text-muted-foreground">({tab.count})</span>
          </button>
        ))}
      </div>

      {activeTab === "books" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, i) => (
            <BookCard key={book.title} book={book} index={i} />
          ))}
        </div>
      )}

      {activeTab === "podcasts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {podcasts.map((pod, i) => (
            <div
              key={pod.name}
              className="border border-border rounded bg-card p-5 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h4 className="font-serif text-base mb-3">{pod.name}</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Orientation</span>
                  <p className="text-foreground/65 mt-1">{pod.orientation}</p>
                </div>
                <div>
                  <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Bias profile</span>
                  <p className="text-foreground/65 mt-1">{pod.biasProfile}</p>
                </div>
                <div>
                  <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">Best episodes</span>
                  <p className="text-foreground/65 mt-1">{pod.bestEpisodeType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "docs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentaries.map((doc, i) => (
            <div
              key={doc.title}
              className="border border-border rounded bg-card p-5 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-serif text-base">{doc.title}</h4>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  {doc.type}
                </span>
              </div>
              <div>
                <span className="text-champagne-dim font-mono text-[10px] uppercase tracking-wider">What to question</span>
                <p className="text-foreground/65 mt-1 text-sm">{doc.whatToQuestion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
