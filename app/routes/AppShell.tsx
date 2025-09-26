// src/routes/AppShell.tsx
import { Outlet, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Code2, Database, Server, Cpu, Cloud, GitBranch, ShieldCheck,
  Smartphone, Monitor, Rocket, Boxes, Container, Workflow, TerminalSquare,
  Mail, Github, Linkedin, MessageCircle 
} from "lucide-react";

// Items → each links to /projects?tag=...
const ITEMS = [
  { icon: Code2, label: "MERN (Mongo • Express • React • Node)", tag: "mern" },
  { icon: Code2, label: "PERN (Postgres • Express • React • Node)", tag: "pern" },
  { icon: Server, label: "Java + Spring Boot", tag: "spring-boot" },
  { icon: Smartphone, label: "Kotlin • Jetpack Compose", tag: "kotlin-compose" },
  { icon: Smartphone, label: "React Native (Android & iOS)", tag: "react-native" },
  { icon: Monitor, label: "Electron (Desktop & macOS)", tag: "electron" },
  { icon: TerminalSquare, label: "PHP / Laravel", tag: "php-laravel" },
  { icon: Container, label: "DevOps: Docker • K8s • CI/CD", tag: "devops" },
  { icon: Cpu, label: "ML Engineering / MLOps", tag: "ml-mlops" },
  { icon: GitBranch, label: "Realtime Systems (Socket.IO)", tag: "realtime" },
  { icon: ShieldCheck, label: "Security • Hardening • RBAC", tag: "security" },
  { icon: Workflow, label: "Pipelines • Observability", tag: "observability" },
  { icon: Cloud, label: "Cloud: AWS • GCP • Azure", tag: "cloud" },
  { icon: Database, label: "Postgres • Mongo • Redis", tag: "databases" },
  { icon: Boxes, label: "Microservices • APIs", tag: "microservices" },
  { icon: Rocket, label: "Performance & Scaling", tag: "performance" },
];

// Mix rows: even → TOP, odd → BOTTOM
const ROW_TOP = ITEMS.filter((_, i) => i % 2 === 0);
const ROW_BOTTOM = ITEMS.filter((_, i) => i % 2 === 1);

/** Horizontal track (top/bottom) */
function TrackH({ items }: { items: typeof ITEMS }) {
  return (
    <div className="flex items-center gap-6 sm:gap-8 whitespace-nowrap pr-6">
      {items.map(({ icon: Icon, label, tag }) => (
        <Link
          key={label}
          to={`/projects?tag=${encodeURIComponent(tag)}`}
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-white transition-colors text-xs sm:text-sm font-semibold"
          aria-label={`See ${label} projects`}
        >
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/5 border border-white/10">
            <Icon className="h-4 w-4" />
          </span>
          <span className="leading-none">{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default function AppShell() {
  return (
    <div className="min-h-[100svh] bg-black text-white flex flex-col">
      {/* CSS vars for top/bottom heights (slim) */}
      <style>{`
        :root { --marquee-top: 44px; --marquee-bottom: 44px; }
        @media (min-width: 640px) {
          :root { --marquee-top: 52px; --marquee-bottom: 52px; }
        }
      `}</style>

      {/* Main content with spacers so marquees don't overlap */}
      <main className="flex-1 relative">
        <div style={{ height: "var(--marquee-top)" }} aria-hidden />
        <Outlet />
        <div style={{ height: "var(--marquee-bottom)" }} aria-hidden />
      </main>

      {/* TOP marquee (horizontal) */}
      <div
  className="fixed top-14 md:top-0 z-30 bg-black/60 backdrop-blur border-b border-white/10 h-[44px] sm:h-[52px] overflow-hidden"        role="region"
        aria-label="skills marquee top"
        style={{
          left: "var(--sidebar-pad, 0px)", // from your Sidebar
          right: 0,
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black/90 to-transparent" />
        <motion.div
          className="h-full flex items-center"
          aria-hidden
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{ animationPlayState: "var(--marquee-play, running)" }}
        >
          <div className="flex w-max">
            <TrackH items={ROW_TOP} />
            <TrackH items={ROW_TOP} />
          </div>
        </motion.div>
      </div>

      {/* BOTTOM marquee (horizontal) */}
      <div
        className="fixed bottom-0 z-30 bg-black/60 backdrop-blur border-t border-white/10 h-[44px] sm:h-[52px] overflow-hidden"
        role="region"
        aria-label="skills marquee bottom"
        style={{
          left: "var(--sidebar-pad, 0px)",
          right: 0,
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black/90 to-transparent" />
        <motion.div
          className="h-full flex items-center"
          aria-hidden
          animate={{ x: ["-25%", "-75%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          style={{ animationPlayState: "var(--marquee-play, running)" }}
        >
          <div className="flex w-max">
            <TrackH items={ROW_BOTTOM} />
            <TrackH items={ROW_BOTTOM} />
          </div>
        </motion.div>
      </div>

      {/* Floating Quick Contacts (small, portfolio-friendly, no reserved width) */}
     <div
  className="fixed z-40 bottom-3 right-3 sm:bottom-4 sm:right-4"
  style={{
    // keep it above the bottom marquee
    bottom: "calc(var(--marquee-bottom, 44px) + 12px)",
  }}
>
  <div className="flex items-center gap-2 rounded-full bg-white/8 backdrop-blur border border-white/10 px-2.5 py-1.5">
    {/* WhatsApp */}
    <a
      href="https://wa.me/923116521764?text=Hi%20Rana%20Nomi%2C%20I%27d%20like%20to%20chat%20about%20a%20project."
      target="_blank"
      rel="noreferrer noopener"
      className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] hover:bg-[#1EBE5A] transition"
      title="WhatsApp"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-4 w-4 text-white" />
    </a>

    {/* GitHub */}
    <a
      href="https://github.com/NkTechDev"
      target="_blank"
      rel="noreferrer"
      className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
      title="GitHub"
      aria-label="GitHub"
    >
      <Github className="h-4 w-4 text-white" />
    </a>

    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/your-handle"
      target="_blank"
      rel="noreferrer"
      className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
      title="LinkedIn"
      aria-label="LinkedIn"
    >
      <Linkedin className="h-4 w-4 text-white" />
    </a>

    {/* Email */}
    <a
      href="mailto:rananoman464464@gmail.com"
      className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
      title="Email"
      aria-label="Email"
    >
      <Mail className="h-4 w-4 text-white" />
    </a>
  </div>
</div>


      {/* Reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          :root { --marquee-play: paused; }
        }
      `}</style>
    </div>
  );
}
