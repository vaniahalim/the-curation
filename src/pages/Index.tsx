import { Link } from "react-router-dom";
import { format } from "date-fns";
import { todayIntel, pillarMeta, type PillarKey } from "@/data/dailyIntel";
import IntelCard from "@/components/IntelCard";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown, DollarSign, Building2, Globe, TrendingUp, Cpu, Target } from "lucide-react";

const pillarIcons: Record<PillarKey, React.ElementType> = {
  money: DollarSign, power: Building2, world: Globe,
  career: TrendingUp, tech: Cpu, self: Target,
};

const pillarColors: Record<PillarKey, string> = {
  money: "pillar-indicator-money", power: "pillar-indicator-power",
  world: "pillar-indicator-world", career: "pillar-indicator-career",
  tech: "pillar-indicator-tech", self: "pillar-indicator-self",
};

const Index = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const pillars = Object.keys(pillarMeta) as PillarKey[];

  return (
    <div className="-mx-6 -mt-10">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <div className="w-12 h-px bg-champagne mx-auto mb-8 opacity-0 animate-fade-in" />
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-champagne mb-8 opacity-0 animate-fade-in">
            Strategic Intelligence
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif leading-[1.05] mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Become<br />
            <em className="text-champagne">Dangerously</em> Educated
          </h1>
          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-lg mx-auto mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Structured, high-signal education across money, power, geopolitics,
            career strategy, technology, and self-mastery.<br />
            Independent judgment through first-principles analysis.
          </p>
          <div className="flex items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <a
              href="#daily-intel"
              className="bg-primary text-primary-foreground px-7 py-2.5 rounded text-sm font-medium hover:opacity-90 transition-opacity tracking-wide"
            >
              Today's Briefing
            </a>
            <Link
              to="/pillars"
              className="border border-border text-foreground/70 px-7 py-2.5 rounded text-sm font-medium hover:bg-secondary hover:text-foreground transition-colors tracking-wide"
            >
              Explore Pillars
            </Link>
          </div>
        </div>
        <a
          href="#pillars-overview"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* Pillars Overview */}
      <section id="pillars-overview" className="max-w-6xl mx-auto px-6 py-24">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
          Six Domains of Power
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif mb-12">
          The Operating System
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pillars.map((key, i) => {
            const Icon = pillarIcons[key];
            const meta = pillarMeta[key];
            return (
              <Link
                to="/pillars"
                key={key}
                className="border border-border rounded bg-card p-5 opacity-0 animate-fade-in hover:border-champagne-dim/40 transition-colors group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${pillarColors[key]}`} />
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-serif text-base sm:text-lg mb-1 leading-snug">{meta.label}</h3>
                <p className="text-xs text-muted-foreground hidden sm:block">{meta.subtitle}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-y border-border py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-8 h-px bg-champagne-dim mx-auto mb-8" />
          <blockquote className="font-serif text-xl sm:text-2xl text-foreground/85 leading-relaxed italic">
            "Understand how money, power, institutions, technology, and geopolitics
            actually function. Build optionality, leverage, and long-term agency."
          </blockquote>
          <p className="text-[10px] font-mono text-muted-foreground mt-8 tracking-[0.3em] uppercase">
            Not motivational self-help — structured intelligence
          </p>
        </div>
      </section>

      {/* Daily Intel */}
      <section id="daily-intel" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-champagne mb-3">
            Daily Intel
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif mb-3">
            Today's Strategic Briefing
          </h2>
          <p className="text-xs text-muted-foreground font-mono tracking-wide">{today}</p>
        </div>

        <div className="border-l border-champagne-dim/40 pl-5 mb-12">
          <p className="text-sm text-foreground/60 leading-relaxed max-w-2xl">
            Six high-signal briefings with multi-source citations. Each includes context,
            incentive analysis, what most people are missing, and long-term implications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {todayIntel.map((brief, i) => (
            <IntelCard key={brief.pillar} brief={brief} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif mb-4">Go Deeper</h2>
          <p className="text-sm text-muted-foreground mb-8">
            The curated library — books, podcasts, and documentaries with bias profiles,
            reading lenses, and extracted key takeaways.
          </p>
          <Link
            to="/library"
            className="inline-block bg-primary text-primary-foreground px-7 py-2.5 rounded text-sm font-medium hover:opacity-90 transition-opacity tracking-wide"
          >
            Browse the Library
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
