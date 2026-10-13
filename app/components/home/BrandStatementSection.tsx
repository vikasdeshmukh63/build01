"use client";

import { useEffect, useRef, useState } from "react";
import { BlurReveal } from "../blur-reveal";
import OurProductsSection from "./OurProductsSection";

export default function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [stripEntryProgress, setStripEntryProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateScrollProgress = () => {
      animationFrameRef.current = null;
      const sectionTop = section.getBoundingClientRect().top;
      const stickyScrollDistance = Math.max(
        1,
        section.offsetHeight - window.innerHeight,
      );
      // progress 0 (entered top of viewport) -> 1 (scrolled through entire budget)
      const progress = Math.min(
        1,
        Math.max(0, -sectionTop / stickyScrollDistance),
      );

      if (motionPreference.matches) {
        setVisibleLineCount(4);
        setStripEntryProgress(1);
        video.pause();
        return;
      }

      // Phase 1: Brand Statement Reveal (0.0 -> 0.44)
      if (progress <= 0.44) {
        const lineProgress = progress / 0.44;
        setVisibleLineCount(Math.ceil(lineProgress * 4));
        setStripEntryProgress(0);
      } else {
        // Phase 2, 3, 4: Statement is fully revealed and FROZEN in place
        setVisibleLineCount(4);

        if (progress <= 0.50) {
          // Pause / freeze window where statement is completely static
          setStripEntryProgress(0);
        } else if (progress <= 0.74) {
          // Phase 3: Strips slide in from top & bottom over the frozen statement
          const stripP = (progress - 0.50) / (0.74 - 0.50);
          setStripEntryProgress(Math.min(1, Math.max(0, stripP)));
        } else {
          // Phase 4: Strips are fully settled into 4 equal columns with interactive hover
          setStripEntryProgress(1);
        }
      }
    };

    const onScroll = () => {
      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current);
      }

      if (animationFrameRef.current === null) {
        animationFrameRef.current =
          window.requestAnimationFrame(updateScrollProgress);
      }

      const stageBounds = section
        .querySelector(".brand-statement__stage")
        ?.getBoundingClientRect();
      const stageInView =
        stageBounds !== undefined &&
        stageBounds.bottom > 0 &&
        stageBounds.top < window.innerHeight;

      const stickyScrollDistance = Math.max(
        1,
        section.offsetHeight - window.innerHeight,
      );
      const currentProgress = Math.min(
        1,
        Math.max(0, -section.getBoundingClientRect().top / stickyScrollDistance),
      );

      // Only play video during text reveal phase (progress <= 0.44).
      // Once text is revealed, freeze the video on that frame!
      if (
        stageInView &&
        !motionPreference.matches &&
        currentProgress <= 0.44 &&
        video.paused
      ) {
        video.play().catch((error: unknown) => {
          console.error("Could not play the Brand Statement video.", error);
        });
      }

      if (stageInView && !motionPreference.matches && currentProgress <= 0.44) {
        pauseTimeoutRef.current = window.setTimeout(() => {
          video.pause();
          pauseTimeoutRef.current = null;
        }, 180);
      } else {
        video.pause();
      }
    };

    const onLoadedMetadata = () => {
      setVideoDuration(video.duration);
      updateScrollProgress();
    };

    const onMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        setVisibleLineCount(4);
        setStripEntryProgress(1);
        video.pause();
      } else {
        updateScrollProgress();
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }
    updateScrollProgress();
    motionPreference.addEventListener("change", onMotionPreferenceChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollProgress);
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current);
      }
      video.pause();
    };
  }, []);

  return (
    <section
      id="brand-statement"
      className="brand-statement"
      ref={sectionRef}
      style={{
        height: "850svh",
      }}
    >
      <div className="brand-statement__stage">
        <video
          ref={videoRef}
          className="brand-statement__video"
          src="/assets/bg_video.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="brand-statement__shade" aria-hidden="true" />

        <div className="brand-statement__content">
          <BlurReveal
            as="p"
            className="brand-statement__eyebrow"
            trigger={visibleLineCount > 0}
            speedReveal={0.55}
            speedSegment={0.2}
          >
            Built for what comes next
          </BlurReveal>

          <h2 className="brand-statement__heading">
            <BlurReveal
              as="span"
              className="brand-statement__line"
              trigger={visibleLineCount >= 1}
              speedReveal={0.55}
              speedSegment={0.2}
            >
              AI Is Moving
            </BlurReveal>
            <BlurReveal
              as="span"
              className="brand-statement__line"
              trigger={visibleLineCount >= 2}
              speedReveal={0.55}
              speedSegment={0.2}
            >
              Beyond Answers.
            </BlurReveal>
            <BlurReveal
              as="span"
              className="brand-statement__line"
              trigger={visibleLineCount >= 3}
              speedReveal={0.55}
              speedSegment={0.2}
            >
              It&apos;s Time to Build
            </BlurReveal>
            <BlurReveal
              as="span"
              className="brand-statement__line"
              trigger={visibleLineCount >= 4}
              speedReveal={0.55}
              speedSegment={0.2}
            >
              What Comes Next.
            </BlurReveal>
          </h2>
        </div>

        {/* Third Section: Our Products strips appear while second section is frozen in view */}
        <OurProductsSection
          isEmbedded
          entryProgress={stripEntryProgress}
        />
      </div>
    </section>
  );
}
