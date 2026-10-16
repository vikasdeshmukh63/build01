"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductHeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("cargo install agentos-build01 --locked");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="product-hero" className="subpage-hero">
      <div className="grid" aria-hidden="true" />
      <div className="sq" aria-hidden="true" />
      <div className="sq2" aria-hidden="true" />
      <div className="ci" aria-hidden="true" />

      <div className="subpage-shell">
        <span className="subpage-tag">A.01 AUTONOMOUS RUNTIME / OPEN SOURCE</span>

        <h1 className="subpage-title">
          AgentOS. <br />
          <em>Rent the intelligence.</em> Own the loop.
        </h1>

        <p className="subpage-lead">
          AgentOS owns the loop around the coding agents you already run.
          Describe intent in a few sentences; AgentOS plans it into tasks, drives
          Claude Code or Codex as interchangeable workers, verifies every result
          deterministically, and keeps the plan, memory, trust record, and
          handoffs in your repo.
        </p>

        {/* Terminal Install Snippet */}
        <div className="subpage-terminal">
          <div className="subpage-terminal__head">
            <b style={{ background: "#ef4444" }} aria-hidden="true" />
            <b style={{ background: "#f59e0b" }} aria-hidden="true" />
            <b style={{ background: "#22c55e" }} aria-hidden="true" />
            <span>CRATES.IO RUNTIME INSTALL</span>
          </div>
          <div className="subpage-terminal__body">
            <code>cargo install agentos-build01 --locked</code>
            <button
              type="button"
              className="subpage-terminal__copy"
              onClick={copyCommand}
            >
              {copied ? "COPIED ✓" : "COPY"}
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="cta-stage__btns">
          <a
            href="https://github.com/vikasdeshmukh63/AgentOS"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-stage__btn cta-stage__btn--dark"
          >
            View on GitHub ↗
          </a>
          <Link
            href="/contact"
            className="cta-stage__btn cta-stage__btn--outline"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
