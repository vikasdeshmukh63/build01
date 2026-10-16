"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function FinalCTASection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setIsRevealed(true);
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsRevealed(true);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      io.observe(stage);
    }

    // Parallax scrolling for floating geometric layers & entry over previous section (#faq)
    let frame = 0;
    const runParallax = () => {
      frame = 0;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const isMobile = window.innerWidth <= 900;
      const sr = stage.getBoundingClientRect();
      const sc = sr.top + sr.height / 2 - vh / 2;

      // 1. Floating parallax layers
      const parallaxEls = stage.querySelectorAll<HTMLElement>("[data-s]");
      parallaxEls.forEach((el) => {
        const s = parseFloat(el.dataset.s || "0");
        const x = parseFloat(el.dataset.x || "0");
        const isSq = el.classList.contains("sq");

        el.style.transform = `translate3d(${(sc * x).toFixed(1)}px, ${(
          sc * s
        ).toFixed(1)}px, 0)${isSq ? " rotate(10deg)" : ""}`;
      });

      // 2. Parallax entry transition over previous section (#faq)
      const prevSection = document.getElementById("faq");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".faq-stage__inner") ||
        prevSection;

      if (prevInner && prevSection && !isMobile) {
        const stageTop = sr.top;
        // progress 0 (cta-stage is below viewport) -> 1 (cta-stage top reaches 0, fully covering faq)
        const progress = Math.min(1, Math.max(0, (vh - stageTop) / vh));

        if (progress > 0 && progress < 1) {
          // Scale down curve: smoothly shrinks from 1.0 down to ~0.65
          const scaleProgress = Math.min(1, Math.max(0, progress));
          const scale = 1 - 0.35 * Math.sin((scaleProgress * Math.PI) / 2);

          // Gentle upward parallax lift as elements shrink
          const offset = -32 * Math.min(1, Math.pow(progress, 0.9));

          // Vanish / dissolve curve
          let opacity = 1;
          if (progress <= 0.12) {
            opacity = 1;
          } else if (progress >= 0.82) {
            opacity = 0;
          } else {
            const fadeProgress = (progress - 0.12) / (0.82 - 0.12);
            opacity = Math.max(0, 1 - Math.pow(fadeProgress, 1.25));
          }

          // Counteract window scroll to pin prevInner firmly in viewport
          const pinY = progress * vh;
          const totalY = pinY + offset;

          // Stable vertical center of viewport relative to prevSection
          const unpinnedSectionTop =
            prevSection.getBoundingClientRect().top + progress * vh;
          const originY = Math.max(0, vh / 2 - unpinnedSectionTop);

          prevInner.style.transformOrigin = `center ${originY.toFixed(0)}px`;
          prevInner.style.transform = `translate3d(0, ${totalY.toFixed(
            1,
          )}px, 0) scale(${scale.toFixed(4)})`;
          prevInner.style.opacity = opacity.toFixed(4);
          prevInner.style.willChange = "transform, opacity";
          prevInner.style.pointerEvents = progress >= 0.82 ? "none" : "auto";
          prevInner.style.visibility = "visible";
        } else if (progress >= 1) {
          prevInner.style.pointerEvents = "none";
          prevInner.style.visibility = "hidden";
        } else {
          // progress <= 0
          prevInner.style.removeProperty("transform");
          prevInner.style.removeProperty("opacity");
          prevInner.style.removeProperty("transform-origin");
          prevInner.style.removeProperty("will-change");
          prevInner.style.pointerEvents = "";
          prevInner.style.visibility = "";
        }
      }
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

      const prevSection = document.getElementById("faq");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".faq-stage__inner") ||
        prevSection;
      if (prevInner) {
        prevInner.style.removeProperty("transform");
        prevInner.style.removeProperty("opacity");
        prevInner.style.removeProperty("transform-origin");
        prevInner.style.removeProperty("will-change");
        prevInner.style.pointerEvents = "";
        prevInner.style.visibility = "";
      }
    };
  }, []);

  return (
    <section className="cta-stage stage" id="final-cta" ref={stageRef}>
      <div className="cta-stage__inner">
        {/* Floating Parallax Geometric Layers */}
        <div className="layer grid" data-s="-0.1" aria-hidden="true" />
        <div
          className="layer ghost"
          data-s="0.05"
          data-x="-0.3"
          aria-hidden="true"
        >
          BUILD
        </div>
        <div className="layer sq" data-s="0.14" aria-hidden="true" />
        <div className="layer sq2" data-s="-0.22" aria-hidden="true" />
        <div className="layer ci" data-s="-0.16" aria-hidden="true" />

        <div className="shell">
          <div className="cg">
            {/* Left Column: Heading and CTAs */}
            <div className={`rv ${isRevealed ? "show" : ""}`}>
              <span className="tag">THE AUTONOMOUS STACK STARTS HERE</span>
              <h2>
                Ready to Build with <em>Build01?</em>
              </h2>
              <p className="lead">
                Whether you want to deploy AgentOS into your developer
                workflows, request early access to EvalOS and Context Spine, or
                explore custom product partnerships—our team is ready.
              </p>
              <div className="cta-stage__btns">
                <Link
                  className="cta-stage__btn cta-stage__btn--dark"
                  href="/contact"
                >
                  Talk to Build01 ↗
                </Link>
                <Link
                  className="cta-stage__btn cta-stage__btn--outline"
                  href="/agent-os"
                >
                  Explore AgentOS (A.01)
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Path Chooser */}
            <div
              className={`cta-stage__opts rv ${isRevealed ? "show" : ""}`}
              style={{ transitionDelay: "0.15s" }}
            >
              <div className="cta-stage__oh">
                <b style={{ background: "#ef4444" }} aria-hidden="true" />
                <b style={{ background: "#f59e0b" }} aria-hidden="true" />
                <b style={{ background: "#22c55e" }} aria-hidden="true" />
                <span>CHOOSE YOUR PATH</span>
              </div>
              <Link className="cta-stage__opt" href="/agent-os">
                <i>A.01</i>
                <div>
                  <strong>Deploy AgentOS</strong>
                  <small>Into your developer workflows</small>
                </div>
                <em>↗</em>
              </Link>
              <Link className="cta-stage__opt" href="/contact">
                <i>A.02/03</i>
                <div>
                  <strong>Request early access</strong>
                  <small>EvalOS and Context Spine</small>
                </div>
                <em>↗</em>
              </Link>
              <Link className="cta-stage__opt" href="/contact">
                <i>PARTNER</i>
                <div>
                  <strong>Custom partnerships</strong>
                  <small>Explore a product partnership with our team</small>
                </div>
                <em>↗</em>
              </Link>
              <div className="cta-stage__cmd">
                cargo install agentos-build01 --locked
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
