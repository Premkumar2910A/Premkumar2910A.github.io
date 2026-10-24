import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowUp, Check, Copy } from "lucide-react";
import { PROFILE } from "../../lib/data";
import { External } from "../ui/SectionUI";

export default function Contact() {
  const [copied, setCopied] = useState(false),
    [error, setError] = useState(false),
    timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setError(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setError(true);
    }
  };
  return (
    <section id="contact" className="section contact">
      <p className="eyebrow rv">06 — CONTACT</p>
      <div className="contact-layout"><div>
      <h2 className="contact-title rv" aria-label="Let’s talk about your team.">
        <span aria-hidden="true">
          {[..."Let’s talk"].map((c, i) => (
            <span key={i} className={c === " " ? "letter space" : "letter"}>
              {c}
            </span>
          ))}
        </span>
        <em aria-hidden="true">about your team.</em>
      </h2>
      <div className="contact-row">
        <div className="email-wrap">
          <a className="email-link" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
            <ArrowUpRight />
          </a>
          <button className="chip copy-button" onClick={copy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
          </button>
          {error && (
            <p className="copy-error" role="status">
              Select and copy the email address above.
            </p>
          )}
        </div>

      </div>
      <div className="contact-links">
        <a href={PROFILE.phoneHref}>
          {PROFILE.phone}
          <ArrowUpRight size={16} />
        </a>
        <External href={PROFILE.github}>GitHub</External>
        <External href={PROFILE.linkedin}>LinkedIn</External>
      </div>
      </div>
      <aside className="contact-context rv" aria-label="Professional background">
        <p className="eyebrow">START A CONVERSATION</p>
        <h3>From the interface<br/>to the API.</h3>
        <p>I can walk you through the product decisions, code, and trade-offs behind my work. Get in touch about full-stack development or AI product engineering.</p>
        <a className="text-link contact-case-link" href="#project-agents">Explore my agent work <ArrowUpRight size={16}/></a>
        <a className="text-link" href={PROFILE.resume} download>Download resume <ArrowDown size={16}/></a>
      </aside></div>
      <footer>
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <a href="#hero">
          Back to top <ArrowUp size={15} />
        </a>
      </footer>
    </section>
  );
}
