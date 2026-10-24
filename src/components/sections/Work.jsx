import { Plus } from "lucide-react";
import { LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import TechLogo, { isBrand } from "../../lib/TechLogo";
import { PROJECTS, PROJECT_CASES, CASE_PRESENTATION } from "../../lib/data";
import { Heading, External } from "../ui/SectionUI";
const pad = n => String(n).padStart(2, "0");
const loadMotionFeatures = () => import("../../lib/motion-features").then(module => module.default);

function ProjectWorkflow({ p }) {
  const presentation = CASE_PRESENTATION[p.id];
  return (
    <div className="project-workflow">
      <p className="eyebrow">{p.id === 'infit' ? 'Prototype flow' : 'How it works'}</p>
      <ol>
        {presentation.steps.map(([label, detail], i) => <li key={label}>
          <span className="flow-number mono">{pad(i + 1)}</span>
          <div><h4>{label}</h4><p>{detail}</p></div>
        </li>)}
      </ol>
      <p className="flow-source">{presentation.evidence}</p>
    </div>
  );
}
function ProjectVisual({ visual, title }) {
  return (
      <figure className="project-visual">
        <a href={visual.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} image in a new tab`}>
          <img src={visual.src} alt={visual.alt} width="1672" height="941" loading="lazy" decoding="async" />
        </a>
        <figcaption>
          <div><p className="mono">{visual.label}</p>{visual.caption && <p>{visual.caption}</p>}</div>
        </figcaption>
      </figure>
  );
}
function AgentWorkflow({ c }) {
  const shouldReduceMotion = useReducedMotion();
  return <div className="agent-workflow" aria-label="Agent responsibilities and my contributions">
    <p className="eyebrow">Three specialist workflows</p>
    <ol>
      {c.agents.map((agent, i) => <m.li key={agent.title}
        initial={false}
        whileInView={shouldReduceMotion ? undefined : { y: [10, 0], opacity: [.65, 1] }}
        viewport={{ once: true, amount: .2 }}
        transition={{ duration: .45, delay: i * .06, ease: [.16, 1, .3, 1] }}>
        <span className="agent-index mono" aria-hidden="true">{pad(i + 1)}</span>
        <div>
          <h4>{agent.title}</h4>
          <p>{agent.purpose}</p>
          <p className="agent-my-work"><strong>My contribution</strong>{agent.contribution}</p>
          <span className="agent-output mono">{agent.output}</span>
        </div>
      </m.li>)}
    </ol>
    <div className="agent-runtime">
      <span className="mono">VPS runtime</span>
      <p>{c.deployment}</p>
    </div>
  </div>;
}
function ProjectCase({ p, inPanel = false }) {
  const c = PROJECT_CASES[p.id];
  return (
    <article id={`project-${p.id}`} key={p.id} className="case-study" aria-labelledby={inPanel ? `case-title-${p.id}` : undefined}>
      <div className={`case-overview${c.agents ? ' agent-case-overview' : ''}`}>
        <div>
          <p className="eyebrow">{c.status}</p>
          {!inPanel && <h3>{p.title}</h3>}
          <p className="case-role">{c.role}</p>
          <p className="case-problem">{c.problem}</p>
          {(p.link || c.evidence) && <div className="case-actions">
            {p.link && (
              <External href={p.link} className="button primary">
                {p.linkLabel}
              </External>
            )}
            {c.evidence && (
              <External href={c.evidence} className="text-link">
                {c.evidenceLabel}
              </External>
            )}
          </div>}
          <div className="project-contribution">
            <h4>My work on this project</h4>
            <p>{c.contribution}</p>
          </div>
        </div>
        {c.agents ? <AgentWorkflow c={c}/> : c.visual ? <ProjectVisual visual={c.visual} title={p.title}/> : <ProjectWorkflow p={p}/>}
      </div>
      {c.visual && <div className="infit-flow"><ProjectWorkflow p={p}/></div>}
      {p.id === "refacta" && <details open className="refacta-source-example source-evidence">
            <summary>Implementation example: a shared edit model <Plus size={18} aria-hidden="true"/></summary>
            <p className="eyebrow">ACTUAL CODE CHANGE · PUBLIC COMMIT</p>
            <h4>
              The import change
            </h4>
            <p>
              The SDK imports its edit model from the shared models module
              instead of the console UI.
            </p>
            <div className="code-before">
              <span className="mono">BEFORE</span>
              <pre>
                <code>from ..console.diff_viewer import EditOperation</code>
              </pre>
            </div>
            <div className="code-after">
              <span className="mono">AFTER</span>
              <pre>
                <code>from ..models import EditOperation</code>
              </pre>
            </div>
            <External href={c.evidence} className="text-link">
              Read the source diff
            </External>
          </details>}
      <div className="case-facts">
        {[
          [c.decisionLabel || "Engineering decision", c.decision],
          ["What works today", c.result],
        ].map(([label, text], i) => (
          <div
            className="contribution-step"
            style={{ "--i": i * 2 }}
            key={label}
          >
            <span className="step-number mono">{pad(i + 1)}</span>
            <h4>{label}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>
      {c.stories && (
        <div className="case-stories">
          {c.stories.map((story) => (
            <details open key={story.title}>
              <summary>
                {story.title}
                <Plus size={18} />
              </summary>
              <p>{story.text}</p>
            </details>
          ))}
        </div>
      )}
      <div className="case-footer">
        <div className="tech-chips">
          {p.tech.map((t) => (
            <span key={t}>
              {isBrand(t) && <TechLogo name={t} />}
              {t}
            </span>
          ))}
        </div>
        <p>{c.limit}</p>
      </div>
    </article>
  );
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <section id="work" className="section work evidence-work">
      <Heading index="02" label="Selected work" accent="built.">
        What I’ve
      </Heading>
      <p className="work-intro">A SaaS product, deployed agent workflows, developer tools, and a mobile prototype. Each case study explains the problem, my contribution, and what works today.</p>
      <div className="work-case-list project-panels">{PROJECTS.filter(p=>CASE_PRESENTATION[p.id]).map((p,i)=><div className="project-entry" key={p.id}><m.details className="project-panel"
        initial={false} whileHover={shouldReduceMotion ? undefined : { y: -2 }} transition={{ duration: .2 }}>
        <summary>
          <span className="panel-number mono">{pad(i+1)}</span>
          <div className="panel-title"><span className="mono">{CASE_PRESENTATION[p.id].category}</span><h3 id={`case-title-${p.id}`}>{p.title}</h3></div>
          <div className="panel-intro"><p>{CASE_PRESENTATION[p.id].summary}</p><span><strong>My part:</strong> {CASE_PRESENTATION[p.id].focus}</span><span className="panel-outcome"><strong>Outcome:</strong> {CASE_PRESENTATION[p.id].outcome}</span>
            <span className="panel-metrics">{CASE_PRESENTATION[p.id].metrics.map(metric=><span key={metric}>{metric}</span>)}</span></div>
          <span className="panel-toggle"><Plus size={20} aria-hidden="true"/><span className="sr-only">Project details</span></span>
          <span className="panel-hint"><span className="when-closed">Read case study</span><span className="when-open">Close case study</span></span>
        </summary>
        <ProjectCase p={p} inPanel/>
      </m.details>
        {(p.link || PROJECT_CASES[p.id].evidence) && <div className="project-proof-preview" aria-label={`${p.title} public links`}>
          {p.link && <External href={p.link} className="text-link">{p.linkLabel}</External>}
          {PROJECT_CASES[p.id].evidence && <External href={PROJECT_CASES[p.id].evidence} className="text-link">{PROJECT_CASES[p.id].evidenceLabel}</External>}
        </div>}
      </div>)}</div>
    </section>
    </LazyMotion>
  );
}
