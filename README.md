# Premkumar A Portfolio

The current light talking-video design is documented in [README-talking-portfolio.md](README-talking-portfolio.md), including its sections, video rebuild script, accessibility, asset licences and deployment.

Personal portfolio for Premkumar A, built with React, Vite, JavaScript, and CSS.

The site presents my work as a Full Stack Engineer for AI SaaS products, led by AlphaTales, with optional public contributions and earlier explorations.

## Stack

- React
- Vite
- JavaScript
- CSS
- Motion (Framer Motion) for project-card hover and agent-contribution reveals
- GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The source code lives on the `source` branch. The GitHub Pages workflow builds `dist` when that branch is pushed. The public address is `https://premkumar2910a.github.io/`.

The production build renders the React page into HTML before deployment, then the browser hydrates that same page to enable interactions. GitHub Pages serves these static files; no Node server is needed in production. Use `npm run build` rather than calling `vite build` directly, so the HTML, sitemap and robots file are generated together.

## Content and code structure

- `src/lib/data.js`: shared portfolio facts and content, also used by the assistant backend.
- `src/lib/seo.js`: canonical address, search/social metadata and ProfilePage structured data.
- `src/components/sections/Work.jsx`: project summaries, workflows and contribution evidence.
- `src/components/sections/Skills.jsx`: stack selection and technology context.
- `src/components/ui/SectionUI.jsx`: shared section headings and external links.
- `src/components/PortfolioAssistant.jsx`: microphone input and avatar-answer interaction.
- `src/App.jsx`: section assembly, scrolling and reveal behavior.
- `src/components/Navigation.jsx`: desktop navigation and mobile menu.
- `src/components/hero/Hero.jsx`: intro, recorded answers and video playback.
- `src/components/sections/`: separate components for each content section. Production includes their full HTML. Sections load together so navigation and reveal effects always see the content.
- `src/lib/recorded-captions.js`: short, audio-timed captions for existing recordings. Update timings when replacing a recording.
- `scripts/prerender.jsx`: generates production HTML from the actual React components, plus a one-page sitemap. Section anchors are not separate pages.
- `assistant-api/`: separate free-service backend; secrets stay outside frontend files.

After building, run `npm run preview -- --port 4182` and `node scripts/check-seo.cjs` to verify static content without JavaScript, metadata, native case expansion, hydration and project deep links. Search Console indexing and real-user Core Web Vitals require separate production checks; local tests do not prove rankings.

## Agent case study

The AlphaTales Agents case study describes Product Manager, Lead Generation, and Azure Health workflows, plus VPS deployment contributions. Its content lives in `src/lib/data.js`, which also feeds the portfolio assistant's verified facts. Company code and hosting details stay private.

Project motion uses Motion's `LazyMotion` with a separate animation-feature bundle. Contribution text stays readable while features load, and reduced-motion preferences disable the decorative movement.

## Portfolio assistant

Visitors can ask by voice, by typing, or with four topic chips. Answers come from the Cloudflare Worker in `assistant-api/` (Workers AI first, OpenRouter's free router as backup), grounded in `src/lib/data.js`.

- **Spoken answers:** when a reviewed Flow recording fits the question, the avatar plays it and the text shows its exact script. Otherwise the answer appears as text, labelled as a text reply, and the page scrolls it into view. See [assistant-api/RECORDED-ANSWERS.md](assistant-api/RECORDED-ANSWERS.md) for recording more clips.
- **Site guide:** "show me Refacta" or "take me to contact" scrolls to and highlights the section. Other answers offer "Take me there". Only known page anchors are reachable.
- **Everywhere on the page:** after the hero, an "Ask Premkumar" launcher opens the guide card with starter questions. Esc closes it.
- **Intro:** plays muted with captions on first view; the sound control restarts it with audio. Reduced-motion settings disable automatic playback.
- **Offline fallback:** if the answer service fails, verified scripts answer as text. Keyword matching never chooses a spoken clip.
- **Logging:** the Worker logs question text (up to 200 characters), chosen clip, sources, provider and latency to Workers Logs, without IP addresses. The privacy note discloses this.

Generated lip-sync through Hugging Face demos is disabled by default because free GPU quota is unreliable; set `VITE_LIVE_AVATAR_VIDEO=true` to re-enable it. Browser-generated voice is never used.

## Isolated avatar motion experiment

`/experiments/avatar.html` is a separate prototype that reuses the current character and mouth crops sampled from the existing intro. Its answers are exported from the shared portfolio guide by `node scripts/export-avatar-demo.mjs`. It is a paused, silent prototype with optional speech recognition. Run that export again after content changes, then build normally.

This experiment used approximate mouth movement and showed face compositing seams. It is now paused: browser-generated voice was removed and the page keeps the character still. It is not enabled on the main portfolio or claimed as finished lip-sync. `node scripts/check-avatar-demo.cjs` checks that the page loads, buttons remain silent, Stop restores the original, and the layout fits.
