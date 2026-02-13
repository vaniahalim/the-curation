import { type PillarKey, type IntelBrief } from "./dailyIntel";
import { subDays, format } from "date-fns";

export interface DailyArchiveEntry {
  date: string; // YYYY-MM-DD
  dateLabel: string;
  briefs: IntelBrief[];
}

const today = new Date();

const archiveBriefs: Record<string, IntelBrief[]> = {
  [format(today, "yyyy-MM-dd")]: [
    {
      pillar: "money",
      pillarLabel: "Money & Financial Power",
      headline: "The Hidden Tax of Inflation Expectations",
      briefing: "Central banks don't just manage inflation — they manage the *expectation* of inflation. When the Fed signals rate holds, it's not monetary neutrality — it's a deliberate repricing of risk assets. The real question: who benefits when markets believe inflation is tamed while real wages remain compressed?",
      sources: [
        { label: "BIS Quarterly Review", url: "https://www.bis.org/publ/qtrpdf/r_qt2312.htm", type: "report" },
        { label: "Federal Reserve — FOMC Minutes", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm", type: "policy" },
      ],
      question: "If inflation expectations are a policy tool, who is the target audience — markets or citizens?",
      reflection: "Map every financial headline to its beneficiary.",
    },
    {
      pillar: "power",
      pillarLabel: "Power, Institutions & Incentives",
      headline: "Regulatory Capture Is the Default, Not the Exception",
      briefing: "The revolving door between industry and regulators isn't corruption — it's the equilibrium state of institutional incentives. When a regulator's career advancement depends on industry relationships, capture becomes rational behavior.",
      sources: [
        { label: "NBER Working Paper", url: "https://www.nber.org/papers/w29600", type: "academic" },
        { label: "ProPublica", url: "https://projects.propublica.org/", type: "data" },
      ],
      question: "Can you name three regulations that primarily serve incumbents rather than consumers?",
      reflection: "When evaluating any regulation, ask: who wrote it, who enforces it, and who benefits from the complexity?",
    },
    {
      pillar: "world",
      pillarLabel: "World News & Current Affairs",
      headline: "The Semiconductor Supply Chain as Geopolitical Weapon",
      briefing: "Taiwan produces over 60% of the world's advanced semiconductors. This isn't a supply chain vulnerability — it's a geopolitical architecture. Every major power is building redundancy not for efficiency but for leverage.",
      sources: [
        { label: "Financial Times", url: "https://www.ft.com/semiconductors", type: "analysis" },
        { label: "CSIS — Chokepoints Report", url: "https://www.csis.org/analysis", type: "policy" },
      ],
      question: "If semiconductors are the new oil, which countries become the new Saudi Arabia?",
      reflection: "Every supply chain is a power map. Trace the chokepoints to find the leverage.",
    },
    {
      pillar: "career",
      pillarLabel: "Career Strategy & Leverage",
      headline: "The Prestige Trap: Why Credential Stacking Destroys Optionality",
      briefing: "Prestigious institutions are designed to produce predictable outputs. The prestige trap occurs when credential accumulation becomes the strategy itself, consuming years of compounding time.",
      sources: [
        { label: "80,000 Hours Career Guide", url: "https://80000hours.org/career-guide/", type: "analysis" },
        { label: "Paul Graham — Great Work", url: "http://paulgraham.com/greatwork.html", type: "opinion" },
      ],
      question: "What's the most valuable skill you have that no institution taught you?",
      reflection: "Audit your career moves: which ones added optionality and which ones narrowed it?",
    },
    {
      pillar: "tech",
      pillarLabel: "Technology & AI Literacy",
      headline: "The Compute Bottleneck Nobody Discusses",
      briefing: "AI discourse fixates on models and datasets while ignoring the fundamental constraint: compute. Training frontier models requires thousands of specialized GPUs consuming megawatts of power.",
      sources: [
        { label: "Epoch AI — Compute Trends", url: "https://epochai.org/trends-in-machine-learning-hardware", type: "data" },
        { label: "SemiAnalysis", url: "https://semianalysis.com/", type: "analysis" },
      ],
      question: "If compute is the bottleneck, who controls the spigot?",
      reflection: "When evaluating any AI claim, ask: what does this require in terms of compute, data, and energy?",
    },
    {
      pillar: "self",
      pillarLabel: "Self-Mastery & Long-Game Design",
      headline: "The 10-Year Lens: Why Time Horizon Is Your Greatest Edge",
      briefing: "Most people optimize on a 1-3 month time horizon. If you extend your decision-making horizon to 10 years, you're competing against almost no one.",
      sources: [
        { label: "Farnam Street — Mental Models", url: "https://fs.blog/mental-models/", type: "analysis" },
        { label: "Morgan Housel", url: "https://collabfund.com/blog/", type: "opinion" },
      ],
      question: "What decision would you make differently if you optimized for your position in 2035?",
      reflection: "Identify one area where you're optimizing for this quarter instead of this decade.",
    },
  ],
  [format(subDays(today, 1), "yyyy-MM-dd")]: [
    {
      pillar: "money",
      pillarLabel: "Money & Financial Power",
      headline: "Shadow Banking and the Illusion of Stability",
      briefing: "The shadow banking system — non-bank financial intermediaries — now holds over $63 trillion in assets. These entities operate outside traditional regulatory frameworks, creating systemic risk invisible to most observers.",
      sources: [
        { label: "FSB Global Monitoring Report", url: "https://www.fsb.org/", type: "report" },
      ],
      question: "If shadow banks fail, who absorbs the losses — shareholders or taxpayers?",
      reflection: "Stability is often an illusion maintained by complexity.",
    },
    {
      pillar: "power",
      pillarLabel: "Power, Institutions & Incentives",
      headline: "How Lobbying Shaped the Tax Code",
      briefing: "The U.S. tax code is 75,000+ pages not because taxation is complex, but because every page represents a lobbying victory. Complexity itself is the product.",
      sources: [
        { label: "OpenSecrets — Lobbying Data", url: "https://www.opensecrets.org/", type: "data" },
      ],
      question: "Who benefits most from tax complexity — individuals or corporations?",
      reflection: "Complexity is never accidental in institutional design.",
    },
    {
      pillar: "world",
      pillarLabel: "World News & Current Affairs",
      headline: "Rare Earth Minerals: The Next Resource War",
      briefing: "China controls 60% of rare earth mining and 90% of processing. Every electric vehicle, wind turbine, and missile guidance system depends on these materials. Diversification attempts by the West are a decade behind.",
      sources: [
        { label: "IEA Critical Minerals Report", url: "https://www.iea.org/", type: "report" },
      ],
      question: "What happens to the green transition if rare earth supply is weaponized?",
      reflection: "Every transition creates new dependencies. Map them before committing.",
    },
    {
      pillar: "career",
      pillarLabel: "Career Strategy & Leverage",
      headline: "Why Your Network Is Worth More Than Your Resume",
      briefing: "80% of jobs are filled through networking, not applications. The implication: career strategy is relationship strategy. Building weak ties across diverse fields creates more optionality than deep ties in one.",
      sources: [
        { label: "Granovetter — Strength of Weak Ties", url: "https://sociology.stanford.edu/", type: "academic" },
      ],
      question: "How many people outside your field could you call for career advice today?",
      reflection: "Diversify your network the way you'd diversify a portfolio.",
    },
    {
      pillar: "tech",
      pillarLabel: "Technology & AI Literacy",
      headline: "Open Source AI: Liberation or Liability?",
      briefing: "Meta's release of LLaMA models democratized AI access but also eliminated competitive moats. Open-source AI forces the question: is the value in the model or in the data and distribution?",
      sources: [
        { label: "Meta AI Research", url: "https://ai.meta.com/", type: "analysis" },
      ],
      question: "Does open-sourcing AI models benefit society or just large incumbents?",
      reflection: "Free tools aren't free — someone is paying. Find out who and why.",
    },
    {
      pillar: "self",
      pillarLabel: "Self-Mastery & Long-Game Design",
      headline: "Identity-Based Habits vs Willpower",
      briefing: "Willpower is a depletable resource. Identity-based change — 'I am a person who reads daily' vs 'I should read more' — rewires behavior at the root rather than fighting symptoms.",
      sources: [
        { label: "James Clear — Atomic Habits", url: "https://jamesclear.com/", type: "opinion" },
      ],
      question: "What identity shift would make your hardest goal automatic?",
      reflection: "You don't rise to the level of your goals. You fall to the level of your systems.",
    },
  ],
  [format(subDays(today, 2), "yyyy-MM-dd")]: [
    {
      pillar: "money",
      pillarLabel: "Money & Financial Power",
      headline: "The Dollar Milkshake Theory",
      briefing: "As global liquidity tightens, capital flows to the strongest currency — the dollar — creating a vortex that strengthens USD while destabilizing emerging markets. This isn't a bug; it's the architecture of dollar hegemony.",
      sources: [
        { label: "Brent Johnson — Dollar Milkshake", url: "https://www.youtube.com/", type: "analysis" },
      ],
      question: "Does dollar strength help or hurt American competitiveness long-term?",
      reflection: "Currency is policy. Every exchange rate tells a story about power.",
    },
    {
      pillar: "world",
      pillarLabel: "World News & Current Affairs",
      headline: "BRICS Expansion: Multipolar Fantasy or Reality?",
      briefing: "BRICS+ now includes nations representing 46% of global population. But shared grievance with Western institutions doesn't equal shared interests. Internal contradictions — India-China tensions, Saudi-Iran rivalry — may limit cohesion.",
      sources: [
        { label: "Council on Foreign Relations", url: "https://www.cfr.org/", type: "analysis" },
      ],
      question: "Can BRICS create an alternative financial architecture, or just leverage within the existing one?",
      reflection: "Alliances built on opposition rarely outlast the opposition.",
    },
    {
      pillar: "tech",
      pillarLabel: "Technology & AI Literacy",
      headline: "AI Agents: From Chatbots to Autonomous Systems",
      briefing: "The shift from chatbots to agents represents a phase change: AI that takes actions, not just generates text. The implications for labor markets, liability, and institutional trust are underexplored.",
      sources: [
        { label: "Anthropic Research", url: "https://www.anthropic.com/research", type: "analysis" },
      ],
      question: "When an AI agent makes a consequential error, who is liable?",
      reflection: "The biggest disruptions don't announce themselves. They compound quietly.",
    },
    {
      pillar: "self",
      pillarLabel: "Self-Mastery & Long-Game Design",
      headline: "Environment Design Over Discipline",
      briefing: "Designing your environment — physical space, information diet, social circle — is more sustainable than relying on discipline. The people who appear most disciplined often just have the best-designed environments.",
      sources: [
        { label: "BJ Fogg — Tiny Habits", url: "https://tinyhabits.com/", type: "opinion" },
      ],
      question: "What's one environmental change that would make your default behavior better?",
      reflection: "Design your defaults. Willpower is for emergencies.",
    },
  ],
  [format(subDays(today, 3), "yyyy-MM-dd")]: [
    {
      pillar: "money",
      pillarLabel: "Money & Financial Power",
      headline: "Private Credit: The $1.7 Trillion Shadow Market",
      briefing: "Private credit has grown from niche to systemic, replacing banks in corporate lending. Less regulation, less transparency, higher yields. When the credit cycle turns, these risks surface.",
      sources: [
        { label: "FT — Private Credit", url: "https://www.ft.com/", type: "analysis" },
      ],
      question: "Is private credit innovation or just regulatory arbitrage?",
      reflection: "Higher yields always mean higher risk. The question is: risk to whom?",
    },
    {
      pillar: "power",
      pillarLabel: "Power, Institutions & Incentives",
      headline: "Platform Power: When Companies Become Governments",
      briefing: "Meta, Google, and Apple make governance decisions affecting billions — content moderation, market access, privacy. They operate with less accountability than any government, yet with comparable power over daily life.",
      sources: [
        { label: "Yale Law Journal", url: "https://www.yalelawjournal.org/", type: "academic" },
      ],
      question: "Should platform companies have constitutions?",
      reflection: "Power without accountability always consolidates further.",
    },
    {
      pillar: "career",
      pillarLabel: "Career Strategy & Leverage",
      headline: "The Portfolio Career: Diversifying Your Professional Risk",
      briefing: "A single employer represents concentrated risk. Portfolio careers — combining employment, freelancing, and ownership — mirror investment diversification principles applied to human capital.",
      sources: [
        { label: "Nassim Taleb — Antifragile", url: "https://www.fooledbyrandomness.com/", type: "opinion" },
      ],
      question: "If your employer disappeared tomorrow, how many months of runway do you have — financially and professionally?",
      reflection: "Treat your career like a portfolio, not a lottery ticket.",
    },
    {
      pillar: "world",
      pillarLabel: "World News & Current Affairs",
      headline: "Water Scarcity: The Invisible Geopolitical Crisis",
      briefing: "By 2030, global water demand will exceed supply by 40%. Water-stressed regions — Middle East, South Asia, North Africa — will see resource competition intensify, reshaping migration, agriculture, and conflict patterns.",
      sources: [
        { label: "World Resources Institute", url: "https://www.wri.org/", type: "report" },
      ],
      question: "Which industries are most vulnerable to water scarcity?",
      reflection: "The most important resources are the ones you don't think about — until they're gone.",
    },
  ],
  [format(subDays(today, 4), "yyyy-MM-dd")]: [
    {
      pillar: "tech",
      pillarLabel: "Technology & AI Literacy",
      headline: "Synthetic Data: Training AI on AI",
      briefing: "As real-world training data becomes scarce and legally contested, synthetic data — generated by other AI models — is filling the gap. The risk: model collapse, where AI trained on AI output degrades over generations.",
      sources: [
        { label: "Nature — Model Collapse", url: "https://www.nature.com/", type: "academic" },
      ],
      question: "If AI trains on its own output, does it converge on truth or on itself?",
      reflection: "Feedback loops without external correction always drift.",
    },
    {
      pillar: "self",
      pillarLabel: "Self-Mastery & Long-Game Design",
      headline: "Decision Fatigue and the Power of Defaults",
      briefing: "Every decision depletes cognitive resources. Reducing low-stakes decisions — through routines, uniforms, meal prep — preserves capacity for high-stakes ones. This is why CEOs wear the same outfit.",
      sources: [
        { label: "Daniel Kahneman — Thinking, Fast and Slow", url: "https://scholar.princeton.edu/kahneman", type: "academic" },
      ],
      question: "How many decisions do you make daily that could be automated or eliminated?",
      reflection: "Protect your decision-making capacity like you protect your money.",
    },
    {
      pillar: "money",
      pillarLabel: "Money & Financial Power",
      headline: "The Carry Trade Unwind Risk",
      briefing: "The yen carry trade — borrowing in low-interest yen to invest in higher-yielding assets — represents trillions in hidden leverage. When it unwinds, as in August 2024, it triggers cascading liquidations across global markets.",
      sources: [
        { label: "Bloomberg Markets", url: "https://www.bloomberg.com/", type: "analysis" },
      ],
      question: "How does a Japanese interest rate decision affect your portfolio?",
      reflection: "In a connected system, everything is closer than it appears.",
    },
    {
      pillar: "power",
      pillarLabel: "Power, Institutions & Incentives",
      headline: "Think Tanks: The Intellectual Laundering Machine",
      briefing: "Think tanks produce research that appears independent but is often funded by industries with direct policy interests. The output shapes legislation, media narratives, and public opinion — with funding sources rarely disclosed.",
      sources: [
        { label: "Transparify — Think Tank Transparency", url: "https://www.transparify.org/", type: "data" },
      ],
      question: "Before citing a think tank report, do you check who funds them?",
      reflection: "Independent research funded by interested parties is neither independent nor research.",
    },
  ],
  [format(subDays(today, 5), "yyyy-MM-dd")]: [
    {
      pillar: "world",
      pillarLabel: "World News & Current Affairs",
      headline: "The Arctic Race: New Trade Routes, New Conflicts",
      briefing: "Melting Arctic ice is opening shipping routes that cut transit times by 40%. Russia, China, Canada, and Nordic nations are positioning for control. The Arctic is the next theater of great power competition.",
      sources: [
        { label: "Arctic Council", url: "https://arctic-council.org/", type: "policy" },
      ],
      question: "Who benefits most from Arctic ice melt — and who pays the cost?",
      reflection: "Every crisis creates opportunity. The question is: opportunity for whom?",
    },
    {
      pillar: "career",
      pillarLabel: "Career Strategy & Leverage",
      headline: "Skill Stacking: The 1% of Two Things Strategy",
      briefing: "Being top 1% in one skill is nearly impossible. Being top 10% in two complementary skills and combining them is achievable and creates a unique, defensible position. This is the logic of skill stacking.",
      sources: [
        { label: "Scott Adams — Career Advice", url: "https://dilbertblog.typepad.com/", type: "opinion" },
      ],
      question: "What two skills could you combine to create a unique professional position?",
      reflection: "Don't compete where everyone else is. Combine where no one else has.",
    },
    {
      pillar: "tech",
      pillarLabel: "Technology & AI Literacy",
      headline: "The Energy Cost of AI Nobody Wants to Talk About",
      briefing: "A single ChatGPT query uses roughly 10x the energy of a Google search. As AI scales, energy demand from data centers could rival small nations. The sustainability narrative and the AI scaling narrative are on a collision course.",
      sources: [
        { label: "IEA — Data Centres Report", url: "https://www.iea.org/", type: "report" },
      ],
      question: "Can AI scale sustainably, or is efficiency a myth at frontier scale?",
      reflection: "Every technology has a hidden substrate. For AI, it's energy.",
    },
    {
      pillar: "self",
      pillarLabel: "Self-Mastery & Long-Game Design",
      headline: "Raising Your Standards vs Setting Goals",
      briefing: "Goals are about what you want. Standards are about what you'll accept. People who raise standards — in relationships, work quality, health — make progress automatic because falling below becomes intolerable.",
      sources: [
        { label: "Tony Robbins — Standards", url: "https://www.tonyrobbins.com/", type: "opinion" },
      ],
      question: "In which area of your life are your standards lowest — and why?",
      reflection: "You don't get what you want. You get what you tolerate.",
    },
  ],
  [format(subDays(today, 6), "yyyy-MM-dd")]: [
    {
      pillar: "money",
      pillarLabel: "Money & Financial Power",
      headline: "Central Bank Digital Currencies: Control Disguised as Convenience",
      briefing: "CBDCs promise efficiency but enable unprecedented monetary surveillance and control. Programmable money means governments could restrict spending categories, impose expiry dates, or implement negative interest rates directly.",
      sources: [
        { label: "Atlantic Council — CBDC Tracker", url: "https://www.atlanticcouncil.org/cbdctracker/", type: "data" },
      ],
      question: "Would you trade financial privacy for a 2% transaction fee reduction?",
      reflection: "Convenience is the Trojan horse of control.",
    },
    {
      pillar: "power",
      pillarLabel: "Power, Institutions & Incentives",
      headline: "The Overton Window: How Acceptable Ideas Shift",
      briefing: "The range of politically acceptable ideas — the Overton Window — doesn't shift through argument. It shifts through repetition, normalization, and strategic framing. Understanding this mechanism is understanding how power shapes discourse.",
      sources: [
        { label: "Mackinac Center — Overton Window", url: "https://www.mackinac.org/", type: "analysis" },
      ],
      question: "Which ideas that were 'extreme' five years ago are mainstream now — and who moved them?",
      reflection: "If you can control what's considered reasonable, you control the outcome.",
    },
    {
      pillar: "world",
      pillarLabel: "World News & Current Affairs",
      headline: "Food Security as National Security",
      briefing: "Russia and Ukraine together supply 30% of global wheat. The 2022 disruption showed how food supply chains are strategic weapons. Nations without food sovereignty are nations without sovereignty.",
      sources: [
        { label: "FAO — Food Price Index", url: "https://www.fao.org/", type: "data" },
      ],
      question: "Which countries are one bad harvest from political instability?",
      reflection: "Food is the most basic form of power. Everything else is built on top.",
    },
    {
      pillar: "career",
      pillarLabel: "Career Strategy & Leverage",
      headline: "Asymmetric Bets: Low Risk, High Upside Moves",
      briefing: "The best career moves are asymmetric: limited downside, unlimited upside. Writing publicly, building side projects, attending industry events — these have near-zero cost but potentially life-changing upside.",
      sources: [
        { label: "Naval Ravikant — Almanack", url: "https://www.navalmanack.com/", type: "opinion" },
      ],
      question: "What's one asymmetric bet you could place this week?",
      reflection: "Seek situations where the worst case is 'nothing changes' and the best case is 'everything changes.'",
    },
  ],
};

export const dailyArchive: DailyArchiveEntry[] = Object.entries(archiveBriefs)
  .map(([date, briefs]) => ({
    date,
    dateLabel: format(new Date(date + "T12:00:00"), "EEEE, MMMM d, yyyy"),
    briefs,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getArchiveByDate = (date: string): DailyArchiveEntry | undefined =>
  dailyArchive.find((entry) => entry.date === date);

export const getBriefsByPillar = (pillar: PillarKey): { date: string; dateLabel: string; brief: IntelBrief }[] =>
  dailyArchive.flatMap((entry) =>
    entry.briefs
      .filter((b) => b.pillar === pillar)
      .map((brief) => ({ date: entry.date, dateLabel: entry.dateLabel, brief }))
  );
