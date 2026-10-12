const faqs = [
  {
    question: "What is Agent OS?",
    answer:
      "Agent OS is Build01's flagship AI product. We're developing it around the idea that AI should help businesses move from asking questions to accomplishing meaningful work — through AI agents, task-oriented workflows, and practical integrations.",
  },
  {
    question: "Who is Agent OS for?",
    answer:
      "Agent OS is designed for business leaders, operations teams, IT decision-makers, and enterprises looking to put AI to work in practical, well-defined ways.",
  },
  {
    question: "Is Agent OS available now?",
    answer:
      "[Placeholder — replace with current availability status from the Agent OS product team.]",
  },
  {
    question: "What integrations does Agent OS support?",
    answer:
      "[Placeholder — replace with confirmed integration information from the Agent OS product team.]",
  },
  {
    question: "How does Agent OS handle security and access control?",
    answer:
      "[Placeholder — replace with accurate security and access control information once confirmed.]",
  },
  {
    question: "How does human oversight work in Agent OS?",
    answer:
      "Agent OS is being designed to keep people involved in decisions and approvals where context, accountability, or risk requires it. Specific oversight controls will be documented as the product matures.",
  },
  {
    question: "How do I get access or request a demo?",
    answer:
      "Contact the Build01 team via our Contact page. We'll discuss your use case and determine whether Agent OS is the right fit.",
  },
];

export default function ProductFAQSection() {
  return (
    <section id="product-faq" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Agent OS — Frequently Asked Questions
        </h2>

        <dl className="flex flex-col gap-8 max-w-3xl">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt className="text-base font-semibold mb-2">{item.question}</dt>
              <dd className="text-sm leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
