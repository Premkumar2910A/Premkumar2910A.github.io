import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Check,
  ClipboardList,
  Code2,
  Copy,
  Database,
  Dumbbell,
  ExternalLink,
  GitBranch,
  Mail,
  Menu,
  Network,
  Phone,
  Route,
  ScanEye,
  ServerCog,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.86 10.86 0 0 1 12 6.12c.97 0 1.95.13 2.87.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.12c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const profile = {
  name: 'Premkumar A',
  initials: 'PA',
  title: 'Full Stack Engineer',
  location: 'Chennai, India',
  availability: 'Open to local, remote, and international opportunities',
  email: 'premkumarsoftwaredeveloper@gmail.com',
  phone: '+91 8825624586',
  github: 'https://github.com/Premkumar2910A',
  linkedin: 'https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/',
  product: 'https://alphatales.io',
  app: 'https://app.alphatales.io',
  resume: '/Premkumar_A_Resume.pdf',
};

const proofLinks = {
  generativeAi:
    'https://www.linkedin.com/feed/update/urn:li:activity:7226101671309754368/',
  infosysOne:
    'https://www.linkedin.com/feed/update/urn:li:activity:6957760021262651393/',
  infosysTwo:
    'https://www.linkedin.com/feed/update/urn:li:activity:6957758983264706561/',
};

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'proof', label: 'Proof' },
  { id: 'contact', label: 'Contact' },
];

const metrics = [
  { value: '50+', label: 'REST APIs shipped' },
  { value: '4+', label: 'LangGraph workflows' },
  { value: '2+', label: 'Years building products' },
  { value: '8.95', label: 'CSE CGPA' },
];

const skills = [
  {
    title: 'Backend Engineering',
    icon: ServerCog,
    items: ['Python 3.12', 'FastAPI', 'REST APIs', 'Pydantic v2', 'Microservices'],
  },
  {
    title: 'AI Workflows',
    icon: Workflow,
    items: ['LangGraph', 'LangChain', 'Azure OpenAI', 'Tool Calling', 'Structured Validation'],
  },
  {
    title: 'Frontend',
    icon: Code2,
    items: ['Next.js 16', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
  },
  {
    title: 'Data & Messaging',
    icon: Database,
    items: ['MongoDB', 'Beanie ODM', 'Dapr Pub/Sub', 'RabbitMQ', 'Socket.IO'],
  },
  {
    title: 'DevOps & Security',
    icon: ShieldCheck,
    items: ['Docker', 'GitHub Workflows', 'Azure DevOps', 'WorkOS', 'OIDC/OAuth'],
  },
];

const experiences = [
  {
    company: 'AlphaTales',
    role: 'Founding Engineer / Full Stack Engineer',
    period: 'Jul 2024 - Present',
    place: 'Brisbane, Australia (Remote)',
    initials: 'AT',
    summary:
      'Co-built AlphaTales, an AI-native project planning engine that turns raw ideas into validated plans, deep research, PRDs, architecture recommendations, tasks, and agent-ready Dev Packs.',
    impact: [
      'Designed and shipped 50+ REST API endpoints with Python 3.12, FastAPI, MongoDB, Beanie ODM, and Pydantic v2.',
      'Implemented 4+ LangGraph workflows for idea validation, discovery research, PRD generation, and architecture planning.',
      'Built event-driven AI execution with Dapr Pub/Sub over RabbitMQ for long-running AI jobs.',
      'Delivered real-time AI progress tracking with Socket.IO and secure auth with WorkOS, OIDC, Google, Microsoft, and Email OTP.',
      'Managed Docker-based deployments and CI/CD pipelines through GitHub and Azure DevOps.',
    ],
    stack: ['FastAPI', 'MongoDB', 'LangGraph', 'Azure OpenAI', 'Dapr', 'Next.js'],
  },
  {
    company: 'Nitroware Technologies',
    role: 'Software Developer Intern',
    period: 'Aug 2023 - Jan 2024',
    place: 'Coimbatore',
    initials: 'NT',
    summary:
      'Built AI chatbot workflows and onboarding automation for internal product flows, focusing on LangGraph/LangChain orchestration, human validation, and repeatable setup.',
    impact: [
      'Built LangGraph/LangChain chatbot workflows with Human-in-the-Loop validation.',
      'Reduced onboarding time by approximately 25% through workflow automation.',
      'Created review checkpoints so AI responses could be validated before completion.',
      'Worked across Python workflow code, prompt structure, and API-style integration patterns.',
    ],
    stack: ['LangGraph', 'LangChain', 'Python', 'Automation'],
  },
  {
    company: 'LS Technologies',
    role: 'Python Developer Intern',
    period: 'Jan 2023 - Mar 2023',
    place: 'Coimbatore',
    initials: 'LS',
    summary: 'Built FastAPI services and MongoDB-backed endpoints with structured request handling, validation, and reusable backend patterns.',
    impact: [
      'Created backend APIs with clean request/response contracts and database-backed flows.',
      'Implemented CRUD-style API flows with MongoDB persistence and organized service logic.',
      'Strengthened Python backend fundamentals across routing, validation, and error handling.',
    ],
    stack: ['Python', 'FastAPI', 'MongoDB'],
  },
];

const projects = [
  {
    title: 'AlphaTales',
    subtitle: 'AI Project Planning SaaS',
    badge: 'Private commercial product',
    icon: ClipboardList,
    accent: '#42d6c5',
    accentSoft: 'rgba(66, 214, 197, 0.14)',
    description:
      'Co-built from the ground up, AlphaTales is an AI-native project planning engine for teams and AI agents, turning ideas into validated plans, research, PRDs, architecture, tasks, and agent-ready Dev Packs.',
    metrics: ['50+ APIs', '4+ AI workflows', 'Agent-ready Dev Packs', 'MCP context'],
    stack: ['FastAPI', 'MongoDB', 'LangGraph', 'Azure OpenAI', 'Dapr', 'RabbitMQ', 'Next.js 16', 'MCP'],
    links: [
      { label: 'Product Site', href: profile.product },
      { label: 'App', href: profile.app },
    ],
    caseStudy: {
      problem:
        'AI coding tools often miss project context when requirements, architecture, tasks, and rules are scattered. AlphaTales needed a guided planning workflow that could turn raw ideas into structured, dev-ready context for teams and AI agents.',
      role:
        'I co-built AlphaTales from the ground up as part of the founding engineering team, working across backend APIs, AI workflow orchestration, real-time progress events, authentication, deployment support, and the broader product suite.',
      architecture:
        'Idea Intake -> AI Validation -> Deep Research -> Feature Specs -> PRD Generation -> Architecture Planning -> Task Breakdown -> Agent-Ready Dev Pack -> MCP / IDE Context',
      innovations: [
        'Long-running AI jobs handled through event-driven messaging instead of blocking request cycles.',
        'Structured LangGraph workflows for validation, deep research, PRD generation, architecture planning, and task breakdown.',
        'Socket.IO progress streaming so users see status updates while workflows run.',
        'WorkOS-based authentication with Email OTP, Google OAuth, and Microsoft OAuth.',
        'Contributed across the AlphaTales product suite: main app, marketing site, admin app, browser extension, and MCP server for AI-powered IDE context.',
      ],
      results: ['Production SaaS launched', '50+ backend endpoints shipped', '4+ AI workflow modules implemented', 'Agent-ready Dev Pack flow supported', 'Private organization repositories due to commercial ownership'],
    },
  },
  {
    title: 'Refacta',
    subtitle: 'AI refactoring agent',
    badge: 'Public GitHub project',
    icon: GitBranch,
    accent: '#70a7ff',
    accentSoft: 'rgba(112, 167, 255, 0.15)',
    description:
      'A rules-driven code refactoring system that uses a multi-agent architecture to scan, plan, refactor, validate, and report changes while preserving behavior.',
    metrics: ['Public repo', 'Multi-agent pipeline', 'Dry-run support', 'Build validation'],
    stack: ['Python', 'Claude Agent SDK', 'Textual', 'Rich', 'Typer', 'PowerShell'],
    links: [
      { label: 'GitHub', href: 'https://github.com/alpha-tales/refacta' },
    ],
    caseStudy: {
      problem:
        'Large codebases need refactoring discipline: clear rules, controlled execution, verification, and human-readable evidence of what changed.',
      role:
        'I shaped the agent flow around explicit rule files, dry-run safety, build validation, and readable reports so the tool feels trustworthy before it changes code.',
      architecture:
        'Project Scan -> Rule Interpretation -> Refactor Passes -> Compliance Check -> Build/Test Run -> Summary Report',
      innovations: [
        'Rule files in Markdown make refactoring behavior explicit and auditable.',
        'Specialized agents handle scanning, Python refactoring, Next.js refactoring, compliance, builds, and reporting.',
        'Interactive console supports guided operation with file context and progress feedback.',
        'Safety features include dry runs, backups, compliance reports, and build validation.',
      ],
      results: ['Public Python repository', 'Supports Python and TypeScript/Next.js refactoring', 'Structured JSON and Markdown reporting', 'Designed around behavior preservation'],
    },
  },
  {
    title: 'InFit',
    subtitle: 'AI nutrition tracker for India',
    badge: 'Public mobile project',
    icon: Dumbbell,
    accent: '#9be06a',
    accentSoft: 'rgba(155, 224, 106, 0.14)',
    description:
      'A Flutter-based nutrition tracking app concept with photo-based calorie logging, Tamil/English voice assistant direction, macro tracking, and a polished mobile-first design system.',
    metrics: ['Flutter MVP', 'Bilingual UX', 'Camera flow', 'Macro dashboard'],
    stack: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Camera', 'TTS/STT', 'Hive'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Premkumar2910A/infit' },
    ],
    caseStudy: {
      problem:
        'Most nutrition tools are not designed around Indian food habits, regional language comfort, and fast mobile-first logging.',
      role:
        'I built the public Flutter foundation around feature folders, navigation, reusable UI components, nutrition screens, and a roadmap for AI food recognition.',
      architecture:
        'Dashboard -> Camera Capture -> Food Confirmation -> Macro Tracking -> Insights -> Profile',
      innovations: [
        'Designed a warm India-focused visual system with light and AMOLED dark modes.',
        'Planned bilingual Tamil/English voice support through speech-to-text and text-to-speech packages.',
        'Structured the app with feature folders, reusable widgets, typed models, and GoRouter navigation.',
        'Built MVP screens for dashboard, camera placeholder, food confirmation, insights, and profile.',
      ],
      results: ['Public Flutter repository', 'Reusable design system documented', 'MVP UI foundation completed', 'Clear roadmap for AI food recognition and voice assistant'],
    },
  },
  {
    title: 'clawd',
    subtitle: 'Lead intelligence agent pipeline',
    badge: 'Public agent workflow',
    icon: Route,
    accent: '#f5bf5b',
    accentSoft: 'rgba(245, 191, 91, 0.14)',
    description:
      'A prompt-first multi-agent workflow for discovering lead signals, qualifying opportunities, storing audit-ready JSON, and handing off strong prospects to HubSpot.',
    metrics: ['5 agents', 'JSON audit trail', 'HubSpot handoff', 'Cron-ready design'],
    stack: ['Prompt Engineering', 'Multi-Agent Design', 'HubSpot', 'JSON', 'LinkedIn Research'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Premkumar2910A/clawd' },
    ],
    caseStudy: {
      problem:
        'Outbound lead research becomes hard to trust when evidence, scoring, and CRM sync are mixed together without clear ownership.',
      role:
        'I separated the workflow into focused agent responsibilities, documented prompt contracts, and kept CRM handoff behind qualification guardrails.',
      architecture:
        'LinkedIn Scout -> Content Scout -> Insight Store -> Lead Processor -> HubSpot Handoff',
      innovations: [
        'Separated collection agents from processing agents so scouts only gather evidence and processors decide.',
        'Defined fixed input/output contracts for each agent through readable prompt files.',
        'Used local JSON as the raw research source of truth before CRM promotion.',
        'Designed cron-friendly lead and content discovery paths with idempotent run expectations.',
      ],
      results: ['Public prompt-first repository', 'Clean agent ownership model', 'HubSpot sync guardrails documented', 'No automated outreach sending'],
    },
  },
  {
    title: 'Focus',
    subtitle: 'UG final-year OCR accessibility project',
    badge: 'Final-year academic project',
    icon: ScanEye,
    accent: '#f17f9a',
    accentSoft: 'rgba(241, 127, 154, 0.14)',
    description:
      'My undergraduate final-year project: a computer vision accessibility prototype that converts visual text into audio output for visually impaired users.',
    metrics: ['Final-year project', 'OCR pipeline', 'Audio output', 'Accessibility use case'],
    stack: ['Python', 'OCR', 'Tesseract'],
    links: [],
    caseStudy: {
      problem:
        'For my UG final-year project, I explored how text embedded in images and physical surroundings could be made more accessible through a lightweight reading assistant.',
      role:
        'I worked on the prototype as an academic project, focusing on a simple assistive flow: capture visual input, extract readable text, clean it, and return audio output quickly.',
      architecture: 'Image Capture -> Text Preprocessing -> Tesseract OCR -> Text Cleanup -> Audio Playback',
      innovations: [
        'Focused on a direct, accessible user journey instead of a heavy interface.',
        'Used OCR to bridge visual input with audio output.',
      ],
      results: ['Completed as UG final-year project', 'Built a working OCR-to-audio workflow', 'Demonstrated practical accessibility value'],
    },
  },
];

const proofItems = [
  {
    title: 'Education',
    icon: Award,
    lines: [
      { text: 'BE Computer Science Engineering' },
      { text: 'Hindusthan College of Engineering and Technology' },
      { text: '2020 - 2024 - CGPA 8.95' },
    ],
  },
  {
    title: 'Certifications',
    icon: Check,
    lines: [
      { text: 'AWS Cloud Practitioner Certified' },
      { text: 'Generative AI for Everyone - DeepLearning.AI', href: proofLinks.generativeAi },
      { text: 'NPTEL Internet of Things - IIT Madras' },
      { text: 'Infosys Springboard course certificates', href: proofLinks.infosysOne },
    ],
  },
  {
    title: 'Public GitHub',
    icon: GithubIcon,
    lines: [
      { text: 'Public organization repo: alpha-tales/refacta' },
      { text: 'Public personal repos: infit and clawd' },
      { text: 'Commercial AlphaTales repositories are private' },
      { text: 'Private product work summarized as case studies' },
    ],
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function TypingRole({ phrases }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const isComplete = letterCount === current.length;
    const isEmpty = letterCount === 0;
    const delay = isComplete && !deleting ? 1100 : deleting ? 36 : 72;

    const timeout = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
        return;
      }

      setLetterCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, letterCount, phraseIndex, phrases]);

  return (
    <strong className="typing-word">
      {phrases[phraseIndex].slice(0, letterCount)}
      <span aria-hidden="true">|</span>
    </strong>
  );
}

function App() {
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: 0 },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject || menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, menuOpen]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const rolePhrases = useMemo(
    () => ['AI SaaS Engineer', 'AI Workflow Engineer', 'FastAPI Backend Engineer', 'Founding Engineer'],
    [],
  );

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const nav = (
    <nav className="nav-links" aria-label="Primary navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'active' : ''}
          onClick={() => {
            setMenuOpen(false);
            scrollToSection(item.id);
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <header className="site-header">
        <button className="brand" onClick={() => scrollToSection('hero')} aria-label="Go to top">
          <span>{profile.initials}</span>
          <strong>Premkumar A</strong>
        </button>
        {nav}
        <div className="header-actions">
          <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
            <GithubIcon size={18} />
          </a>
          <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <LinkedinIcon size={18} />
          </a>
          <a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
        <button
          className="menu-button"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {nav}
          <div className="mobile-actions">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={16} /> LinkedIn
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>
      )}

      <main>
        <section id="hero" className="hero">
          <div className="hero-content reveal">
            <div className="availability">
              <span />
              {profile.availability}
            </div>
            <p className="hero-kicker">{profile.name}</p>
            <h1>{profile.title}</h1>
            <p className="hero-subtitle">
              Founding Engineer with 2+ years of experience shipping production-ready products across
              backend architecture, AI workflow orchestration, real-time systems, authentication, and
              deployment.
            </p>
            <div className="role-strip" aria-label="Core strengths">
              <span>I build as a</span>
              <TypingRole phrases={rolePhrases} />
            </div>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollToSection('projects')}>
                View Case Studies <ArrowRight size={18} />
              </button>
              <a className="secondary-action" href={`mailto:${profile.email}`}>
                <Mail size={18} /> Contact Me
              </a>
            </div>
            <div className="social-row">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon size={17} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon size={17} /> GitHub
              </a>
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="metric-grid">
            {metrics.map((metric) => (
              <div className="metric-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="content-section">
          <SectionHeading eyebrow="About" title="Engineer by ownership, product builder by instinct">
            I work across the full product surface: APIs, AI orchestration, real-time UX, authentication,
            CI/CD, and release workflows.
          </SectionHeading>
          <div className="about-grid">
            <article className="about-copy panel">
              <p>
                I am a Chennai-based Full Stack Engineer focused on AI-powered SaaS products. At
                AlphaTales, I co-built a commercial AI-native planning engine that converts raw ideas
                into validation, deep research, PRDs, architecture plans, tasks, and agent-ready Dev Packs.
              </p>
              <p>
                My strongest value is execution across boundaries: backend systems with FastAPI and
                MongoDB, structured AI workflows with LangGraph and Azure OpenAI, event-driven jobs
                with Dapr and RabbitMQ, real-time product feedback with Socket.IO, and secure
                authentication with WorkOS.
              </p>
            </article>
            <aside className="quick-facts panel">
              <div><BriefcaseBusiness size={18} /> Founding Engineer at AlphaTales</div>
              <div><Network size={18} /> AI workflow and backend architecture</div>
              <div><ShieldCheck size={18} /> OIDC/OAuth, WorkOS, CI/CD, Docker</div>
              <div><Award size={18} /> BE CSE, CGPA 8.95</div>
            </aside>
          </div>
        </section>

        <section id="skills" className="content-section">
          <SectionHeading eyebrow="Skills" title="A stack shaped around shipping AI products">
            Production-oriented tools across backend, AI orchestration, frontend, messaging, and DevOps.
          </SectionHeading>
          <div className="skills-grid">
            {skills.map(({ title, icon: Icon, items }) => (
              <article className="skill-card panel" key={title}>
                <div className="card-title">
                  <Icon size={20} />
                  <h3>{title}</h3>
                </div>
                <div className="chip-list">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section">
          <SectionHeading eyebrow="Experience" title="Where I have shipped product systems">
            Startup ownership, AI workflow engineering, backend services, and deployment pipelines.
          </SectionHeading>
          <div className="timeline">
            {experiences.map((job) => (
              <article className="experience-card" key={`${job.company}-${job.role}`}>
                <div className="company-mark">{job.initials}</div>
                <div className="experience-body panel">
                  <div className="experience-head">
                    <div>
                      <h3>{job.role}</h3>
                      <p>{job.company}</p>
                    </div>
                    <span>{job.period} - {job.place}</span>
                  </div>
                  <p className="experience-summary">{job.summary}</p>
                  <ul>
                    {job.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="chip-list compact">
                    {job.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <SectionHeading eyebrow="Projects" title="Case studies with product context">
            Private commercial work is shown transparently as case-study evidence, with public links only
            where they are actually available.
          </SectionHeading>
          <div className="projects-grid">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <article
                  className="project-card panel"
                  key={project.title}
                  style={{
                    '--project-accent': project.accent,
                    '--project-accent-soft': project.accentSoft,
                  }}
                >
                  <div className="project-icon"><Icon size={22} /></div>
                  <span className="project-badge">{project.badge}</span>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p>{project.description}</p>
                  <div className="mini-metrics">
                    {project.metrics.map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>
                  <div className="chip-list compact">
                    {project.stack.slice(0, 6).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <button onClick={() => setSelectedProject(project)}>
                      Case Study <ArrowRight size={16} />
                    </button>
                    {project.links.map((link) => (
                      <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                        {link.label} <ExternalLink size={15} />
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="proof" className="content-section">
          <SectionHeading eyebrow="Proof" title="Education, certifications, and public presence">
            A concise credibility layer for recruiters who need to scan quickly.
          </SectionHeading>
          <div className="proof-grid">
            {proofItems.map(({ title, icon: Icon, lines }) => (
              <article className="proof-card panel" key={title}>
                <div className="card-title">
                  <Icon size={20} />
                  <h3>{title}</h3>
                </div>
                {lines.map((line) => (
                  line.href ? (
                    <a className="proof-link" href={line.href} target="_blank" rel="noreferrer" key={line.text}>
                      {line.text} <ExternalLink size={14} />
                    </a>
                  ) : (
                    <p key={line.text}>{line.text}</p>
                  )
                ))}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <SectionHeading eyebrow="Contact" title="Let us talk about the product you are building">
            Available for full stack engineering and AI workflow engineering roles across local, remote,
            and international teams.
          </SectionHeading>
          <div className="contact-grid">
            <article className="contact-card panel">
              <h3>Direct contact</h3>
              <div className="contact-line">
                <Mail size={18} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button onClick={copyEmail} aria-label="Copy email">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="contact-line">
                <Phone size={18} />
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
              </div>
            </article>
            <article className="contact-actions panel">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon size={18} /> Connect on LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon size={18} /> View GitHub Profile
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Download Resume <ArrowRight size={18} />
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer>
        Designed and built for Premkumar A - Full Stack Engineer - AI-powered SaaS products
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <article
            className="case-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            style={{
              '--project-accent': selectedProject.accent,
              '--project-accent-soft': selectedProject.accentSoft,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close case study">
              <X size={18} />
            </button>
            <span className="project-badge">{selectedProject.badge}</span>
            <h2 id="case-title">{selectedProject.title}</h2>
            <p className="project-subtitle">{selectedProject.subtitle}</p>
            <p className="case-intro">{selectedProject.description}</p>
            {selectedProject.links.length > 0 && (
              <div className="modal-actions">
                {selectedProject.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                    {link.label} <ExternalLink size={15} />
                  </a>
                ))}
              </div>
            )}
            <div className="case-grid">
              <section>
                <h3>The problem</h3>
                <p>{selectedProject.caseStudy.problem}</p>
              </section>
              <section>
                <h3>My role</h3>
                <p>{selectedProject.caseStudy.role}</p>
              </section>
              <section className="case-section-wide">
                <h3>System architecture</h3>
                <div className="architecture-line">{selectedProject.caseStudy.architecture}</div>
              </section>
              <section className="case-section-wide">
                <h3>Key decisions</h3>
                <ul>
                  {selectedProject.caseStudy.innovations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Results</h3>
                <div className="mini-metrics modal-metrics">
                  {selectedProject.caseStudy.results.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </section>
              <section>
                <h3>Tech stack</h3>
                <div className="chip-list">
                  {selectedProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </section>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

export default App;
