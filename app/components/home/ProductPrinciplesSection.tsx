const principles = [
  {
    heading: "Task-oriented intelligence",
    body: "Start with a business objective and identify where AI can meaningfully contribute.",
  },
  {
    heading: "Connected workflows",
    body: "Work toward connecting AI capabilities with the steps, tools, and information needed to complete a task.",
  },
  {
    heading: "Human-directed execution",
    body: "Keep people involved in decisions and approvals where context, accountability, or risk requires it.",
  },
  {
    heading: "Responsible by design",
    body: "Treat access, permissions, evaluation, and oversight as important parts of the product design.",
  },
];

export default function ProductPrinciplesSection() {
  return (
    <section id="product-principles" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Built Around the Work That Matters.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-10">
          Agent OS is guided by a product vision focused on making AI more
          useful, connected, and practical in business environments.
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
