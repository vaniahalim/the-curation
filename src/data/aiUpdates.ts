export interface TutorialStep {
  title: string;
  content: string;
}

export interface AIUpdate {
  id: string;
  category: "model" | "tool" | "tutorial" | "analysis";
  title: string;
  summary: string;
  sources: { label: string; url: string; platform: "x" | "substack" | "blog" | "paper" | "youtube" }[];
  date: string;
  tags: string[];
  /** Tutorial-specific fields */
  tutorialContent?: {
    introduction: string;
    steps: TutorialStep[];
    videoUrl?: string;
    conclusion: string;
  };
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
    summary: "The AI-native IDE space is consolidating rapidly. Cursor's agent mode and Windsurf's contextual understanding represent two different philosophies: explicit tool use vs ambient intelligence. The meta-pattern: AI is being embedded into the tools professionals already use rather than requiring new workflows.",
    sources: [
      { label: "@swyx — AI Engineer perspective", url: "https://x.com/swyx", platform: "x" },
      { label: "Cursor Changelog", url: "https://cursor.com/changelog", platform: "blog" },
      { label: "Latent Space Podcast — IDE Deep Dive", url: "https://www.latent.space/", platform: "substack" },
    ],
    date: "2026-02-11",
    tags: ["developer tools", "IDE", "productivity"],
    tutorialContent: {
      introduction: "AI-native IDEs are transforming how developers write code. This guide walks through setting up Cursor's agent mode for maximum productivity — from configuration to advanced workflows.",
      videoUrl: "https://www.youtube.com/watch?v=gqUQbjsYZLQ",
      steps: [
        {
          title: "Install and Configure Cursor",
          content: "Download Cursor from cursor.com. Import your VS Code settings and extensions. Enable agent mode in Settings → Features → Agent. Set your preferred model (Claude Sonnet recommended for code generation, GPT-5 for complex reasoning tasks)."
        },
        {
          title: "Master the Composer Workflow",
          content: "Use Cmd+I to open the composer. Write natural language descriptions of what you want to build. Key technique: be specific about file paths, function names, and expected behavior. The more context you provide, the better the output."
        },
        {
          title: "Use @-mentions for Context",
          content: "Reference files with @filename, documentation with @docs, and codebase context with @codebase. This dramatically improves output quality by giving the model the right context window. Pro tip: pin frequently used files to your context."
        },
        {
          title: "Set Up Custom Rules",
          content: "Create a .cursorrules file in your project root. Define your coding standards, preferred patterns, and tech stack. Example: 'Always use TypeScript strict mode. Prefer functional components. Use Tailwind for styling.' This ensures consistent output across sessions."
        }
      ],
      conclusion: "The key insight: AI IDEs don't replace programming knowledge — they amplify it. Developers who understand architecture and design patterns get exponentially more value from these tools than those who treat them as code generators."
    }
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
    tutorialContent: {
      introduction: "Agentic AI represents a paradigm shift from simple prompt-response patterns to autonomous, multi-step reasoning systems. This tutorial walks through building production-grade agentic workflows — from basic function calling to fully autonomous planning loops with evaluation guardrails.",
      videoUrl: "https://www.youtube.com/watch?v=sal78ACtGTc",
      steps: [
        {
          title: "Master Function Calling Fundamentals",
          content: "Start with OpenAI or Anthropic's function calling API. Define clear tool schemas with descriptions, required parameters, and return types. The model learns to select and invoke tools based on context. Practice: build a simple agent that can search the web and summarize results."
        },
        {
          title: "Add Retrieval-Augmented Generation (RAG)",
          content: "Connect your agent to a vector database (Pinecone, Weaviate, or Supabase pgvector). Implement chunking strategies for your knowledge base. Key insight: retrieval quality determines agent quality — spend 80% of your time on chunking and embedding strategy, not on the agent logic."
        },
        {
          title: "Introduce Planning Loops",
          content: "Move from single-shot tool use to ReAct-style reasoning loops. The agent should: (1) observe the current state, (2) think about what to do next, (3) act using a tool, (4) observe the result. Implement a maximum iteration count to prevent infinite loops. Use structured output to enforce the observe-think-act cycle."
        },
        {
          title: "Implement Multi-Agent Handoffs",
          content: "Decompose complex tasks across specialized agents. A 'router' agent determines which specialist to invoke. Each specialist has a narrow scope and defined tools. Key pattern: use structured messages for handoffs so agents share context without losing information."
        },
        {
          title: "Build Evaluation & Guardrails",
          content: "This is where most teams fail. Implement: (1) output validators that check agent responses against schemas, (2) hallucination detectors that verify claims against retrieved sources, (3) cost monitors that track token usage per task, (4) human-in-the-loop checkpoints for high-stakes decisions. Without evaluation, your agent is a liability."
        }
      ],
      conclusion: "The most important lesson: agentic systems fail silently. Unlike a broken API that returns an error, a bad agent returns confident-sounding nonsense. Build evaluation first, then build the agent. The teams that ship reliable agents are the ones that treat evaluation as a first-class citizen, not an afterthought."
    }
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
    summary: "Anthropic's Model Context Protocol is becoming the de facto standard for connecting AI models to external tools and data sources. MCP's open design is a deliberate play to prevent OpenAI's function-calling format from becoming the locked-in standard.",
    sources: [
      { label: "Anthropic — MCP Specification", url: "https://modelcontextprotocol.io/", platform: "blog" },
      { label: "@alexalbert__ — MCP design decisions", url: "https://x.com/alexalbert__", platform: "x" },
      { label: "Latent Space — MCP Deep Dive", url: "https://www.latent.space/", platform: "substack" },
    ],
    date: "2026-02-07",
    tags: ["protocols", "integration", "Anthropic"],
    tutorialContent: {
      introduction: "MCP lets you connect any AI model to external tools — databases, APIs, file systems — through a standardized protocol. This tutorial shows you how to build your first MCP server and connect it to Claude Desktop.",
      videoUrl: "https://www.youtube.com/watch?v=kQHBJFNGnOA",
      steps: [
        {
          title: "Understand the MCP Architecture",
          content: "MCP follows a client-server model. The 'host' (e.g., Claude Desktop) connects to MCP 'servers' that expose tools. Each server defines capabilities: tools (actions), resources (data), and prompts (templates). Think of it as USB-C for AI — one standard connector for everything."
        },
        {
          title: "Build a Simple MCP Server",
          content: "Use the official TypeScript SDK: npm install @modelcontextprotocol/sdk. Create a server that exposes a single tool — for example, a weather lookup. Define the tool schema with name, description, and input parameters using JSON Schema. Return structured results."
        },
        {
          title: "Connect to Claude Desktop",
          content: "Add your server to Claude Desktop's config at ~/Library/Application Support/Claude/claude_desktop_config.json. Specify the command to run your server (e.g., 'npx your-mcp-server'). Restart Claude Desktop — your tool appears automatically in the interface."
        },
        {
          title: "Add Resources and Context",
          content: "Beyond tools, expose resources — structured data your AI can read. Example: expose your project's README, database schema, or API docs as MCP resources. This gives the model rich context without you having to paste it into every conversation."
        }
      ],
      conclusion: "MCP is still early but the adoption curve is steep. Building MCP servers now is like building REST APIs in 2010 — the pattern will become ubiquitous. Start small, ship one server, and iterate."
    }
  },
];
