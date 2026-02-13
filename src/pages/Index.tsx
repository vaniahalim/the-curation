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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold mb-6 opacity-0 animate-fade-in">
            Strategic Intelligence Platform
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Become<br />
            <span className="text-gold italic">Dangerously</span> Educated
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Structured, high-signal education across money, power, geopolitics,
            career strategy, technology, and self-mastery. No fluff. No clichés.
            Independent judgment through first-principles analysis.
          </p>
          <div className="flex items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <a
              href="#daily-intel"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Today's Briefing
            </a>
            <Link
              to="/pillars"
              className="border border-border text-foreground/80 px-6 py-2.5 rounded text-sm font-medium hover:bg-secondary transition-colors"
            >
              Explore Pillars
            </Link>
          </div>
        </div>
        <a
          href="#pillars-overview"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </section>

      {/* Pillars Overview */}
      <section id="pillars-overview" className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-widest uppercase text-gold mb-2">
          Six Domains of Power
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif mb-10">
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
                className="border border-border rounded-lg bg-card p-5 opacity-0 animate-fade-in hover:border-gold-dim transition-colors group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-2 h-2 rounded-full ${pillarColors[key]}`} />
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="font-serif text-sm sm:text-base mb-1 leading-snug">{meta.label}</h3>
                <p className="text-xs text-muted-foreground hidden sm:block">{meta.subtitle}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Manifesto Strip */}
      <section className="border-y border-border py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="font-serif text-xl sm:text-2xl text-foreground/90 leading-relaxed italic">
            "Understand how money, power, institutions, technology, and geopolitics
            actually function. Interpret world events through incentives and
            second-order effects. Build optionality, leverage, and long-term agency."
          </blockquote>
          <p className="text-xs font-mono text-muted-foreground mt-6 tracking-widest uppercase">
            Not motivational self-help. Structured intelligence.
          </p>
        </div>
      </section>

      {/* Daily Intel */}
      <section id="daily-intel" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="font-mono text-xs tracking-widest uppercase text-gold mb-2">
            Daily Intel
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif mb-2">
            Today's Strategic Briefing
          </h2>
          <p className="text-sm text-muted-foreground font-mono">{today}</p>
        </div>

        <div className="border-l-2 border-gold-dim pl-4 mb-10">
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            Six high-signal briefings. Each includes context, incentive analysis,
            what most people are missing, and long-term implications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {todayIntel.map((brief, i) => (
            <IntelCard key={brief.pillar} brief={brief} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-serif mb-4">Go Deeper</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Explore the curated library of books, podcasts, and documentaries — each
            with bias profiles, reading lenses, and extracted key takeaways.
          </p>
          <Link
            to="/library"
            className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Browse the Library
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
