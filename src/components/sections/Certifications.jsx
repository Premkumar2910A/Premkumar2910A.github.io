import { ArrowUpRight } from "lucide-react";
import { CERTIFICATIONS } from "../../lib/data";
import { Heading } from "../ui/SectionUI";
import { padIndex as pad } from "../../lib/format";

export default function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="section certification-layout">
        <div>
          <Heading label="Background" accent="certifications.">
            Courses &
          </Heading>
        </div>
        <div className="cert-list">
          {CERTIFICATIONS.map((c, i) => (
            <a key={c.title} className="cert-row rv" href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${c.title} certificate (opens in a new tab)`}>
              <span className="mono">{pad(i + 1)}</span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.issuer} · {c.date}</p>
              </div>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
