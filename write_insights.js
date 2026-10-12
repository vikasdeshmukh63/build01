const fs = require('fs');
const content = `import Link from "next/link";

export default function InsightsSnippetSection() {
  const articles = [
    {
      category: "AI Strategy",
      title: "From AI Experiments to Useful Products",
      summary:
        "Why the path from an impressive demo to a useful business application starts with a clear problem.",
      slug: "from-ai-experiments-to-useful-products",
    },
    {
      category: "AI Agents",
      title: "What Makes an AI Agent Useful at Work?",
      summary:
        "Explore the roles of tools, context, workflow design, evaluation, and human oversight.",
      slug: "what-makes-an-ai-agent-useful-at-work",
    },
    {
      category: "Engineering",
      title: "The Engineering Behind Practical AI",
      summary:
        "An introduction to the considerations that shape AI products beyond the underlying model.",
      slug: "the-engineering-behind-practical-ai",
    },
  ];

  return (
    <section id="insights" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight mb-10 sm:text-4xl">
        Insights
      </h2>

      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-gray-500 mb-2">
              {a.category}
            </p>
            <h3 className="font-semibold mb-2">{a.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{a.summary}</p>
            {/* Links to /insights/[slug] — page to be added in a later phase */}
            <Link
              href={\`/insights/\${a.slug}\`}
              className="text-sm font-medium underline"
            >
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
`;
fs.writeFileSync('e:\\build01\\app\\components\\home\\InsightsSnippetSection.tsx', content, 'utf8');
console.log('InsightsSnippetSection.tsx written');
