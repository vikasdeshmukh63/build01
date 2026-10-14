const capabilities = [
  {
    area: "Loop Engineering & Task Planning",
    messaging:
      "Translates intent into immutable draft proposals and inspectable semantic diffs before applying any changes to your repository.",
    tag: "Planning",
  },
  {
    area: "Interchangeable Worker Dispatch",
    messaging:
      "Drives Claude Code, Codex, and other LLMs as swappable commodity workers. You retain full control over the execution harness.",
    tag: "Workers",
  },
  {
    area: "Deterministic Verification",
    messaging:
      "Evaluates generated code against test suites, schema contracts, and scope drift from git diffs so completion is never self-reported.",
    tag: "Gates",
  },
  {
    area: "Repo-Local Knowledge Mesh",
    messaging:
      "Durable facts, architectural decisions, and run checkpoints stay in .agents/memory/ and .agents/runs/ without prompt bloat.",
    tag: "Memory",
  },
  {
    area: "Guarded Feedback Cycles",
    messaging:
      "When a validation fails, AgentOS captures the failure log and feeds it into the next attempt, bounded by configured loop limits.",
    tag: "Reliability",
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
    <section id="product-capabilities" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-orange-500 mb-2">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Engineered for Autonomous Execution.
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Six architectural pillars designed to make AI coding agents dependable,
            inspectable, and repo-native.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <li
              key={cap.area}
              className="p-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-3 block">
                  {cap.tag}
                </span>
                <h3 className="text-base font-semibold mb-2">{cap.area}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {cap.messaging}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
