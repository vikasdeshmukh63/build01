"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CHIPS = ["Claude Code", "Codex", "Local model"];

export default function WhyBuild01Section() {
  const stageRef = useRef<HTMLElement>(null);
  const cellRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Entrance animation for bento cells
    const cells = cellRefs.current.filter(Boolean) as HTMLElement[];
    if (reducedMotion) {
      cells.forEach((c) => c.classList.add("show"));
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

      cells.forEach((cell, i) => {
        cell.style.transitionDelay = `${(i % 2) * 0.12}s`;
        io.observe(cell);
      });
    }

    // Parallax scrolling & entry transition over previous section (#approach)
    let frame = 0;
    const runParallax = () => {
      frame = 0;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const sr = stage.getBoundingClientRect();
      const sc = sr.top + sr.height / 2 - vh / 2;

      // 1. Floating parallax layers and cell watermarks
      const parallaxEls = stage.querySelectorAll<HTMLElement>("[data-s]");
      parallaxEls.forEach((el) => {
        const parentTarget =
          el.closest<HTMLElement>(".cell") ||
          el.closest<HTMLElement>(".conviction") ||
          el.closest<HTMLElement>(".goal");
        let c = sc;
        if (parentTarget) {
          const r = parentTarget.getBoundingClientRect();
          c = r.top + r.height / 2 - vh / 2;
        }

        const s = parseFloat(el.dataset.s || "0");
        const x = parseFloat(el.dataset.x || "0");
        const isSq = el.classList.contains("sq");

        el.style.transform = `translate3d(${(c * x).toFixed(1)}px, ${(
          c * s
        ).toFixed(1)}px, 0)${isSq ? " rotate(-8deg)" : ""}`;
      });

      // 2. Parallax entry transition over previous section (#approach)
      const isMobile = window.innerWidth <= 900;
      const prevSection = document.getElementById("approach");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".approach-stage__inner") ||
        prevSection;

      if (prevInner && prevSection && !isMobile) {
        const stageTop = sr.top;
        // progress 0 (why-stage is below viewport) -> 1 (why-stage top reaches 0, fully covering approach)
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

    // Auto-cycling model chips
    let chipInterval: ReturnType<typeof setInterval> | null = null;
    if (!reducedMotion) {
      chipInterval = setInterval(() => {
        setActiveChip((prev) => (prev + 1) % CHIPS.length);
      }, 1800);
    }

    return () => {
      window.removeEventListener("scroll", scheduleRun);
      window.removeEventListener("resize", scheduleRun);
      if (frame) window.cancelAnimationFrame(frame);
      if (chipInterval) clearInterval(chipInterval);

      const prevSection = document.getElementById("approach");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".approach-stage__inner") ||
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
    <section className="why-stage stage" id="why-build01" ref={stageRef}>
      <div className="why-stage__inner">
        {/* Background Parallax Layers */}
        <div className="layer grid" data-s="-0.1" />
        <div className="layer ghost" data-s="0.05" data-x="-0.3">
          WHY
        </div>
        <div className="layer sq" data-s="0.14" />
        <div className="layer ci" data-s="-0.16" />

        <div className="shell">
          <span className="tag">THE BUILD01 ADVANTAGE</span>
          <h2>
            Why <em>Build01.</em>
          </h2>

          <div className="bento">
            {/* Cell 01: Autonomous Runtime Mastery */}
            <article
              className="cell c1"
              ref={(el) => {
                cellRefs.current[0] = el;
              }}
            >
              <span className="wm" data-s="-0.07">
                01
              </span>
              <span className="lab">01 / RUNTIME</span>
              <h3>Autonomous Runtime Mastery</h3>
              <p>
                We build the software scaffolding that lets AI agents plan,
                execute, and verify code deterministically—starting with our
                open-source runtime, AgentOS.
              </p>
              <div className="term">
                <div className="th">
                  <b style={{ background: "#ef4444" }} />
                  <b style={{ background: "#f59e0b" }} />
                  <b style={{ background: "#22c55e" }} />
                  <span>TRACE // AGENTOS_RUN</span>
                </div>
                <div className="w">plan: 5 tasks · scope bounded</div>
                <div>execute: worker running under budget</div>
                <div className="ok">verify: 14 passed · 0 failed</div>
              </div>
            </article>

            {/* Cell 02: Model-Agnostic Freedom */}
            <article
              className="cell c2"
              ref={(el) => {
                cellRefs.current[1] = el;
              }}
            >
              <span className="wm" data-s="-0.07">
                02
              </span>
              <span className="lab">02 / PORTABILITY</span>
              <h3>Model-Agnostic Freedom</h3>
              <p>
                Foundation models evolve continuously. Build01 products ensure
                your workflows, workspace memory, and execution rules remain
                permanent and portable.
              </p>
              <div className="chips" id="chips">
                {CHIPS.map((chip, idx) => (
                  <span
                    key={chip}
                    role="button"
                    tabIndex={0}
                    className={`chip ${activeChip === idx ? "on" : ""}`}
                    onClick={() => setActiveChip(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveChip(idx);
                      }
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="lock">
                STAYS PUT: <span>WORKFLOWS</span>
                <span>MEMORY</span>
                <span>RULES</span>
              </div>
            </article>

            {/* Cell 03: Repository-Centric State */}
            <article
              className="cell c3"
              ref={(el) => {
                cellRefs.current[2] = el;
              }}
            >
              <span className="wm" data-s="-0.07">
                03
              </span>
              <span className="lab">03 / STATE</span>
              <h3>Repository-Centric State</h3>
              <p>
                We believe your code, task graphs, and trust records belong in your
                version-controlled repositories, never trapped inside closed vendor
                platforms.
              </p>
              <div className="tree">
                <b>your-repo/</b>
                {"\n"}├─ src/
                {"\n"}└─ <i>.build01/</i>
                {"\n"}   ├─ task.graph
                {"\n"}   ├─ trust.records
                {"\n"}   └─ decisions/   <i>← in git, yours</i>
              </div>
            </article>

            {/* Cell 04: An Expanding Systems Ecosystem */}
            <article
              className="cell c4"
              ref={(el) => {
                cellRefs.current[3] = el;
              }}
            >
              <span className="wm" data-s="-0.07">
                04
              </span>
              <span className="lab">04 / ECOSYSTEM</span>
              <h3>An Expanding Systems Ecosystem</h3>
              <p>
                From individual agent execution with AgentOS to fleet dispatch with
                Swarm Mesh, Build01 engineers the full stack for dependable
                autonomy.
              </p>
              <div className="eco">
                <div className="n live">
                  <i />
                  <b>A.01</b>
                  <span>AgentOS</span>
                  <em>LIVE</em>
                </div>
                <div className="n">
                  <i />
                  <b>A.02</b>
                  <span>EvalOS</span>
                  <em>SOON</em>
                </div>
                <div className="n">
                  <i />
                  <b>A.03</b>
                  <span>Context Spine</span>
                  <em>SOON</em>
                </div>
                <div className="n">
                  <i />
                  <b>A.04</b>
                  <span>Swarm Mesh</span>
                  <em>SOON</em>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Conviction Manifesto Banner (Matching Our Goal UI) */}
        <div className="goal conviction" id="conviction">
          <div className="layer g" data-s="-.08" aria-hidden="true" />
          <div className="layer o" data-s=".12" aria-hidden="true" />
          <div className="gi">
            <div className="bar" aria-hidden="true" />
            <div>
              <span className="mono">Our Conviction</span>
              <blockquote>
                Build01 is founded on a clear conviction:{" "}
                <span>foundation models provide the intelligence,</span> but{" "}
                <em>Build01 products provide the systems that make it work.</em>
              </blockquote>
              <div className="gf">
                <Link className="btn w" href="/agent-os">
                  Explore AgentOS ↗
                </Link>
                <Link className="btn o" href="/contact">
                  Talk to Build01 ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Spacer allowing Section 10 (About Snippet) to rise with parallax */}
      <div className="why-stage__exit-spacer" aria-hidden="true" />
    </section>
  );
}
