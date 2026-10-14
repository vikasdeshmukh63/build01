import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo_light_mode.png";

export default function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-section__decoration" aria-hidden="true">
        <span className="hero-section__shape hero-section__shape--square" />
        <span className="hero-section__shape hero-section__shape--tilted" />
        <span className="hero-section__shape hero-section__shape--circle" />
      </div>

      <div className="hero-section__content">
        <p className="hero-section__eyebrow">
          AI Systems &amp; Product Studio
        </p>

        <h1 className="hero-section__heading">
          <Image
            src={logo}
            alt="Build01"
            priority
            className="hero-section__logo"
          />
        </h1>

        <p className="hero-section__description">
          Build01 engineers production-grade AI products and autonomous
          infrastructure. AgentOS is our first runtime product—part of an
          expanding suite built to turn intelligence into verified, dependable
          execution.
        </p>

        <div className="hero-section__actions">
          <Link href="/agent-os">Explore AgentOS (A.01)</Link>
          <Link href="/contact">Talk to Build01</Link>
        </div>
      </div>

      {/* <Link className="hero-section__scroll" href="#brand-statement">
        Scroll to explore
        <span aria-hidden="true" />
      </Link> */}
    </section>
  );
}
