"use client";

import { useEffect, useRef, useState } from "react";

interface Principle {
  id: string;
  num: string;
  navLabel: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PRINCIPLES: Principle[] = [
  {
    id: "p1",
    num: "01",
    navLabel: "P.01 OWN THE LOOP",
    title: "Rent the intelligence. Own the loop.",
    description:
      "Foundation models are swappable commodities. You shouldn't be locked into a single vendor's closed stack—your execution loops, rules, and workflows must belong to you.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    ),
  },
  {
    id: "p2",
    num: "02",
    navLabel: "P.02 VERIFY",
    title: "Deterministic verification over blind trust.",
    description:
      "Never rely on self-reported agent completion. Every change must be validated against automated tests, strict contracts, and deterministic quality gates.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
        <path d="M8.5 12l2.5 2.5L15.5 10" />
      </svg>
    ),
  },
  {
    id: "p3",
    num: "03",
    navLabel: "P.03 DURABLE STATE",
    title: "Repo-local, durable state.",
    description:
      "Task planning, architectural decisions, and trust records belong inside your version-controlled repository, eliminating prompt bloat and ephemeral context.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
  {
    id: "p4",
    num: "04",
    navLabel: "P.04 COMPOSABLE",
    title: "Modular, composable systems.",
    description:
      "Instead of a fragile monolith, Build01 engineers focused, interoperable products that solve distinct bottlenecks across the autonomous lifecycle.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <path d="M17.2 13.5v7.5M13.5 17.2H21" />
      </svg>
    ),
  },
];

export default function ProductPrinciplesSection() {
  const stageRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setVisibleIndices([0, 1, 2, 3]);
    }

    // IntersectionObserver for card reveal
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute("data-index");
            if (idxStr !== null) {
              const idx = parseInt(idxStr, 10);
              setVisibleIndices((prev) =>
                prev.includes(idx) ? prev : [...prev, idx],
              );
            }
          }
        });
      },
      { threshold: 0.12 },
    );

    cards.forEach((card) => revealObserver.observe(card));

    let frame = 0;

    const onScrollOrResize = () => {
      frame = 0;
      const vh = window.innerHeight || 1;

      // 1. Determine active card based on distance to 55% of viewport height
      let bestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - vh * 0.55);
        if (dist < minDistance) {
          minDistance = dist;
          bestIndex = i;
        }
      });

      setActiveIdx((prev) => (prev !== bestIndex ? bestIndex : prev));

      // 2. Parallax calculations on floating layers, numbers, and icons
      if (!reducedMotion) {
        const stageRect = stage.getBoundingClientRect();
        const sc = stageRect.top + stageRect.height / 2 - vh / 2;

        const layerElements = stage.querySelectorAll<HTMLElement>(
          "[data-s], [data-x]",
        );

        layerElements.forEach((el) => {
          const hostCard = el.classList.contains("principles-layer")
            ? null
            : el.closest<HTMLElement>(".principles-card");

          const c = hostCard
            ? hostCard.getBoundingClientRect().top +
              hostCard.getBoundingClientRect().height / 2 -
              vh / 2
            : sc;

          const s = parseFloat(el.dataset.s || "0");
          const xFactor = parseFloat(el.dataset.x || "0");
          const rFactor = parseFloat(el.dataset.r || "0");
          const r0 =
            el.dataset.r0 !== undefined ? parseFloat(el.dataset.r0) : null;

          const y = c * s;
          const x = c * xFactor;
          const rot = r0 !== null ? r0 + c * rFactor : 0;

          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
            1,
          )}px, 0)${rot ? ` rotate(${rot.toFixed(1)}deg)` : ""}`;
        });
      }

      // 3. Parallax entry transition over previous section (#problem)
      const isMobile = window.innerWidth <= 900;
      const problemSection = document.getElementById("problem");
      const problemInner =
        problemSection?.querySelector<HTMLElement>(".problem-loop__inner") ||
        problemSection;

      if (problemInner && problemSection && !reducedMotion && !isMobile) {
        const stageTop = stage.getBoundingClientRect().top;
        // progress 0 (stage is below viewport) -> 1 (stage top reaches 0, fully covering problem)
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

          // Counteract window scroll to pin problemInner firmly in viewport
          const pinY = progress * vh;
          const totalY = pinY + offset;

          // Stable vertical center of viewport relative to problemSection
          const unpinnedSectionTop = problemSection.getBoundingClientRect().top + progress * vh;
          const originY = Math.max(0, vh / 2 - unpinnedSectionTop);

          problemInner.style.transformOrigin = `center ${originY.toFixed(0)}px`;
          problemInner.style.transform = `translate3d(0, ${totalY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
          problemInner.style.opacity = opacity.toFixed(4);
          problemInner.style.willChange = "transform, opacity";
          problemInner.style.pointerEvents = progress >= 0.82 ? "none" : "auto";
          problemInner.style.visibility = "visible";
        } else if (progress >= 1) {
          problemInner.style.pointerEvents = "none";
          problemInner.style.visibility = "hidden";
        } else {
          // progress <= 0
          problemInner.style.removeProperty("transform");
          problemInner.style.removeProperty("opacity");
          problemInner.style.removeProperty("transform-origin");
          problemInner.style.removeProperty("will-change");
          problemInner.style.pointerEvents = "";
          problemInner.style.visibility = "";
        }
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(onScrollOrResize);
    };

    onScrollOrResize();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      revealObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      const problemSection = document.getElementById("problem");
      const problemInner =
        problemSection?.querySelector<HTMLElement>(".problem-loop__inner") ||
        problemSection;
      if (problemInner) {
        problemInner.style.removeProperty("transform");
        problemInner.style.removeProperty("opacity");
        problemInner.style.removeProperty("transform-origin");
        problemInner.style.removeProperty("will-change");
        problemInner.style.pointerEvents = "";
        problemInner.style.visibility = "";
      }
    };
  }, []);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={stageRef}
      className="principles-stage"
      id="product-principles"
    >
      {/* Inner visual container that pins, shrinks, and dissolves on parallax exit */}
      <div className="principles-inner">
        {/* Background Parallax Layers in isolated clipping container */}
        <div className="principles-bg-wrap" aria-hidden="true">
          <div
            className="principles-layer principles-gridbg"
            data-s="-.12"
          />
          <div
            className="principles-layer principles-ghost"
            data-x="-.35"
            data-s=".05"
          >
            PRINCIPLES
          </div>
          <div
            className="principles-layer principles-sq"
            data-s=".14"
            data-r="-.02"
            data-r0="-12"
          />
          <div
            className="principles-layer principles-sq2"
            data-s="-.22"
            data-r=".05"
            data-r0="18"
          />
          <div
            className="principles-layer principles-ci"
            data-s=".18"
          />
          <div
            className="principles-layer principles-ring"
            data-s="-.3"
          />
        </div>

        <div className="principles-shell">
          {/* Left Column Wrapper spanning full row height */}
          <div className="principles-side-col">
            {/* Sticky Left Sidebar */}
            <aside className="principles-side">
              <span className="principles-tag">OUR PRINCIPLES</span>
              <h2 className="principles-heading">
                How We Build at <em>Build01.</em>
              </h2>
              <p className="principles-lead">
                Every product we develop—from our autonomous runtime AgentOS to
                verification harnesses and persistent memory—is guided by four
                foundational engineering principles.
              </p>

              <nav className="principles-nav" aria-label="Product Principles">
                {PRINCIPLES.map((principle, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <a
                      key={principle.id}
                      href={`#${principle.id}`}
                      className={isActive ? "on" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToCard(i);
                      }}
                    >
                      <i />
                      {principle.navLabel}
                    </a>
                  );
                })}
              </nav>

              <div className="principles-count" aria-live="polite">
                0{activeIdx + 1} / 04
              </div>
            </aside>
          </div>

          {/* Scrolling Right Column */}
          <div className="principles-cards">
            {PRINCIPLES.map((principle, i) => (
              <article
                key={principle.id}
                id={principle.id}
                data-index={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`principles-card ${visibleIndices.includes(i) ? "show" : ""} ${activeIdx === i ? "is-active" : ""}`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                }}
              >
                <div className="principles-card-glow" aria-hidden="true" />
                <span className="principles-num" data-s="-.08" aria-hidden="true">
                  {principle.num}
                </span>
                <div className="principles-in">
                  <div className="principles-top" data-s=".05">
                    <span className="principles-ico">{principle.icon}</span>
                    <span className="principles-mono">P.{principle.num}</span>
                  </div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Transition Spacer allowing Section 07 to rise with parallax */}
      <div className="principles-exit-spacer" aria-hidden="true" />
    </section>
  );
}
