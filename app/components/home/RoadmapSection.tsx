const phases = [
  {
    label: "Understand",
    body: "Learn from real business problems and identify high-value AI opportunities.",
  },
  {
    label: "Build",
    body: "Develop Agent OS around a clear initial use case.",
  },
  {
    label: "Validate",
    body: "Evaluate usefulness, quality, reliability, and user experience.",
  },
  {
    label: "Evolve",
    body: "Use evidence and feedback to guide future capabilities.",
  },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          A Product Built to Evolve.
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {phases.map((phase, index) => (
            <li key={phase.label} className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-widest uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold">{phase.label}</h3>
              <p className="text-sm leading-relaxed">{phase.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
