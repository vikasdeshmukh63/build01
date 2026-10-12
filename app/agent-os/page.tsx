import type { Metadata } from "next";
import ProductHeroSection from "../components/agent-os/ProductHeroSection";
import ProductProblemSection from "../components/agent-os/ProductProblemSection";
import ProductCapabilitiesSection from "../components/agent-os/ProductCapabilitiesSection";
import HowItWorksSection from "../components/agent-os/HowItWorksSection";
import ProductFAQSection from "../components/agent-os/ProductFAQSection";
import ProductCTASection from "../components/agent-os/ProductCTASection";

export const metadata: Metadata = {
  title: "Agent OS by Build01 | AI Agents for Business",
  description:
    "Explore Agent OS, Build01's flagship AI product focused on AI agents and intelligent workflows for business use.",
};

export default function AgentOSPage() {
  return (
    <>
      {/* 01 — Product hero */}
      <ProductHeroSection />

      {/* 02 — The problem Agent OS addresses */}
      <ProductProblemSection />

      {/* 03 — Product capabilities */}
      <ProductCapabilitiesSection />

      {/* 04 — How it works */}
      <HowItWorksSection />

      {/* 05 — Product FAQs */}
      <ProductFAQSection />

      {/* 06 — Closing CTA */}
      <ProductCTASection />
    </>
  );
}
