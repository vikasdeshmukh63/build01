import Link from "next/link";

export default function Nav() {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <Link className="site-nav__brand" href="/" aria-label="Build01 Home">
          <span className="site-nav__brand-badge">B01</span>
          <span className="site-nav__brand-text">
            Build<em>01</em>
          </span>
        </Link>

        <nav className="site-nav__links" aria-label="Main Navigation">
          <Link className="site-nav__link" href="/agent-os">
            AgentOS (A.01)
          </Link>
          <Link className="site-nav__link" href="/about">
            About
          </Link>
        </nav>

        <div className="site-nav__actions">
          <a
            className="site-nav__github"
            href="https://github.com/vikasdeshmukh63/AgentOS"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <Link className="site-nav__cta" href="/contact">
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
