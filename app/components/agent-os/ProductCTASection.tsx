import Link from "next/link";

export default function ProductCTASection() {
  return (
    <section id="product-cta" className="w-full border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to Own Your Agent Loop?
        </h2>

        <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8 text-slate-600 dark:text-slate-400">
          AgentOS is open source, built in Rust, and available on crates.io today.
          Install the CLI, inspect the codebase, or connect with Build01 to discuss
          enterprise agent orchestration.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href="https://github.com/vikasdeshmukh63/AgentOS"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded text-center transition-colors flex items-center justify-center gap-2"
          >
            Star on GitHub <span>↗</span>
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center hover:opacity-80 transition-opacity"
          >
            Contact Build01
          </Link>
        </div>
      </div>
    </section>
  );
}
