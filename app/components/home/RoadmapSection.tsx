const phases = [
  {
    code: "A.01 · LIVE",
    label: "AgentOS — Runtime",
    body: "Our foundational loop-engineering runtime. Directs Claude Code and Codex with deterministic verification, task planning, and repo-local state.",
  },
  {
    code: "A.02 · IN DEV",
    label: "EvalOS — Quality Gate",
    body: "Deterministic agent evaluation harness. Validates code against strict contracts and AST invariants before merge, eliminating self-reported success.",
  },
  {
    code: "A.03 · IN DEV",
    label: "Context Spine — Memory",
    body: "Durable workspace knowledge mesh. Embeds persistent memory, decision logs, and project history into repositories without token bloat.",
  },
  {
    code: "A.04 · PLANNED",
    label: "Swarm Mesh — Dispatch",
    body: "Distributed fleet router. Coordinates multi-agent teams with dependency graphs, bounded execution scopes, and automated handoffs.",
  },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          The Build01 Product Roadmap.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-8">
          Our systems trajectory: from autonomous execution runtimes to
          deterministic quality gates and fleet coordination.
        </p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {phases.map((phase) => (
            <li key={phase.label} className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-500 font-semibold">
                {phase.code}
              </span>
              <h3 className="text-base font-semibold">{phase.label}</h3>
              <p className="text-sm leading-relaxed">{phase.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
