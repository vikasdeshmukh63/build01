"use client";

import { useEffect, useRef } from "react";

export default function InsightsSnippetSection() {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // IntersectionObserver for staggered card reveals
    const posts = stage.querySelectorAll<HTMLElement>(".post");
    if (reducedMotion) {
      posts.forEach((post) => post.classList.add("show"));
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
        { threshold: 0.12 },
      );

      posts.forEach((post, index) => {
        post.style.transitionDelay = `${index * 0.14}s`;
        io.observe(post);
      });
    }

    // Parallax scrolling for floating geometric layers, card artwork, and entry over previous section (#roadmap)
    let frame = 0;
    const runParallax = () => {
      frame = 0;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const isMobile = window.innerWidth <= 900;
      const sr = stage.getBoundingClientRect();
      const sc = sr.top + sr.height / 2 - vh / 2;

      // 1. Floating parallax layers and card artwork
      const parallaxEls = stage.querySelectorAll<HTMLElement>("[data-s]");
      parallaxEls.forEach((el) => {
        const parentPost = el.closest<HTMLElement>(".post");
        let c = sc;
        if (parentPost) {
          const r = parentPost.getBoundingClientRect();
          c = r.top + r.height / 2 - vh / 2;
        }

        const s = parseFloat(el.dataset.s || "0");
        const x = parseFloat(el.dataset.x || "0");
        const isSq = el.classList.contains("sq");

        el.style.transform = `translate3d(${(c * x).toFixed(1)}px, ${(
          c * s
        ).toFixed(1)}px, 0)${isSq ? " rotate(10deg)" : ""}`;
      });

      // 2. Parallax entry transition over previous section (#roadmap)
      const prevSection = document.getElementById("roadmap");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".roadmap-stage__inner") ||
        prevSection;

      if (prevInner && prevSection && !isMobile) {
        const stageTop = sr.top;
        // progress 0 (insights-stage is below viewport) -> 1 (insights-stage top reaches 0, fully covering roadmap)
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

      const prevSection = document.getElementById("roadmap");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".roadmap-stage__inner") ||
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
    <section
      className="insights-stage stage"
      id="insights-snippet"
      ref={stageRef}
    >
      <div className="insights-stage__inner">
        {/* Floating Parallax Geometric Layers */}
        <div className="layer grid" data-s="-0.1" aria-hidden="true" />
        <div
          className="layer ghost"
          data-s="0.05"
          data-x="-0.3"
          aria-hidden="true"
        >
          INSIGHTS
        </div>
        <div className="layer sq" data-s="0.14" aria-hidden="true" />
        <div className="layer sq2" data-s="-0.22" aria-hidden="true" />
        <div className="layer ci" data-s="-0.16" aria-hidden="true" />

        <div className="shell">
        <header className="hd">
          <div>
            <span className="tag">INSIGHTS</span>
            <h2>
              Insights &amp; Systems <em>Engineering.</em>
            </h2>
            <p className="lead">
              Essays, technical deep-dives, and perspectives from the Build01
              product team.
            </p>
          </div>
        </header>

        <div className="posts">
          {/* Article 01 — Loop Engineering */}
          <article className="post">
            <div className="cover c1">
              <span className="idx">01 / 03</span>
              <svg
                className="art"
                data-s="-0.05"
                viewBox="0 0 400 300"
                fill="none"
                aria-label="Loop Engineering diagram"
              >
                <g className="spin r">
                  <circle
                    cx="200"
                    cy="150"
                    r="112"
                    stroke="#fff"
                    strokeOpacity="0.4"
                    strokeDasharray="4 10"
                  />
                  <circle cx="200" cy="38" r="7" fill="#fff" />
                  <circle cx="88" cy="150" r="5" fill="#fff" fillOpacity="0.6" />
                </g>
                <g className="spin">
                  <circle
                    cx="200"
                    cy="150"
                    r="72"
                    stroke="#050a14"
                    strokeWidth="2.5"
                    strokeDasharray="120 40"
                  />
                  <path
                    d="M272 150l-9-9m9 9l-9 9"
                    stroke="#050a14"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="78" r="6" fill="#ffb454" />
                </g>
                <circle cx="200" cy="150" r="30" fill="#050a14" />
                <text
                  x="200"
                  y="154"
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains-mono, 'JetBrains Mono', monospace)"
                  fontSize="11"
                  fontWeight="700"
                  fill="#ffb454"
                  letterSpacing="2"
                >
                  LOOP
                </text>
              </svg>
            </div>
            <div className="body">
              <div className="cat">
                <i aria-hidden="true" />
                Loop Engineering
              </div>
              <h3>Rent the Intelligence, Own the Loop</h3>
              <p>
                Why swapping foundation models as interchangeable workers while
                anchoring execution loops and repository state is the future of
                autonomous engineering.
              </p>
            </div>
          </article>

          {/* Article 02 — Verification Systems */}
          <article className="post">
            <div className="cover c2">
              <span className="idx">02 / 03</span>
              <svg
                className="art"
                data-s="-0.05"
                viewBox="0 0 400 300"
                fill="none"
                aria-label="Verification Systems deterministic gate diagram"
              >
                <g stroke="#ff6a1a" strokeWidth="2" className="flow">
                  <path d="M20 90H150" />
                  <path d="M20 150H150" />
                  <path d="M20 210H150" />
                </g>
                <rect
                  x="150"
                  y="50"
                  width="14"
                  height="200"
                  rx="3"
                  fill="#1a2030"
                  stroke="#3a4358"
                />
                <rect
                  x="236"
                  y="50"
                  width="14"
                  height="200"
                  rx="3"
                  fill="#1a2030"
                  stroke="#3a4358"
                />
                <path
                  d="M164 150H236"
                  stroke="#a3e635"
                  strokeWidth="2"
                  className="flow"
                />
                <path d="M250 150H300" stroke="#a3e635" strokeWidth="2" />
                <circle
                  cx="335"
                  cy="150"
                  r="34"
                  fill="#0f1a05"
                  stroke="#a3e635"
                  strokeWidth="2"
                />
                <path
                  d="M319 150l11 11 20-22"
                  stroke="#a3e635"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M110 76l14 14m0-14l-14 14"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M110 196l14 14m0-14l-14 14"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <text
                  x="200"
                  y="272"
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains-mono, 'JetBrains Mono', monospace)"
                  fontSize="10"
                  fill="#8b93a3"
                  letterSpacing="3"
                >
                  DETERMINISTIC GATE
                </text>
              </svg>
            </div>
            <div className="body">
              <div className="cat">
                <i aria-hidden="true" />
                Verification Systems
              </div>
              <h3>Why Agents Require Deterministic Quality Gates</h3>
              <p>
                How EvalOS and automated contract verification eliminate
                hallucinated completion and scope drift in AI-generated pull
                requests.
              </p>
            </div>
          </article>

          {/* Article 03 — Product Architecture */}
          <article className="post">
            <div className="cover c3">
              <span className="idx">03 / 03</span>
              <svg
                className="art"
                data-s="-0.05"
                viewBox="0 0 400 300"
                fill="none"
                fontFamily="var(--font-jetbrains-mono, 'JetBrains Mono', monospace)"
                fontSize="11"
                fontWeight="700"
                letterSpacing="2"
                aria-label="Multi-product stack diagram"
              >
                <path d="M200 258V44" stroke="#c3c8d2" strokeDasharray="4 6" />
                <rect
                  x="110"
                  y="214"
                  width="180"
                  height="42"
                  rx="10"
                  fill="#fff"
                  stroke="#050a14"
                  strokeWidth="2"
                />
                <text x="200" y="240" textAnchor="middle" fill="#050a14">
                  A.01 RUNTIME
                </text>
                <rect
                  x="120"
                  y="164"
                  width="160"
                  height="42"
                  rx="10"
                  fill="#fff"
                  stroke="#050a14"
                  strokeWidth="2"
                />
                <text x="200" y="190" textAnchor="middle" fill="#050a14">
                  A.02 GATE
                </text>
                <rect
                  x="130"
                  y="114"
                  width="140"
                  height="42"
                  rx="10"
                  fill="#fff"
                  stroke="#050a14"
                  strokeWidth="2"
                />
                <text x="200" y="140" textAnchor="middle" fill="#050a14">
                  A.03 MEMORY
                </text>
                <rect
                  x="140"
                  y="64"
                  width="120"
                  height="42"
                  rx="10"
                  fill="url(#insights-grad-3)"
                  stroke="#ff5a14"
                  strokeWidth="2"
                />
                <text x="200" y="90" textAnchor="middle" fill="#050a14">
                  A.04 FLEET
                </text>
                <defs>
                  <linearGradient id="insights-grad-3" x1="0" x2="1" y1="0" y2="0">
                    <stop stopColor="#ff9a00" />
                    <stop offset="1" stopColor="#ff5a14" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="body">
              <div className="cat">
                <i aria-hidden="true" />
                Product Architecture
              </div>
              <h3>The Multi-Product Stack for Autonomous Workflows</h3>
              <p>
                Why single-model chatbots fail at enterprise complexity, and how
                composable runtimes, memory meshes, and fleet routers succeed.
              </p>
            </div>
          </article>
        </div>
      </div>
      </div>

      {/* Transition Spacer allowing Section 13 (FAQ) to rise with parallax */}
      <div className="insights-stage__exit-spacer" aria-hidden="true" />
    </section>
  );
}
