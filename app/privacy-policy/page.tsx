import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Build01",
  description:
    "Build01's privacy policy — how we collect, use, and protect your data across our products, websites, and autonomous runtimes.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="subpage">
      <section className="subpage-hero">
        <div className="grid" aria-hidden="true" />
        <div className="sq" aria-hidden="true" />
        <div className="sq2" aria-hidden="true" />
        <div className="ci" aria-hidden="true" />

        <div className="subpage-shell">
          <span className="subpage-tag">LEGAL &amp; COMPLIANCE</span>

          <h1 className="subpage-title">
            Privacy <em>Policy.</em>
          </h1>

          <p className="subpage-lead">
            How Build01 collects, uses, and safeguards developer and
            organizational data across our products, websites, and open-source
            autonomous runtimes.
          </p>

          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "#8b93a3",
              marginBottom: 40,
            }}
          >
            LAST UPDATED: OCTOBER 2026 • REVISION 1.0.4
          </div>

          <div className="privacy-doc">
            <div className="privacy-section">
              <h2>1. Introduction</h2>
              <p>
                Build01 (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
                is dedicated to engineering dependable, repo-native AI systems
                and autonomous runtimes. This Privacy Policy outlines how we
                collect, process, and safeguard information when you visit our
                websites, interact with our communications, or deploy our
                runtimes and tools.
              </p>
            </div>

            <div className="privacy-section">
              <h2>2. Information We Collect</h2>
              <p>We may collect information in the following contexts:</p>
              <ul>
                <li>
                  <strong>Direct Inquiries:</strong> Name, work email address,
                  company affiliation, and message details submitted through our
                  contact and partnership channels.
                </li>
                <li>
                  <strong>Technical Telemetry:</strong> Aggregated, non-personal
                  runtime diagnostic metrics (such as CLI version numbers and OS
                  architecture) when opting into public telemetry in open-source
                  runtimes.
                </li>
                <li>
                  <strong>Log Data:</strong> Standard server access logs,
                  browser user agents, and IP addresses for network defense and
                  infrastructure security.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>3. Repo-Local Architecture &amp; Data Isolation</h2>
              <p>
                A core architectural tenet of Build01 products (including
                AgentOS) is repo-local ownership:
              </p>
              <ul>
                <li>
                  Task plans, memory files, and run traces are written directly
                  into your repository under <code>.agents/</code> on your local
                  machine.
                </li>
                <li>
                  Build01 does not intercept, store, or sell your proprietary
                  source code or prompt history to third parties.
                </li>
                <li>
                  Frontier LLM calls are routed directly to the API providers you
                  configure with your own API credentials.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>4. How We Use Data</h2>
              <p>Information collected is used strictly for:</p>
              <ul>
                <li>Responding to partnership and enterprise runtime inquiries.</li>
                <li>Maintaining the security and stability of our web services.</li>
                <li>
                  Distributing critical security notices and release updates to
                  verified developers.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>5. Cookies &amp; Tracking</h2>
              <p>
                We use strictly essential technical headers to provide smooth
                website delivery. We do not sell user data to advertising networks
                or deploy invasive cross-site tracking scripts.
              </p>
            </div>

            <div className="privacy-section">
              <h2>6. Your Rights &amp; Data Control</h2>
              <p>
                Under applicable privacy laws (such as GDPR and CCPA), you have
                the right to access, rectify, or request deletion of any
                personal information we maintain. To submit a request, contact us
                at{" "}
                <a
                  href="mailto:contact@build01.com"
                  style={{ color: "#ff7a1f", textDecoration: "underline" }}
                >
                  contact@build01.com
                </a>
                .
              </p>
            </div>

            <div className="privacy-section">
              <h2>7. Contact Information</h2>
              <p>
                For questions regarding this policy or our data practices, reach
                out directly to our team via our{" "}
                <Link
                  href="/contact"
                  style={{ color: "#ff7a1f", textDecoration: "underline" }}
                >
                  contact channel
                </Link>{" "}
                or email{" "}
                <a
                  href="mailto:contact@build01.com"
                  style={{ color: "#ff7a1f", textDecoration: "underline" }}
                >
                  contact@build01.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
