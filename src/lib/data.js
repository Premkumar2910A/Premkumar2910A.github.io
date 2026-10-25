// Resume facts plus the owner's confirmed role, stack and project updates.
// The original extracted resume summary remains in resume-summary.json for reference.
export const PROFILE = {
  name: "Premkumar A",
  firstName: "Premkumar",
  initials: "PA",
  role: "Full Stack Engineer",
  location: "Chennai, Tamil Nadu, India",
  email: "premkumarsoftwaredeveloper@gmail.com",
  phone: "+91 8825624586",
  phoneHref: "tel:+918825624586",
  github: "https://github.com/Premkumar2910A",
  linkedin: "https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/",
  resume: "/Premkumar_A_Resume.pdf",
  summary: "Founding Engineer and Full Stack Engineer with 2+ years at AlphaTales, co-building an AI-powered planning product with the team. My work covers Python APIs, LangGraph and Azure OpenAI workflows, React interfaces, authentication, and integrations. I also help build and deploy Hermes-based product-manager, lead-generation, and Azure-health agents on a VPS. The current messaging stack uses Azure Service Bus and Socket.IO. My earlier data work used MongoDB and Beanie; I am gaining experience with PostgreSQL and SQLAlchemy after the product migration.",
  intro:
    "Hi, I'm Premkumar. I'm a full stack engineer. I build AI-powered SaaS products.",
};
export const NAV = [
  ["work", "Work"],
  ["experience", "Experience"],
  ["skills", "Stack"],
  ["about", "About"],
  ["contact", "Contact"],
];
export const COLLEGE_PROJECTS = [
  {title: "Focus", detail: "My college project used OCR to turn text in images into speech, exploring a practical accessibility use case."},
  {title: "Sign-language recognition", detail: "I also worked on a sign-language recognition project during college."},
];
export const SKILL_GROUPS = [
  {
    name: "Languages",
    skills: ["Python 3.12", "TypeScript", "JavaScript", "Dart"],
  },
  {
    name: "Backend",
    skills: [
      "FastAPI",
      "REST APIs",
      "Pydantic v2",
      "Beanie ODM",
      "Microservices Architecture",
    ],
  },
  {
    name: "AI & Workflow",
    skills: [
      "LangGraph",
      "LangChain",
      "Azure OpenAI",
      "Tool Calling",
      "Structured Validation",
      "Prompt Engineering",
      "MCP Integration",
    ],
  },
  {
    name: "Agent Tools",
    skills: ["Hermes", "Agent Orchestration", "Apollo", "HubSpot"],
  },
  {
    name: "Frontend",
    skills: [
      "Next.js 16",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    name: "Data & Messaging",
    skills: [
      "MongoDB",
      "Azure Service Bus",
      "Socket.IO",
      "JSON Workflow Contracts",
    ],
  },
  {
    name: "DevOps & Security",
    skills: [
      "Docker",
      "GitHub Workflows",
      "Azure DevOps",
      "WorkOS",
      "OIDC",
      "OAuth",
      "SSO",
      "Azure CLI",
      "Linux",
      "VPS Deployment",
    ],
  },
  {
    name: "Mobile & CV",
    skills: ["Flutter", "OCR", "Tesseract"],
  },
];
export const PROJECTS = [
  {
    id: "alphatales",
    title: "AlphaTales",
    kind: "AI project planning SaaS",
    description:
      "Worked with the AlphaTales team on APIs, AI workflows, and web interfaces for researching ideas and preparing development plans.",
    features: [
      "Event messaging and real-time progress feedback",
      "Dev Pack and MCP-oriented context flows",
      "WorkOS authentication and SSO-ready login flows",
      "Commercial repositories are private",
    ],
    tech: [
      "FastAPI",
      "PostgreSQL",
      "LangGraph",
      "Azure OpenAI",
      "Azure Service Bus",
      "Socket.IO",
      "WorkOS",
      "Next.js 16",
      "MCP",
    ],
    link: "https://alphatales.io",
    linkLabel: "Explore product",
  },
  {
    id: "agents",
    title: "AlphaTales Agents",
    kind: "Team agent workflows · VPS deployment",
    description: "Helped build and deploy specialist agents for product management, lead generation, and Azure health monitoring at AlphaTales.",
    features: ["Product-manager orchestration and coding handoffs", "Apollo research and HubSpot lead workflows", "Azure health checks and Teams alerts", "VPS runtime configuration and deployment"],
    tech: ["Python", "Hermes", "MCP", "Apollo", "HubSpot", "Azure CLI", "Linux", "Microsoft Teams"],
  },
  {
    id: "alphaoptimizer",
    title: "AlphaOptimizer",
    kind: "Public developer-tool contribution",
    description: "Proposed the idea for AlphaOptimizer and helped build, debug, and improve this AlphaTales tool for large Codex outputs.",
    features: ["Restricted NTFS folder permissions", "Storage and metrics protection", "Focused permission tests", "Public merged contribution"],
    tech: ["TypeScript", "Node.js", "Vitest", "Windows"],
    link: "https://github.com/alpha-tales/alphaoptimizer",
    linkLabel: "View project",
  },
  {
    id: "refacta",
    title: "Refacta",
    kind: "AI-assisted code refactoring agent",
    description:
      "Built Refacta, an agent-driven refactoring tool, including SDK integration, shared models, and multi-file editing.",
    features: [
      "Dry-run support and backups",
      "Compliance reports and build validation",
      "Structured Markdown/JSON outputs",
      "CLI/TUI-oriented developer workflow",
    ],
    tech: [
      "Python",
      "Claude Agent SDK",
      "Textual",
      "Rich",
      "Typer",
      "PowerShell",
    ],
    link: "https://github.com/alpha-tales/refacta",
    linkLabel: "View on GitHub",
  },
  {
    id: "infit",
    title: "InFit",
    kind: "Flutter nutrition-app prototype",
    description: "A mobile prototype exploring meal logging for Indian foods, with dashboard and meal-review screens. Still in development.",
    features: ["Calorie and macro dashboard with sample data", "Meal-review and portion controls", "Profile and insights screens", "Camera, AI recognition, voice, and persistence unfinished"],
    tech: ["Flutter", "Dart", "GoRouter"],
    link: "https://github.com/Premkumar2910A/infit",
    linkLabel: "View prototype source",
  },
];
export const CERTIFICATIONS = [
  // Titles and issuers checked against LinkedIn entries and attached certificates.
  { title: "Generative AI for Everyone", issuer: "DeepLearning.AI", date: "Aug 2024", href: "https://www.coursera.org/account/accomplishments/records/E6M5OR7ZECN8" },
  { title: "Cloud Practitioner training (AWS)", issuer: "ICT Academy · Certificate of Proficiency", date: "Feb 2023", href: "https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/overlay/Certifications/1919311901/treasury/" },
  { title: "Introduction to Internet of Things", issuer: "NPTEL · IIT Kharagpur", date: "Jan–Apr 2023", href: "https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/overlay/Certifications/1918832647/treasury/" },
  { title: "Programming using Java", issuer: "Infosys Springboard", date: "Jul 2022", href: "https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/overlay/Certifications/1922917630/treasury/" },
  { title: "Data Structures and Algorithms using Java", issuer: "Infosys Springboard", date: "Jul 2022", href: "https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/overlay/Certifications/1922749529/treasury/" },
];
export const TIMELINE = [
  {
    date: "2020 — 2024",
    title: "BE, Computer Science Engineering",
    place: "Hindusthan College of Engineering and Technology, Coimbatore",
    detail: "CGPA: 8.95 / 10",
    type: "Education",
  },
  {
    date: "Jan — Mar 2023",
    title: "Python Developer Intern",
    place: "LS Technologies · Coimbatore",
    detail:
      "Developed FastAPI services backed by MongoDB with structured API design, validation, and reusable backend patterns.",
    type: "Experience",
  },
  {
    date: "Aug 2023 — Jan 2024",
    title: "Software Developer Intern",
    place: "Nitroware Technologies · Coimbatore",
    detail:
      "Built AI chatbot workflows using LangGraph and LangChain with Human-in-the-Loop validation for safer response review. Automated project setup and onboarding tasks, reducing onboarding time by approximately 25% through repeatable workflow automation.",
    type: "Experience",
  },
  {
    date: "Jul 2024 — Present",
    title: "Founding Engineer / Full Stack Engineer",
    place: "AlphaTales · Brisbane, Australia (Remote)",
    detail:
      "Co-built AlphaTales from the ground up, an AI-native project planning engine for teams and AI agents that converts raw ideas into validated plans, deep research, PRDs, architecture recommendations, tasks, and agent-ready Dev Packs.",
    type: "Experience",
  },
];
// These are résumé-backed work highlights, not invented awards or coding ranks.
export const HIGHLIGHTS = [
  {
    value: 50,
    suffix: "+",
    label: "REST API endpoints",
    detail: "Python, FastAPI, MongoDB, Beanie ODM, and Pydantic v2",
    symbol: "API",
  },
  {
    value: 25,
    suffix: "%",
    prefix: "≈",
    label: "Less onboarding time",
    detail: "Repeatable workflow automation · Nitroware Technologies",
    symbol: "↗",
  },
  {
    value: 8.95,
    suffix: "/10",
    label: "Computer Science CGPA",
    detail: "Hindusthan College of Engineering and Technology",
    symbol: "BE",
  },
];
export const HERO = {
  image: "/hero/poster.webp",
  video: "/hero/hero.mp4",
  webm: "/hero/hero.webm",
};
export const UI = {
  coreSkills: ["Python 3.12", "FastAPI", "React", "LangGraph", "Azure OpenAI", "Azure Service Bus", "MCP Integration", "Hermes"],
  skillsIntro: "My main work is Python APIs, React interfaces, and AI workflows. Main tools are marked below; the full stack also includes internship and prototype experience.",
  heroProof: [
    ["2+ years", "At AlphaTales"],
    ["50+", "REST API endpoints"],
    ["4+", "Production AI workflows"],
  ],
  aboutParagraphs: [
    "I’m based in Chennai and work remotely with the AlphaTales team in Brisbane. As a founding engineer, I work across the product—from Python services and AI workflows to the screens people use.",
    "I graduated in Computer Science Engineering in 2024 with a CGPA of 8.95/10. My earlier internships at LS Technologies and Nitroware Technologies covered backend services, AI chatbots, and workflow automation.",
  ],
  aboutLine: "I build production AI agents and the full‑stack products around them: Python APIs, LangGraph workflows, and React interfaces. Founding engineer at AlphaTales.",
  aboutQuote:
    "My work spans backend services, AI workflows, and web interfaces.",
  currentSummary:
    "I joined AlphaTales in July 2024 and co-built the product with the team. I work across the flow from an idea being submitted to a plan being reviewed and exported.",
  currentContributions: [
    [
      "APIs and data",
      "Built FastAPI services with request validation and shared data models. My earlier database work used MongoDB and Beanie; I’m now gaining experience with PostgreSQL and SQLAlchemy following the product’s migration.",
    ],
    [
      "AI and live progress",
      "Implemented workflows with LangGraph and Azure OpenAI, including structured outputs and tool calls. The current stack uses Azure Service Bus for background messaging and Socket.IO for live progress.",
    ],
    [
      "Frontend and integrations",
      "Built React screens for reviewing and exporting plans. Worked on WorkOS login, OAuth token refresh, retries, and integrations with coding assistants.",
    ],
  ],
  skillContext: {
    TypeScript: "Used in AlphaOptimizer and the AlphaTales frontend. My public storage-permission contribution includes TypeScript implementation and tests.",
    JavaScript: "Used to build this portfolio’s React components, navigation, video controls, and voice-service integration.",
    Dart: "Used in InFit’s Flutter prototype, including the dashboard and meal-review screens.",
    FastAPI: "Built Python API services for AlphaTales and earlier internship work, with validation and shared data models.",
    "REST APIs": "My résumé records 50+ FastAPI endpoints at AlphaTales, covering product workflows and integrations.",
    "Pydantic v2": "Used to validate API requests and maintain shared data models in the AlphaTales backend.",
    "Microservices Architecture": "Worked across AlphaTales backend services, integrations, and background messaging workflows.",
    LangGraph: "Implemented AlphaTales AI planning workflows with structured outputs, tool calls, and live progress updates.",
    LangChain: "Part of my AI chatbot and workflow experience, including earlier internship work.",
    "Azure OpenAI": "Used in AlphaTales AI workflows to generate planning content with structured outputs and tool calls.",
    "Tool Calling": "Worked on AI workflows and coding-agent integrations that use tools to carry out specific tasks.",
    "Structured Validation": "Worked on request validation and keeping feature details consistent between AI outputs, APIs, review screens, and exports.",
    "Prompt Engineering": "Worked on structured planning prompts and agent instructions for task handoffs and reviewed coding work.",
    "Next.js 16": "Part of the current AlphaTales frontend stack, where I work on React interfaces for reviewing and exporting plans.",
    React: "Used for AlphaTales review interfaces and this portfolio’s interactive components.",
    "Tailwind CSS": "Part of my frontend stack at AlphaTales. This portfolio uses custom CSS for its layout and components.",
    "shadcn/ui": "Included in my AlphaTales frontend stack for building application interfaces.",
    "Framer Motion": "Used in this portfolio for gentle project-card and agent-contribution motion, with reduced-motion support.",
    "Azure Service Bus": "The current AlphaTales messaging stack uses Service Bus. My Azure Health agent work also includes checking its health.",
    "Socket.IO": "Used for live progress updates between AlphaTales background workflows and the web interface.",
    "JSON Workflow Contracts": "Worked on structured planning data that moves between AI generation, storage, review, and export.",
    Docker: "Part of the deployment stack listed in my résumé. My newer agent deployment work also includes a VPS runtime.",
    "GitHub Workflows": "Used for the portfolio’s build and GitHub Pages deployment checks; also listed in my development stack.",
    "Azure DevOps": "Listed in my résumé’s development and deployment stack. My recent agent work uses a VPS runtime and Azure monitoring.",
    WorkOS: "Worked on AlphaTales login and authentication flows using WorkOS.",
    OIDC: "Part of the authentication stack used in my AlphaTales work.",
    OAuth: "Worked on refreshing expired OAuth tokens and handling retries in agent integrations.",
    SSO: "Part of the authentication stack listed in my résumé, alongside WorkOS and OIDC.",
    Flutter: "Used to build InFit’s dashboard, profile, insights, and meal-review prototype. Camera and AI recognition are unfinished.",
    "Python 3.12": "Used for FastAPI services, Refacta, and the Azure Health agent’s monitoring scripts.",
    Hermes: "Worked on installable agent profiles, Product Manager task handoffs, and the VPS runtime setup.",
    "Agent Orchestration": "Strengthened the Product Manager agent’s coding handoffs, specialist subagent routing, evidence review, and PR-repair loop.",
    Apollo: "Used by the team’s lead-generation workflow to research target accounts before HubSpot review and CRM writes.",
    HubSpot: "Fixed lead writes to use CRM-supported properties and added regression tests for those writes.",
    "Azure CLI": "Improved read-only queries for the Azure Health agent’s App Service checks.",
    Linux: "Worked on the VPS setup that hosts the team’s agent profiles and scheduled monitoring.",
    "VPS Deployment": "Helped deploy the agent workflows and improve runtime configuration, secret loading, and scheduled health checks.",
    "MCP Integration": "Worked with MCP integrations in product and agent workflows, including CRM tooling.",
    MongoDB: "Used in my LS Technologies internship and earlier AlphaTales backend work. AlphaTales has since migrated to PostgreSQL.",
    "Beanie ODM": "Used with MongoDB in earlier AlphaTales backend work, before the recent database migration.",
    OCR: "Used in Focus, my college project for turning text in images into speech.",
    Tesseract: "Used for text recognition in Focus, my college project.",
  },
};

// Project maturity and public contribution evidence checked against GitHub, October 2026.
export const PROJECT_CASES = {
  agents: {
    status: "Company project · Hosted on a VPS",
    role: "Contributor · Agent workflows & deployment",
    problem: "Give product tasks, lead research, and service monitoring their own agent workflows, with clear handoffs and human review where needed.",
    contribution: "I helped build and deploy these workflows with the AlphaTales team. My contributions include the Product Manager agent profile and task handoffs, the Azure Health agent, HubSpot lead-write fixes, and VPS runtime configuration.",
    decisionLabel: "Why separate agents",
    decision: "Each profile has a specific job, its own configuration, and clear limits. The Product Manager agent coordinates coding work; lead generation handles account research; the health monitor runs service checks.",
    result: "The workflows are hosted on a VPS. The repository includes installable profiles, deployment and verification scripts, and tests for agent contracts, CRM writes, and health monitoring.",
    limit: "Built with the AlphaTales team. Company source code and operational details are private.",
    agents: [
      {
        title: "Product Manager",
        purpose: "Routes product tasks to coding workers, reviews evidence, and coordinates approval and PR-repair handoffs.",
        contribution: "Published the installable profile, added specialist subagents, and strengthened the task and PR-repair loop.",
        output: "Coding handoffs · Review decisions",
      },
      {
        title: "Lead Generation",
        purpose: "Researches target accounts with Apollo and writes qualified company information to HubSpot. Outreach has separate approval rules.",
        contribution: "Fixed CRM writes to use properties supported by the HubSpot schema, with regression tests.",
        output: "Target accounts · CRM records",
      },
      {
        title: "Azure Health",
        purpose: "Checks service health, App Service state, and Service Bus. Sends confirmed problems and recoveries to Microsoft Teams.",
        contribution: "Added the monitoring profile and improved read-only checks, scheduling, and the dedicated Teams alert channel.",
        output: "Health checks · Teams alerts",
      },
    ],
    deployment: "Helped deploy the workflows on a VPS and improved runtime configuration, environment-secret loading, and scheduled health checks.",
  },
  alphaoptimizer: {
    status: "AlphaTales tool · Public source",
    role: "Idea originator · Co-builder",
    problem: "AlphaOptimizer helps Codex handle large command and tool outputs. It keeps useful lines visible and the original available for a limited time. Jev ranks relevant text when its API key is configured.",
    contribution: "The idea was mine. I helped build the tool, find bugs, and improve how it runs. One public contribution added Windows storage permissions and focused tests to protect saved outputs and metrics.",
    decision: "Use Windows folder permissions and stop storage when they cannot be applied, while keeping the Unix checks.",
    result: "The tool can reduce large outputs while keeping the original available. My linked Windows storage change passed 30 focused tests; seven existing platform failures remained outside that change.",
    limit: "Built with AlphaTales. The linked commit documents one specific contribution, not the full scope of my work. Output reduction is not guaranteed billing savings.",
    evidence: "https://github.com/alpha-tales/alphaoptimizer/commit/30f3ee2",
    evidenceLabel: "Inspect my contribution",
  },
  infit: {
    visual: { src: "/projects/infit-ux-color.webp", alt: "Illustrative InFit meal dashboard and meal review panels with sample food entries and portion controls.", label: "UX concept · In development", caption: "" },
    status: "Ongoing product · Interface prototype",
    role: "Builder · Personal product",
    problem: "Explore meal logging for Indian foods through a mobile dashboard and meal-review flow.",
    contribution: "I am building InFit as my own product. The current Flutter prototype includes the dashboard, meal review, profile, and insights, with reusable calorie and macro cards.",
    decision: "Build the interface and navigation with sample food data before connecting camera capture and AI recognition.",
    result: "The source includes dashboard and meal-review screens. Food detection is simulated; camera capture, voice, and database saving remain unfinished.",
    limit: "Not a released nutrition service. Prototype data does not validate nutritional accuracy or AI recognition.",
  },
  alphatales: {
    status: "Work at AlphaTales",
    evidence: "https://alphatales.io/product/how-it-works/",
    evidenceLabel: "Explore the public workflow",
    role: "Founding Engineer · Full Stack",
    problem:
      "AlphaTales helps teams research a product idea and turn it into requirements, architecture plans, and development tasks.",
    contribution:
      "I co-built AlphaTales end to end with the team. My work spans Python APIs, AI workflows, login, live progress updates, and React screens for reviewing and exporting plans.",
    decision:
      "Kept feature details in a shared format from AI generation through storage, review, and export, so the same information could move between those steps.",
    result:
      "Users can review generated plans and export requirements, architecture details, and tasks for developers and coding assistants.",
    limit:
      "Built with the AlphaTales team. This is a simplified workflow example; the company’s source code is private.",
    stories: [
      {
        title: "Keeping feature details consistent",
        text: "Worked on how feature behavior, edge cases, permissions, and verification details pass between the AI output, API, review screen, and exported files.",
      },
      {
        title: "Handling expired sessions and retries",
        text: "Worked on refreshing expired OAuth tokens and handling retries in agent integrations. Request identifiers account for the input, so repeated calls can be distinguished from changed requests.",
      },
    ],
  },
  refacta: {
    status: "Developer tool",
    role: "Builder · Developer tooling",
    problem:
      "Refacta is an agent-driven tool for refactoring a selected file or folder through a CLI, console interface, or SDK.",
    contribution:
      "I built Refacta, including SDK integration, multi-file editing, shared-model extraction, and the scope-selection interface. The linked commit shows specific fixes within that work.",
    decision:
      "Route the request using short agent descriptions, then load the selected agents and skills. Keep the SDK’s edit model independent of the console interface.",
    result:
      "The linked commit implements two-step agent routing and explicitly instructs folder scope to process every matching file. It also fixes agent loading and the shared edit model.",
    limit:
      "Public source project. The code excerpt links to one of my implementation commits.",
    evidence: "https://github.com/alpha-tales/refacta/commit/3899658d",
    evidenceLabel: "Inspect my contribution",
  },
};
export const CAPABILITIES = [
  {
    title: "Full-stack product development",
    text: "Co-building AlphaTales with the team, from web screens and authentication to Python APIs and live progress updates.",
    tech: ["Python", "FastAPI", "Pydantic"],
    project: "alphatales",
  },
  {
    title: "AI workflows",
    text: "Building AI workflows at AlphaTales, after earlier chatbot work during my Nitroware internship.",
    tech: ["LangGraph", "Azure OpenAI", "Azure Service Bus"],
    project: "alphatales",
  },
  {
    title: "Developer tools and prototypes",
    text: "Built Refacta, helped build AlphaOptimizer, and am developing InFit’s mobile interface.",
    tech: ["React", "Next.js", "Socket.IO"],
    project: "refacta",
  },
];
export const WORKFLOW_STEPS = [
  ["Idea", "Describe the product idea and the problem it should solve."],
  ["Research", "Review the idea and gather research to inform the plan."],
  [
    "Plan",
    "Generate requirements, architecture recommendations, and development tasks.",
  ],
  [
    "Export",
    "Download the plans and implementation details for developers and coding assistants. AlphaTales calls this a Dev Pack.",
  ],
];

export const CASE_PRESENTATION = {
  agents: {
    category: "Team agent workflows · VPS hosted",
    // Verified figures only: résumé entries, case data, or the linked public commit.
    metrics: ["3 specialist agents","Hosted on a VPS","Human review built in"],
    outcome: "Hosted workflows for coding handoffs, CRM writes, and health alerts.",
    summary: "Specialist agents for product work, lead research, and service health.",
    focus: "Agent profiles, task handoffs, Azure monitoring, CRM fixes, and deployment",
    evidence: "Checked against the team repository and my commits. Company source is private.",
  },
  alphatales: {
    category: "Built with the team",
    // Verified figures only: résumé entries, case data, or the linked public commit.
    metrics: ["50+ REST endpoints","4+ production AI workflows","Live product"],
    outcome: "Review and export requirements, architecture plans, and tasks.",
    summary: "From a product idea to a development plan.",
    focus: "Co-built end to end; web interfaces, Python APIs, and AI workflows",
    steps: WORKFLOW_STEPS,
    changes: ["Co-built the product end to end with the team", "Python APIs, React interfaces, and AI workflows", "Authentication, Azure Service Bus messaging, and live progress updates"],
    evidence: "Public product; team source code is private.",
  },
  alphaoptimizer: {
    category: "Idea & co-building",
    // Verified figures only: résumé entries, case data, or the linked public commit.
    metrics: ["My idea","30 focused tests passed","Public contribution"],
    outcome: "Retrieve the original output after receiving a shorter result.",
    summary: "Shorter tool outputs, with the original kept available.",
    focus: "Proposed the idea; helped build, debug, and improve it",
    steps: [
      ["Check the output", "Small, unsupported, or sensitive-looking results pass through unchanged."],
      ["Select useful lines", "Eligible text is split into chunks. Diagnostics are preserved; Jev ranks a bounded selection when its API key is configured."],
      ["Return a shorter result", "The assistant receives selected lines and an artifact ID. The supported original is stored locally."],
      ["Inspect the original", "The artifact ID gives access to more detail until the stored output expires or is evicted."],
    ],
    changes: ["Proposed the idea and helped build the tool with the team", "Found bugs and worked on more reliable operation", "Added restricted Windows folder permissions and focused tests"],
    evidence: "Workflow checked against the project README. The linked commit verifies my Windows storage changes.",
  },
  refacta: {
    category: "Developer tool I built",
    // Verified figures only: résumé entries, case data, or the linked public commit.
    metrics: ["Built by me","CLI · console · SDK","Public source"],
    outcome: "Refactor a folder through the CLI, console, or SDK.",
    summary: "Agent-driven refactoring across a folder of files.",
    focus: "Built the tool, SDK integration, and multi-file editing",
    steps: [
      ["Choose the scope", "Select the target files or folder through the CLI or console interface."],
      ["Route the request", "Use short agent descriptions to select relevant agents and skills."],
      ["Load the right tools", "Load Refacta’s own agents, with Read, Edit, and Glob tools for the selected scope."],
      ["Process the folder", "Explicitly instruct the agent to find and process every matching file, rather than stop after the first."],
    ],
    changes: ["Corrected the SDK agent-loading path", "Fixed folder scope to process all files", "Moved EditOperation out of the console module"],
    evidence: "The public commit shows my SDK, model, and console changes.",
  },
  infit: {
    category: "Ongoing personal product",
    // Verified figures only: résumé entries, case data, or the linked public commit.
    metrics: ["Flutter prototype","In progress"],
    outcome: "Meal-review screens using simulated data; Flutter prototype.",
    summary: "A Flutter interface for reviewing meals and nutrition.",
    focus: "Building the product; Flutter screens and meal-review flow so far",
    steps: [
      ["View the dashboard", "Calorie and macro cards display sample meal data."],
      ["Open meal review", "A placeholder camera action navigates to the food-confirmation screen."],
      ["Adjust the meal", "Meal-review screens explore food and portion controls with simulated data."],
      ["Connect real inputs next", "Camera capture, AI recognition, voice, and database saving are unfinished."],
    ],
    changes: ["Dashboard, profile, and insights screens", "Meal-review and portion controls", "Reusable cards and GoRouter navigation"],
    evidence: "Public prototype source. This is an interface flow, not working food recognition.",
  },
};
