const faqs = [
  {
    question: "What is Build01?",
    answer:
      "Build01 is an AI product company focused on creating intelligent software for real-world business needs. Our first product is Agent OS.",
  },
  {
    question: "What is Agent OS?",
    answer:
      "Agent OS is Build01's flagship product. We're developing it around the idea that AI should help businesses move from asking questions to accomplishing meaningful work — through AI agents, task-oriented workflows, and practical integrations.",
  },
  {
    question: "Who is Agent OS for?",
    answer:
      "Agent OS is designed for business leaders, operations teams, IT decision-makers, and enterprises exploring practical AI adoption.",
  },
  {
    question: "Is Agent OS available now?",
    answer:
      "[Placeholder — replace with current availability status from the Agent OS product team.]",
  },
  {
    question: "Can Agent OS integrate with our existing systems?",
    answer:
      "[Placeholder — replace with confirmed integration information from the Agent OS product team.]",
  },
  {
    question: "Does Build01 offer custom AI development services?",
    answer:
      "[Placeholder — replace with accurate service information once confirmed.]",
  },
  {
    question: "How can our business get involved?",
    answer:
      "Reach out via our Contact page. We're happy to discuss your use case and explore whether Agent OS is the right fit.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Frequently Asked Questions
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
