"use client";

import { useState, FormEvent } from "react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    track: "agent-os",
    message: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="subpage">
      <section id="contact" className="subpage-hero">
        <div className="grid" aria-hidden="true" />
        <div className="sq" aria-hidden="true" />
        <div className="sq2" aria-hidden="true" />
        <div className="ci" aria-hidden="true" />

        <div className="subpage-shell">
          <div className="contact-layout">
            {/* Left Column: Direct info & narrative */}
            <div>
              <span className="subpage-tag">
                THE NEXT STEP STARTS WITH A CONVERSATION
              </span>

              <h1 className="subpage-title">
                Let&apos;s Build What&apos;s <em>Next.</em>
              </h1>

              <p className="subpage-lead">
                Have an engineering or business challenge that deserves a
                deterministic approach? Whether you want to integrate AgentOS,
                request early access to EvalOS and Context Spine, or explore
                custom product partnerships—our team is ready.
              </p>

              <div className="contact-channels">
                <a
                  href="mailto:contact@build01.com"
                  className="contact-channel"
                >
                  <div>
                    <span className="contact-channel__label">DIRECT EMAIL</span>
                    <strong>contact@build01.com</strong>
                  </div>
                  <span className="arrow">↗</span>
                </a>

                <a
                  href="https://github.com/vikasdeshmukh63/AgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel"
                >
                  <div>
                    <span className="contact-channel__label">OPEN SOURCE REPO</span>
                    <strong>github.com/vikasdeshmukh63/AgentOS</strong>
                  </div>
                  <span className="arrow">↗</span>
                </a>

                <div className="contact-channel" style={{ cursor: "default" }}>
                  <div>
                    <span className="contact-channel__label">RESPONSE TIME SLA</span>
                    <strong>Within 24 business hours</strong>
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Obsidian Terminal Form Card */}
            <div>
              <div className="contact-form-card">
                <div className="contact-form-card__head">
                  <b style={{ background: "#ef4444" }} aria-hidden="true" />
                  <b style={{ background: "#f59e0b" }} aria-hidden="true" />
                  <b style={{ background: "#22c55e" }} aria-hidden="true" />
                  <span>INQUIRY_DISPATCH_CHANNEL</span>
                </div>

                {submitted ? (
                  <div style={{ padding: "48px 32px", textAlign: "center" }}>
                    <div
                      style={{
                        display: "inline-grid",
                        placeItems: "center",
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        background: "rgba(34, 197, 94, 0.15)",
                        border: "1px solid rgba(34, 197, 94, 0.35)",
                        color: "#22c55e",
                        fontSize: 24,
                        margin: "0 auto 20px",
                      }}
                    >
                      ✓
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 10px" }}>
                      Inquiry Dispatched.
                    </h3>
                    <p
                      style={{
                        color: "#8b93a3",
                        fontSize: 15,
                        lineHeight: 1.6,
                        maxWidth: 380,
                        margin: "0 auto 28px",
                      }}
                    >
                      Thank you for reaching out. A systems engineer from our team
                      will review your notes and respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="cta-stage__btn cta-stage__btn--outline"
                      style={{ color: "#ffffff", borderColor: "#2a3248" }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    <div className="contact-field">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="company">Company / Organization</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Autonomous Systems Lab"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="email">Business Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ada@systems.io"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="track">Inquiry Track</label>
                      <select
                        id="track"
                        name="track"
                        value={formData.track}
                        onChange={(e) =>
                          setFormData({ ...formData, track: e.target.value })
                        }
                      >
                        <option value="agent-os">
                          Deploy AgentOS into Developer Workflows
                        </option>
                        <option value="eval-os">
                          Request Early Access to EvalOS &amp; Context Spine
                        </option>
                        <option value="partner">
                          Custom Product &amp; Systems Partnership
                        </option>
                        <option value="general">General Technical Inquiry</option>
                      </select>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="message">Your Objective &amp; Use Case *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about the agents you run, repository constraints, or outcomes you're looking to achieve..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <button type="submit" className="contact-submit">
                      Send Inquiry ↗
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
