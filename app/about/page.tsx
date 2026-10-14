import type { Metadata } from "next";
import AboutContentSection from "../components/about/AboutContentSection";

export const metadata: Metadata = {
  title: "About Build01 | AI Systems & Product Studio",
  description:
    "Learn about Build01, an AI systems company engineering production-grade software and autonomous runtimes.",
};

export default function AboutPage() {
  return <AboutContentSection />;
}
