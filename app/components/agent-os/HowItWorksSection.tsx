/*
  NOTE: This is a proposed conceptual model, not a confirmed description of
  Agent OS's current execution architecture. Adapt to the real product before launch.
*/

const steps = [
  {
    number: "01",
    heading: "Define the task",
    body: "Establish the business objective and boundaries.",
  },
  {
    number: "02",
    heading: "Provide context",
    body: "Supply the relevant information and permitted tools.",
  },
  {
    number: "03",
    heading: "Execute the workflow",
    body: "Let the configured AI process perform the supported steps.",
  },
  {
    number: "04",
    heading: "Review the outcome",
    body: "Inspect results, evaluate quality, and involve people when necessary.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          How It Works.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          A simple four-step model that describes how Agent OS approaches a
          business task from start to outcome.
        </p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <li key={step.number} className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-widest">{step.number}</span>
              <h3 className="text-base font-semibold">{step.heading}</h3>
              <p className="text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
