import Link from "next/link";

export default function ProductHeroSection() {
  return (
    <section id="product-hero" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Eyebrow */}
        <p className="text-xs font-mono tracking-widest uppercase mb-6">
          Build01 Product
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Agent OS. Intelligence in Motion.
        </h1>

        <p className="text-lg leading-relaxed max-w-2xl mb-4">
          We&apos;re building Agent OS around a simple idea: AI should help
          businesses move from asking questions to accomplishing meaningful work.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Explore a new approach to AI agents and intelligent workflows,
          designed around practical business needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            {/*
              Use "Request a Demo" only when demos are available.
              Until then: "Get Product Updates" or "Discuss Early Access".
            */}
            Discuss Early Access
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
