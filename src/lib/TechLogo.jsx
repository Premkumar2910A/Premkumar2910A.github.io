import { Braces, Network, Database, ShieldCheck, ScanText, WandSparkles, Wrench, ListChecks, FileJson, KeyRound, Fingerprint, LogIn, Layers, Code2, Bot, Workflow, SearchCheck, ServerCog } from "lucide-react";
export const BRAND = {
  "Python 3.12": "python", Python: "python", TypeScript: "typescript",
  JavaScript: "javascript", React: "react", FastAPI: "fastapi",
  Docker: "docker", MongoDB: "mongodb", "Next.js 16": "nextjs",
  Flutter: "flutter", Dart: "dart", "Tailwind CSS": "tailwindcss",
  "Azure OpenAI": "azure", "Azure DevOps": "azure", "Azure Service Bus": "azure",
  "Azure CLI": "azure", Linux: "linux", HubSpot: "hubspot",
  "GitHub Workflows": "github", "Pydantic v2": "pydantic", Pydantic: "pydantic",
  LangGraph: "langgraph", LangChain: "langchain", "shadcn/ui": "shadcnui",
  "Framer Motion": "framer", "Socket.IO": "socketio", "MCP Integration": "mcp", MCP: "mcp",
};
export const CONCEPT = {
  "REST APIs": Braces, "Beanie ODM": Database,
  "Microservices Architecture": Network, "Tool Calling": Wrench,
  "Structured Validation": ListChecks, "Prompt Engineering": WandSparkles,
  "JSON Workflow Contracts": FileJson, WorkOS: ShieldCheck,
  OIDC: Fingerprint, OAuth: KeyRound, SSO: LogIn,
  OCR: ScanText, Tesseract: ScanText, Windows: Layers,
  Hermes: Bot, "Agent Orchestration": Workflow, Apollo: SearchCheck, "VPS Deployment": ServerCog,
};
export const isBrand = name => Boolean(BRAND[name]);
export default function TechLogo({ name, className = "" }) {
  if (isBrand(name)) return <img className={`tech-logo ${className}`} src={`/logos/${BRAND[name]}.svg`} alt={`${name} logo`} width="150" height="150" loading="lazy"/>;
  const Icon = CONCEPT[name] || Code2;
  return <span className={`concept-logo ${className}`} role="img" aria-label={`${name} symbol`}><Icon size={150} strokeWidth={1.25} aria-hidden="true"/></span>;
}
