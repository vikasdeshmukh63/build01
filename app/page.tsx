import HeroSection from "./components/home/HeroSection";
import BrandStatementSection from "./components/home/BrandStatementSection";
import HomeHeroTransition from "./components/home/HomeHeroTransition";
import OurProductsSection from "./components/home/OurProductsSection";
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

export default function HomePage() {
  return (
    <>
      <HomeHeroTransition>
        {/* Section 02 — Hero */}
        <HeroSection />

        {/* Section 03 — Brand Statement */}
        <BrandStatementSection />
      </HomeHeroTransition>

      {/* Section 04 — Our Products */}
      <OurProductsSection />

      {/* Section 05 — The Problem */}
      <ProblemSection />

      {/* Section 06 — Product Principles */}
      <ProductPrinciplesSection />

      {/* Section 07 — Use Cases */}
      <UseCasesSection />

      {/* Section 08 — Approach */}
      <ApproachSection />

      {/* Section 09 — Why Build01 */}
      <WhyBuild01Section />

      {/* Section 10 — About Snippet */}
      <AboutSnippetSection />

      {/* Section 11 — Roadmap */}
      <RoadmapSection />

      {/* Section 12 — Insights Snippet */}
      <InsightsSnippetSection />

      {/* Section 13 — FAQ */}
      <FAQSection />

      {/* Section 14 — Final CTA */}
      <FinalCTASection />
    </>
  );
}
