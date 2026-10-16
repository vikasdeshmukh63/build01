const capabilities = [
  {
    area: "Loop Engineering & Task Planning",
    messaging:
      "Translates intent into immutable draft proposals and inspectable semantic diffs before applying any changes to your repository.",
    tag: "PLANNING",
  },
  {
    area: "Interchangeable Worker Dispatch",
    messaging:
      "Drives Claude Code, Codex, and other LLMs as swappable commodity workers. You retain full control over the execution harness.",
    tag: "WORKERS",
  },
  {
    area: "Deterministic Verification",
    messaging:
      "Evaluates generated code against test suites, schema contracts, and scope drift from git diffs so completion is never self-reported.",
    tag: "GATES",
  },
  {
    area: "Repo-Local Knowledge Mesh",
    messaging:
      "Durable facts, architectural decisions, and run checkpoints stay in .agents/memory/ and .agents/runs/ without prompt bloat.",
    tag: "MEMORY",
  },
  {
    area: "Guarded Feedback Cycles",
    messaging:
      "When a validation fails, AgentOS captures the failure log and feeds it into the next attempt, bounded by configured loop limits.",
    tag: "RELIABILITY",
  },
  {
    area: "Single-Binary Rust CLI",
    messaging:
      "Zero heavyweight dependencies. Install via cargo install agentos-build01 --locked and run seamlessly on Linux, macOS, and Windows.",
    tag: "CLI",
  },
];

export default function ProductCapabilitiesSection() {
  return (
    <section id="product-capabilities" className="subpage-section">
      <div className="subpage-shell">
        <span className="subpage-tag">CAPABILITIES</span>

        <h2 className="subpage-title">
          Engineered for <em>Autonomous Execution.</em>
        </h2>

        <p className="subpage-lead">
          Six architectural pillars designed to make AI coding agents
          dependable, inspectable, and repo-native.
        </p>

        <div className="subpage-card-grid">
          {capabilities.map((cap) => (
            <div key={cap.area} className="subpage-card--light">
              <span className="subpage-card__tag">{cap.tag}</span>
              <h3>{cap.area}</h3>
              <p>{cap.messaging}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
