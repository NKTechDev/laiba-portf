// src/routes/AppShell.tsx
import { Outlet, Link } from "react-router";
import { motion } from "framer-motion";

const MARQUEE_HEIGHT = 52; // keep in sync with class h-[52px] below

export default function AppShell() {
  return (
    <div className="min-h-[100svh] bg-black text-white flex flex-col">
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl text-cyan-400">
          RN • Portfolio
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-cyan-300">Home</Link>
          <Link to="/projects" className="hover:text-cyan-300">Projects</Link>
          <Link to="/contact" className="hover:text-cyan-300">Contact</Link>
        </nav>
      </header>

      {/* Main content + spacer so fixed marquee doesn't overlap */}
      <main className="flex-1">
        <Outlet />
        {/* Spacer equal to marquee height */}
        <div style={{ height: MARQUEE_HEIGHT }} aria-hidden />
      </main>

      {/* Fixed Marquee (always at the bottom of the viewport) */}
      <div
        className="
          fixed bottom-0 left-0 right-0 z-[60]
          bg-black/60 backdrop-blur border-t border-white/10
          h-[52px] overflow-hidden
        "
      >
        <motion.div
          className="flex gap-10 whitespace-nowrap leading-[52px] px-4 text-cyan-300 font-semibold text-sm sm:text-base"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          role="marquee"
          aria-label="skills marquee"
        >
          <span>⚡ MERN (Mongo • Express • React • Node)</span>
          <span>⚡ PERN (Postgres • Express • React • Node)</span>
          <span>⚡ Java + Spring Boot</span>
          <span>⚡ Kotlin • Jetpack Compose</span>
          <span>⚡ React Native (Android & iOS)</span>
          <span>⚡ Electron (Desktop & macOS)</span>
          <span>⚡ PHP / Laravel</span>
          <span>⚡ DevOps: Docker • K8s • CI/CD</span>
          <span>⚡ ML Engineering / MLOps</span>
          <span>⚡ Realtime Systems (Socket.IO)</span>
          <span>⚡ System Design & Observability</span>
        </motion.div>
      </div>
    </div>
  );
}
