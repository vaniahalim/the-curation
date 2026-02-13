export interface AIUpdate {
  id: string;
  category: "model" | "tool" | "tutorial" | "analysis";
  title: string;
  summary: string;
  sources: { label: string; url: string; platform: "x" | "substack" | "blog" | "paper" | "youtube" }[];
  date: string;
  tags: string[];
}

export const aiUpdates: AIUpdate[] = [
  {
    id: "1",
    category: "model",
    title: "GPT-5 and the Frontier Shift",
    summary: "OpenAI's GPT-5 represents a significant capability jump — particularly in long-context reasoning and multimodal understanding. The key development isn't the model itself but the infrastructure requirements: estimated 10x compute over GPT-4 training. This consolidates AI development further into organizations with access to hyperscale compute. The strategic implication: the gap between frontier labs and everyone else is widening, not narrowing.",
    sources: [
      { label: "OpenAI Research Blog", url: "https://openai.com/research", platform: "blog" },
      { label: "@karpathy analysis thread", url: "https://x.com/karpathy", platform: "x" },
      { label: "Zvi Mowshowitz — Don't Worry About the Vase", url: "https://thezvi.substack.com/", platform: "substack" },
      { label: "SemiAnalysis — Training Compute Estimates", url: "https://semianalysis.com/", platform: "blog" },
    ],
    date: "2026-02-12",
    tags: ["frontier models", "compute", "OpenAI"],
  },
  {
    id: "2",
    category: "tool",
    title: "Cursor, Windsurf, and the IDE Wars",
    summary: "The AI-native IDE space is consolidating rapidly. Cursor's agent mode and Windsurf's contextual understanding represent two different philosophies: explicit tool use vs ambient intelligence. The meta-pattern: AI is being embedded into the tools professionals already use rather than requiring new workflows. This is how technology adoption actually happens — through infrastructure, not interfaces.",
    sources: [
      { label: "@swyx — AI Engineer perspective", url: "https://x.com/swyx", platform: "x" },
      { label: "Cursor Changelog", url: "https://cursor.com/changelog", platform: "blog" },
      { label: "Latent Space Podcast — IDE Deep Dive", url: "https://www.latent.space/", platform: "substack" },
    ],
    date: "2026-02-11",
    tags: ["developer tools", "IDE", "productivity"],
  },
  {
    id: "3",
    category: "tutorial",
    title: "Building Agentic Workflows: From Theory to Practice",
    summary: "The shift from single-prompt to agentic architectures is the most significant practical development in applied AI. Key pattern: decompose complex tasks into tool-using agents with defined scopes, connected through structured handoffs. The learning path: start with function calling → add retrieval → introduce planning loops → implement evaluation. Most failures come from skipping the evaluation step.",
    sources: [
      { label: "Anthropic — Building Effective Agents", url: "https://www.anthropic.com/research/building-effective-agents", platform: "blog" },
      { label: "@AndrewYNg — Agentic Design Patterns", url: "https://x.com/AndrewYNg", platform: "x" },
      { label: "LangChain Academy — Agent Course", url: "https://academy.langchain.com/", platform: "blog" },
      { label: "Simon Willison — AI tooling notes", url: "https://simonwillison.net/", platform: "blog" },
    ],
    date: "2026-02-10",
    tags: ["agents", "architecture", "tutorials"],
  },
  {
    id: "4",
    category: "model",
    title: "Gemini 3 Pro: Google's Multimodal Play",
    summary: "Google's Gemini 3 Pro pushes multimodal natively — not as a bolted-on feature but as a core architecture decision. The strategic read: Google is betting that the future of AI is not text-in-text-out but sensor-fusion across modalities. This aligns with their hardware advantage (TPUs) and data advantage (YouTube, Search, Maps). Watch for the infrastructure moat, not the benchmark scores.",
    sources: [
      { label: "Google DeepMind Blog", url: "https://deepmind.google/discover/blog/", platform: "blog" },
      { label: "@JeffDean — Architecture thread", url: "https://x.com/JeffDean", platform: "x" },
      { label: "The Information — Google AI Strategy", url: "https://www.theinformation.com/", platform: "blog" },
    ],
    date: "2026-02-09",
    tags: ["Google", "multimodal", "frontier models"],
  },
  {
    id: "5",
    category: "analysis",
    title: "Open Source AI: The Strategic Landscape After Llama 4",
    summary: "Meta's open-source strategy isn't altruism — it's a competitive moat against API-dependent business models. By commoditizing the model layer, Meta shifts value capture to deployment infrastructure (where they have advantages) and away from model access (where OpenAI dominates). The second-order effect: open-weight models enable sovereignty-focused deployments in EU, India, and Southeast Asia.",
    sources: [
      { label: "Meta AI Research", url: "https://ai.meta.com/research/", platform: "blog" },
      { label: "@ylecun — Open vs Closed debate", url: "https://x.com/ylecun", platform: "x" },
      { label: "Nathan Lambert — Open Source AI Analysis", url: "https://www.interconnects.ai/", platform: "substack" },
      { label: "Jack Clark — Import AI", url: "https://importai.substack.com/", platform: "substack" },
      { label: "Stanford HAI — Foundation Model Index", url: "https://crfm.stanford.edu/", platform: "paper" },
    ],
    date: "2026-02-08",
    tags: ["open source", "Meta", "geopolitics"],
  },
  {
    id: "6",
    category: "tool",
    title: "MCP Protocol: The Emerging Standard for AI Tool Integration",
    summary: "Anthropic's Model Context Protocol is becoming the de facto standard for connecting AI models to external tools and data sources. The strategic read: whoever controls the integration protocol controls the ecosystem. MCP's open design is a deliberate play to prevent OpenAI's function-calling format from becoming the locked-in standard. Watch for adoption patterns — they predict future platform dynamics.",
    sources: [
      { label: "Anthropic — MCP Specification", url: "https://modelcontextprotocol.io/", platform: "blog" },
      { label: "@alexalbert__ — MCP design decisions", url: "https://x.com/alexalbert__", platform: "x" },
      { label: "Latent Space — MCP Deep Dive", url: "https://www.latent.space/", platform: "substack" },
    ],
    date: "2026-02-07",
    tags: ["protocols", "integration", "Anthropic"],
  },
];
