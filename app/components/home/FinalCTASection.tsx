import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section id="final-cta" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Eyebrow */}
        <p className="text-xs font-mono tracking-widest uppercase mb-6 text-slate-500">
          The Autonomous Stack Starts Here
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Ready to Build with Build01?
        </h2>

        <p className="text-base leading-relaxed max-w-xl mb-10">
          Whether you want to deploy AgentOS into your developer workflows,
          request early access to EvalOS and Context Spine, or explore custom
          product partnerships—our team is ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 font-semibold bg-foreground text-background border border-current rounded text-center hover:opacity-90 transition-opacity"
          >
            Talk to Build01 ↗
          </Link>
          <Link
            href="/agent-os"
            className="px-6 py-3 font-medium border border-current rounded text-center hover:opacity-80 transition-opacity"
          >
            Explore AgentOS (A.01)
          </Link>
        </div>
      </div>
    </section>
  );
}
