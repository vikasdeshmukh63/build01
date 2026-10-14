const problems = [
  {
    heading: "Unbounded Agent Loops.",
    body: "Without deterministic supervisor runtimes, autonomous agents drift, hallucinate tasks, and break architectural boundaries.",
  },
  {
    heading: "Stateless Silos & Prompt Bloat.",
    body: "Intelligence sits isolated in chat windows, forcing teams to manually shuttle context between repositories, tickets, and docs.",
  },
  {
    heading: "Self-Reported Quality.",
    body: "Agents often self-declare tasks as done when tests fail or contracts break. Production workflows require automated, deterministic quality gates.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Raw Models Aren&apos;t Products. Workflows Need Infrastructure.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Foundation models are advancing rapidly, but turning raw intelligence
          into dependable business software requires dedicated product systems—runtimes,
          verifiers, and persistent memory.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {problems.map((item) => (
            <li key={item.heading}>
              <h3 className="text-base font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium border-l-2 border-current pl-4">
          Build01&apos;s Thesis: Autonomous productivity isn&apos;t solved by another
          chat wrapper. It requires dedicated, modular product systems engineered
          for production workloads—starting with AgentOS.
        </p>
      </div>
    </section>
  );
}
