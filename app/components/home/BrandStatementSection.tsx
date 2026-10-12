"use client";

import { useEffect, useRef, useState } from "react";
import { BlurReveal } from "../blur-reveal";

export default function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(0);

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
      const progress = Math.min(
        1,
        Math.max(0, -sectionTop / stickyScrollDistance),
      );

      if (motionPreference.matches) {
        setVisibleLineCount(4);
        video.pause();
        return;
      }

      setVisibleLineCount(Math.ceil(progress * 4));
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

      if (stageInView && !motionPreference.matches && video.paused) {
        video.play().catch((error: unknown) => {
          console.error("Could not play the Brand Statement video.", error);
        });
      }

      if (stageInView && !motionPreference.matches) {
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
        height: videoDuration
          ? `${100 + videoDuration * 50}svh`
          : "600svh",
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
      </div>
    </section>
  );
}
