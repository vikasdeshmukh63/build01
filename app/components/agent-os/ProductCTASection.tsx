import Link from "next/link";

export default function ProductCTASection() {
  return (
    <section id="product-cta" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Explore What Agent OS Could Do for Your Business.
        </h2>

        <p className="text-base leading-relaxed max-w-xl mb-10">
          Every business has workflows that deserve a better approach.
          Let&apos;s discuss your use case and determine whether Agent OS is
          the right fit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Discuss Agent OS
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 font-medium border border-current rounded text-center"
          >
            Contact Build01
          </Link>
        </div>
      </div>
    </section>
  );
}
