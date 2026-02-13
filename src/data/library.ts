import type { PillarKey } from "./dailyIntel";

export interface BookEntry {
  title: string;
  author: string;
  pillar: PillarKey;
  whyItMatters: string;
  lens: string;
  ideologicalBeneficiary: string;
  keyTakeaway: string;
}

export interface PodcastEntry {
  name: string;
  orientation: string;
  biasProfile: string;
  bestEpisodeType: string;
}

export interface DocEntry {
  title: string;
  type: string;
  whatToQuestion: string;
}

export const books: BookEntry[] = [
  { title: "The Price of Time", author: "Edward Chancellor", pillar: "money", whyItMatters: "Reveals how interest rates shape civilization's risk appetite", lens: "Read as a history of institutional incentives around time preference", ideologicalBeneficiary: "Sound money advocates, Austrian-leaning economists", keyTakeaway: "Artificially low interest rates systematically transfer wealth from savers to borrowers and asset holders." },
  { title: "Lords of Finance", author: "Liaquat Ahamed", pillar: "money", whyItMatters: "Shows how central bankers created the Great Depression through groupthink", lens: "Read for institutional failure patterns that repeat", ideologicalBeneficiary: "Critics of centralized monetary policy", keyTakeaway: "Elite consensus is not correlated with correctness — especially in monetary policy." },
  { title: "Capital Returns", author: "Edward Chancellor", pillar: "money", whyItMatters: "Inverts standard investment thinking by focusing on supply-side dynamics", lens: "Read as a framework for contrarian capital allocation", ideologicalBeneficiary: "Value investors, capital cycle theorists", keyTakeaway: "High returns attract capital which destroys returns. Watch where capital flows, not where returns are." },
  { title: "The Psychology of Money", author: "Morgan Housel", pillar: "money", whyItMatters: "Separates financial intelligence from financial behavior", lens: "Read as behavioral architecture for long-term wealth", ideologicalBeneficiary: "Behavioral economists, index fund advocates", keyTakeaway: "Wealth is what you don't spend. Financial success is a behavior problem, not a knowledge problem." },
  { title: "When Genius Failed", author: "Roger Lowenstein", pillar: "money", whyItMatters: "LTCM collapse proves that leverage kills regardless of intelligence", lens: "Read for tail risk and hubris in quantitative finance", ideologicalBeneficiary: "Risk management advocates, Taleb-adjacent thinkers", keyTakeaway: "Models that work 99% of the time will destroy you in the 1%." },
  { title: "The Ascent of Money", author: "Niall Ferguson", pillar: "money", whyItMatters: "Financial innovation as the engine of civilization", lens: "Read for the evolutionary view of financial systems", ideologicalBeneficiary: "Financial historians, institutional capitalists", keyTakeaway: "Every financial innovation creates new forms of both wealth and fragility." },

  { title: "The Power Broker", author: "Robert Caro", pillar: "power", whyItMatters: "The definitive study of how power actually operates in democracies", lens: "Read for the mechanics of institutional power accumulation", ideologicalBeneficiary: "Those skeptical of unaccountable bureaucratic power", keyTakeaway: "Power is not given — it is taken, and its exercise is rarely visible to those it affects." },
  { title: "The Dictator's Handbook", author: "Bueno de Mesquita & Smith", pillar: "power", whyItMatters: "Reduces all governance to coalition management", lens: "Read every political decision through the selectorate theory", ideologicalBeneficiary: "Rational choice theorists, realists", keyTakeaway: "Leaders do what keeps them in power. Everything else is narrative." },
  { title: "Why Nations Fail", author: "Acemoglu & Robinson", pillar: "power", whyItMatters: "Institutional quality determines prosperity more than geography or culture", lens: "Read for extractive vs inclusive institutional dynamics", ideologicalBeneficiary: "Liberal institutionalists, development economists", keyTakeaway: "Inclusive institutions create prosperity; extractive institutions create poverty. The difference is political." },
  { title: "Seeing Like a State", author: "James C. Scott", pillar: "power", whyItMatters: "Why top-down planning fails — the state's need to simplify destroys local knowledge", lens: "Read as a warning against legibility-driven governance", ideologicalBeneficiary: "Libertarians, anarchists, localists", keyTakeaway: "The state's drive to make society legible often destroys the complex systems that actually work." },
  { title: "The Revolt of the Public", author: "Martin Gurri", pillar: "power", whyItMatters: "Explains the crisis of authority in the information age", lens: "Read for understanding institutional legitimacy collapse", ideologicalBeneficiary: "Tech-aware political analysts, populism scholars", keyTakeaway: "Information abundance destroys institutional authority faster than it builds alternatives." },

  { title: "Prisoners of Geography", author: "Tim Marshall", pillar: "world", whyItMatters: "Geography constrains geopolitics more than ideology", lens: "Read every conflict through terrain and access", ideologicalBeneficiary: "Realists, geographic determinists", keyTakeaway: "Mountains, rivers, and coastlines explain more about international relations than speeches." },
  { title: "The World for Sale", author: "Blas & Farchy", pillar: "world", whyItMatters: "Commodity traders as shadow diplomats", lens: "Read for the hidden actors in global resource allocation", ideologicalBeneficiary: "Market realists, those tracking resource geopolitics", keyTakeaway: "A handful of commodity traders have more geopolitical influence than most foreign ministries." },
  { title: "The New Map", author: "Daniel Yergin", pillar: "world", whyItMatters: "Energy geography shapes every major geopolitical alignment", lens: "Read for the energy transition as power transition", ideologicalBeneficiary: "Energy policy hawks, geopolitical strategists", keyTakeaway: "Energy maps are power maps. The transition to renewables is also a transition in geopolitical leverage." },
  { title: "The Tragedy of Great Power Politics", author: "John Mearsheimer", pillar: "world", whyItMatters: "Offensive realism as the operating system of great powers", lens: "Read as the framework most policy elites actually use (but won't admit)", ideologicalBeneficiary: "Structural realists, defense strategists", keyTakeaway: "Great powers maximize relative power because the international system provides no guarantor of security." },

  { title: "The Master Switch", author: "Tim Wu", pillar: "tech", whyItMatters: "Every information technology follows an open-to-closed cycle", lens: "Read current AI ecosystem through the cycle framework", ideologicalBeneficiary: "Open internet advocates, antitrust proponents", keyTakeaway: "Information empires consolidate. The question is not if but when and by whom." },
  { title: "The Alignment Problem", author: "Brian Christian", pillar: "tech", whyItMatters: "The gap between what we tell machines to do and what we mean", lens: "Read as governance challenge, not just technical problem", ideologicalBeneficiary: "AI safety community, techno-ethicists", keyTakeaway: "Alignment is not a future problem — every deployed system already exhibits alignment failures." },
  { title: "Chip War", author: "Chris Miller", pillar: "tech", whyItMatters: "Semiconductors as the most strategically important technology on Earth", lens: "Read for industrial policy and chokepoint strategy", ideologicalBeneficiary: "Industrial policy advocates, national security hawks", keyTakeaway: "Control of chip fabrication is control of the future. This is the most consequential supply chain in history." },

  { title: "Meditations", author: "Marcus Aurelius", pillar: "self", whyItMatters: "The operating manual for maintaining agency under pressure", lens: "Read as practical philosophy, not inspirational quotes", ideologicalBeneficiary: "Stoics, anyone seeking internal locus of control", keyTakeaway: "You control your judgment, your effort, and your response. Nothing else. This is freedom." },
  { title: "Antifragile", author: "Nassim Nicholas Taleb", pillar: "self", whyItMatters: "Systems that gain from disorder — applied to career, health, and positioning", lens: "Read for personal strategy under uncertainty", ideologicalBeneficiary: "Contrarians, risk-aware strategists", keyTakeaway: "Don't try to predict the future. Position yourself to benefit from volatility." },
  { title: "The Courage to Be Disliked", author: "Kishimi & Koga", pillar: "self", whyItMatters: "Separating your tasks from others' — radical agency", lens: "Read for boundary architecture and self-determination", ideologicalBeneficiary: "Adlerian psychologists, individualists", keyTakeaway: "Other people's opinions are their task, not yours. Freedom begins with this separation." },
];

export const podcasts: PodcastEntry[] = [
  { name: "EconTalk", orientation: "Classical liberal economics, deep long-form interviews", biasProfile: "Market-friendly, skeptical of central planning. Intellectually honest about tradeoffs.", bestEpisodeType: "Episodes with heterodox guests who challenge the host's priors" },
  { name: "Conversations with Tyler", orientation: "Polymathic interviews spanning economics, culture, and strategy", biasProfile: "Libertarian-adjacent but genuinely curious. Cowen steelmans every position.", bestEpisodeType: "Episodes with geopolitical thinkers and institutional historians" },
  { name: "The Ezra Klein Show", orientation: "Progressive policy analysis with structural focus", biasProfile: "Center-left, institutional liberal. Strong on systems thinking, weaker on market mechanisms.", bestEpisodeType: "Episodes on institutional design and political epistemology" },
  { name: "Odd Lots", orientation: "Market structure, plumbing of financial systems", biasProfile: "Bloomberg-adjacent, market-realist. Excellent on mechanics, less on ideology.", bestEpisodeType: "Episodes explaining market microstructure and commodity flows" },
  { name: "Macro Musings", orientation: "Monetary policy deep dives", biasProfile: "Market monetarist leaning. Technical but accessible.", bestEpisodeType: "Episodes with central bank researchers and monetary historians" },
  { name: "ChinaTalk", orientation: "US-China relations, technology policy, industrial strategy", biasProfile: "Hawkish on China competition, nuanced on technology governance.", bestEpisodeType: "Episodes on semiconductor policy and AI governance" },
  { name: "Dwarkesh Podcast", orientation: "Long-form with technologists, historians, and strategists", biasProfile: "Progress-oriented, techno-optimist but rigorous.", bestEpisodeType: "Deep historical episodes and AI capability discussions" },
  { name: "The Lawfare Podcast", orientation: "National security law and institutional governance", biasProfile: "Establishment-adjacent, rule-of-law focused. Centrist institutionalist.", bestEpisodeType: "Episodes on surveillance, executive power, and constitutional constraints" },
  { name: "The Rachman Review", orientation: "FT's geopolitical analysis podcast", biasProfile: "Globalist, liberal internationalist. Excellent regional coverage.", bestEpisodeType: "Episodes with regional experts on non-Western geopolitics" },
  { name: "The All-In Podcast", orientation: "Tech industry, venture capital, macro commentary", biasProfile: "⚠️ Heavy VC bias, libertarian tech-bro framing. Useful signal on market sentiment, unreliable on policy analysis.", bestEpisodeType: "Market reaction episodes — listen for sentiment, not analysis" },
];

export const documentaries: DocEntry[] = [
  { title: "Inside Job", type: "Documentary", whatToQuestion: "Traces the 2008 crisis to institutional incentives. Question: does it identify systemic incentive failures or just individual villains? Systemic critiques age better." },
  { title: "HyperNormalisation", type: "Documentary", whatToQuestion: "Adam Curtis on manufactured reality. Question his own narrative construction — does he select evidence to support a predetermined thesis? Apply the same skepticism to the documentary as it applies to power." },
  { title: "The Big Short", type: "Drama", whatToQuestion: "Entertaining but romanticizes the contrarian. Ask: why did the system reward the shorts only after collapse? Who absorbed the losses?" },
  { title: "The Social Dilemma", type: "Documentary", whatToQuestion: "Effective alarm-raising but oversimplifies the attention economy. Ask: who benefits from the proposed solutions (more regulation)? Sometimes the critique serves a different power center." },
  { title: "Dirty Money", type: "Series", whatToQuestion: "Each episode is a case study in regulatory failure. Ask: was the failure a bug or a feature of the regulatory design?" },
];
