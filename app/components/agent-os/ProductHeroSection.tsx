import Link from "next/link";

export default function ProductHeroSection() {
  return (
    <section id="product-hero" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Eyebrow & Live badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <p className="text-xs font-mono tracking-widest uppercase text-slate-400">
            Build01 Product / A.01 Autonomous Runtime
          </p>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            LIVE &amp; OPEN SOURCE
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          AgentOS. <br className="hidden sm:inline" />
          <span className="text-orange-500">Rent the intelligence.</span> Own the loop.
        </h1>

        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mb-4 font-normal text-slate-700 dark:text-slate-300">
          AgentOS owns the loop around the coding agents you already run. Describe
          intent in a few sentences; AgentOS plans it into tasks, drives Claude Code or
          Codex as interchangeable workers, verifies every result deterministically, and
          keeps the plan, memory, trust record, and handoffs in your repo.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-8 text-slate-500 dark:text-slate-400">
          You rent the model; you own the loop. Open source and built for developer autonomy.
        </p>

        {/* Install command bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl p-3 mb-10 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-sm">
          <span className="text-slate-400 select-none">$</span>
          <code className="text-orange-600 dark:text-orange-400 flex-1 font-semibold select-all">
            cargo install agentos-build01 --locked
          </code>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://github.com/vikasdeshmukh63/AgentOS"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded text-center transition-colors flex items-center justify-center gap-2"
          >
            View on GitHub <span>↗</span>
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center hover:opacity-80 transition-opacity"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
