const problems = [
  {
    heading: "Disconnected tools.",
    body: "Intelligence often sits apart from the applications and systems where work happens.",
  },
  {
    heading: "Fragmented workflows.",
    body: "Teams still move information between documents, applications, and people to complete complex tasks.",
  },
  {
    heading: "Unclear paths to adoption.",
    body: "Businesses need a practical way to evaluate AI, define appropriate boundaries, and integrate it into everyday work.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          AI Has Potential. Businesses Need Practical Outcomes.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          AI is advancing quickly, but turning that potential into dependable
          business workflows requires more than access to a model.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {problems.map((item) => (
            <li key={item.heading}>
              <h3 className="text-base font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium border-l-2 border-current pl-4">
          Our perspective: AI products should be designed around the work people
          need to accomplish—not just the technology powering them.
        </p>
      </div>
    </section>
  );
}
