import Link from "next/link";

export default function AboutSnippetSection() {
  return (
    <section id="about-snippet" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          We Build for What Comes Next.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-4">
          Build01 is an AI systems company engineering production-grade
          software and autonomous runtimes.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-4">
          We believe the opportunity in AI extends beyond individual prompts
          and closed chat interfaces. It lies in creating modular, high-performance
          product systems that govern planning, execution, verification, and
          workspace state.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-4">
          AgentOS is our first product in production, pioneering loop-engineering
          for autonomous coders. Backed by an expanding suite of upcoming
          tools—including EvalOS, Context Spine, and Swarm Mesh—Build01 delivers
          the infrastructure developers need to orchestrate intelligence reliably.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-8">
          As we grow our product portfolio, our commitment remains fixed:
          disciplined software engineering, deterministic verification, and
          total repository-level control.
        </p>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">Our mission</p>
          <p className="text-sm leading-relaxed">
            Engineer open, dependable systems that turn foundation model
            intelligence into production-grade autonomous execution.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold mb-1">Our vision</p>
          <p className="text-sm leading-relaxed">
            A future where engineers and enterprises orchestrate fleets of
            verified, intelligent agents with total clarity, control, and
            repository-level ownership.
          </p>
        </div>

        <Link
          href="/about"
          className="inline-block px-6 py-3 font-medium border border-current rounded"
        >
          Learn About Build01 ↗
        </Link>
      </div>
    </section>
  );
}
