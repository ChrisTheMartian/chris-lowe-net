// articles.js - Foundational Content Pillars for chris-lowe.net
// Structured data pipeline for Chris to review, iterate, and publish.

const ARTICLES_DATA = [
  {
    id: "ai-native-systems",
    pillar: "AI & Knowledge Systems",
    title: "Why Your Second Brain Needs to be AI-Native",
    subtitle: "Traditional note-taking broke when autonomous agents arrived. Here is how to structure a knowledge system built for two intelligences.",
    date: "July 2026",
    readTime: "6 min read",
    summary: "Most PKM systems (BASB, LYT, Zettelkasten) were designed for human eyeballs alone. When you introduce autonomous AI agents, unstructured notes become a hallucination hazard. Discover the architecture of Commonplace: schema-driven vaults, closed vocabularies, and the Tool-Tier Ladder.",
    content: `
      <h3>The End of the Filing Cabinet</h3>
      <p>For over a decade, the Personal Knowledge Management (PKM) community has been obsessed with human retrieval. Methods like Tiago Forte's <em>Building a Second Brain</em> (BASB) or Nick Milo's <em>Linking Your Thinking</em> (LYT) taught us how to organize notes so our future selves could find them.</p>
      <p>But in 2026, the primary consumer of your notes is no longer just your future self. It is your **synthetic partner**—autonomous AI agents operating directly inside your filesystem.</p>

      <h3>Why Traditional PKM Fails in the Agent Era</h3>
      <p>When an AI agent enters a traditional note-taking vault, it encounters chaos:</p>
      <ul>
        <li><strong>Ambiguous naming:</strong> Folders like <code>/Misc</code> or <code>/Ideas</code> give agents zero routing determinism.</li>
        <li><strong>Unbounded vocabularies:</strong> If one note says <code>status: active</code>, another says <code>status: in-progress</code>, and a third says <code>state: open</code>, programmatic queries fail silently.</li>
        <li><strong>The Desert of Knowledge:</strong> Vaults bloated with thousands of clipped web articles dilute search relevance, causing agents to retrieve someone else's opinion instead of your original synthesis.</li>
      </ul>

      <h3>The Commonplace Solution: Built for Two Intelligences</h3>
      <p>In the Commonplace architecture, we design for two distinct users simultaneously: the **Organic Brain** (you) and the **Synthetic Brain** (your AI).</p>
      <p>To make a vault truly AI-native, we enforce three architectural pillars:</p>
      
      <h4>1. The Single Source of Truth Schema</h4>
      <p>Every agent entering the vault reads a canonical <code>schema.md</code> file before taking a single action. This file defines the exact hierarchy of Mission → Values → Principles → Protocols. It establishes strict rules: no tasks in Markdown (tasks belong in Todoist), no flat data trackers in notes (trackers belong in Airtable), and strict two-way link requirements.</p>

      <h4>2. Closed Vocabularies & Frontmatter Discipline</h4>
      <p>We eliminate guesswork by enforcing closed vocabularies in YAML frontmatter. For example, our Project Management Information System (PMIS) allows only eight strict status tokens: <code>Backlog · Next · Doing · Waiting · Blocked · Parked · Done · Cancelled</code>. Anything off-list is invisible to system dashboards.</p>

      <h4>3. The Tool-Tier Ladder (Cheapest Tool First)</h4>
      <p>AI tokens and execution time are valuable resources. Commonplace enforces a strict escalation ladder for agents:</p>
      <ol>
        <li><strong>Native Knowledge:</strong> Read local filesystem notes first.</li>
        <li><strong>Dedicated MCP Connectors:</strong> Use structured API tools (Todoist, Airtable, Google Drive) before web scraping.</li>
        <li><strong>Search & Fetch:</strong> Targeted queries only when local data is insufficient.</li>
        <li><strong>Browser Automation:</strong> The last resort. Never default to heavy GUI automation when a clean API or local note exists.</li>
      </ol>

      <h3>The Takeaway</h3>
      <p>An AI-native second brain isn't about letting AI write your notes for you. It's about structuring your digital environment so an autonomous agent can act as a true chief of staff—navigating your projects, preparing your daily briefings, and executing administrative workflows without breaking a sweat.</p>
    `
  },
  {
    id: "pmis-in-markdown",
    pillar: "Project Management & Operations",
    title: "The PMIS in Markdown: Structuring Chaos into Clarity",
    subtitle: "How to build an enterprise-grade Project Management Information System inside plain text notes without bloated SaaS overhead.",
    date: "July 2026",
    readTime: "7 min read",
    summary: "Enterprise PM tools are built for 50-person teams, not high-output individual operators. Learn how to adapt PMI's portfolio → program → project hierarchy into lightweight Markdown hubs, leveraging Obsidian Bases for live dashboards without vendor lock-in.",
    content: `
      <h3>The Operator's Dilemma</h3>
      <p>If you manage complex projects across technology, media, and operations, you know the frustration of enterprise project management tools. Jira, Asana, and MS Project are designed for cross-functional compliance and reporting up the corporate chain. For a solo operator or technical project manager building personal ventures, they introduce immense administrative friction.</p>
      <p>Yet, the alternative—keeping projects as loose checklists in a note-taking app—inevitably leads to dropped balls and strategic drift.</p>

      <h3>The Commonplace PMIS: PMI Rigor in Plain Text</h3>
      <p>In Commonplace, we implement a lightweight **Project Management Information System (PMIS)** directly in Markdown, modeled on the Project Management Institute (PMI) standard hierarchy:</p>
      <ul>
        <li><strong>Portfolio:</strong> Your overarching life and professional domains (e.g., Career, Finance, Websites).</li>
        <li><strong>Program:</strong> A coordinated group of related projects managed together to achieve a combined benefit (e.g., <em>2026 Job Search</em> or <em>System Maintenance</em>).</li>
        <li><strong>Project:</strong> A temporary endeavor with a defined start, end, and unique deliverable (e.g., <em>Stand Up chris-lowe.net</em>).</li>
        <li><strong>Subproject:</strong> A manageable chunk broken out of a massive project for execution clarity.</li>
      </ul>

      <h3>The Four Frontmatter Pillars</h3>
      <p>Every project note in Commonplace acts as a routing hub (MOC) rather than a dumping ground for meeting notes. To power our live dashboards, each project index note carries exactly four frontmatter fields:</p>
      <pre><code>---
type: project
parent: "[[2026 Job Search]]"
status: Doing
priority: 1
deadline: 2026-08-01
---</code></pre>
      <p>By keeping these fields standardized, we use **Obsidian Bases** to render live Kanban boards, priority matrix tables, and subproject hierarchies directly over our local markdown files—with zero manual duplication.</p>

      <h3>The Core Project Note Anatomy</h3>
      <p>A project note's primary job is to **route to documents, not to hold their raw content**. Our standardized layout ensures instant AuDHD scannability:</p>
      <ul>
        <li><strong>Status & One-Line Purpose:</strong> Immediate orientation.</li>
        <li><strong>📂 Documents:</strong> The central routing hub linking to Charters, Risk Registers, budgets, or external Google Drive collaborative folders.</li>
        <li><strong>🔭 Open Loops:</strong> Current actionable threads and pending decisions—kept lean and pointed directly at Todoist for execution.</li>
        <li><strong>🔗 Related:</strong> Two-way wikilinks connecting the project to relevant people, assets, and historical periodic logs.</li>
      </ul>

      <h3>Why This Beats SaaS</h3>
      <p>When your PMIS lives in plain text, you own your data forever. There are no subscription price hikes, no sluggish web wrappers, and no artificial barriers between your thinking space and your execution engine.</p>
    `
  },
  {
    id: "designing-for-organic-brain",
    pillar: "Designing for the Organic Brain",
    title: "Executive Function in the Vault: Systems That Survive When Motivation Fades",
    subtitle: "Most productivity systems assume a robotic, never-flagging human. Here is how to design for the biological, AuDHD mind.",
    date: "July 2026",
    readTime: "8 min read",
    summary: "Why do we abandon complex productivity systems after two weeks? Because they are built for robots. Discover the principles of designing for the Organic Brain: reflective notes that carry executive load, leading with emotional truth, and collapsing next steps to a single non-negotiable.",
    content: `
      <h3>The Two-Week Abandonment Cycle</h3>
      <p>We have all been there: you spend an entire weekend setting up the ultimate productivity dashboard. You create intricate color-coded tags, nested sub-folders, and automated daily review checklists. For twelve days, you feel invincible.</p>
      <p>On day thirteen, you have a rough morning. You skip the daily review. By day sixteen, your inbox has 40 unrouted items. The system now feels like a demanding boss rather than a supportive partner. You close the app and walk away.</p>
      <p>Why does this happen? Because traditional systems are designed for a **synthetic brain**—an idealized, never-flagging entity with infinite cognitive battery and linear dopamine.</p>

      <h3>The Organic Brain vs. The Synthetic Brain</h3>
      <p>One of the most profound realizations in building Commonplace was realizing that the human operator and the AI agent need completely opposite interfaces:</p>
      <ul>
        <li><strong>The Synthetic Brain (AI Agent):</strong> Needs rigid schemas, closed vocabularies, strict tool boundaries, and exhaustive deterministic rules.</li>
        <li><strong>The Organic Brain (Human AuDHD):</strong> Needs visual calm, emotional resonance, zero-friction capture, instant scannability, and supreme forgiveness for missed cadences.</li>
      </ul>

      <h3>Principle 12: Design for the AuDHD Brain</h3>
      <p>In our system schema, Principle 12 explicitly governs human interaction: *Reflective notes carry the executive function.* When motivation fades, the system must step in to carry the cognitive weight. Here is how we build that into daily practice:</p>

      <h4>1. Lead with Emotional Truth</h4>
      <p>When starting a daily standup or periodic review, never force dry status reporting first. Allow space to name the friction, the fatigue, or the excitement. When you clear the emotional buffer, analytical clarity follows naturally.</p>

      <h4>2. Give the Win Space</h4>
      <p>High-output builders constantly move the goalpost, forgetting what they accomplished yesterday. Commonplace daily logs and periodic retro notes intentionally highlight completed milestones before identifying deficits.</p>

      <h4>3. Collapse to a Single Non-Negotiable</h4>
      <p>When cognitive load peaks and executive dysfunction threatens paralysis, a 15-item to-do list is a roadblock. Our protocol collapses the day's execution down to **One Thing**—a single, high-leverage action that defines a successful day.</p>

      <h4>4. Kill Ambiguity at the Capture Point</h4>
      <p>An inbox item titled <em>"Taxes"</em> or <em>"Call Dr."</em> is cognitive poison. It requires executive function just to decipher what the next action is. We enforce **Verb-First Titling** at capture: <em>"Call Dr. Espinosa at 512-555-0199 to request prescription refill."</em> When your future self sees it, execution requires zero friction.</p>

      <h3>A Second Brain That Forgives</h3>
      <p>The true measure of a knowledge system is not how it performs when you are operating at 100% focus. It is how gracefully it catches you when you are operating at 20%, and how effortlessly it guides you back into flow without guilt or friction.</p>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ARTICLES_DATA;
}
