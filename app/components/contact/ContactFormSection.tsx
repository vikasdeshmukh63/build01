"use client";

import { useState, FormEvent } from "react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /*
      TODO: Wire up form submission to your backend, CRM, or email service.
      Do not ship without spam protection (e.g. honeypot, CAPTCHA, rate limiting).
    */
    setSubmitted(true);
  }

  return (
    <section id="contact" className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Eyebrow */}
        <p className="text-xs font-mono tracking-widest uppercase mb-6">
          The Next Step Starts With a Conversation
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          Let&apos;s Build What&apos;s Next.
        </h1>

        <p className="text-base leading-relaxed max-w-xl mb-12">
          Have a business challenge that deserves a smarter approach? Tell us
          what you&apos;re working on, and let&apos;s explore the
          possibilities.
        </p>

        {submitted ? (
          <div role="alert" className="max-w-xl">
            <p className="text-base font-semibold mb-2">Message received.</p>
            <p className="text-sm leading-relaxed">
              Thanks for reaching out. We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 max-w-xl"
            noValidate
          >
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="px-3 py-2 border border-current rounded text-sm bg-transparent"
                placeholder="Your full name"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-1">
              <label htmlFor="company" className="text-sm font-medium">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="px-3 py-2 border border-current rounded text-sm bg-transparent"
                placeholder="Your company or organisation"
              />
            </div>

            {/* Business email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Business email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="px-3 py-2 border border-current rounded text-sm bg-transparent"
                placeholder="you@company.com"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm font-medium">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="px-3 py-2 border border-current rounded text-sm bg-transparent resize-y"
                placeholder="Tell us what you're working on and how we can help."
              />
            </div>

            <button
              type="submit"
              className="self-start px-6 py-3 font-medium border border-current rounded"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
