const pillars = [
  {
    heading: "Autonomous Runtime Mastery",
    body: "We build the software scaffolding that lets AI agents plan, execute, and verify code deterministically—starting with our open-source runtime, AgentOS.",
  },
  {
    heading: "Model-Agnostic Freedom",
    body: "Foundation models evolve continuously. Build01 products ensure your workflows, workspace memory, and execution rules remain permanent and portable.",
  },
  {
    heading: "Repository-Centric State",
    body: "We believe your code, task graphs, and trust records belong in your version-controlled repositories, never trapped inside closed vendor platforms.",
  },
  {
    heading: "An Expanding Systems Ecosystem",
    body: "From individual agent execution with AgentOS to fleet dispatch with Swarm Mesh, Build01 engineers the full stack for dependable autonomy.",
  },
];

export default function WhyBuild01Section() {
  return (
    <section id="why-build01" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Why Build01.
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
          Build01 is founded on a clear conviction: foundation models provide the
          intelligence, but Build01 products provide the systems that make it work.
        </p>
      </div>
    </section>
  );
}
