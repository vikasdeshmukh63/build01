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
  return (
    <section id="product-faq" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Agent OS — Frequently Asked Questions
        </h2>

        <dl className="flex flex-col gap-8 max-w-3xl">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt className="text-base font-semibold mb-2">{item.question}</dt>
              <dd className="text-sm leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
