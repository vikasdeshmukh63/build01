"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";

const LINE_STYLES = ["solid", "dashed", "dotted"] as const;
const EFFECTS = ["lock", "glitch", "none"] as const;
const FONT = "500 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const HIDDEN = "crosshair-cursor-hidden";

type LineStyle = (typeof LINE_STYLES)[number];
type TargetEffect = (typeof EFFECTS)[number];
type BlendMode = "normal" | "difference";

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement | null> | null;
  thickness?: number;
  opacity?: number;
  lineStyle?: LineStyle;
  gap?: number;
  fade?: number;
  smoothing?: number;
  showCoordinates?: boolean;
  targetEffect?: TargetEffect;
  targetSelector?: string;
  clickPulse?: boolean;
  hideCursor?: boolean;
  blendMode?: BlendMode;
  className?: string;
  style?: CSSProperties;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface CrosshairSettings {
  color: string;
  thickness: number;
  opacity: number;
  lineStyle: LineStyle;
  gap: number;
  fade: number;
  smoothing: number;
  showCoordinates: boolean;
  targetEffect: TargetEffect;
  targetSelector: string;
  clickPulse: boolean;
  hideCursor: boolean;
}

interface CrosshairState {
  x: number;
  y: number;
  tx: number;
  ty: number;
  clientX: number;
  clientY: number;
  inside: boolean;
  seen: boolean;
  presence: number;
  glitch: number;
  target: Element | null;
  lock: { x: number; y: number; w: number; h: number; alpha: number };
  pulses: Array<{ x: number; y: number; age: number }>;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const toRgb = (ctx: CanvasRenderingContext2D, color: string): RgbColor => {
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  const value = String(ctx.fillStyle);
  if (value.startsWith("#")) {
    const hex = Number.parseInt(value.slice(1, 7), 16);
    return {
      r: (hex >> 16) & 255,
      g: (hex >> 8) & 255,
      b: hex & 255,
      a: 1,
    };
  }

  const parts = value.match(/[\d.]+/g)?.map(Number) ?? [255, 255, 255, 1];
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
};

export default function Crosshair({
  color = "#fc6d02",
  containerRef = null,
  thickness = 1,
  opacity = 0.85,
  lineStyle = "solid",
  gap = 0,
  fade = 0,
  smoothing = 0.35,
  showCoordinates = true,
  targetEffect = "lock",
  targetSelector = "a, button, [data-crosshair-target]",
  clickPulse = true,
  hideCursor = false,
  blendMode = "normal",
  className = "",
  style,
}: CrosshairProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const settings: CrosshairSettings = {
    color,
    thickness: clamp(thickness, 0.5, 8),
    opacity: clamp(opacity, 0, 1),
    lineStyle: LINE_STYLES.includes(lineStyle) ? lineStyle : "solid",
    gap: Math.max(0, gap),
    fade: clamp(fade, 0, 1),
    smoothing: clamp(smoothing, 0, 1),
    showCoordinates,
    targetEffect: EFFECTS.includes(targetEffect) ? targetEffect : "lock",
    targetSelector,
    clickPulse,
    hideCursor,
  };
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const host = containerRef?.current ?? null;
    const scope: HTMLElement | Window = host ?? window;
    const cursorOwner: HTMLElement = host ?? document.documentElement;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const state: CrosshairState = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      clientX: 0,
      clientY: 0,
      inside: false,
      seen: false,
      presence: 0,
      glitch: 0,
      target: null,
      lock: { x: 0, y: 0, w: 0, h: 0, alpha: 0 },
      pulses: [],
    };
    const size = { w: 0, h: 0, dpr: 1 };
    let ink = toRgb(ctx, settingsRef.current.color);
    let inkSource = settingsRef.current.color;
    let raf = 0;
    let last = 0;
    let alive = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size.dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.w = rect.width;
      size.h = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * size.dpr));
      canvas.height = Math.max(1, Math.round(rect.height * size.dpr));
      wake();
    };

    const rgba = (alpha: number) =>
      `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${clamp(alpha * ink.a, 0, 1)})`;
    const crisp = (value: number, width: number) => {
      const device = Math.round(width * size.dpr);
      return (Math.round(value * size.dpr) + (device % 2 ? 0.5 : 0)) / size.dpr;
    };

    const tag = (
      text: string,
      x: number,
      y: number,
      align: "center" | "middle",
    ) => {
      ctx.font = FONT;
      const width = ctx.measureText(text).width + 10;
      const height = 16;
      let left = align === "center" ? x - width / 2 : x;
      let top = align === "middle" ? y - height / 2 : y;
      left = clamp(left, 4, size.w - width - 4);
      top = clamp(top, 4, size.h - height - 4);
      const light = ink.r * 0.2126 + ink.g * 0.7152 + ink.b * 0.0722 > 150;
      ctx.fillStyle = rgba(1);
      ctx.beginPath();
      ctx.roundRect(left, top, width, height, 3);
      ctx.fill();
      ctx.fillStyle = light ? "#0a0a0a" : "#ffffff";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(text, left + width / 2, top + height / 2 + 0.5);
    };

    const segment = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      horizontal: boolean,
      currentSettings: CrosshairSettings,
    ) => {
      const length = horizontal ? x2 - x1 : y2 - y1;
      if (length <= 0) return;

      if (currentSettings.fade > 0) {
        const gradient = horizontal
          ? ctx.createLinearGradient(0, 0, size.w, 0)
          : ctx.createLinearGradient(0, 0, 0, size.h);
        const at = clamp(
          horizontal ? state.x / size.w : state.y / size.h,
          0.001,
          0.999,
        );
        gradient.addColorStop(0, rgba(1 - currentSettings.fade));
        gradient.addColorStop(at, rgba(1));
        gradient.addColorStop(1, rgba(1 - currentSettings.fade));
        ctx.strokeStyle = gradient;
      } else {
        ctx.strokeStyle = rgba(1);
      }

      ctx.beginPath();
      if (state.glitch > 0.01) {
        const pieces = Math.max(4, Math.round(length / 28));
        for (let i = 0; i < pieces; i++) {
          const jitter = (Math.random() - 0.5) * 14 * state.glitch;
          const from = i / pieces;
          const to = (i + 1) / pieces;
          if (horizontal) {
            ctx.moveTo(x1 + length * from, y1 + jitter);
            ctx.lineTo(x1 + length * to, y1 + jitter);
          } else {
            ctx.moveTo(x1 + jitter, y1 + length * from);
            ctx.lineTo(x1 + jitter, y1 + length * to);
          }
        }
      } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    };

    const brackets = (x: number, y: number, w: number, h: number) => {
      const arm = Math.min(14, w / 3, h / 3);
      ctx.strokeStyle = rgba(1);
      ctx.lineWidth = Math.max(1.5, settingsRef.current.thickness);
      ctx.setLineDash([]);
      ctx.lineCap = "square";
      ctx.beginPath();
      ctx.moveTo(x, y + arm);
      ctx.lineTo(x, y);
      ctx.lineTo(x + arm, y);
      ctx.moveTo(x + w - arm, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + arm);
      ctx.moveTo(x + w, y + h - arm);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w - arm, y + h);
      ctx.moveTo(x + arm, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + h - arm);
      ctx.stroke();
    };

    const draw = () => {
      const currentSettings = settingsRef.current;
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      ctx.clearRect(0, 0, size.w, size.h);
      if (state.presence > 0.001) {
        ctx.globalAlpha =
          state.presence * currentSettings.opacity * (1 - 0.6 * state.lock.alpha);
        ctx.lineWidth = currentSettings.thickness;
        ctx.lineCap =
          currentSettings.lineStyle === "dotted" ? "round" : "butt";
        if (currentSettings.lineStyle === "dashed") {
          ctx.setLineDash([
            currentSettings.thickness * 6,
            currentSettings.thickness * 5,
          ]);
        } else if (currentSettings.lineStyle === "dotted") {
          ctx.setLineDash([0, currentSettings.thickness * 4]);
        } else {
          ctx.setLineDash([]);
        }

        const x = crisp(state.x, currentSettings.thickness);
        const y = crisp(state.y, currentSettings.thickness);
        segment(0, y, x - currentSettings.gap, y, true, currentSettings);
        segment(
          x + currentSettings.gap,
          y,
          size.w,
          y,
          true,
          currentSettings,
        );
        segment(x, 0, x, y - currentSettings.gap, false, currentSettings);
        segment(
          x,
          y + currentSettings.gap,
          x,
          size.h,
          false,
          currentSettings,
        );
        if (currentSettings.hideCursor) {
          ctx.fillStyle = rgba(1);
          ctx.beginPath();
          ctx.arc(
            state.x,
            state.y,
            Math.max(1.5, currentSettings.thickness * 1.5),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        if (currentSettings.showCoordinates && state.lock.alpha < 0.999) {
          ctx.globalAlpha =
            state.presence *
            currentSettings.opacity *
            (1 - state.lock.alpha);
          tag(String(Math.round(state.x)), state.x, 8, "center");
          tag(String(Math.round(state.y)), 8, state.y, "middle");
        }
      }

      if (state.lock.alpha > 0.001) {
        const { x, y, w, h, alpha } = state.lock;
        ctx.globalAlpha = alpha * settingsRef.current.opacity;
        brackets(x, y, w, h);
        if (settingsRef.current.showCoordinates && state.target) {
          const box = state.target.getBoundingClientRect();
          tag(
            `${Math.round(box.width)} × ${Math.round(box.height)}`,
            x + w / 2,
            y + h + 8,
            "center",
          );
        }
      }

      state.pulses.forEach((pulse) => {
        const t = pulse.age / 0.55;
        const eased = 1 - (1 - t) ** 3;
        ctx.globalAlpha = (1 - t) ** 2 * settingsRef.current.opacity;
        ctx.strokeStyle = rgba(1);
        ctx.lineWidth = Math.max(1, settingsRef.current.thickness);
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 3 + 30 * eased, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const relative = () => {
      const rect = canvas.getBoundingClientRect();
      state.tx = state.clientX - rect.left;
      state.ty = state.clientY - rect.top;
      return rect;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const currentSettings = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      if (currentSettings.color !== inkSource) {
        inkSource = currentSettings.color;
        ink = toRgb(ctx, currentSettings.color);
      }

      const rect = relative();
      const follow =
        reduce || currentSettings.smoothing === 0
          ? 1
          : 1 - Math.exp(-dt / (0.008 + currentSettings.smoothing * 0.16));
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      const wanted = state.inside ? 1 : 0;
      state.presence +=
        (wanted - state.presence) *
        (reduce ? 1 : 1 - Math.exp(-dt / (wanted ? 0.12 : 0.25)));
      if (Math.abs(wanted - state.presence) < 0.002) state.presence = wanted;

      const lock = state.lock;
      const locked =
        currentSettings.targetEffect === "lock" && state.inside
          ? state.target
          : null;
      let goal: { x: number; y: number; w: number; h: number };
      if (locked) {
        const box = locked.getBoundingClientRect();
        goal = {
          x: box.left - rect.left - 6,
          y: box.top - rect.top - 6,
          w: box.width + 12,
          h: box.height + 12,
        };
      } else {
        goal = { x: state.x - 10, y: state.y - 10, w: 20, h: 20 };
      }

      const snap = reduce ? 1 : 1 - Math.exp(-dt / 0.085);
      lock.x += (goal.x - lock.x) * snap;
      lock.y += (goal.y - lock.y) * snap;
      lock.w += (goal.w - lock.w) * snap;
      lock.h += (goal.h - lock.h) * snap;
      const shown = locked ? 1 : 0;
      lock.alpha +=
        (shown - lock.alpha) *
        (reduce ? 1 : 1 - Math.exp(-dt / (shown ? 0.08 : 0.14)));
      if (Math.abs(shown - lock.alpha) < 0.002) lock.alpha = shown;
      state.glitch = reduce ? 0 : Math.max(0, state.glitch - dt / 0.5);
      state.pulses = state.pulses.filter((pulse) => (pulse.age += dt) < 0.55);
      draw();

      const settling =
        Math.abs(state.tx - state.x) > 0.05 ||
        Math.abs(state.ty - state.y) > 0.05 ||
        state.presence !== wanted ||
        lock.alpha !== shown ||
        (locked &&
          Math.abs(goal.w - lock.w) +
            Math.abs(goal.x - lock.x) +
            Math.abs(goal.y - lock.y) >
            0.1) ||
        state.glitch > 0 ||
        state.pulses.length > 0;
      if (settling) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const setCursorHidden = (hidden: boolean) => {
      cursorOwner.classList.toggle(HIDDEN, hidden);
    };

    wakeRef.current = () => {
      setCursorHidden(state.inside && settingsRef.current.hideCursor);
      wake();
    };

    const pick = (element: EventTarget | null) => {
      const currentSettings = settingsRef.current;
      if (
        currentSettings.targetEffect === "none" ||
        !(element instanceof Element)
      ) {
        return null;
      }

      const found = element.closest(currentSettings.targetSelector);
      if (found && host && !host.contains(found)) return null;
      return found;
    };

    const retarget = (element: EventTarget | null) => {
      const next = pick(element);
      if (next === state.target) return;
      state.target = next;
      if (next && settingsRef.current.targetEffect === "glitch") {
        state.glitch = 1;
      }
    };

    const enter = () => {
      if (!state.seen) {
        state.seen = true;
        relative();
        state.x = state.tx;
        state.y = state.ty;
        state.lock.x = state.x - 10;
        state.lock.y = state.y - 10;
        state.lock.w = 20;
        state.lock.h = 20;
      }
      state.inside = true;
      setCursorHidden(settingsRef.current.hideCursor);
    };

    const leave = () => {
      state.inside = false;
      state.target = null;
      setCursorHidden(false);
      wake();
    };

    const onMove: EventListener = (event) => {
      const pointerEvent = event as PointerEvent;
      state.clientX = pointerEvent.clientX;
      state.clientY = pointerEvent.clientY;
      if (pointerEvent.pointerType === "touch" && pointerEvent.buttons === 0) {
        return;
      }
      enter();
      retarget(pointerEvent.target);
      wake();
    };

    const onDown: EventListener = (event) => {
      const pointerEvent = event as PointerEvent;
      onMove(pointerEvent);
      if (!settingsRef.current.clickPulse || reduce) return;
      relative();
      state.pulses.push({ x: state.tx, y: state.ty, age: 0 });
      wake();
    };

    const onUp: EventListener = (event) => {
      if ((event as PointerEvent).pointerType !== "mouse") leave();
    };

    const onWindowOut = (event: PointerEvent) => {
      if (!event.relatedTarget) leave();
    };

    const onScroll = () => {
      if (!state.inside) return;
      retarget(document.elementFromPoint(state.clientX, state.clientY));
      wake();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    scope.addEventListener("pointermove", onMove);
    scope.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    if (host) host.addEventListener("pointerleave", leave);
    else document.addEventListener("pointerout", onWindowOut);
    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      scope.removeEventListener("pointermove", onMove);
      scope.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll, { capture: true });
      if (host) host.removeEventListener("pointerleave", leave);
      else document.removeEventListener("pointerout", onWindowOut);
      setCursorHidden(false);
      wakeRef.current = null;
    };
  }, [containerRef]);

  return (
    <>
      <style>{`.${HIDDEN}, .${HIDDEN} * { cursor: none !important; }`}</style>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={className}
        style={{
          position: containerRef ? "absolute" : "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: blendMode,
          ...style,
        }}
      />
    </>
  );
}
