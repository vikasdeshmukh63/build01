import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section id="final-cta" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Eyebrow */}
        <p className="text-xs font-mono tracking-widest uppercase mb-6">
          The Next Step Starts With a Conversation
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Let&apos;s Build What&apos;s Next.
        </h2>

        <p className="text-base leading-relaxed max-w-xl mb-10">
          Have a business challenge that deserves a smarter approach? Tell us
          what you&apos;re working on, and let&apos;s explore the
          possibilities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Talk to Build01 ↗
          </Link>
          <Link
            href="/agent-os"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Discover Agent OS
          </Link>
        </div>
      </div>
    </section>
  );
}
