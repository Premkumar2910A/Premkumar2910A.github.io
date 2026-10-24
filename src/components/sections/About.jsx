import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { PROFILE, UI, COLLEGE_PROJECTS } from "../../lib/data";
import { Heading, External } from "../ui/SectionUI";
import { prefersReducedMotion as reduced } from "../../lib/browser-preferences";

function IDCard() {
  const [flipped, setFlipped] = useState(false);
  const swing = useRef(null),
    m = useRef({ a: 0, v: 0, t: 0 });
  useEffect(() => {
    if (reduced()) return;
    let frame = null;
    const tick = () => {
      const s = m.current;
      s.v += (s.t - s.a) * 0.025;
      s.v *= 0.88;
      s.a += s.v;
      swing.current?.style.setProperty("--swing", `${s.a}deg`);
      if (Math.abs(s.v) + Math.abs(s.t - s.a) > 0.005)
        frame = requestAnimationFrame(tick);
      else frame = null;
    };
    m.current.start = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };
    return () => {
      cancelAnimationFrame(frame);
      m.current.start = null;
    };
  }, []);
  return (
    <div className="lanyard-area">
      <div className="lanyard-strap">
        <span>
          {PROFILE.name} · {PROFILE.role}
        </span>
      </div>
      <div className="lanyard-clip" />
      <div
        className="id-swing"
        ref={swing}
        onPointerMove={(e) => {
          if (reduced()) return;
          const r = e.currentTarget.getBoundingClientRect();
          m.current.t = ((e.clientX - r.left - r.width / 2) / r.width) * 12;
          m.current.start?.();
        }}
        onPointerLeave={() => {
          m.current.t = 0;
          m.current.start?.();
        }}
      >
        <button
          className={`id-card ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped(!flipped)}
          aria-describedby="id-card-description"
          aria-pressed={flipped}
        >
          <span className="sr-only">{flipped ? "Show front of ID card. " : "Flip ID card. "}</span>
          <span className="id-face id-front" aria-hidden={flipped}>
            <span className="id-band">
              DEVELOPER ID <span>↗</span>
            </span>
            <span className="id-photo">
              <img
                src="/portrait.webp"
                alt="Premkumar A"
                width="128"
                height="156"
                loading="lazy"
              />
            </span>
            <span className="id-name">{PROFILE.name}</span>
            <span className="id-role">{PROFILE.role}</span>
            <span className="id-details">
              <span>
                DEPT.<b>ENGINEERING</b>
              </span>
              <span>
                BASED IN<b>CHENNAI, INDIA</b>
              </span>
              <span>
                DEGREE<b>BE · CSE · 2024</b>
              </span>
            </span>
            <span className="id-footer">
              <span className="barcode" />
              <span className="id-seal">PA</span>
            </span>
          </span>
          <span className="id-face id-back" aria-hidden={!flipped}>
            <span className="id-band">
              BEHIND THE CODE <span>↗</span>
            </span>
            <span className="back-content">
              <span className="eyebrow">WHAT I DO</span>
              <strong>
                Full-stack
                <br />
                <em>engineering.</em>
              </strong>
              <span>Founding Engineer at AlphaTales</span>
              <span>BE, Computer Science Engineering</span>
              <span>CGPA 8.95 / 10</span>
              <span>Python · FastAPI · LangGraph</span>
              <span className="signature">Premkumar A</span>
              <small>If found, say hello · Chennai</small>
            </span>
          </span>
        </button>
      </div>
      <p className="mono flip-hint">TAP TO FLIP ↺</p>
      <p id="id-card-description" className="sr-only">Premkumar A, Full Stack Engineer and Founding Engineer at AlphaTales. Based in Chennai. BE in Computer Science Engineering, class of 2024. CGPA 8.95 out of 10.</p>
    </div>
  );
}
export default function About() {
  return (
    <section id="about" className="section about">
      <Heading index="05" label="About" accent="me.">
        A bit about
      </Heading>
      <div className="about-grid">
        <div className="about-story rv">
          {UI.aboutParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <div className="about-links">
            <a className="button primary" href={PROFILE.resume} download>
              Resume <ArrowDown size={16} />
            </a>
            <External href={PROFILE.github} className="text-link">
              GitHub
            </External>
            <External href={PROFILE.linkedin} className="text-link">
              LinkedIn
            </External>
          </div>
        </div>
        <IDCard />
        <div className="quick-facts rv">
          <span className="eyebrow">THE SHORT VERSION</span>
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>{PROFILE.location}</dd>
            </div>
            <div>
              <dt>Currently</dt>
              <dd>Founding Engineer, AlphaTales</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>BE, Computer Science Engineering</dd>
            </div>
            <div>
              <dt>Let’s connect</dt>
              <dd>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div id="college-projects" className="early-projects">
        <p className="eyebrow">EARLIER EXPLORATIONS · COLLEGE PROJECTS</p>
        <div>{COLLEGE_PROJECTS.map(project => <article key={project.title}><h3>{project.title}</h3><p>{project.detail}</p></article>)}</div>
      </div>
    </section>
  );
}
