import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PROFILE, NAV } from "../lib/data";
import { padIndex as pad } from "../lib/format";

export default function Navigation({ getScroll }) {
  const [active, setActive] = useState(""),
    [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false);
  const menu = useRef(null),
    toggle = useRef(null),
    progress = useRef(null);
  useEffect(() => {
    const scroll = () => {
      setScrolled(scrollY > 40);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    scroll();
    addEventListener("scroll", scroll, { passive: true });
    const ob = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(['certifications', 'journey'].includes(e.target.id) ? 'about' : e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((e) => ob.observe(e));
    return () => {
      removeEventListener("scroll", scroll);
      ob.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getScroll()?.stop();
    const background = [document.querySelector('main'), document.querySelector('.site-header'), document.querySelector('.site-guide'), document.querySelector('.mini-avatar'), document.querySelector('.header-guide')];
    background.forEach(el => { if (el) el.inert = true; });
    menu.current?.querySelector("a")?.focus();
    const keys = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => toggle.current?.focus());
      }
      if (e.key === "Tab") {
        const els = [...menu.current.querySelectorAll("a,button")],
          first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", keys);
    return () => {
      document.body.style.overflow = old;
      background.forEach(el => { if (el) el.inert = false; });
      getScroll()?.start();
      removeEventListener("keydown", keys);
    };
  }, [open]);
  return (
    <>
      <div className="reading-progress" ref={progress} />
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="brand" aria-label="PA Premkumar A — back to top">
          <span className="initials" aria-hidden="true">
            PA
          </span>
          <span className="brand-name">{PROFILE.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href={`mailto:${PROFILE.email}`}>
          Say hello <ArrowUpRight size={16} />
        </a>
        {/* Phones: the assistant places its avatar button here instead of floating. */}
        <div id="header-guide-slot" className="header-guide-slot"/>
        <button
          ref={toggle}
          className="mobile-toggle pill"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          Menu <Menu size={17} />
        </button>
      </header>
      {open && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          data-lenis-prevent
          ref={menu}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <button
            className="menu-close pill"
            onClick={() => {
              setOpen(false);
              requestAnimationFrame(() => toggle.current?.focus());
            }}
          >
            Close <X size={18} />
          </button>
          <nav>
            {NAV.map(([id, label], i) => (
              <a
                key={id}
                href={`#${id}`}
                style={{ "--i": i }}
                onClick={() => setOpen(false)}
              >
                <span>{pad(i + 1)}</span>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <p className="mono">{PROFILE.location}</p>
        </div>
      )}
    </>
  );
}
