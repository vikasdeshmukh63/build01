const steps = [
  {
    label: "Isolate the runtime bottleneck.",
    body: "We pinpoint where autonomous execution breaks down—uncontrolled loops, lost workspace context, or missing verification.",
  },
  {
    label: "Architect specialized products.",
    body: "We build dedicated, composable tools rather than bloated wrappers, ensuring each system handles one job with deterministic reliability.",
  },
  {
    label: "Engineer for local ownership.",
    body: "We build products like AgentOS to run close to your codebase and data—open source, local-first, and free from SaaS lock-in.",
  },
  {
    label: "Validate through production rigor.",
    body: "Every product undergoes continuous testing against real codebases, strict compiler contracts, and live development workloads.",
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Our Approach: Systems Over Speculation.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Building dependable AI products requires disciplined systems engineering,
          not just prompt tweaks.
        </p>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {steps.map((step, index) => (
            <li key={step.label} className="flex gap-4">
              <span className="text-sm font-mono text-slate-400 mt-0.5 shrink-0">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold mb-2">{step.label}</h3>
                <p className="text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-sm font-medium border-l-2 border-current pl-4">
          Our goal at Build01 isn&apos;t to add AI hype to existing software. It&apos;s to
          engineer the foundational systems that make autonomous intelligence dependable.
        </p>
      </div>
    </section>
  );
}
