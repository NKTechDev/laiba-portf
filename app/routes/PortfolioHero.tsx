// src/components/PortfolioHero.tsx
import { motion } from "framer-motion";
import { Link } from "react-router"; // ✅ correct package
import {
  Code2,
  Database,
  Server,
  Cpu,
  Cloud,
  GitBranch,
  Rocket,
  Boxes,
  Settings,
  ShieldCheck,
  Container,
  Workflow,
  Languages,
  Monitor,
  Activity,
  Layers,
  LineChart,
} from "lucide-react";
import type { Route } from "./+types/home";
import HangingBanner from "~/component/HangingBanner";


const MLink = motion(Link);
const MA = motion.a;

export function meta({}: Route.MetaArgs) {
  const SITE = "https://nktech.giyiyorum.com";           // ← update to your domain
  const TITLE = "Laiba Anjum — Full-Stack, DevOps & ML Engineer | Profile";
  const DESC =
    "Profile of Laiba Anjum — Full-Stack (MERN/PERN), Java/Spring Boot & Kotlin engineer. I design, build, and operate secure, scalable, production-grade systems across web, mobile, and desktop with CI/CD, Docker/K8s, and MLOps.";
  const OG_IMG = `${SITE}/nomi.png`;          // ← place a 1200×630 image there

  return [
    { title: TITLE },
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "Laiba Anjum, RN Portfolio, Full-Stack Developer, MERN, PERN, React, Node.js, Spring Boot, Java, Kotlin, Jetpack Compose, React Native, Electron, PHP, Laravel, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, CI/CD, GitHub Actions, Jenkins, AWS, GCP, Azure, Microservices, Socket.IO, Realtime, Observability, Prometheus, Grafana, OpenTelemetry, MLOps, Machine Learning",
    },
    { name: "author", content: "Laiba Anjum" },
    { name: "robots", content: "index,follow" },
    { name: "theme-color", content: "#0b0f14" },

    // Open Graph
    { property: "og:type", content: "profile" },
    { property: "og:site_name", content: "RN • Portfolio" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESC },
    { property: "og:url", content: `${SITE}/nomi.png` },
    { property: "og:image", content: OG_IMG },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESC },
    { name: "twitter:image", content: OG_IMG },
    { name: "twitter:creator", content: "@your_handle" }, // ← optional
  ];
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Laiba Anjum",
  alternateName: "RN",
  url: "https://nktech.giyiyorum.com",
  image: "nomi.png",
  jobTitle: "Full-Stack, DevOps & ML Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Contract"
  },
  sameAs: [
    "https://github.com/rananoman",   // replace with your GitHub
    "https://www.linkedin.com/in/rananoman", // LinkedIn
    "https://twitter.com/your_handle" // Twitter/X if available
  ],
  description:
    "Full-Stack (MERN, PERN, Java/Spring Boot, Kotlin) engineer specializing in secure, scalable, production-grade apps with DevOps, CI/CD, Docker/K8s, and MLOps."
};


export default function PortfolioHero() {
  return (
    <>
     {/* <HangingBanner
        title="Available for projects"
        subtitle="MERN • Spring Boot • RN • DevOps"
        ctaText="View Portfolio"
        onCtaClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
        themeColor="#00C9FF"
        ropeLength={140}
      /> */}

          <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    <section
      className="
  relative w-full min-h-[100svh]
  bg-gradient-to-br from-gray-900 via-black to-gray-800
  text-white overflow-hidden flex items-center
  pt-20 sm:pt-0
"
      aria-label="Hero"
    >

       
      {/* rest of hero */}
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-10 md:pt-0 sm:pt-10 relative z-10">
        {/* 2-column on lg; mobile stacks with the Profile first (stable & centered) */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start lg:items-center">
          {/* RIGHT becomes FIRST on mobile */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            {/* Profile Card */}
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-transparent to-emerald-400/60">
              <div className="rounded-3xl bg-black/70 p-5 sm:p-6 md:p-8 backdrop-blur border border-white/10">
                <div className="flex items-center gap-4 sm:gap-5">
                  <img
                    src="nomi.png" /* ← replace with your photo */
                    alt="Rana Nomi"
                    /* 👉 Prevent shrink + keep consistent size on mobile */
                    className="
                shrink-0 select-none
                w-[88px] h-[92px]
                sm:w-[104px] sm:h-[104px]
                md:w-[112px] md:h-[112px]
                rounded-2xl object-cover border border-white/15
              "
                  />
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Laiba Anjum
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Full-Stack • DevOps • ML • Mobile • Desktop
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs text-emerald-300">
                      <Settings className="size-4" />
                      Building performant, secure, SSR-friendly apps.
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    {
                      label: "Spring Boot APIs",
                      icon: <Server className="size-4" />,
                    },
                    {
                      label: "Realtime (Socket.IO)",
                      icon: <GitBranch className="size-4" />,
                    },
                    {
                      label: "Microservices",
                      icon: <Cloud className="size-4" />,
                    },
                    {
                      label: "Mobile: RN & Compose",
                      icon: <Rocket className="size-4" />,
                    },
                    {
                      label: "Electron (macOS/Win)",
                      icon: <Monitor className="size-4" />,
                    },
                    {
                      label: "Observability",
                      icon: <ShieldCheck className="size-4" />,
                    },
                  ].map((x) => (
                    <div
                      key={x.label}
                      className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs"
                    >
                      <span className="text-cyan-300">{x.icon}</span>
                      <span className="text-gray-200">{x.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats — BELOW the profile card, always */}
            <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  k: "40+",
                  v: "Deployments",
                  icon: <Activity className="size-4" />,
                },
                {
                  k: "15+",
                  v: "Prod Apps",
                  icon: <Layers className="size-4" />,
                },
                {
                  k: "5+",
                  v: "Industries",
                  icon: <LineChart className="size-4" />,
                },
              ].map((it) => (
                <div
                  key={it.v}
                  className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center"
                >
                  <div className="flex justify-center mb-1 text-cyan-300">
                    {it.icon}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold">
                    {it.k}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-400">
                    {it.v}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* LEFT copy section (second on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300 mb-5">
              <ShieldCheck className="size-4" />
              Available for contracts & collaborations (SSR-ready)
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
              Hi, I’m <span className="text-cyan-400">Laiba Anjum</span>
            </h1>

            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-2xl">
              <span className="font-semibold text-white">
                Full-Stack (MERN • PERN) • Java/Spring Boot •
                PHP/Laravel • Python/Fast Api • DevOps • ML • React Native • Kotlin/Compose • swift/SwiftUi
                • Electron  <br />
              </span>
              <br className="hidden sm:block" />I build scalable real-time
              systems, mobile apps, and desktop apps with strong CI/CD and
              production-grade observability.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
  <MLink
    to="/projects"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="
      inline-flex items-center justify-center
      h-10 sm:h-12 px-4 sm:px-6
      rounded-2xl font-semibold leading-none whitespace-nowrap
      text-sm sm:text-base
      shadow-lg bg-cyan-500 text-black hover:bg-cyan-400 transition
    "
  >
    View Projects →
  </MLink>

  <MA
    href="/RanaNomi_Resume.pdf"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="
      inline-flex items-center justify-center
      h-10 sm:h-12 px-4 sm:px-6
      rounded-2xl font-semibold leading-none whitespace-nowrap
      text-sm sm:text-base
      border border-white/15 bg-white/5 hover:bg-white/10 transition
    "
  >
    Download Résumé
  </MA>
</div>

            {/* Skill badges with icons */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {[
                { label: "MERN / PERN", icon: <Code2 className="size-4" /> },
                {
                  label: "Java + Spring Boot",
                  icon: <Server className="size-4" />,
                },
                {
                  label: "Kotlin / Jetpack Compose",
                  icon: <Languages className="size-4" />,
                },
                {
                  label: "React Native (iOS/Android)",
                  icon: <Rocket className="size-4" />,
                },
                {
                  label: "Electron (Desktop & macOS)",
                  icon: <Monitor className="size-4" />,
                },
                {
                  label: "Postgres / Mongo",
                  icon: <Database className="size-4" />,
                },
                {
                  label: "Docker / K8s",
                  icon: <Container className="size-4" />,
                },
                {
                  label: "CI/CD (GitHub, Jenkins)",
                  icon: <Workflow className="size-4" />,
                },
                { label: "ML / MLOps", icon: <Cpu className="size-4" /> },
                {
                  label: "APIs & Microservices",
                  icon: <Cloud className="size-4" />,
                },
                {
                  label: "Version Control",
                  icon: <GitBranch className="size-4" />,
                },
                {
                  label: "Hardening & Observability",
                  icon: <ShieldCheck className="size-4" />,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 rounded-xl bg-white/5 backdrop-blur border border-white/10 px-3 py-2 text-sm"
                >
                  <span className="text-cyan-300">{s.icon}</span>
                  <span className="text-gray-200">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    </>
  );
}
