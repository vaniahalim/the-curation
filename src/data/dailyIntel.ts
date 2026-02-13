export type PillarKey = "money" | "power" | "world" | "career" | "tech" | "self";

export interface SourceLink {
  label: string;
  url: string;
  type: "report" | "analysis" | "data" | "opinion" | "policy" | "academic";
}

export interface IntelBrief {
  pillar: PillarKey;
  pillarLabel: string;
  headline: string;
  briefing: string;
  sources: SourceLink[];
  question: string;
  reflection: string;
}

export const pillarMeta: Record<PillarKey, { label: string; subtitle: string }> = {
  money: { label: "Money & Financial Power", subtitle: "Capital, markets, monetary systems" },
  power: { label: "Power, Institutions & Incentives", subtitle: "How power concentrates and operates" },
  world: { label: "World News & Current Affairs", subtitle: "Geopolitics, strategy, second-order effects" },
  career: { label: "Career Strategy & Leverage", subtitle: "Optionality, positioning, career capital" },
  tech: { label: "Technology & AI Literacy", subtitle: "Infrastructure, governance, compute" },
  self: { label: "Self-Mastery & Long-Game Design", subtitle: "Discipline, time horizons, standards" },
};

export const todayIntel: IntelBrief[] = [
  {
    pillar: "money",
    pillarLabel: "Money & Financial Power",
    headline: "The Hidden Tax of Inflation Expectations",
    briefing:
      "Central banks don't just manage inflation — they manage the *expectation* of inflation. When the Fed signals rate holds, it's not monetary neutrality — it's a deliberate repricing of risk assets. The real question: who benefits when markets believe inflation is tamed while real wages remain compressed? The answer involves a transfer from labor to capital through the mechanism of asset price appreciation vs wage stagnation. Understanding this dynamic is the difference between reading headlines and reading incentives.",
    sources: [
      { label: "BIS Quarterly Review", url: "https://www.bis.org/publ/qtrpdf/r_qt2312.htm", type: "report" },
      { label: "Federal Reserve — FOMC Minutes", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm", type: "policy" },
      { label: "IMF World Economic Outlook", url: "https://www.imf.org/en/Publications/WEO", type: "data" },
      { label: "Bridgewater — How the Economic Machine Works", url: "https://www.bridgewater.com/research-and-insights", type: "analysis" },
    ],
    question: "If inflation expectations are a policy tool, who is the target audience — markets or citizens?",
    reflection: "Map every financial headline to its beneficiary. The stated reason for a policy is rarely the operative one.",
  },
  {
    pillar: "power",
    pillarLabel: "Power, Institutions & Incentives",
    headline: "Regulatory Capture Is the Default, Not the Exception",
    briefing:
      "The revolving door between industry and regulators isn't corruption — it's the equilibrium state of institutional incentives. When a regulator's career advancement depends on industry relationships, capture becomes rational behavior. The pharmaceutical, financial, and tech sectors demonstrate this consistently. The question isn't whether capture exists but whether any institutional design can prevent it without creating worse second-order problems like regulatory paralysis.",
    sources: [
      { label: "NBER Working Paper — Regulatory Design", url: "https://www.nber.org/papers/w29600", type: "academic" },
      { label: "ProPublica — Revolving Door Tracker", url: "https://projects.propublica.org/", type: "data" },
      { label: "Brookings Institution — Regulatory Policy", url: "https://www.brookings.edu/topic/regulatory-policy/", type: "policy" },
      { label: "Luigi Zingales — Preventing Economists' Capture", url: "https://faculty.chicagobooth.edu/luigi-zingales", type: "academic" },
    ],
    question: "Can you name three regulations that primarily serve incumbents rather than consumers?",
    reflection: "When evaluating any regulation, ask: who wrote it, who enforces it, and who benefits from the complexity?",
  },
  {
    pillar: "world",
    pillarLabel: "World News & Current Affairs",
    headline: "The Semiconductor Supply Chain as Geopolitical Weapon",
    briefing:
      "Taiwan produces over 60% of the world's advanced semiconductors. This isn't a supply chain vulnerability — it's a geopolitical architecture. The US CHIPS Act, Dutch export controls on ASML equipment, and China's domestic fab investments aren't industrial policy — they're strategic positioning. Every major power is building redundancy not for efficiency but for leverage. The second-order effect: smaller nations with critical mineral deposits are gaining geopolitical weight disproportionate to their economic size.",
    sources: [
      { label: "Financial Times — Semiconductor Analysis", url: "https://www.ft.com/semiconductors", type: "analysis" },
      { label: "CSIS — Chokepoints Report", url: "https://www.csis.org/analysis", type: "policy" },
      { label: "The Economist — Chip Wars", url: "https://www.economist.com/", type: "analysis" },
      { label: "Rhodium Group — China Semiconductor Tracker", url: "https://rhg.com/", type: "data" },
      { label: "Nikkei Asia — Regional Supply Chain", url: "https://asia.nikkei.com/", type: "analysis" },
    ],
    question: "If semiconductors are the new oil, which countries become the new Saudi Arabia?",
    reflection: "Every supply chain is a power map. Trace the chokepoints to find the leverage.",
  },
  {
    pillar: "career",
    pillarLabel: "Career Strategy & Leverage",
    headline: "The Prestige Trap: Why Credential Stacking Destroys Optionality",
    briefing:
      "Prestigious institutions are designed to produce predictable outputs — reliable employees for existing power structures. The prestige trap occurs when credential accumulation becomes the strategy itself, consuming years of compounding time. The highest-leverage career moves are often anti-prestige: building in nascent markets, acquiring rare skill combinations, and positioning at the intersection of two growing fields rather than at the center of one established one.",
    sources: [
      { label: "80,000 Hours Career Guide", url: "https://80000hours.org/career-guide/", type: "analysis" },
      { label: "Paul Graham — How to Do Great Work", url: "http://paulgraham.com/greatwork.html", type: "opinion" },
      { label: "Byrne Hobart — The Diff", url: "https://www.thediff.co/", type: "analysis" },
      { label: "Cal Newport — So Good They Can't Ignore You", url: "https://calnewport.com/", type: "opinion" },
    ],
    question: "What's the most valuable skill you have that no institution taught you?",
    reflection: "Audit your career moves: which ones added optionality and which ones narrowed it?",
  },
  {
    pillar: "tech",
    pillarLabel: "Technology & AI Literacy",
    headline: "The Compute Bottleneck Nobody Discusses",
    briefing:
      "AI discourse fixates on models and datasets while ignoring the fundamental constraint: compute. Training frontier models requires thousands of specialized GPUs consuming megawatts of power. This means AI development is increasingly determined by energy policy, chip manufacturing capacity, and datacenter geography — not algorithmic breakthroughs. The regulatory fragmentation between EU (AI Act), US (executive orders), and China (algorithmic governance) creates three diverging AI ecosystems with incompatible compliance requirements.",
    sources: [
      { label: "Epoch AI — Compute Trends", url: "https://epochai.org/trends-in-machine-learning-hardware", type: "data" },
      { label: "SemiAnalysis — GPU Supply Analysis", url: "https://semianalysis.com/", type: "analysis" },
      { label: "IEA — Data Centre Energy Report", url: "https://www.iea.org/reports/data-centres-and-data-transmission-networks", type: "report" },
      { label: "EU AI Act — Full Text", url: "https://artificialintelligenceact.eu/", type: "policy" },
      { label: "Jack Clark — Import AI Newsletter", url: "https://importai.substack.com/", type: "opinion" },
    ],
    question: "If compute is the bottleneck, who controls the spigot — and what are they optimizing for?",
    reflection: "When evaluating any AI claim, ask: what does this require in terms of compute, data, and energy?",
  },
  {
    pillar: "self",
    pillarLabel: "Self-Mastery & Long-Game Design",
    headline: "The 10-Year Lens: Why Time Horizon Is Your Greatest Edge",
    briefing:
      "Most people optimize on a 1-3 month time horizon. Institutions operate on quarterly cycles. Governments plan in election cycles. If you extend your decision-making horizon to 10 years, you're competing against almost no one. This is the core insight of compounding applied beyond finance — to relationships, skills, reputation, and health. The difficulty isn't intellectual; it's emotional. Operating on long time horizons requires tolerating extended periods of no visible progress.",
    sources: [
      { label: "Farnam Street — Mental Models", url: "https://fs.blog/mental-models/", type: "analysis" },
      { label: "Morgan Housel — Collaborative Fund Blog", url: "https://collabfund.com/blog/", type: "opinion" },
      { label: "Andrew Huberman — Dopamine & Motivation", url: "https://hubermanlab.com/", type: "analysis" },
      { label: "Seneca — On the Shortness of Life", url: "https://www.gutenberg.org/ebooks/2016", type: "opinion" },
    ],
    question: "What decision would you make differently if you optimized for your position in 2035?",
    reflection: "Identify one area of your life where you're optimizing for this quarter instead of this decade.",
  },
];
