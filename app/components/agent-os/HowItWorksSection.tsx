const steps = [
  {
    number: "01",
    heading: "Describe Intent",
    body: "Describe what needs to be built in natural language. AgentOS opens a planning channel and generates immutable draft revisions with inspectable semantic diffs.",
  },
  {
    number: "02",
    heading: "Worker Execution",
    body: "Drives Claude Code, Codex, or local models as interchangeable workers. Workers execute tasks without prematurely polluting active repo state.",
  },
  {
    number: "03",
    heading: "Deterministic Verification",
    body: "Evaluators run tests, contracts, and git diff invariants. Failures are captured and injected into bounded feedback cycles before acceptance.",
  },
  {
    number: "04",
    heading: "Repo-Local Checkpoint",
    body: "Approved tasks commit directly to your git history, updating durable memory in .agents/memory/ and preserving complete provenance.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="subpage-section subpage-section--dark">
      <div className="grid" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <div className="subpage-shell">
        <span className="subpage-tag">ARCHITECTURE</span>

        <h2 className="subpage-title">
          How AgentOS <em>Runs.</em>
        </h2>

        <p className="subpage-lead">
          From human intent to verified code commits — a deterministic loop
          engineered for repeatable, safe autonomous workflows.
        </p>

        <div className="subpage-card-grid">
          {steps.map((step) => (
            <div key={step.number} className="subpage-card">
              <div>
                <span className="subpage-card__num">{step.number}</span>
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
