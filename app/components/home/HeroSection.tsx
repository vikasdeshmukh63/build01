import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-6 py-24 w-full">
      {/* Eyebrow */}
      <p className="text-xs font-mono tracking-widest uppercase mb-6">
        Build01 · AI Product Company
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column: headline + CTAs */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            The Next Era of Work Is Intelligent.
          </h1>
          <p className="text-lg leading-relaxed mb-4">
            We build AI products that help businesses move beyond
            experimentation and put intelligent systems to work.
          </p>
          <p className="text-base leading-relaxed mb-8">
            Meet Agent OS, our flagship product exploring how AI agents can
            become a practical part of modern business workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link
              href="/agent-os"
              className="px-6 py-3 font-medium border border-current rounded text-center"
            >
              Discover Agent OS
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 font-medium border border-current rounded text-center"
            >
              Talk to Build01
            </Link>
          </div>

          <p className="text-sm">
            Built around real business needs. Designed to evolve with AI.
          </p>
        </div>

        {/* Right column: visual placeholder */}
        <div
          className="flex items-center justify-center min-h-64 border border-dashed border-current rounded"
          aria-hidden="true"
        >
          <p className="text-sm text-center px-4">
            [Visual placeholder — precision-engineered mechanical intelligence
            core]
          </p>
        </div>
      </div>
    </section>
  );
}
