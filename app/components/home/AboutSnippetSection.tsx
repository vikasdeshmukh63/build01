import Link from "next/link";

export default function AboutSnippetSection() {
  return (
    <section id="about-snippet" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          We Build for What Comes Next.
        </h2>

        <p className="text-base leading-relaxed max-w-2xl mb-4">
          Build01 is an AI product company focused on creating intelligent
          software for real-world business needs.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-4">
          We believe the opportunity in AI extends beyond individual prompts and
          isolated tools. It lies in creating products that help people interact
          with information, approach complex tasks, and connect intelligence to
          meaningful work.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-4">
          Agent OS is our first step toward that vision.
        </p>

        <p className="text-base leading-relaxed max-w-2xl mb-8">
          As we build, our focus remains on practical use cases, thoughtful
          engineering, and the opportunity to make AI more useful in everyday
          business operations.
        </p>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">Our mission</p>
          <p className="text-sm leading-relaxed">
            Build AI products that turn technological progress into practical
            value.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold mb-1">Our vision</p>
          <p className="text-sm leading-relaxed">
            A world where intelligent software helps people and businesses
            accomplish more with clarity, control, and purpose.
          </p>
        </div>

        <Link
          href="/about"
          className="inline-block px-6 py-3 font-medium border border-current rounded"
        >
          Learn About Build01
        </Link>
      </div>
    </section>
  );
}
