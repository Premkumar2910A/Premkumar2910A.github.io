import { Fragment, useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import TechLogo from "../../lib/TechLogo";
import { PROJECTS, SKILL_GROUPS, UI } from "../../lib/data";
import { Heading } from "../ui/SectionUI";
const pad = n => String(n).padStart(2, "0");

const elements = SKILL_GROUPS.flatMap((g) =>
  g.skills.map((name) => ({ name, family: g.name })),
);
export default function Skills() {
  const [filter, setFilter] = useState("All"),
    [selected, setSelected] = useState(elements[0]);
  const normalise = (name) =>
    name
      .toLowerCase()
      .replace(/\s*(?:v)?\d.*$/, "");
  const uses = PROJECTS.filter((p) =>
    ["alphatales", "agents", "refacta", "alphaoptimizer", "infit"].includes(p.id),
  ).filter((p) =>
    p.tech.some((t) => normalise(t) === normalise(selected.name)),
  );
  return (
    <section id="skills" className="section skills">
      <Heading index="04" label="Stack" accent="with.">
        What I work
      </Heading>
      <details open className="full-stack">
        <summary>
          Explore all {elements.length} technologies <Plus size={18} />
        </summary>
        <p className="skills-intro">
          {UI.skillsIntro}
        </p>
        <div className="skill-filters" aria-label="Highlight skill category">
          {["All", ...SKILL_GROUPS.map((g) => g.name)].map((f) => (
            <button
              key={f}
              className={`chip ${f === filter ? "selected" : ""}`}
              aria-pressed={f === filter}
              onClick={() => {
                setFilter(f);
                if (f !== "All")
                  setSelected(elements.find((e) => e.family === f));
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="skills-layout">
          <div className="element-grid rv">
            {elements.map((e, i) => (
              <Fragment key={e.name}>
              <button
                className={`element ${filter !== "All" && e.family === filter ? "category-match" : ""} ${selected.name === e.name ? "inspected" : ""}`}
                onFocus={() => setSelected(e)}
                onClick={() => setSelected(e)}
                aria-pressed={selected.name === e.name}
                style={{ "--i": (Math.floor(i / 8) + (i % 8)) % 8 }}
              >
                <span className="atomic mono">{pad(i + 1)}</span>
                {UI.coreSkills.includes(e.name) && <span className="core-skill-label">Main tool</span>}
                <span className="element-logo" aria-hidden="true"><TechLogo name={e.name}/></span>
                <span className="element-name">{e.name}</span>
                <span className="element-family">{e.family}</span>
              </button>
              {(i % 4 === 3 || i === elements.length - 1) && Math.floor(i / 4) === Math.floor(elements.findIndex(item => item.name === selected.name) / 4) && <div className="mobile-skill-detail" aria-live="polite">
                <div><strong>{selected.name}</strong><span>{selected.family}</span></div>
                <p>{UI.skillContext[selected.name] || (uses.length ? `Used in ${uses.map(p => p.title).join(' and ')}.` : `Part of my ${selected.family.toLowerCase()} toolkit, listed in my resume.`)}</p>
                {uses.map(p => <a className="text-link" href={`#project-${p.id}`} key={p.id}>Explore {p.title}<ArrowUpRight size={14}/></a>)}
              </div>}
              </Fragment>
            ))}
          </div>
          <aside className="skill-inspector" aria-live="polite">
            <span className="eyebrow">SELECTED TECHNOLOGY</span>
            <div className="inspector-symbol" key={selected.name}>
              <TechLogo name={selected.name} />
            </div>
            <h3>{selected.name}</h3>
            <span className="mono">{selected.family}</span>
            <div className="used-in">
              {UI.skillContext[selected.name] && <p className="skill-context">{UI.skillContext[selected.name]}</p>}
              <p className="eyebrow">
                {uses.length ? "IN MY WORK" : "EXPERIENCE"}
              </p>
              {uses.length ? (
                uses.map((p) => (
                  <a key={p.id} href={`#project-${p.id}`}>
                    {p.title}
                    <ArrowUpRight size={15} />
                  </a>
                ))
              ) : (
                !UI.skillContext[selected.name] && <p>Part of my {selected.family.toLowerCase()} toolkit, listed in my resume.</p>
              )}
            </div>
            <p className="inspector-foot mono">SELECT A TILE TO EXPLORE ↖</p>
          </aside>
        </div>
      </details>
    </section>
  );
}
