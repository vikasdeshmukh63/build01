import Link from "next/link";

export default function IntroAgentOSSection() {
  return (
    <section id="intro-agent-os" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Eyebrow */}
        <p className="text-xs font-mono tracking-widest uppercase mb-4">
          Introducing Our Flagship Product
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Meet Agent OS.
        </h2>

        <p className="text-lg font-medium mb-6">
          A new way to think about AI agents at work.
        </p>

        {/* Product visual placeholder */}
        <div
          className="flex items-center justify-center min-h-48 border border-dashed border-current rounded mb-8"
          aria-hidden="true"
        >
          <p className="text-sm text-center px-4">
            [Product visual placeholder — Agent OS interface or diagram]
          </p>
        </div>

        <p className="text-base leading-relaxed max-w-2xl mb-8">
          Build01 is developing Agent OS around the idea that AI should be
          useful beyond a chat window. The product direction is centered on AI
          agents, task-oriented workflows, and the connection between
          intelligent systems and business work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/agent-os"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Explore Agent OS ↗
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Discuss Your Use Case
          </Link>
        </div>
      </div>
    </section>
  );
}
