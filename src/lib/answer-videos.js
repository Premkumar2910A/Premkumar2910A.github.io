// Only real, reviewed recordings may have a src. Empty entries never synthesize speech.
const answer = (label, script, words, target, src = '') => ({label, script, words, target, src});
export const ANSWER_VIDEOS = {
  intro: answer('About Premkumar', "Hi, I'm Premkumar. I'm a full stack engineer. I build AI-powered SaaS products.", 'who yourself introduce introduction about premkumar overview bio', '#about', '/hero/hero.mp4'),
  work: answer('My work', 'I co-build AlphaTales with the team. My work covers web interfaces, APIs, AI workflows, authentication, and integrations.', 'current job role responsibilities founding engineer work employer career', '#experience', '/hero/answers/work.mp4'),
  alphatales: answer('AlphaTales', 'AlphaTales helps teams research product ideas and turn them into requirements, architecture plans, development tasks, and exported plans.', 'alphatales alpha tales product saas planning', '#project-alphatales'),
  contribution: answer('My contribution', 'I worked on Python APIs, AI workflows, login, live progress updates, and React screens for reviewing and exporting plans.', 'personally contribution contributed implemented ownership parts built delivered', '#project-alphatales'),
  backend: answer('Backend experience', 'I built over fifty FastAPI endpoints at AlphaTales, first on MongoDB and Beanie. I am now learning PostgreSQL and SQLAlchemy.', 'backend back end python fastapi api apis endpoints database mongodb beanie pydantic postgres postgresql sqlalchemy migration', '#experience'),
  ai: answer('AI integration', 'I implemented production AI workflows using LangGraph and Azure OpenAI, with tool calling, structured validation, and live progress updates.', 'ai llm artificial intelligence langgraph langchain azure openai orchestration automation', '#project-alphatales'),
  frontend: answer('Frontend experience', 'I worked on React screens for reviewing plans, following progress, and exporting results. My frontend stack includes Next.js and TypeScript.', 'frontend front end interface react nextjs next typescript javascript ui screens', '#skills'),
  realtime: answer('Live progress', 'AlphaTales uses Azure Service Bus for background messaging. I work on that backend and the live progress updates in the interface.', 'realtime real time live progress events azure service bus dapr rabbitmq socket messaging queue background', '#project-alphatales'),
  security: answer('Authentication', 'I worked on WorkOS authentication and agent integrations, including refreshing expired OAuth tokens and handling retries.', 'authentication security auth login oauth oidc workos sso token tokens retries sessions', '#project-alphatales'),
  decisions: answer('Technical example', 'I kept feature details in a shared format from AI generation through storage, review, and export, so the information stayed consistent.', 'challenge difficult problem decision tradeoff why consistency shared format', '#project-alphatales'),
  projects: answer('Projects', 'My main product work is AlphaTales. My portfolio also shows public contributions to AlphaOptimizer and Refacta, and an InFit mobile prototype.', 'project projects portfolio showcase strongest best examples', '#work', '/hero/answers/projects.mp4'),
  alphaoptimizer: answer('AlphaOptimizer', 'AlphaOptimizer was my idea, built with the AlphaTales team. My public contribution added Windows storage permissions and focused tests.', 'alphaoptimizer alpha optimizer windows ntfs permissions storage tests', '#project-alphaoptimizer'),
  refacta: answer('Refacta', 'I built Refacta, an agent-driven refactoring tool, including its SDK integration, multi-file editing, and shared models.', 'refacta refactor refactoring sdk code public github open source', '#project-refacta'),
  infit: answer('InFit prototype', 'InFit is a Flutter nutrition-app prototype with dashboard and meal-review screens. Camera capture, AI food recognition, and voice support are unfinished.', 'infit in fit flutter dart nutrition mobile food calorie prototype', '#project-infit'),
  experience: answer('Earlier experience', 'Before AlphaTales, I completed developer internships at LS Technologies and Nitroware Technologies, working on backend services and AI chatbots.', 'previous earlier experience internship internships intern before history', '#journey', '/hero/answers/experience.mp4'),
  ls: answer('LS Technologies', 'At LS Technologies, I worked on FastAPI services backed by MongoDB, with request validation and reusable backend patterns.', 'ls technologies first internship', '#journey'),
  nitroware: answer('Nitroware Technologies', 'At Nitroware Technologies, I worked on AI chatbot workflows using LangGraph and LangChain, with human review and onboarding automation.', 'nitroware second internship chatbot onboarding', '#journey'),
  education: answer('Education', 'I graduated in Computer Science Engineering from Hindusthan College in Coimbatore in 2024, with a CGPA of eight point nine five.', 'education college hindusthan degree university study studied graduation graduated cgpa school', '#journey'),
  college: answer('College projects', 'During college, I built Focus, a project that turned text in images into speech. I also worked on sign-language recognition.', 'college project final year focus sign language recognition ocr speech', '#journey'),
  skills: answer('Skills', 'My work spans Python and FastAPI, React and Next.js, AI workflows with LangGraph, MongoDB, authentication, and MCP integrations.', 'skill skills stack technologies technology tools languages strengths', '#skills', '/hero/answers/skills.mp4'),
  certifications: answer('Courses and credentials', 'My courses include Generative AI for Everyone, NPTEL Internet of Things, Infosys Java, and an ICT Academy Cloud Practitioner certificate.', 'certification certifications certificates courses certified learning aws infosys nptel', '#certifications'),
  contact: answer('Contact', 'My email, LinkedIn, GitHub, and résumé are linked in this portfolio. You can find them in the contact section.', 'contact email phone reach linkedin resume cv hire hiring location chennai', '#contact'),
  unknown: answer('Ask Premkumar directly', 'That detail isn’t in my portfolio. Please contact Premkumar directly for an accurate answer.', '', '#contact'),
  unrelated: answer('Portfolio topics', 'I’m Premkumar’s portfolio avatar. I can help with his work, projects, skills, and education. Which would you like to know about?', '', '#hero', '/hero/answers/unrelated.mp4'),
  clarify: answer('Choose a topic', 'I couldn’t match that to a specific answer. Please try again, or choose one of the topics.', '', '#hero'),
};
export const MAIN_QUESTIONS = [
  {label:'My work',topic:'work',question:'What is your current role?'},
  {label:'Projects',topic:'projects',question:'Which projects are in your portfolio?'},
  {label:'Skills',topic:'skills',question:'Which technologies do you work with?'},
  {label:'Background',topic:'experience',question:'What did you do before AlphaTales?'},
];
export function replyForTopics(ids) {
  const selected = [...new Set(ids)].filter(id => Object.hasOwn(ANSWER_VIDEOS,id)).slice(0,2);
  if (!selected.length) selected.push('clarify');
  return {text:selected.map(id=>ANSWER_VIDEOS[id].script).join(' '),topic:selected[0],topics:selected,
    actions:selected.filter((id,i)=>selected.findIndex(other=>ANSWER_VIDEOS[other].target===ANSWER_VIDEOS[id].target)===i).map(id=>({label:ANSWER_VIDEOS[id].label,href:ANSWER_VIDEOS[id].target}))};
}
