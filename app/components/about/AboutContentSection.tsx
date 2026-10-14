const approachSteps = [
  {
    number: "01",
    label: "Understand the work.",
    body: "Identify the task, its users, constraints, and the outcome that matters.",
  },
  {
    number: "02",
    label: "Choose the right approach.",
    body: "Evaluate where AI, automation, existing software, or a combination of these makes sense.",
  },
  {
    number: "03",
    label: "Build with intention.",
    body: "Design the experience, workflow, and technical foundations around the real use case.",
  },
  {
    number: "04",
    label: "Learn and improve.",
    body: "Evaluate performance, gather feedback, and refine the solution as requirements evolve.",
  },
];

export default function AboutContentSection() {
  return (
    <>
      {/* Company introduction */}
      <section id="about-intro" className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            We Build for What Comes Next.
          </h1>

          <p className="text-base leading-relaxed max-w-2xl mb-4">
            Build01 is an AI systems and product company engineering
            production-grade software and autonomous runtimes.
          </p>

          <p className="text-base leading-relaxed max-w-2xl mb-4">
            We believe the opportunity in AI extends beyond individual prompts
            and isolated chatbots. It lies in creating modular, high-performance
            product systems that govern planning, execution, verification, and
            workspace state.
          </p>

          <p className="text-base leading-relaxed max-w-2xl mb-4">
            AgentOS is our first product in production, pioneering loop-engineering
            for autonomous coders. Backed by an expanding suite of upcoming
            tools—including EvalOS, Context Spine, and Swarm Mesh—Build01 delivers
            the infrastructure developers need to orchestrate intelligence reliably.
          </p>

          <p className="text-base leading-relaxed max-w-2xl mb-10">
            As we grow our product portfolio, our commitment remains fixed:
            disciplined software engineering, deterministic verification, and
            total repository-level control.
          </p>

          {/* Mission + Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-mono tracking-widest uppercase mb-3">
                Our Mission
              </h2>
              <p className="text-base leading-relaxed">
                Engineer open, dependable systems that turn foundation model
                intelligence into production-grade autonomous execution.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-mono tracking-widest uppercase mb-3">
                Our Vision
              </h2>
              <p className="text-base leading-relaxed">
                A future where engineers and enterprises orchestrate fleets of
                verified, intelligent agents with total clarity, control, and
                repository-level ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="about-approach" className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Good AI Starts With the Right Problem.
          </h2>

          <p className="text-base leading-relaxed max-w-2xl mb-10">
            We believe building useful AI products requires a balance of
            experimentation, product thinking, and engineering discipline.
          </p>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {approachSteps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="text-sm font-mono text-slate-400 mt-0.5 shrink-0">
                  {step.number}
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
    </>
  );
}
