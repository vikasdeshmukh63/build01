import Link from "next/link";

const approachSteps = [
  {
    number: "01",
    label: "Understand the work.",
    body: "Identify the task, its users, constraints, and the outcome that matters. Build around the real human bottleneck.",
  },
  {
    number: "02",
    label: "Choose the right approach.",
    body: "Evaluate where AI, deterministic automation, existing software, or a combination of these makes the most sense.",
  },
  {
    number: "03",
    label: "Build with intention.",
    body: "Design the experience, workflow, and technical foundations around verifiable contracts and repo-native state.",
  },
  {
    number: "04",
    label: "Learn and improve.",
    body: "Evaluate performance, gather feedback, and refine the solution as model architectures and requirements evolve.",
  },
];

export default function AboutContentSection() {
  return (
    <div className="subpage">
      {/* 01 — Hero Introduction */}
      <section id="about-intro" className="subpage-hero">
        <div className="grid" aria-hidden="true" />
        <div className="sq" aria-hidden="true" />
        <div className="sq2" aria-hidden="true" />
        <div className="ci" aria-hidden="true" />

        <div className="subpage-shell">
          <span className="subpage-tag">ABOUT BUILD01 / AI SYSTEMS STUDIO</span>

          <h1 className="subpage-title">
            We Build for What <em>Comes Next.</em>
          </h1>

          <p className="subpage-lead">
            Build01 is an AI systems and product company engineering
            production-grade software and autonomous runtimes. We believe the
            opportunity in AI extends beyond individual prompts and isolated
            chatbots—it lies in creating modular, high-performance product
            systems that govern planning, execution, verification, and workspace
            state.
          </p>

          <div className="cta-stage__btns">
            <Link
              href="/agent-os"
              className="cta-stage__btn cta-stage__btn--dark"
            >
              Explore AgentOS (A.01)
            </Link>
            <Link
              href="/contact"
              className="cta-stage__btn cta-stage__btn--outline"
            >
              Talk to Our Team ↗
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — Mission & Vision in Obsidian Stage */}
      <section id="about-mission" className="subpage-section subpage-section--dark">
        <div className="grid" aria-hidden="true" />
        <div className="glow" aria-hidden="true" />

        <div className="subpage-shell">
          <span className="subpage-tag">FOUNDATIONAL PILLARS</span>

          <h2 className="subpage-title">
            Open, Dependable, <em>Repo-Native.</em>
          </h2>

          <div className="subpage-card-grid">
            <div className="subpage-card">
              <div>
                <span className="subpage-card__tag">CORE MANDATE</span>
                <h3>Our Mission</h3>
                <p>
                  Engineer open, dependable systems that turn foundation model
                  intelligence into production-grade autonomous execution without
                  vendor lock-in.
                </p>
              </div>
            </div>

            <div className="subpage-card">
              <div>
                <span className="subpage-card__tag">FUTURE HORIZON</span>
                <h3>Our Vision</h3>
                <p>
                  A future where engineers and enterprises orchestrate fleets of
                  verified, intelligent agents with total clarity, deterministic
                  control, and repository-level ownership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Approach */}
      <section id="about-approach" className="subpage-section">
        <div className="subpage-shell">
          <span className="subpage-tag">ENGINEERING PHILOSOPHY</span>

          <h2 className="subpage-title">
            Good AI Starts With the <em>Right Problem.</em>
          </h2>

          <p className="subpage-lead">
            We believe building useful AI products requires a disciplined balance of
            experimentation, product thinking, and deterministic systems
            engineering.
          </p>

          <div className="subpage-card-grid">
            {approachSteps.map((step) => (
              <div key={step.number} className="subpage-card--light">
                <span className="subpage-card__num">{step.number}</span>
                <h3>{step.label}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
