const steps = [
  {
    label: "Understand the work.",
    body: "Identify the task, its users, constraints, and the outcome that matters.",
  },
  {
    label: "Choose the right approach.",
    body: "Evaluate where AI, automation, existing software, or a combination of these makes sense.",
  },
  {
    label: "Build with intention.",
    body: "Design the experience, workflow, and technical foundations around the real use case.",
  },
  {
    label: "Learn and improve.",
    body: "Evaluate performance, gather feedback, and refine the solution as requirements evolve.",
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Good AI Starts With the Right Problem.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          We believe building useful AI products requires a balance of
          experimentation, product thinking, and engineering discipline.
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
          Our goal is not to put AI everywhere. It&apos;s to build where
          intelligence makes a meaningful difference.
        </p>
      </div>
    </section>
  );
}
