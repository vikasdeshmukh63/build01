const articles = [
  {
    category: "Loop Engineering",
    title: "Rent the Intelligence, Own the Loop",
    brief:
      "Why swapping foundation models as interchangeable workers while anchoring execution loops and repository state is the future of autonomous engineering.",
  },
  {
    category: "Verification Systems",
    title: "Why Agents Require Deterministic Quality Gates",
    brief:
      "How EvalOS and automated contract verification eliminate hallucinated completion and scope drift in AI-generated pull requests.",
  },
  {
    category: "Product Architecture",
    title: "The Multi-Product Stack for Autonomous Workflows",
    brief:
      "Why single-model chatbots fail at enterprise complexity, and how composable runtimes, memory meshes, and fleet routers succeed.",
  },
];

export default function InsightsSnippetSection() {
  return (
    <section id="insights-snippet" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Insights &amp; Systems Engineering.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Essays, technical deep-dives, and perspectives from the Build01 product team.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <li key={article.title}>
              <p className="text-xs font-mono tracking-widest uppercase mb-3 text-slate-500">
                {article.category}
              </p>
              <h3 className="text-base font-semibold mb-2">{article.title}</h3>
              <p className="text-sm leading-relaxed">{article.brief}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
