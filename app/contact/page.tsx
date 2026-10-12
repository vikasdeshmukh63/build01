import type { Metadata } from "next";
import ContactFormSection from "../components/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact Build01 | Get in Touch",
  description:
    "Have a business challenge that deserves a smarter approach? Get in touch with the Build01 team.",
};

export default function ContactPage() {
  return <ContactFormSection />;
}
