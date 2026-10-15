"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutSnippetSection() {
  const stageRef = useRef<HTMLElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // IntersectionObserver for entrance reveal animations
    const revealEls = stage.querySelectorAll<HTMLElement>(".rv");
    if (reducedMotion) {
      revealEls.forEach((el) => el.classList.add("show"));
      roadRef.current?.classList.add("show");
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      revealEls.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 2) * 0.1}s`;
        io.observe(el);
      });

      if (roadRef.current) {
        io.observe(roadRef.current);
      }
    }

    // Parallax scrolling & entry transition over previous section (#why-build01)
    let frame = 0;
    const runParallax = () => {
      frame = 0;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const sr = stage.getBoundingClientRect();
      const sc = sr.top + sr.height / 2 - vh / 2;

      // 1. Floating parallax layers and card watermarks
      const parallaxEls = stage.querySelectorAll<HTMLElement>("[data-s]");
      parallaxEls.forEach((el) => {
        const parentCard = el.closest<HTMLElement>(".card");
        let c = sc;
        if (parentCard) {
          const r = parentCard.getBoundingClientRect();
          c = r.top + r.height / 2 - vh / 2;
        }

        const s = parseFloat(el.dataset.s || "0");
        const x = parseFloat(el.dataset.x || "0");

        el.style.transform = `translate3d(${(c * x).toFixed(1)}px, ${(
          c * s
        ).toFixed(1)}px, 0)`;
      });

      // 2. Parallax entry transition over previous section (#why-build01)
      const isMobile = window.innerWidth <= 900;
      const prevSection = document.getElementById("why-build01");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".why-stage__inner") ||
        prevSection;

      if (prevInner && prevSection && !isMobile) {
        const stageTop = sr.top;
        // progress 0 (about-stage is below viewport) -> 1 (about-stage top reaches 0, fully covering why-build01)
        const progress = Math.min(1, Math.max(0, (vh - stageTop) / vh));

        if (progress > 0 && progress < 1) {
          // 1. Scale down curve: smoothly shrinks from 1.0 down to ~0.65
          const scaleProgress = Math.min(1, Math.max(0, progress));
          const scale = 1 - 0.35 * Math.sin((scaleProgress * Math.PI) / 2);

          // 2. Gentle upward parallax lift as elements shrink
          const offset = -32 * Math.min(1, Math.pow(progress, 0.9));

          // 3. Vanish / dissolve curve: stays visible initially (0 -> 0.12) to showcase scale down,
          // then dissolves gracefully to 0 by 0.82
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

      const prevSection = document.getElementById("why-build01");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".why-stage__inner") ||
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
    <section className="about-stage stage" id="about-snippet" ref={stageRef}>
      <div className="about-stage__inner">
        {/* Background Parallax Layers */}
        <div className="about-bg-wrap" aria-hidden="true">
          <div className="layer grid" data-s="-0.1" />
          <div className="layer glow" data-s="0.16" />
          <div className="layer glow2" data-s="-0.14" />
          <div className="layer ghost" data-s="0.05" data-x="-0.3">
            NEXT
          </div>
        </div>

        <div className="shell">
          <span className="tag">ABOUT BUILD01</span>
          <h2>
            We Build for What Comes <em>Next.</em>
          </h2>

          {/* Narrative & Paragraphs Grid */}
          <div className="story">
            <div className="lead-col">
              <div className="lead-sticky">
                <p className="lead">
                  Build01 is an AI systems company engineering{" "}
                  <span>production-grade software and autonomous runtimes.</span>
                </p>
              </div>
            </div>
            <div className="paras rv">
              <div className="p">
                <b>BELIEF</b>
                <p>
                  We believe the opportunity in AI extends beyond individual
                  prompts and closed chat interfaces. It lies in creating modular,
                  high-performance product systems that govern planning,
                  execution, verification, and workspace state.
                </p>
              </div>
              <div className="p">
                <b>PRODUCTS</b>
                <p>
                  <strong>AgentOS</strong> is our first product in production,
                  pioneering loop-engineering for autonomous coders. Backed by an
                  expanding suite of upcoming tools—including EvalOS, Context
                  Spine, and Swarm Mesh—Build01 delivers the infrastructure
                  developers need to orchestrate intelligence reliably.
                </p>
              </div>
              <div className="p">
                <b>COMMITMENT</b>
                <p>
                  As we grow our product portfolio, our commitment remains fixed:
                  disciplined software engineering, deterministic verification, and
                  total repository-level control.
                </p>
              </div>
            </div>
          </div>

          {/* Roadmap Nodes */}
          <div className="road rv" id="road" ref={roadRef}>
            <div className="rn live">
              <i />
              <b>A.01</b>
              <span>AgentOS</span>
              <em>LIVE</em>
            </div>
            <div className="rn">
              <i />
              <b>A.02</b>
              <span>EvalOS</span>
              <em>SOON</em>
            </div>
            <div className="rn">
              <i />
              <b>A.03</b>
              <span>Context Spine</span>
              <em>SOON</em>
            </div>
            <div className="rn">
              <i />
              <b>A.04</b>
              <span>Swarm Mesh</span>
              <em>SOON</em>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="mv">
            <article className="card m rv">
              <span className="wm" data-s="-0.07">
                M
              </span>
              <span className="lab">OUR MISSION</span>
              <q>
                Engineer open, dependable systems that turn foundation model
                intelligence into production-grade autonomous execution.
              </q>
            </article>

            <article className="card v rv">
              <span className="wm" data-s="-0.07">
                V
              </span>
              <span className="lab">OUR VISION</span>
              <q>
                A future where engineers and enterprises orchestrate fleets of
                verified, intelligent agents with total clarity, control, and
                repository-level ownership.
              </q>
            </article>
          </div>

          {/* CTA Bar */}
          <div className="cta rv">
            <Link className="btn w" href="/about">
              Learn About Build01 ↗
            </Link>
            <span className="mono">Open · Deterministic · Repo-local</span>
          </div>
        </div>
      </div>

      {/* Transition Spacer allowing Section 11 (Roadmap) to rise with parallax */}
      <div className="about-stage__exit-spacer" aria-hidden="true" />
    </section>
  );
}
