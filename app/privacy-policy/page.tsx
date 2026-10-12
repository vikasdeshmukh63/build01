import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Build01",
  description:
    "Build01's privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section id="privacy-policy" className="w-full">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm mb-10">
          Last updated: [Placeholder — add publication date before launch]
        </p>

        {/* Introduction */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. Describe who Build01 is,
            which website this policy covers, and that by using the site the
            visitor agrees to this policy.]
          </p>
        </div>

        {/* Data we collect */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Data We Collect</h2>
          <p className="text-sm leading-relaxed mb-3">
            [Placeholder — legal copy to be added. List the categories of
            personal data collected, for example:]
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed flex flex-col gap-1">
            <li>
              Information you submit via the contact form (name, email, company,
              message)
            </li>
            <li>
              Usage data collected automatically (pages visited, browser type,
              IP address)
            </li>
            <li>Cookie and tracking data — see the Cookies section below</li>
          </ul>
        </div>

        {/* How we use your data */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">How We Use Your Data</h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. Describe the lawful basis
            and purposes for processing: responding to inquiries, analytics,
            product communications, etc.]
          </p>
        </div>

        {/* Data sharing */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Data Sharing</h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. State whether data is shared
            with third parties (e.g. analytics providers, CRM tools, hosting
            providers) and under what circumstances.]
          </p>
        </div>

        {/* Cookies */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. Describe the types of
            cookies used (strictly necessary, analytics, marketing), how to
            manage preferences, and any consent mechanism.]
          </p>
        </div>

        {/* Data retention */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. Explain how long data is
            retained and the criteria used to determine retention periods.]
          </p>
        </div>

        {/* Your rights */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. List applicable rights under
            relevant privacy law (e.g. GDPR, CCPA): access, correction,
            deletion, portability, objection, and how to exercise them.]
          </p>
        </div>

        {/* Contact */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            Contact Us About Privacy
          </h2>
          <p className="text-sm leading-relaxed">
            [Placeholder — legal copy to be added. Provide a contact email or
            address for privacy-related requests once confirmed.]
          </p>
        </div>
      </div>
    </section>
  );
}
