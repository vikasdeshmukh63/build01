import type { Metadata } from "next";
import AboutContentSection from "../components/about/AboutContentSection";

export const metadata: Metadata = {
  title: "About Build01 | Building Practical AI Products",
  description:
    "Learn about Build01, an AI product company focused on creating intelligent software for real-world business needs.",
};

export default function AboutPage() {
  return <AboutContentSection />;
}
