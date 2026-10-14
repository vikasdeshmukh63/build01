export default function ProductProblemSection() {
  return (
    <section id="product-problem" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          A Loop That Forgets Is Just a Wrapper.
        </h2>

        <p className="text-base md:text-lg leading-relaxed max-w-3xl mb-6 text-slate-700 dark:text-slate-300">
          Most developers and teams run AI agents through ephemeral terminal chats or
          closed vendor wrappers. When a session terminates, the reasoning is lost,
          task progress cannot be verified deterministically, and code changes lack
          an inspectable audit trail.
        </p>

        <p className="text-base leading-relaxed max-w-3xl mb-6 text-slate-600 dark:text-slate-400">
          AgentOS solves this by flipping the ownership model: <strong>you rent the model,
          but you own the execution loop</strong>. Intent is translated into immutable drafts,
          workers like Claude Code or Codex are driven interchangeably as compute, and all
          memory, trust records, and handoffs remain permanently checked into your repository.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-semibold text-sm mb-2 text-orange-600 dark:text-orange-400">No Vendor Lock-In</h3>
            <p className="text-xs leading-relaxed text-slate-500">Swap frontier LLMs and worker runners without changing your task pipelines or plan structures.</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2 text-orange-600 dark:text-orange-400">Deterministic Gates</h3>
            <p className="text-xs leading-relaxed text-slate-500">Automated evaluators test against contracts, test suites, and git diff invariants before acceptance.</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2 text-orange-600 dark:text-orange-400">Repo-Local Knowledge</h3>
            <p className="text-xs leading-relaxed text-slate-500">Durable facts, architectural decisions, and run checkpoints stay in <code>.agents/memory/</code> in your repo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
