/*
  NOTE: Only publish cards for features that exist in the current version of Agent OS.
  Each card below is a proposed capability area — replace messaging with accurate
  descriptions and remove any capability not yet supported.
*/

const capabilities = [
  {
    area: "Agent orchestration",
    messaging: "Coordinate AI-driven tasks and workflow steps.",
    requirement: "Verify actual orchestration support before publishing.",
  },
  {
    area: "Tool integration",
    messaging: "Connect agents to approved tools and services.",
    requirement: "Name supported integrations accurately.",
  },
  {
    area: "Workflow management",
    messaging: "Structure multistep tasks into understandable processes.",
    requirement: "Confirm the current workflow interface.",
  },
  {
    area: "Human oversight",
    messaging: "Allow review or approval where needed.",
    requirement: "Verify available controls.",
  },
  {
    area: "Monitoring and evaluation",
    messaging: "Assess task execution and output quality.",
    requirement: "Confirm implemented logging and evaluation.",
  },
  {
    area: "Access and security",
    messaging: "Apply appropriate access boundaries to AI operations.",
    requirement: "Document actual security controls.",
  },
];

export default function ProductCapabilitiesSection() {
  return (
    <section id="product-capabilities" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          What Agent OS Is Being Built to Do.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Agent OS is designed around six core capability areas. Each is
          intended to address a practical gap in how businesses work with AI
          today.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <li key={cap.area}>
              <h3 className="text-base font-semibold mb-2">{cap.area}</h3>
              <p className="text-sm leading-relaxed">{cap.messaging}</p>
              {/* Development note (remove before launch): {cap.requirement} */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
