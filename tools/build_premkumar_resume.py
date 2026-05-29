from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "Premkumar_A_Resume.pdf"


def p(text, style):
    return Paragraph(text, style)


def link(text, href):
    return f'<link href="{href}"><font color="blue">{text}</font></link>'


def bold(text):
    return f"<b>{text}</b>"


styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Times-Bold",
    fontSize=16.5,
    leading=18.5,
    alignment=TA_CENTER,
    spaceAfter=2,
)

contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Times-Roman",
    fontSize=9.6,
    leading=11.4,
    alignment=TA_CENTER,
    textColor=colors.black,
)

section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Times-Bold",
    fontSize=11,
    leading=12.5,
    alignment=TA_LEFT,
    spaceBefore=8,
    spaceAfter=1,
)

body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Times-Roman",
    fontSize=9.55,
    leading=11.55,
    alignment=TA_JUSTIFY,
    spaceAfter=2,
)

small_style = ParagraphStyle(
    "Small",
    parent=body_style,
    fontSize=9.3,
    leading=11,
)

role_style = ParagraphStyle(
    "Role",
    parent=body_style,
    fontName="Times-Bold",
    fontSize=10,
    leading=11.5,
    spaceAfter=0,
)

company_style = ParagraphStyle(
    "Company",
    parent=body_style,
    fontName="Times-Italic",
    fontSize=9.25,
    leading=10.7,
    spaceAfter=1,
)

date_style = ParagraphStyle(
    "Date",
    parent=role_style,
    alignment=TA_RIGHT,
)

bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=14,
    firstLineIndent=-8,
    bulletIndent=2,
    alignment=TA_JUSTIFY,
    spaceAfter=2,
)


def section(title):
    return [
        p(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.55, color=colors.black, spaceBefore=1, spaceAfter=7),
    ]


def bullet(text):
    return Paragraph(text, bullet_style, bulletText="•")


def job(role, dates, company, bullets, tech=None):
    rows = [
        [p(role, role_style), p(dates, date_style)],
        [p(company, company_style), ""],
    ]
    table = Table(rows, colWidths=[5.35 * inch, 1.8 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("SPAN", (0, 1), (1, 1)),
            ]
        )
    )
    flow = [table, Spacer(1, 2)]
    flow.extend(bullet(item) for item in bullets)
    if tech:
        flow.append(bullet(f"{bold('Tech Stack:')} {tech}"))
    flow.append(Spacer(1, 5))
    return KeepTogether(flow)


def project(title, subtitle, url, bullets, tech):
    title_text = f"{bold(title + ':')} {subtitle}"
    if url:
        title_text += f" ({link('GitHub', url)})"
    flow = [p(title_text, role_style), Spacer(1, 2)]
    flow.extend(bullet(item) for item in bullets)
    flow.append(bullet(f"{bold('Tech Stack:')} {tech}"))
    flow.append(Spacer(1, 5))
    return KeepTogether(flow)


summary = (
    f"{bold('Founding Engineer and Full Stack Engineer')} with 2+ years of experience building "
    f"AI-powered SaaS products across backend architecture, AI workflow orchestration, real-time systems, "
    f"authentication, and production deployment. {bold('Co-built AlphaTales from the ground up')}, an AI-native "
    f"project planning engine that turns raw ideas into validated plans, deep research, PRDs, architecture "
    f"recommendations, tasks, and agent-ready Dev Packs. Experienced in shipping 50+ FastAPI endpoints, implementing "
    f"4+ LangGraph workflows with Azure OpenAI, and building event-driven AI execution using "
    f"Dapr Pub/Sub, RabbitMQ, Socket.IO, WorkOS, Docker, GitHub, and Azure DevOps."
)


story = [
    p("PREMKUMAR A", name_style),
    p(
        f"Chennai, Tamil Nadu, India | +91 8825624586 | "
        f"{link('premkumarsoftwaredeveloper@gmail.com', 'mailto:premkumarsoftwaredeveloper@gmail.com')}",
        contact_style,
    ),
    p(
        f"{link('LinkedIn', 'https://www.linkedin.com/in/premkumar-alagusundaram-8a9a6322a/')} | "
        f"{link('GitHub', 'https://github.com/Premkumar2910A')} | "
        f"{link('AlphaTales', 'https://alphatales.io')} | "
        f"{link('Portfolio', 'https://premkumar2910a.github.io/')}",
        contact_style,
    ),
    Spacer(1, 6),
]

story.extend(section("Summary"))
story.append(p(summary, body_style))

story.extend(section("Education"))
story.append(
    p(
        f"{bold('BE, Computer Science Engineering')}, Hindusthan College of Engineering and Technology, Coimbatore "
        f"2020 - 2024<br/>{bold('CGPA:')} 8.95 / 10",
        body_style,
    )
)

story.extend(section("Technical Skills"))
skills = [
    (bold("Languages:"), "Python 3.12, TypeScript, JavaScript, Dart"),
    (bold("Backend:"), "FastAPI, REST APIs, Pydantic v2, Beanie ODM, Microservices Architecture"),
    (bold("AI & Workflow:"), "LangGraph, LangChain, Azure OpenAI, Tool Calling, Structured Validation, Prompt Engineering"),
    (bold("Frontend:"), "Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion"),
    (bold("Database & Messaging:"), "MongoDB, Beanie ODM, Dapr Pub/Sub, RabbitMQ, Socket.IO, JSON Workflow Contracts"),
    (bold("DevOps & Security:"), "Docker, GitHub Workflows, Azure DevOps, WorkOS, OIDC, OAuth, SSO"),
    (bold("Mobile & CV:"), "Flutter, Dart, OCR, Tesseract, Camera-first UX"),
]
for label, value in skills:
    story.append(p(f"{label} {value}", small_style))

story.extend(section("Professional Experience"))
story.append(
    job(
        "Founding Engineer / Full Stack Engineer",
        "Jul 2024 - Present",
        "AlphaTales, Brisbane, Australia (Remote)",
        [
            f"{bold('Co-built AlphaTales from the ground up')}, an AI-native project planning engine for teams and AI agents that converts raw ideas into validated plans, deep research, PRDs, architecture recommendations, tasks, and agent-ready Dev Packs.",
            "Designed and shipped 50+ REST API endpoints using Python 3.12, FastAPI, MongoDB, Beanie ODM, and Pydantic v2 with modular request/response contracts.",
            "Implemented 4+ production AI workflows for idea validation, discovery research, PRD generation, architecture planning, and task breakdown using LangGraph and Azure OpenAI.",
            "Built event-driven AI execution with Dapr Pub/Sub over RabbitMQ, defining message contracts for long-running AI jobs and non-blocking workflow execution.",
            "Delivered real-time AI progress tracking using Socket.IO so users could monitor multi-step AI jobs without page refresh or blocked request cycles.",
            "Implemented secure authentication and SSO with WorkOS, Email OTP, Google OAuth, Microsoft OAuth, and OIDC-aligned login flows.",
            "Contributed across the AlphaTales product suite including main app, marketing site, admin app, browser extension, and MCP server for AI-powered IDE context; commercial repositories are private.",
            "Managed Docker-based deployment support and CI/CD release workflows through GitHub and Azure DevOps.",
        ],
        "Python, FastAPI, MongoDB, Beanie ODM, Pydantic v2, LangGraph, Azure OpenAI, Dapr, RabbitMQ, Socket.IO, WorkOS, Next.js 16, Docker",
    )
)

story.append(
    job(
        "Software Developer Intern",
        "Aug 2023 - Jan 2024",
        "Nitroware Technologies, Coimbatore",
        [
            "Built AI chatbot workflows using LangGraph and LangChain with Human-in-the-Loop validation for safer response review.",
            "Automated project setup and onboarding tasks, reducing onboarding time by approximately 25% through repeatable workflow automation.",
            "Worked across Python workflow logic, prompt structure, and integration patterns for AI-assisted internal product flows.",
        ],
        "Python, LangGraph, LangChain, Automation, Human-in-the-Loop Workflows",
    )
)

story.append(
    job(
        "Python Developer Intern",
        "Jan 2023 - Mar 2023",
        "LS Technologies, Coimbatore",
        [
            "Developed FastAPI services backed by MongoDB with structured API design, validation, and reusable backend patterns.",
            "Implemented CRUD-style backend flows with database persistence, organized route logic, and clear request/response handling.",
        ],
        "Python, FastAPI, MongoDB, REST APIs",
    )
)

story.extend(section("Project Experience"))
story.append(
    project(
        "AlphaTales",
        "AI Project Planning SaaS",
        None,
        [
            "Built an end-to-end AI planning workflow that moves from idea intake to AI validation, deep research, feature specs, PRD generation, architecture planning, task breakdown, and agent-ready Dev Pack export.",
            "Integrated long-running AI workflow execution with event messaging and real-time progress feedback for production SaaS usage.",
            f"Supported Dev Pack and MCP-oriented context flows for AI-powered IDEs such as Cursor and Claude Code.",
            "Supported secure product access through WorkOS authentication, SSO-ready login flows, and deployment-oriented backend architecture.",
            "Commercial repositories are private due to product ownership; contribution is represented through product links and case-study evidence.",
        ],
        "FastAPI, MongoDB, LangGraph, Azure OpenAI, Dapr, RabbitMQ, Socket.IO, WorkOS, Next.js 16, MCP",
    )
)

story.append(
    project(
        "Refacta",
        "AI-assisted code refactoring agent",
        "https://github.com/alpha-tales/refacta",
        [
            "Designed a rules-driven multi-agent refactoring workflow that scans projects, interprets Markdown rule files, applies controlled refactor passes, checks compliance, and reports results.",
            "Added safety-oriented execution patterns including dry-run support, backups, compliance reports, build validation, and structured Markdown/JSON outputs.",
            "Published as a public repository under alpha-tales/refacta with a CLI/TUI-oriented developer workflow.",
        ],
        "Python, Claude Agent SDK, Textual, Rich, Typer, PowerShell",
    )
)

story.append(
    project(
        "InFit",
        "AI nutrition tracker for India",
        "https://github.com/Premkumar2910A/infit",
        [
            "Built a public Flutter MVP foundation for a nutrition tracking app with photo-based calorie logging direction, macro dashboard screens, food confirmation flows, and profile/insights views.",
            "Structured the app with feature folders, reusable widgets, GoRouter navigation, Riverpod-ready state patterns, and bilingual Tamil/English voice assistant roadmap.",
            "Designed the app direction around Indian food habits, fast mobile logging, and Tamil/English accessibility.",
        ],
        "Flutter, Dart, Riverpod, GoRouter, Camera, TTS/STT, Hive",
    )
)

story.append(
    project(
        "clawd",
        "Prompt-first multi-agent lead intelligence pipeline",
        "https://github.com/Premkumar2910A/clawd",
        [
            "Created a prompt-first agent workflow for lead discovery, content signal collection, JSON audit storage, qualification, and guarded HubSpot handoff.",
            "Separated agents by responsibility so collection, evidence storage, processing, and CRM sync remain auditable and easier to maintain.",
            "Documented clear prompt contracts and no-automatic-outreach guardrails to keep lead processing controlled.",
        ],
        "Prompt Engineering, Multi-Agent Design, JSON, HubSpot, LinkedIn Research",
    )
)

story.append(
    project(
        "Focus",
        "UG final-year OCR accessibility project",
        None,
        [
            "Completed an undergraduate final-year computer vision prototype that converts visual text into audio output for visually impaired users.",
            "Implemented an OCR-to-audio flow covering image capture, preprocessing, Tesseract OCR, text cleanup, and audio playback.",
        ],
        "Python, OCR, Tesseract",
    )
)

story.extend(section("Certifications"))
certs = [
    "AWS Cloud Practitioner Certified",
    "Generative AI for Everyone - DeepLearning.AI",
    "NPTEL Internet of Things - IIT Madras",
    "Infosys Springboard course certificates",
]
for item in certs:
    story.append(bullet(item))


def build():
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        rightMargin=0.54 * inch,
        leftMargin=0.54 * inch,
        topMargin=0.46 * inch,
        bottomMargin=0.46 * inch,
        title="Premkumar A Resume",
        author="Premkumar A",
    )
    doc.build(story)


if __name__ == "__main__":
    build()
    print(OUT)
