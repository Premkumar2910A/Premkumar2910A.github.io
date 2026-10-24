import { ArrowUpRight } from "lucide-react";
import { UI, TIMELINE } from "../../lib/data";
import { Heading, External } from "../ui/SectionUI";

export default function CurrentExperience() {
  const current = TIMELINE.at(-1);
  return (
    <section id="experience" className="section current-experience">
      <Heading index="03" label="Experience" accent="role.">
        My current
      </Heading>
      <div className="current-role rv">
        <div className="role-identity">
          <p className="mono">{current.date}</p>
          <h3>AlphaTales</h3>
          <p>{current.title}</p>
          <span>{current.place.replace(/^AlphaTales · /, '')}</span>
          <External href="https://alphatales.io" className="text-link">
            Explore the product
          </External>
        </div>
        <div>
          <p className="current-summary">{UI.currentSummary}</p>
          <ul>
            {UI.currentContributions.map(([title, detail]) => (
              <li className="rv" key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <a className="text-link" href="#project-alphatales">
            Read the project story <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
