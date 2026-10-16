export default function ProductProblemSection() {
  return (
    <section id="product-problem" className="subpage-section subpage-section--dark">
      <div className="grid" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <div className="subpage-shell">
        <span className="subpage-tag">THE ARCHITECTURAL GAP</span>

        <h2 className="subpage-title">
          A Loop That Forgets Is Just a <em>Wrapper.</em>
        </h2>

        <p className="subpage-lead">
          Most developers and teams run AI agents through ephemeral terminal
          chats or closed vendor wrappers. When a session terminates, the
          reasoning is lost, task progress cannot be verified deterministically,
          and code changes lack an inspectable audit trail.
        </p>

        <div className="subpage-card-grid">
          <div className="subpage-card">
            <div>
              <span className="subpage-card__tag">PILLAR 01</span>
              <h3>No Vendor Lock-In</h3>
              <p>
                Swap frontier LLMs and worker runners without changing your task
                pipelines or plan structures. Treat intelligence as interchangeable
                commodity compute.
              </p>
            </div>
          </div>

          <div className="subpage-card">
            <div>
              <span className="subpage-card__tag">PILLAR 02</span>
              <h3>Deterministic Gates</h3>
              <p>
                Automated evaluators test against contracts, test suites, and git
                diff invariants before acceptance. Completion is verified, never
                self-reported.
              </p>
            </div>
          </div>

          <div className="subpage-card">
            <div>
              <span className="subpage-card__tag">PILLAR 03</span>
              <h3>Repo-Local Knowledge</h3>
              <p>
                Durable facts, architectural decisions, and run checkpoints stay
                in plain Markdown under <code>.agents/memory/</code> in your
                versioned repository.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
