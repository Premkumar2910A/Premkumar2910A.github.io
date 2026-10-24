import { useEffect } from "react";
import { Plus } from "lucide-react";
import Lenis from "lenis";
import Hero from "./components/hero/Hero";
import Navigation from "./components/Navigation";
import { CERTIFICATIONS } from "./lib/data";
let pageScroll = null;
const getScroll = () => pageScroll;
function focusDestination(id, keyboard = false) {
  let target = document.getElementById(id);
  if (!target) return;
  for (
    let ancestor = target.parentElement;
    ancestor;
    ancestor = ancestor.parentElement
  ) {
    if (ancestor.tagName === "DETAILS") ancestor.open = true;
  }
  // Keep the project title in view when opening a deep link into a closed card.
  const panel = target.closest('.project-panel');
  if (panel) target = panel;
  const focus =
    panel ? panel.querySelector('summary') : id === "main" ? target : target.querySelector("h1,h2,h3") || target;
  if (!focus.matches('summary')) focus.setAttribute("tabindex", "-1");
  if (focus.matches('summary') && !keyboard) focus.dataset.anchorFocus = 'pointer';
  else focus.removeAttribute('data-anchor-focus');
  const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 80;
  // Menu links land on the section content, without its large scroll-through gap.
  const leadingSpace = target.matches('main > section:not(#hero)')
    ? parseFloat(getComputedStyle(target).paddingTop) || 0 : 0;
  const top = Math.max(0, scrollY + target.getBoundingClientRect().top + leadingSpace - headerHeight - 24);
  const finish = () => focus.focus({ preventScroll: true });
  pageScroll?.resize();
  if (pageScroll)
    pageScroll.scrollTo(top, {
      force: true,
      duration: 0.65,
      onComplete: finish,
    });
  else {
    window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    finish();
  }
}
export default function Portfolio({ sections }) {
  const { Contact, Experience, Certifications, CurrentExperience, About, Work, Skills } = sections;
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = matchMedia('(pointer: coarse)');
    const narrowScreen = matchMedia('(max-width: 760px)');
    const setupScroll = () => {
      pageScroll?.destroy();
      pageScroll = preference.matches || coarsePointer.matches || narrowScreen.matches
        ? null
        : new Lenis({
            autoRaf: true,
            duration: 0.7,
            anchors: false,
            smoothWheel: true,
          });
    };
    setupScroll();
    const scrollPreferences = [preference, coarsePointer, narrowScreen];
    scrollPreferences.forEach(query => query.addEventListener('change', setupScroll));
    const route = (id, keyboard = false) => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          pageScroll?.resize();
          focusDestination(id, keyboard);
        }),
      );
    };
    const click = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      if (
        !link ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const id = link.getAttribute("href").slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
      route(id, e.detail === 0);
    };
    const restoreKeyboardFocus = () => document.querySelectorAll('[data-anchor-focus]').forEach(el => el.removeAttribute('data-anchor-focus'));
    const historyChange = () => route(location.hash.slice(1) || "hero");
    // The site guide moves visitors between known anchors and marks the destination.
    const guide = (e) => {
      const id = e.detail?.id;
      const target = id && document.getElementById(id);
      if (!target) return;
      if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
      route(id);
      if (id === "hero") return;
      const mark = target.closest(".project-entry") || target.querySelector("h2,h3") || target;
      document.querySelectorAll(".guide-spotlight").forEach((el) => el.classList.remove("guide-spotlight"));
      void mark.offsetWidth;
      mark.classList.add("guide-spotlight");
      setTimeout(() => mark.classList.remove("guide-spotlight"), 2600);
    };
    addEventListener("portfolio-navigate", guide);
    document.addEventListener("click", click, true);
    document.addEventListener("keydown", restoreKeyboardFocus, true);
    addEventListener("hashchange", historyChange);
    addEventListener("popstate", historyChange);
    if (location.hash) route(location.hash.slice(1));
    const ob = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            ob.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    // Touch scrolling remains native. Avoid a second full-page reveal/layout
    // pass on mobile; the avatar and agent cards keep their own interactions.
    if (!preference.matches && !coarsePointer.matches && !narrowScreen.matches) {
      document.querySelectorAll(".rv").forEach((e) => ob.observe(e));
      document.documentElement.classList.add("has-motion");
    }
    return () => {
      pageScroll?.destroy();
      pageScroll = null;
      scrollPreferences.forEach(query => query.removeEventListener('change', setupScroll));
      document.removeEventListener("click", click, true);
      document.removeEventListener("keydown", restoreKeyboardFocus, true);
      removeEventListener("hashchange", historyChange);
      removeEventListener("popstate", historyChange);
      removeEventListener("portfolio-navigate", guide);
      ob.disconnect();
      document.documentElement.classList.remove("has-motion");
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation getScroll={getScroll} />
      <main id="main">
        <Hero />
        <Work />
        <CurrentExperience />
        <Skills />
        <About />
        <div className="section secondary-background">
          <details open className="credentials-fold">
            <summary>
              Certifications{" "}
              <span className="mono">{CERTIFICATIONS.length} ENTRIES</span>
              <Plus size={18} />
            </summary>
            <Certifications />
          </details>
          <Experience />
        </div>
        <Contact />
      </main>
    </>
  );
}
