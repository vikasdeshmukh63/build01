const faqs = [
  {
    question: "What is Build01?",
    answer:
      "Build01 is an AI systems and product startup engineering production-grade infrastructure for autonomous work. We design and ship modular products that turn foundation model intelligence into reliable, verified software execution.",
  },
  {
    question: "How does AgentOS relate to Build01?",
    answer:
      "AgentOS (A.01) is one of our core products—our open-source autonomous runtime. It owns the execution loop around coding agents like Claude Code and Codex, orchestrating task planning, deterministic verification, and repo-local state.",
  },
  {
    question: "What other products are in the Build01 portfolio?",
    answer:
      "In addition to AgentOS, Build01 is developing EvalOS (A.02) for deterministic agent quality gates, Context Spine (A.03) for persistent repo-embedded workspace memory, and Swarm Mesh (A.04) for distributed multi-agent fleet dispatch.",
  },
  {
    question: "Is AgentOS available to use right now?",
    answer:
      "Yes. AgentOS is open source and available today. You can install it directly via Cargo with `cargo install agentos-build01 --locked`, or inspect and contribute to the source code on GitHub.",
  },
  {
    question: "What does \"Rent the intelligence, own the loop\" mean?",
    answer:
      "Models like Claude, Codex, and Gemini are swappable commodities that evolve rapidly. Build01 ensures you never lock your architecture or workflows into a single vendor's black box. You rent the model for raw inference, but you own the orchestration loop, contracts, and repository state.",
  },
  {
    question: "Can our engineering team or enterprise partner with Build01?",
    answer:
      "Yes. We collaborate closely with development teams, technology leaders, and enterprises deploying autonomous agent systems. Reach out via our Contact page to discuss your use case, test early releases of our upcoming products, or explore partnerships.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Frequently Asked Questions
        </h2>

        <dl className="flex flex-col gap-8 max-w-3xl">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt className="text-base font-semibold mb-2">{item.question}</dt>
              <dd className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
