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
    <section id="how-it-works" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-xs font-mono tracking-widest uppercase text-orange-500 mb-2">
          Architecture
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          How AgentOS Runs.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-12 text-slate-600 dark:text-slate-400">
          From human intent to verified code commits — a deterministic loop
          engineered for repeatable, safe autonomous workflows.
        </p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col gap-3 p-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <span className="text-xs font-mono font-bold tracking-widest text-orange-500">
                {step.number}
              </span>
              <h3 className="text-base font-semibold">{step.heading}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
