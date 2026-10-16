"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logoDarkMode from "../../assets/logo_dark_mode.png";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    const runParallax = () => {
      frame = 0;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const r = footer.getBoundingClientRect();
      const c = r.top + r.height / 2 - vh / 2;

      const parallaxEls = footer.querySelectorAll<HTMLElement>("[data-s]");
      parallaxEls.forEach((el) => {
        let offset = c;
        if (el.classList.contains("word")) {
          offset = Math.max(-vh, Math.min(vh, r.top + r.height - vh));
        }

        const s = parseFloat(el.dataset.s || "0");
        const x = parseFloat(el.dataset.x || "0");

        el.style.transform = `translate3d(${(offset * x).toFixed(1)}px, ${(
          offset * s
        ).toFixed(1)}px, 0)`;
      });
    };

    const scheduleRun = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(runParallax);
      }
    };

    runParallax();
    window.addEventListener("scroll", scheduleRun, { passive: true });
    window.addEventListener("resize", scheduleRun);

    return () => {
      window.removeEventListener("scroll", scheduleRun);
      window.removeEventListener("resize", scheduleRun);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="site-footer" id="foot" ref={footerRef}>
      {/* Background Grid & Atmospheric Glow */}
      <div className="layer grid2" data-s="-0.06" aria-hidden="true" />
      <div className="layer glow" aria-hidden="true" />

      <div className="shell">
        <div className="fg">
          {/* Brand Block */}
          <div>
            <span className="lb">B01</span>
            <div className="brand">
              <Link
                href="/"
                aria-label="Build01 Homepage"
                className="site-footer__brand-link"
              >
                <Image
                  src={logoDarkMode}
                  alt="Build01"
                  className="site-footer__logo"
                  priority={false}
                />
              </Link>
            </div>
            <p>
              <strong>AI Systems &amp; Autonomous Infrastructure.</strong>
              Engineering dependable AI products and autonomous runtimes.
            </p>
          </div>

          {/* Explore Column */}
          <nav className="col" aria-label="Explore links">
            <h4>EXPLORE</h4>
            <Link href="/agent-os">AgentOS (A.01)</Link>
            <Link href="/#our-products">Product Suite</Link>
            <Link href="/about">About Build01</Link>
          </nav>

          {/* Connect Column */}
          <nav className="col" aria-label="Connect links">
            <h4>CONNECT</h4>
            <Link href="/contact">Contact</Link>
            <a
              href="https://github.com/vikasdeshmukh63/AgentOS"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub (AgentOS) ↗
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="shell">
        <div className="fb">
          <div className="fb-copy">
            <span>© 2026 Build01. All rights reserved.</span>
          </div>
          <button
            type="button"
            className="top"
            id="top"
            onClick={scrollToTop}
          >
            Back to top ↑
          </button>
          <Link href="/privacy-policy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
