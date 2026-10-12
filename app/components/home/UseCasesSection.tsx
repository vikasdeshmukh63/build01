import Link from "next/link";

const useCases = [
  {
    heading: "Document and Knowledge Work",
    body: "Explore how AI can help people find information, analyze documents, and organize relevant findings.",
  },
  {
    heading: "Business Process Automation",
    body: "Identify repeatable processes where intelligent assistance and coordinated steps may reduce manual effort.",
  },
  {
    heading: "Research and Analysis",
    body: "Investigate how AI agents can gather information, structure findings, and assist with complex knowledge tasks.",
  },
  {
    heading: "Connected Business Applications",
    body: "Explore workflows that involve multiple systems, with appropriate permissions and human review.",
  },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          From Repetitive Tasks to Intelligent Workflows.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          AI agents can support many types of business work. We are interested
          in the practical opportunities where reasoning, tools, and structured
          workflows can make a difference.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {useCases.map((item) => (
            <li key={item.heading}>
              <h3 className="text-base font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/agent-os"
          className="inline-block px-6 py-3 font-medium border border-current rounded"
        >
          Explore Agent OS
        </Link>
      </div>
    </section>
  );
}
