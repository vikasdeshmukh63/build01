const pillars = [
  {
    heading: "Product before hype",
    body: "We start with the problem to be solved rather than the latest AI trend.",
  },
  {
    heading: "Engineering alongside intelligence",
    body: "We believe useful AI products require thoughtful software design, integration, testing, and ongoing improvement.",
  },
  {
    heading: "Designed for practical adoption",
    body: "We consider the people, processes, and existing systems that AI products need to work with.",
  },
  {
    heading: "Curiosity with accountability",
    body: "We embrace experimentation while recognizing the importance of evaluation, security, and appropriate human oversight.",
  },
];

export default function WhyBuild01Section() {
  return (
    <section id="why-build01" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Built With Purpose. Focused on What Matters.
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {pillars.map((item) => (
            <li key={item.heading}>
              <h3 className="text-base font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium border-l-2 border-current pl-4">
          We&apos;re building Build01 around a simple belief: the best AI
          products make complex work more manageable.
        </p>
      </div>
    </section>
  );
}
