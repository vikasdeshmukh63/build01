const principles = [
  {
    heading: "Rent the intelligence. Own the loop.",
    body: "Foundation models are swappable commodities. You shouldn't be locked into a single vendor's closed stack—your execution loops, rules, and workflows must belong to you.",
  },
  {
    heading: "Deterministic verification over blind trust.",
    body: "Never rely on self-reported agent completion. Every change must be validated against automated tests, strict contracts, and deterministic quality gates.",
  },
  {
    heading: "Repo-local, durable state.",
    body: "Task planning, architectural decisions, and trust records belong inside your version-controlled repository, eliminating prompt bloat and ephemeral context.",
  },
  {
    heading: "Modular, composable systems.",
    body: "Instead of a fragile monolith, Build01 engineers focused, interoperable products that solve distinct bottlenecks across the autonomous lifecycle.",
  },
];

export default function ProductPrinciplesSection() {
  return (
    <section id="product-principles" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          How We Build at Build01.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Every product we develop—from our autonomous runtime AgentOS to
          verification harnesses and persistent memory—is guided by four
          foundational engineering principles.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((item) => (
            <li key={item.heading}>
              <h3 className="text-base font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
