# Premkumar A — talking-video portfolio

The new design is served by `src/App.jsx` and `src/styles.css`. An archive of the previous design is supplied with the deliverables as `original-design-backup.zip`. This project keeps React + Vite and its static GitHub Pages hosting; it does not migrate to Next.js.

## Run locally

```sh
npm install
npm run dev
```

Production check:

```sh
npm run build
npm run preview
```

## Content

`src/lib/data.js` stores content. The confirmed résumé supplies profile, employment, education, and skills. Public GitHub source adds project scope and contribution evidence. No invented metrics, testimonials, or screenshots are included.

## Hiring-manager path

1. Hero: clear role, résumé, and once-per-page-load introduction.
2. Selected work: AlphaTales leads with contribution, decision, result, and an illustrative workflow. Refacta is an optional public contribution. InFit, clawd, and Focus have been removed from the active project data.
3. Current experience: the AlphaTales role and responsibilities.
4. Capabilities: three work-linked skill groups. The complete technology table is optional and expandable.
5. About: portrait, keyboard-accessible ID card, and professional links.
6. Optional certifications and earlier experience, followed by contact.

Project URLs such as `#project-refacta` select the right case study. Browser Back/Forward restores selection. Internal navigation moves keyboard focus to the destination. Reduced-motion settings are observed at startup and when changed.

## Evidence and scope

- AlphaTales: résumé-backed shared product work, with an explicitly illustrative workflow explorer. No private screenshots or internal URLs are published.
- Refacta: public contribution at https://github.com/alpha-tales/refacta/commit/3899658d. The code panel shows the actual shared-model import change. It does not claim reproduced benchmarks.
- AlphaOptimizer was not added as an original personal project: the account repository is a fork.

## Media

The character was generated with the built-in image-generation tool using the owner's portrait and the same charcoal suit and white shirt. The talking clip was generated in the owner's Google Flow account, using one approved generation costing 12 credits. The original is eight seconds at 1280×720, with an audio track.

Requested spoken script:

> Hi, I'm Premkumar. I'm a full stack engineer. I build AI-powered SaaS products.

The site uses the original eight-second performance with a head-to-toe 768×960 crop. The video is a single shot: no end-to-start blend, no looping, and no speech retiming. A separate matching still image is shown before playback and after it stops, so a compressed or moving final frame is never left on screen.

The page attempts audible autoplay for a first visit. Browsers may reject audible autoplay until the visitor clicks, taps, or uses the keyboard. The page retries on a visitor interaction; the visible Play control is also available. No website can guarantee first-visit audible autoplay under browser restrictions. Completion is held in memory for the current document only. Refresh starts a new automatic attempt; the introduction never loops on its own. Visitors can pause or replay. Reduced-motion preferences disable automatic playback.

Rebuild with Python 3 and ffmpeg on PATH:

```sh
python scripts/build-hero-assets.py path/to/intro-original.mp4 --crop 576:720:324:0
```

Outputs: `public/hero/hero.mp4`, `hero.webm`, `hero-mobile.mp4`, and `poster.webp`. The crop is specific to this source; inspect head and feet when replacing the video. Existing portrait and OG assets are kept separately. Review generated speech and lip sync before public release. No new generation credits or voice cloning were used for this revision.

## Accessibility and performance

Semantic headings, named controls, skip link, visible keyboard focus, menu focus trapping, Escape close, copy feedback via aria-live, and a text alternative to the video are included. Reduced motion disables Lenis, automatic introduction playback, and decorative animation. No WebGL, GSAP or external runtime scripts. Fonts and SVG logos are bundled locally. Project motion uses Motion's LazyMotion; its animation features load in a separate bundle. Check the current build output for bundle sizes.

## Credits and licences

- Brand SVGs: [Devicon](https://github.com/devicons/devicon), copied locally. MIT licence: `public/logos/LICENSE-devicon.txt`. Brand names and marks belong to their respective owners and do not imply endorsement.
- Concept skills: custom thin line icon in `src/lib/TechLogo.jsx`.
- Inter Tight, Instrument Serif and JetBrains Mono: bundled through Fontsource; SIL Open Font Licence copies are in `public/licenses/`.
- Interface icons: lucide-react (ISC).
- Smooth scrolling: Lenis (MIT).
- Project animation: Motion (MIT), loaded through LazyMotion.
- Photo and résumé: supplied/confirmed by the portfolio owner.

## Deployment

The working branch is `source`. The Pages workflow builds `dist` when that branch is pushed. In the repository's Pages settings, choose GitHub Actions as the deployment source. The website remains a static build suitable for `premkumar2910a.github.io`. This local redesign has not been committed, pushed or published.

## Consistent wide layout revision

All main sections share a 1560px maximum width and the same responsive gutters, including the fixed navigation. Headings, cards, and section spacing follow one scale. Contribution cards, capability cards, and experience rows reveal once on scroll; reduced-motion settings keep them static and visible. The workflow explorer remains illustrative. No claims or metrics were added for visual effect.

A monochrome PA mark is supplied as SVG, multi-size ICO, and an Apple touch icon. Icon URLs include a version so browsers can refresh their cache. Video preload is disabled; an allowed automatic play or an explicit visitor action loads it.

Mobile portrait fix: the still and video use `object-fit: contain` within one responsive portrait frame, capped at 440px. A 28px caption area keeps text below the shoes. Verified at 360, 390, 625 and 760px.

## Plain-language content revision

Homepage, case-study copy, experience, capabilities, About, contact and supporting labels were rewritten to remove repeated slogans and vague wording. The 50+ FastAPI endpoint and 4+ LangGraph workflow counts were checked in the AlphaTales employment entry of the confirmed résumé. The verbatim résumé summary is preserved separately.

Focus was removed pending clarification of the college-project identity. InFit and clawd are not in the active project list. Refacta remains a clearly attributed source contribution. The generic Infosys certificate bundle was removed; three specifically named résumé entries remain. The résumé contains no certificate verification URLs, so none were invented.


## Open sections and scroll spacing

All six native details sections start open: the two case-study notes, supporting contribution, complete stack, certifications, and earlier experience. Visitors can close and reopen them. Both project case studies render inline. An internal project link reopens its containing details if it was closed. Certification headings and the skills inspector now stay in normal document flow. Negative spacing before the work introduction was removed, and certification heading/count spacing is 32px to accommodate reveal motion.

Additional self-hosted logos: Pydantic, LangChain, LangGraph, shadcn/ui, Framer, Socket.IO, and MCP come from Simple Icons (CC0; public/logos/LICENSE-simple-icons.txt). Logos retain their owners' trademark rights. Concepts and tools without a bundled official mark use Lucide symbols; these are symbols, not brand logos.

Playback QA: check-main-clips.cjs, check-assistant-browser.cjs, and check-answer-playback.cjs use Chrome's --disable-audio-output test switch. This supplies a silent output clock so media lifecycle tests do not depend on the local sound device. The website itself still plays the original recorded audio unmuted. These tests verify timestamps, source selection, pause/resume, queue completion, and microphone callbacks; they do not prove audible speaker output. Verify actual sound in a normal browser separately.
