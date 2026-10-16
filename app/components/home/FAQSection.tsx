"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    num: "01",
    question: "What is Build01?",
    answer: (
      <>
        Build01 is an AI systems and product startup engineering production-grade
        infrastructure for autonomous work. We design and ship modular products
        that turn foundation model intelligence into reliable, verified software
        execution.
      </>
    ),
  },
  {
    id: "faq-2",
    num: "02",
    question: "How does AgentOS relate to Build01?",
    answer: (
      <>
        AgentOS (A.01) is one of our core products—our open-source autonomous
        runtime. It owns the execution loop around coding agents like Claude Code
        and Codex, orchestrating task planning, deterministic verification, and
        repo-local state.
      </>
    ),
  },
  {
    id: "faq-3",
    num: "03",
    question: "What other products are in the Build01 portfolio?",
    answer: (
      <>
        In addition to AgentOS, Build01 is developing EvalOS (A.02) for
        deterministic agent quality gates, Context Spine (A.03) for persistent
        repo-embedded workspace memory, and Swarm Mesh (A.04) for distributed
        multi-agent fleet dispatch.
      </>
    ),
  },
  {
    id: "faq-4",
    num: "04",
    question: "Is AgentOS available to use right now?",
    answer: (
      <>
        Yes. AgentOS is open source and available today. You can install it
        directly via Cargo with{" "}
        <code>cargo install agentos-build01 --locked</code>, or inspect and
        contribute to the source code on GitHub.
      </>
    ),
  },
  {
    id: "faq-5",
    num: "05",
    question: 'What does "Rent the intelligence, own the loop" mean?',
    answer: (
      <>
        Models like Claude, Codex, and Gemini are swappable commodities that
        evolve rapidly. Build01 ensures you never lock your architecture or
        workflows into a single vendor&apos;s black box. You rent the model for
        raw inference, but you own the orchestration loop, contracts, and
        repository state.
      </>
    ),
  },
  {
    id: "faq-6",
    num: "06",
    question: "Can our engineering team or enterprise partner with Build01?",
    answer: (
      <>
        Yes. We collaborate closely with development teams, technology
        leaders, and enterprises deploying autonomous agent systems. Reach out
        via our Contact page to discuss your use case, test early releases of our
        upcoming products, or explore partnerships.
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const stageRef = useRef<HTMLElement>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

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
        { threshold: 0.1 },
      );

      io.observe(stage);
    }

    // Parallax scrolling for floating geometric layers & entry over #insights-snippet
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
        ).toFixed(1)}px, 0)${isSq ? " rotate(-8deg)" : ""}`;
      });

      // 2. Parallax entry transition over previous section (#insights-snippet)
      const prevSection = document.getElementById("insights-snippet");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".insights-stage__inner") ||
        prevSection;

      if (prevInner && prevSection && !isMobile) {
        const stageTop = sr.top;
        // progress 0 (faq-stage is below viewport) -> 1 (faq-stage top reaches 0, fully covering insights)
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

      const prevSection = document.getElementById("insights-snippet");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".insights-stage__inner") ||
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

  const counterText =
    openIndex !== null ? `0${openIndex + 1} / 0${faqs.length}` : `-- / 0${faqs.length}`;

  return (
    <section className="faq-stage stage" id="faq" ref={stageRef}>
      <div className="faq-stage__inner">
        {/* Floating Parallax Geometric Layers */}
        <div className="layer grid" data-s="-0.1" aria-hidden="true" />
        <div
          className="layer ghost"
          data-s="0.05"
          data-x="-0.3"
          aria-hidden="true"
        >
          FAQ
        </div>
        <div className="layer sq" data-s="0.14" aria-hidden="true" />
        <div className="layer sq2" data-s="-0.22" aria-hidden="true" />
        <div className="layer ci" data-s="-0.16" aria-hidden="true" />

        <div className="shell">
          {/* Sticky Sidebar */}
          <aside className="side">
            <span className="tag">FAQ</span>
            <h2>
              Frequently Asked <em>Questions</em>
            </h2>
            <p className="lead">
              Straight answers about Build01, AgentOS and the products we&apos;re
              building next.
            </p>

            <div className="ask">
              <span className="m">STILL CURIOUS?</span>
              <p>
                Reach out to discuss your use case, test early releases, or
                explore partnerships.
              </p>
              <Link className="btn" href="/contact">
                Contact Build01 ↗
              </Link>
            </div>

            <div className="cnt" id="cnt" aria-live="polite">
              {counterText}
            </div>
          </aside>

          {/* FAQ Accordion List */}
          <div className="list" id="list">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  style={{ transitionDelay: `${index * 0.07}s` }}
                  className={`q ${isRevealed ? "show" : ""} ${isOpen ? "open" : ""}`}
                >
                  <button
                    className="qb"
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="qn">{item.num}</span>
                    <span className="qt">{item.question}</span>
                    <span className="ic" aria-hidden="true" />
                  </button>
                  <div
                    className="qa"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transition Spacer allowing Section 14 (Final CTA) to rise with parallax */}
      <div className="faq-stage__exit-spacer" aria-hidden="true" />
    </section>
  );
}
