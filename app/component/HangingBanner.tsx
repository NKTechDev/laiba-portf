// HangingBanner.tsx — FINAL CLEAN VERSION (SSR‑safe, no duplicates)
// Tech: React + Framer Motion + TailwindCSS
// Works with React Router v7 (client + SSR). No direct window access during render.

// import * as React from "react";
// import {
//   motion,
//   useAnimation,
//   useMotionValue,
//   useSpring,
//   useTransform,
//   useReducedMotion,
//   useScroll,
//   type MotionValue,
// } from "framer-motion";

// export type HangingBannerProps = {
//   title?: string;
//   subtitle?: string;
//   ctaText?: string;
//   onCtaClick?: () => void;
//   themeColor?: string; // Default: #00C9FF
//   className?: string;
//   ropeLength?: number; // px from header anchor to banner hinge
//   anchorOffsetX?: number; // px shift of the rope anchor (positive => right)
// };

// const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// export default function HangingBanner({
//   title = "Available for projects",
//   subtitle = "Full‑Stack • DevOps • RN • Spring • Laravel",
//   ctaText = "View Portfolio",
//   onCtaClick,
//   themeColor = "#00C9FF",
//   className,
//   ropeLength = 120,
//   anchorOffsetX = 0,
// }: HangingBannerProps) {
//   const reduce = useReducedMotion();
//   const controls = useAnimation();

//   // 1) Motion values
//   const swing = useMotionValue(0); // target angle in radians
//   const springSwing = useSpring(swing, { stiffness: 50, damping: 8, mass: 0.6 });

//   // 2) Scroll + mouse influences (safe: initialized in effects)
//   const { scrollYProgress } = useScroll();
//   const scrollInfluence = useTransform(scrollYProgress, [0, 1], [-0.12, 0.12]);

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const viewportW = useMotionValue(1);
//   const viewportH = useMotionValue(1);

//   const mouseInfluence = useTransform([mouseX, mouseY, viewportW, viewportH], ([x, y, W, H]) => {
//     const dx = (Number(x) / Number(W)) - 0.5;
//     const dy = (Number(y) / Number(H)) - 0.5;
//     return clamp(dx * 0.15 + dy * 0.05, -0.18, 0.18);
//   });

//   // 3) Final rotation MotionValue
//   const rotation = useTransform([springSwing, scrollInfluence, mouseInfluence], ([s, sc, m]) =>
//     reduce ? 0 : clamp(Number(s) + Number(sc) + Number(m), -0.35, 0.35)
//   );

//   // 4) Rope control deltas based on rotation
//   const ropeCtrlDx = useTransform(rotation, r => Math.sin(Number(r)) * 18);
//   const ropeCtrlDy = useTransform(rotation, r => Math.abs(Math.cos(Number(r))) * 24 + 8);

//   // 5) Mount swing (decaying arcs)
//   React.useEffect(() => {
//     if (reduce) return;
//     controls.start({
//       rotate: [0, -10, 8, -6, 4, -2, 0],
//       transition: { duration: 2.4, times: [0, 0.18, 0.36, 0.54, 0.7, 0.86, 1], ease: "easeInOut" },
//     });
//   }, [controls, reduce]);

//   // 6) Track viewport + mouse only on client
//   React.useEffect(() => {
//     if (reduce) return;
//     const hasWindow = typeof window !== "undefined";
//     if (!hasWindow) return;

//     const setViewport = () => {
//       viewportW.set(window.innerWidth || 1);
//       viewportH.set(window.innerHeight || 1);
//     };
//     setViewport();
//     window.addEventListener("resize", setViewport);

//     const onMove = (e: MouseEvent) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", onMove);

//     return () => {
//       window.removeEventListener("resize", setViewport);
//       window.removeEventListener("mousemove", onMove);
//     };
//   }, [mouseX, mouseY, viewportW, viewportH, reduce]);

//   // 7) Idle micro‑oscillation driving the spring target
//   React.useEffect(() => {
//     if (reduce) return;
//     let raf = 0;
//     const start = performance.now();
//     const tick = (t: number) => {
//       const dt = (t - start) / 1000;
//       const drive = Math.sin(dt * 0.7) * 0.05 + Math.sin(dt * 0.17) * 0.02;
//       swing.set(drive);
//       raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [swing, reduce]);

//   // 8) CTA default behavior
//   const handleCTA = () => {
//     if (onCtaClick) return onCtaClick();
//     try {
//       const el = document.querySelector("#portfolio, #work, #projects");
//       (el as HTMLElement | null)?.scrollIntoView({ behavior: "smooth", block: "start" });
//     } catch {}
//   };

//   // Layout constants
//   const width = 380; // card width
//   const anchorX = width / 2 + anchorOffsetX; // hinge inside the card

//   return (
//     <div className={["relative mx-auto w-full max-w-3xl select-none", className ?? ""].join(" ")} aria-label="Hanging announcement">
//       {/* Visual anchor pin near header */}
//       <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20" style={{ transform: `translate(calc(-50% + ${anchorOffsetX}px), -8px)` }}>
//         <div className="h-3 w-3 rounded-full" style={{ background: themeColor, boxShadow: `0 0 0 3px ${themeColor}22` }} />
//       </div>

//       {/* Rope SVG managed by MotionPathUpdater (single source of truth) */}
//       <MotionPathUpdater
//         width={width}
//         ropeLength={ropeLength}
//         anchorX={anchorX}
//         anchorY={0}
//         ctrlDx={ropeCtrlDx}
//         ctrlDy={ropeCtrlDy}
//         themeColor={themeColor}
//       />

//       {/* Spacer pushes the banner to the end of the rope */}
//       <div style={{ height: ropeLength }} />

//       {/* Swinging banner card */}
//       <motion.div
//         role="region"
//         aria-roledescription="swinging banner"
//         initial={{ rotate: 0 }}
//         animate={controls}
//         style={{ rotate: rotation, transformOrigin: `${anchorX}px 0px` }}
//         className="relative z-20 mx-auto"
//       >
//         <div className="relative mx-auto" style={{ width }}>
//           {/* Hinge point */}
//           <div className="absolute left-1/2 -top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/20 shadow" />

//           {/* Card */}
//           <div className="rounded-2xl border bg-white/5 px-6 py-5 backdrop-blur-md shadow-xl" style={{ borderColor: `${themeColor}55`, boxShadow: `0 18px 40px -12px ${themeColor}44`, background: `linear-gradient(180deg, ${themeColor}24, transparent)` }}>
//             <div className="flex items-center justify-between gap-4">
//               <div>
//                 <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{title}</h3>
//                 <p className="mt-1 text-sm sm:text-base text-white/70">{subtitle}</p>
//               </div>
//               <motion.button onClick={handleCTA} whileTap={{ scale: 0.97 }} whileHover={reduce ? {} : { y: -1 }} className="shrink-0 rounded-xl px-4 py-2 text-sm font-medium text-slate-900 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-0" style={{ boxShadow: `0 8px 20px -6px ${themeColor}66` }}>
//                 {ctaText}
//               </motion.button>
//             </div>
//           </div>

//           {/* Soft shadow */}
//           <div className="mx-auto mt-3 h-4 w-[70%] rounded-full blur-2xl opacity-50" style={{ background: `radial-gradient(ellipse at center, ${themeColor}29, transparent 60%)` }} />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// /** Single rope path synced to motion values (no duplicates) */
// function MotionPathUpdater({
//   width,
//   ropeLength,
//   anchorX,
//   anchorY,
//   ctrlDx,
//   ctrlDy,
//   themeColor,
// }: {
//   width: number;
//   ropeLength: number;
//   anchorX: number;
//   anchorY: number;
//   ctrlDx: MotionValue<number>;
//   ctrlDy: MotionValue<number>;
//   themeColor: string;
// }) {
//   const pathRef = React.useRef<SVGPathElement | null>(null);

//   React.useEffect(() => {
//     const update = () => {
//       const p = pathRef.current;
//       if (!p) return;
//       const cx = anchorX + Number(ctrlDx.get());
//       const cy = anchorY + Number(ctrlDy.get());
//       const d = `M ${anchorX} ${anchorY} Q ${cx} ${cy} ${anchorX} ${ropeLength}`;
//       p.setAttribute("d", d);
//     };

//     const off1 = ctrlDx.on("change", update);
//     const off2 = ctrlDy.on("change", update);
//     update();
//     return () => {
//       off1?.();
//       off2?.();
//     };
//   }, [anchorX, anchorY, ropeLength, ctrlDx, ctrlDy]);

//   return (
//     <svg className="pointer-events-none absolute left-1/2 top-0 z-10" width={width} height={ropeLength + 20} viewBox={`0 0 ${width} ${ropeLength + 20}`} style={{ transform: "translateX(-50%)" }}>
//       <path ref={pathRef} strokeWidth={3} stroke={themeColor} strokeOpacity={0.9} fill="none" />
//     </svg>
//   );
// }
// // HangingBanner.tsx — FINAL CLEAN VERSION (SSR‑safe, no duplicates)
// // Tech: React + Framer Motion + TailwindCSS
// // Works with React Router v7 (client + SSR). No direct window access during render.

import * as React from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";

export type HangingBannerProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  themeColor?: string; // Default: #00C9FF
  className?: string;
  ropeLength?: number; // px from header anchor to banner hinge
  anchorOffsetX?: number; // px shift of the rope anchor (positive => right)
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function HangingBanner({
  title = "Available for projects",
  subtitle = "Full‑Stack • DevOps • RN • Spring • Laravel",
  ctaText = "View Portfolio",
  onCtaClick,
  themeColor = "#00C9FF",
  className,
  ropeLength = 120,
  anchorOffsetX = 0,
}: HangingBannerProps) {
  const reduce = useReducedMotion();
  const controls = useAnimation();

  // 1) Motion values
  const swing = useMotionValue(0); // target angle in radians
  const springSwing = useSpring(swing, { stiffness: 50, damping: 8, mass: 0.6 });

  // 2) Scroll + mouse influences (safe: initialized in effects)
  const { scrollYProgress } = useScroll();
  const scrollInfluence = useTransform(scrollYProgress, [0, 1], [-0.12, 0.12]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const viewportW = useMotionValue(1);
  const viewportH = useMotionValue(1);

  const mouseInfluence = useTransform([mouseX, mouseY, viewportW, viewportH], ([x, y, W, H]) => {
    const dx = (Number(x) / Number(W)) - 0.5;
    const dy = (Number(y) / Number(H)) - 0.5;
    return clamp(dx * 0.15 + dy * 0.05, -0.18, 0.18);
  });

  // 3) Final rotation MotionValue
  const rotation = useTransform([springSwing, scrollInfluence, mouseInfluence], ([s, sc, m]) =>
    reduce ? 0 : clamp(Number(s) + Number(sc) + Number(m), -0.35, 0.35)
  );

  // 4) Rope control deltas based on rotation
  const ropeCtrlDx = useTransform(rotation, r => Math.sin(Number(r)) * 18);
  const ropeCtrlDy = useTransform(rotation, r => Math.abs(Math.cos(Number(r))) * 24 + 8);

  // 5) Mount swing (decaying arcs)
  React.useEffect(() => {
    if (reduce) return;
    controls.start({
      rotate: [0, -10, 8, -6, 4, -2, 0],
      transition: { duration: 2.4, times: [0, 0.18, 0.36, 0.54, 0.7, 0.86, 1], ease: "easeInOut" },
    });
  }, [controls, reduce]);

  // 6) Track viewport + mouse only on client
  React.useEffect(() => {
    if (reduce) return;
    const hasWindow = typeof window !== "undefined";
    if (!hasWindow) return;

    const setViewport = () => {
      viewportW.set(window.innerWidth || 1);
      viewportH.set(window.innerHeight || 1);
    };
    setViewport();
    window.addEventListener("resize", setViewport);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", setViewport);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY, viewportW, viewportH, reduce]);

  // 7) Idle micro‑oscillation driving the spring target
  React.useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const dt = (t - start) / 1000;
      const drive = Math.sin(dt * 0.7) * 0.05 + Math.sin(dt * 0.17) * 0.02;
      swing.set(drive);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [swing, reduce]);

  // 8) CTA default behavior
  const handleCTA = () => {
    if (onCtaClick) return onCtaClick();
    try {
      const el = document.querySelector("#portfolio, #work, #projects");
      (el as HTMLElement | null)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {}
  };

  // Layout constants
  const width = 380; // card width
  const anchorX = width / 2 + anchorOffsetX; // hinge inside the card

  return (
    <div className={["relative mx-auto w-full max-w-3xl select-none", className ?? ""].join(" ")} aria-label="Hanging announcement">
      {/* Visual anchor pin near header */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20" style={{ transform: `translate(calc(-50% + ${anchorOffsetX}px), -8px)` }}>
        <div className="h-3 w-3 rounded-full" style={{ background: themeColor, boxShadow: `0 0 0 3px ${themeColor}22` }} />
      </div>

      {/* Rope SVG managed by MotionPathUpdater (single source of truth) */}
      <MotionPathUpdater
        width={width}
        ropeLength={ropeLength}
        anchorX={anchorX}
        anchorY={0}
        ctrlDx={ropeCtrlDx}
        ctrlDy={ropeCtrlDy}
        themeColor={themeColor}
      />

      {/* Spacer pushes the banner to the end of the rope */}
      <div style={{ height: ropeLength }} />

      {/* Swinging banner card */}
      <motion.div
        role="region"
        aria-roledescription="swinging banner"
        initial={{ rotate: 0 }}
        animate={controls}
        style={{ rotate: rotation, transformOrigin: `${anchorX}px 0px` }}
        className="relative z-20 mx-auto"
      >
        <div className="relative mx-auto" style={{ width }}>
          {/* Hinge point */}
          <div className="absolute left-1/2 -top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/20 shadow" />

          {/* Card */}
          <div className="rounded-2xl border bg-white/5 px-6 py-5 backdrop-blur-md shadow-xl" style={{ borderColor: `${themeColor}55`, boxShadow: `0 18px 40px -12px ${themeColor}44`, background: `linear-gradient(180deg, ${themeColor}24, transparent)` }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-1 text-sm sm:text-base text-white/70">{subtitle}</p>
              </div>
              <motion.button onClick={handleCTA} whileTap={{ scale: 0.97 }} whileHover={reduce ? {} : { y: -1 }} className="shrink-0 rounded-xl px-4 py-2 text-sm font-medium text-slate-900 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-0" style={{ boxShadow: `0 8px 20px -6px ${themeColor}66` }}>
                {ctaText}
              </motion.button>
            </div>
          </div>

          {/* Soft shadow */}
          <div className="mx-auto mt-3 h-4 w-[70%] rounded-full blur-2xl opacity-50" style={{ background: `radial-gradient(ellipse at center, ${themeColor}29, transparent 60%)` }} />
        </div>
      </motion.div>
    </div>
  );
}

/** Single rope path synced to motion values (no duplicates) */
function MotionPathUpdater({
  width,
  ropeLength,
  anchorX,
  anchorY,
  ctrlDx,
  ctrlDy,
  themeColor,
}: {
  width: number;
  ropeLength: number;
  anchorX: number;
  anchorY: number;
  ctrlDx: MotionValue<number>;
  ctrlDy: MotionValue<number>;
  themeColor: string;
}) {
  const pathRef = React.useRef<SVGPathElement | null>(null);

  React.useEffect(() => {
    const update = () => {
      const p = pathRef.current;
      if (!p) return;
      const cx = anchorX + Number(ctrlDx.get());
      const cy = anchorY + Number(ctrlDy.get());
      const d = `M ${anchorX} ${anchorY} Q ${cx} ${cy} ${anchorX} ${ropeLength}`;
      p.setAttribute("d", d);
    };

    const off1 = ctrlDx.on("change", update);
    const off2 = ctrlDy.on("change", update);
    update();
    return () => {
      off1?.();
      off2?.();
    };
  }, [anchorX, anchorY, ropeLength, ctrlDx, ctrlDy]);

  return (
    <svg className="pointer-events-none absolute left-1/2 top-0 z-10" width={width} height={ropeLength + 20} viewBox={`0 0 ${width} ${ropeLength + 20}`} style={{ transform: "translateX(-50%)" }}>
      <path ref={pathRef} strokeWidth={3} stroke={themeColor} strokeOpacity={0.9} fill="none" />
    </svg>
  );
}
