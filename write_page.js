const fs = require('fs');
const content = `import HeroSection from "./components/home/HeroSection";
import BrandStatementSection from "./components/home/BrandStatementSection";
import IntroAgentOSSection from "./components/home/IntroAgentOSSection";
import ProblemSection from "./components/home/ProblemSection";
import ProductPrinciplesSection from "./components/home/ProductPrinciplesSection";
import UseCasesSection from "./components/home/UseCasesSection";
import ApproachSection from "./components/home/ApproachSection";
import WhyBuild01Section from "./components/home/WhyBuild01Section";
import AboutSnippetSection from "./components/home/AboutSnippetSection";
import RoadmapSection from "./components/home/RoadmapSection";
import InsightsSnippetSection from "./components/home/InsightsSnippetSection";
import FAQSection from "./components/home/FAQSection";
import FinalCTASection from "./components/home/FinalCTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build01 | AI Products Built for Work",
  description:
    "Build01 creates AI products for business. Discover Agent OS and our approach to AI agents, intelligent workflows, and practical AI adoption.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatementSection />
      <IntroAgentOSSection />
      <ProblemSection />
      <ProductPrinciplesSection />
      <UseCasesSection />
      <ApproachSection />
      <WhyBuild01Section />
      <AboutSnippetSection />
      <RoadmapSection />
      <InsightsSnippetSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
`;
fs.writeFileSync('e:\\build01\\app\\page.tsx', content, 'utf8');
console.log('page.tsx written');
