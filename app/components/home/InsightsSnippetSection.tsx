const articles = [
  {
    category: "AI Strategy",
    title: "From AI Experiments to Useful Products",
    brief:
      "Why the path from an impressive demo to a useful business application starts with a clear problem.",
  },
  {
    category: "AI Agents",
    title: "What Makes an AI Agent Useful at Work?",
    brief:
      "Explore the roles of tools, context, workflow design, evaluation, and human oversight.",
  },
  {
    category: "Engineering",
    title: "The Engineering Behind Practical AI",
    brief:
      "An introduction to the considerations that shape AI products beyond the underlying model.",
  },
];

export default function InsightsSnippetSection() {
  return (
    <section id="insights-snippet" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Ideas and Updates.
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <li key={article.title}>
              <p className="text-xs font-mono tracking-widest uppercase mb-3">
                {article.category}
              </p>
              <h3 className="text-base font-semibold mb-2">{article.title}</h3>
              <p className="text-sm leading-relaxed">{article.brief}</p>
              {/* Link each article once /insights pages are published */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
