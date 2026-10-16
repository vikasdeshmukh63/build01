import Link from "next/link";

export default function ProductCTASection() {
  return (
    <section id="product-cta" className="subpage-section subpage-section--dark">
      <div className="grid" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <div className="subpage-shell">
        <span className="subpage-tag">GET STARTED</span>

        <h2 className="subpage-title">
          Ready to Own Your <em>Agent Loop?</em>
        </h2>

        <p className="subpage-lead">
          AgentOS is open source, built in Rust, and available on crates.io today.
          Install the CLI, inspect the codebase, or connect with our team to
          discuss runtime integration.
        </p>

        <div className="cta-stage__btns">
          <a
            href="https://github.com/vikasdeshmukh63/AgentOS"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-stage__btn cta-stage__btn--dark"
            style={{ background: "#ff7a1f", color: "#050a14", borderColor: "#ff7a1f" }}
          >
            Star on GitHub ↗
          </a>
          <Link
            href="/contact"
            className="cta-stage__btn cta-stage__btn--outline"
            style={{ color: "#ffffff", borderColor: "#2a3248" }}
          >
            Talk to Build01 ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
