import { useEffect, useRef } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { PROFILE, TIMELINE } from "../../lib/data";
import { padIndex as pad } from "../../lib/format";

export default function Experience() {
  const section = useRef(null),
    line = useRef(null);
  useEffect(() => {
    const update = () => {
      const r = section.current.getBoundingClientRect(),
        p = Math.min(
          1,
          Math.max(
            0,
            (innerHeight * 0.7 - r.top) / (r.height - innerHeight * 0.3),
          ),
        );
      line.current?.style.setProperty("--path-progress", p);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <section
      id="journey"
      className="section experience earlier-section"
      ref={section}
    >
      <details open className="earlier-journey">
        <summary>
          Earlier experience & education <Plus size={18} />
        </summary>
        <p className="journey-order mono">MOST RECENT FIRST · INTERNSHIPS & DEGREE</p>
        <div className="timeline" ref={line}>
          <div className="timeline-spine" />
          {TIMELINE.slice(0, -1)
            .reverse()
            .map((e, i) => (
              <article key={e.title} className="timeline-stop rv">
                <span className="timeline-dot" />
                <p className="mono timeline-date">{e.date}</p>
                <div className="journey-card">
                  <p className="eyebrow">{e.type}</p>
                  <h3>{e.title}</h3>
                  <p className="timeline-place">{e.place}</p>
                  <p className="timeline-detail">{e.detail}</p>
                </div>
                <span className="timeline-index mono">{pad(i + 1)}</span>
              </article>
            ))}
          <a className="next-stop rv" href={`mailto:${PROFILE.email}`}>
            <span className="mono">NEXT CHAPTER</span>
            <h3>Your team?</h3>
            <ArrowUpRight />
          </a>
        </div>
      </details>
    </section>
  );
}
