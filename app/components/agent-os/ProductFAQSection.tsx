"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is AgentOS?",
    answer:
      "AgentOS is Build01's flagship open-source autonomous runtime. It owns the loop around the coding agents you run — planning intent into tasks, driving interchangeable workers (like Claude Code or Codex), verifying results deterministically, and storing all memory in your repository.",
  },
  {
    question: "Is AgentOS available now?",
    answer:
      "Yes. AgentOS is available right now. You can install the single-binary CLI via `cargo install agentos-build01 --locked` or inspect the code on GitHub at github.com/vikasdeshmukh63/AgentOS.",
  },
  {
    question: "What workers and models does AgentOS support?",
    answer:
      "AgentOS supports Claude Code, OpenAI Codex, and modular worker harnesses. You treat the underlying AI models as swappable intelligence while keeping task planning, contracts, and memory under your control.",
  },
  {
    question: "Where are task states and memory stored?",
    answer:
      "Everything lives directly inside your repository in plain Markdown under `.agents/memory/` and `.agents/runs/`. There is no closed SaaS database or vendor lock-in.",
  },
  {
    question: "How does human oversight work in AgentOS?",
    answer:
      "Every proposal is an immutable draft revision with an inspectable semantic diff. No active state changes before explicit confirmation, and tasks can carry hard feedback-cycle bounds.",
  },
  {
    question: "How do I get started?",
    answer:
      "Install the CLI with `cargo install agentos-build01 --locked`, navigate to your project repo, and start describing intent with `agentos`. Explore the GitHub repo for templates and documentation.",
  },
];

export default function ProductFAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="product-faq" className="subpage-section">
      <div className="subpage-shell">
        <span className="subpage-tag">FAQS</span>

        <h2 className="subpage-title">
          AgentOS <em>Frequently Asked Questions.</em>
        </h2>

        <p className="subpage-lead">
          Everything you need to know about adopting, running, and orchestrating
          AgentOS in production environments.
        </p>

        <div className="subpage-faq-list">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className={`subpage-faq-item ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="subpage-faq-trigger"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <em aria-hidden="true">+</em>
                </button>
                {isOpen && (
                  <div className="subpage-faq-content">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
