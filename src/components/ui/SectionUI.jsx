import { ArrowUpRight } from "lucide-react";

export function Heading({ index, label, children, accent }) {
  return (
    <div className="section-heading rv">
      <p className="eyebrow">
        {index && (
          <>
            {index} <span>—</span>{" "}
          </>
        )}
        {label}
      </p>
      <h2>
        {children} <em>{accent}</em>
      </h2>
    </div>
  );
}
export function External({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
