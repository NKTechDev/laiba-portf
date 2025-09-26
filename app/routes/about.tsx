// src/routes/about.tsx
import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Route } from "./+types/home";
import {
  UserRound,
  Award,
  Briefcase,
  GraduationCap,
  Globe2,
  Rocket,
  ShieldCheck,
  Cpu,
  Database,
  Layers,
  Cloud,
  GitBranch,
  Wrench,
  Gauge,
  Zap,
  Workflow,
  TerminalSquare,
  BarChart3,
  LineChart,
  Activity,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About • RN Portfolio" },
    {
      name: "description",
      content:
        "About Laiba Anjum — Full-Stack, DevOps & ML engineer delivering scalable, secure, production-grade software across web, mobile, and desktop.",
    },
  ];
}

/* ------------ small helpers ------------ */

const cardCls =
  "rounded-2xl bg-white/5 backdrop-blur border border-white/10";

const pill =
  "inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300";

/* ------------ page ------------ */

export default function AboutRoute() {
  return (
    <section
      className="
        relative w-full min-h-[100svh]
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white overflow-hidden
      "
      aria-label="About"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* Mobile-only spacer so top marquee/header never overlap */}
      <div
        className="md:hidden"
        style={{
          height:
            "calc(var(--mobile-topbar, 56px) + var(--marquee-top, 44px) + 8px)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pt-8 sm:pt-12 pb-12 relative z-10">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <span className={pill}>
            <UserRound className="size-4" />
            About Me
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Crafting <span className="text-cyan-400">reliable software</span> that
            scales—web, mobile, and desktop.
          </h1>
          <p className="mt-2 text-gray-300 max-w-3xl">
            I’m <span className="text-white font-semibold">Laiba Anjum</span> — Full-Stack
            Developer, DevOps Engineer, and ML Engineer. I ship production-grade
            systems using <span className="text-white">MERN/PERN</span>,{" "}
            <span className="text-white">Java + Spring Boot</span>,{" "}
            <span className="text-white">Kotlin/Compose & React Native</span>,{" "}
            <span className="text-white">Electron</span>, plus{" "}
            <span className="text-white">Docker/K8s CI/CD</span> and MLOps.
            Security, performance budgets, and observability are built in.
          </p>
        </motion.header>

        {/* Top: Profile + Quick Stats */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-8">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className={`${cardCls} p-5 sm:p-6 lg:col-span-2`}
          >
            <div className="flex items-start gap-5">
              <img
                src="nomi.png" // replace with your photo
                alt="Laiba Anjum"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/15"
              />
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Laiba Anjum
                </h2>
                <p className="text-gray-300">
                  Full-Stack • DevOps • ML • Mobile • Desktop
                </p>
                <div className="mt-2 grid sm:flex gap-2 text-xs">
                  <span className={pill}>
                    <ShieldCheck className="size-4" />
                    Production-Ready • SSR
                  </span>
                  <span className={pill}>
                    <Rocket className="size-4" />
                    Performance & DX
                  </span>
                  <span className={pill}>
                    <Globe2 className="size-4" />
                    Remote-first
                  </span>
                </div>
              </div>
            </div>

            {/* Principles */}
            <div className="mt-5 grid md:grid-cols-3 gap-3">
              {[
                {
                  icon: Gauge,
                  title: "Measured Performance",
                  text:
                    "Core Web Vitals targets, profiling, and caching strategies.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure by Default",
                  text: "RBAC, secret management, dependency & container scans.",
                },
                {
                  icon: Workflow,
                  title: "Robust Delivery",
                  text: "CI/CD, canary/blue-green, IaC, and post-deploy checks.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl bg-white/5 border border-white/10 p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="font-semibold">{title}</div>
                  </div>
                  <p className="text-sm text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className={`${cardCls} p-5 sm:p-6`}
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "40+", v: "Deployments", Icon: Activity },
                { k: "15+", v: "Prod Apps", Icon: Layers },
                { k: "5+", v: "Industries", Icon: LineChart },
              ].map(({ k, v, Icon }) => (
                <div
                  key={v}
                  className="rounded-xl bg-white/5 border border-white/10 p-3 text-center"
                >
                  <div className="flex justify-center mb-1 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold">{k}</div>
                  <div className="text-[11px] sm:text-xs text-gray-400">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              <Link
                to="/projects"
                className="text-sm font-semibold rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition px-4 py-2 text-center"
              >
                View Projects →
              </Link>
              <a
                href="/RanaNomi_Resume.pdf"
                className="text-sm font-semibold rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition px-4 py-2 text-center"
              >
                Download Résumé
              </a>
            </div>
          </motion.div>
        </div>

        {/* Skills Matrix */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3">
            Core Skills & Tooling
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Full-Stack",
                items: [
                  { label: "MERN / PERN", Icon: TerminalSquare },
                  { label: "Next/Remix-style SSR", Icon: Zap },
                  { label: "Design Systems", Icon: Layers },
                  { label: "Realtime (Socket.IO)", Icon: GitBranch },
                ],
              },
              {
                title: "Backends & Data",
                items: [
                  { label: "Java + Spring Boot", Icon: Briefcase },
                  { label: "Node.js APIs", Icon: Wrench },
                  { label: "Postgres • Mongo • Redis", Icon: Database },
                  { label: "Microservices & Eventing", Icon: Workflow },
                ],
              },
              {
                title: "DevOps & ML",
                items: [
                  { label: "Docker • K8s • CI/CD", Icon: Cloud },
                  { label: "IaC & Observability", Icon: Gauge },
                  { label: "ML Engineering / MLOps", Icon: Cpu },
                  { label: "Security & Hardening", Icon: ShieldCheck },
                ],
              },
            ].map((col) => (
              <div key={col.title} className={`${cardCls} p-4`}>
                <div className="font-semibold text-cyan-300 mb-2">{col.title}</div>
                <div className="grid grid-cols-1 gap-2">
                  {col.items.map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm"
                    >
                      <span className="text-cyan-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-gray-200">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3">
            Experience
          </h3>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                when: "2024–2025",
                title: "Lead Full-Stack & DevOps (Freelance / Contract)",
                points: [
                  "Shipped SSR apps with CI/CD, K8s, and observability.",
                  "Scaled Node/Spring APIs; implemented RBAC and rate limits.",
                  "Delivered React Native & Electron apps with auto-updates.",
                ],
              },
              {
                when: "2022–2024",
                title: "Full-Stack Engineer (MERN/PERN)",
                points: [
                  "Built multi-tenant dashboards, WebSocket realtime features.",
                  "Databases: Postgres tuning, Mongo sharding basics.",
                  "Introduced E2E testing and release pipelines.",
                ],
              },
              {
                when: "2020–2022",
                title: "Java/Kotlin & ML Engineer",
                points: [
                  "Spring Boot microservices and Kotlin data pipelines.",
                  "Model serving & monitoring with autoscaling.",
                  "Security posture: scans, SBOMs, secret rotation.",
                ],
              },
              {
                when: "2018–2020",
                title: "Foundations",
                points: [
                  "Graduation, core CS, and open-source contributions.",
                  "Hackathon wins and early freelance work.",
                  "Built first production deployments.",
                ],
              },
            ].map((t) => (
              <div key={t.title} className={`${cardCls} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-cyan-300">{t.when}</div>
                  <GraduationCap className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="mt-1 font-semibold">{t.title}</div>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-300 space-y-1">
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3">Services</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                Icon: TerminalSquare,
                name: "Product Engineering",
                text:
                  "Web apps with SSR, design systems, and WCAG-aware UX.",
              },
              {
                Icon: Wrench,
                name: "API & Integrations",
                text: "REST/GraphQL, auth, payments, and 3rd-party APIs.",
              },
              {
                Icon: Cloud,
                name: "DevOps & Cloud",
                text: "Docker/K8s, IaC, GitHub Actions, blue-green deploys.",
              },
              {
                Icon: Cpu,
                name: "ML Engineering",
                text: "Pipelines, registries, serving, and MLOps monitoring.",
              },
              {
                Icon: ShieldCheck,
                name: "Security & Hardening",
                text: "RBAC, scans, SBOMs, secret management, compliance.",
              },
              {
                Icon: BarChart3,
                name: "Analytics & Observability",
                text: "Dashboards, tracing, budgets, and post-deploy checks.",
              },
            ].map(({ Icon, name, text }) => (
              <div key={name} className={`${cardCls} p-4`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="font-semibold">{name}</div>
                </div>
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications / Awards */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3">
            Certifications & Awards
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Kubernetes Fundamentals",
              "AWS Architect – Associate",
              "Secure Software (OWASP)",
              "GitHub Actions Advanced",
              "PostgreSQL Performance",
              "Docker & Container Security",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2"
              >
                <span className="text-cyan-300">
                  <Award className="h-4 w-4" />
                </span>
                <span className="text-sm text-gray-200">{label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials (placeholders) */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3">
            What Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                quote:
                  "Delivered a complex MERN + K8s platform with zero-downtime deploys. Super reliable, clear communication.",
                who: "CTO, SaaS Startup",
              },
              {
                quote:
                  "Transformed our Java/Spring APIs and added CI/CD + observability. Incidents dropped ~60%.",
                who: "Head of Engineering, Fintech",
              },
              {
                quote:
                  "Beautiful UX and solid performance on mobile & desktop. Would hire again.",
                who: "Product Lead, HealthTech",
              },
            ].map((t) => (
              <div key={t.who} className={`${cardCls} p-4`}>
                <p className="text-sm text-gray-200">“{t.quote}”</p>
                <div className="mt-2 text-xs text-gray-400">{t.who}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`${cardCls} p-5 sm:p-6`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-lg font-bold">Let’s build something great.</div>
              <p className="text-sm text-gray-300">
                Share your brief, timeline, and goals. I’ll reply with the best plan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-2xl font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition"
              >
                Start a Project →
              </Link>
              <a
                href="https://wa.me/923132903668?text=Hi%20Laiba%2C%20I%27d%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-2xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                WhatsApp Me
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
