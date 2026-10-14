import Link from "next/link";

const useCases = [
  {
    product: "AgentOS — A.01 Live",
    heading: "Autonomous Code Execution & Loop Engineering",
    body: "Drive coding agents like Claude Code or Codex to implement features, fix bugs, and refactor codebases while keeping execution bounded and verified in your repo.",
  },
  {
    product: "EvalOS — A.02 In Dev",
    heading: "Automated Pre-Merge Quality Gates",
    body: "Enforce deterministic contract testing and AST invariant verification on agent-generated diffs before any code merges into production.",
  },
  {
    product: "Context Spine — A.03 In Dev",
    heading: "Persistent Workspace Memory Mesh",
    body: "Maintain repo-embedded durable knowledge that captures architecture decisions and run histories across sessions without prompt bloat or lock-in.",
  },
  {
    product: "Swarm Mesh — A.04 In Dev",
    heading: "Multi-Agent Fleet Orchestration",
    body: "Dispatch parallel tasks across specialist agents with strict dependency graphs, bounded execution environments, and automated handoffs.",
  },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Engineered for Real-World Autonomous Work.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Build01 develops targeted products to power critical stages of the
          autonomous development and operational lifecycle.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {useCases.map((item) => (
            <li key={item.heading} className="flex flex-col">
              <span className="text-xs font-mono tracking-wider uppercase text-slate-500 mb-2">
                {item.product}
              </span>
              <h3 className="text-base font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/agent-os"
            className="inline-block px-6 py-3 font-medium border border-current rounded"
          >
            Explore AgentOS (Live) ↗
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 font-medium border border-current rounded"
          >
            Inquire About Product Suite
          </Link>
        </div>
      </div>
    </section>
  );
}
