// src/routes/services.tsx
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "./+types/home";
import {
  Wrench, TerminalSquare, Layers, Workflow, Cloud, Cpu, ShieldCheck,
  Smartphone, Monitor, Zap, Gauge, Database, GitBranch, Lock, Rocket,
  CheckCircle2, ChevronDown, FileText, LineChart, Globe2
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services • RN Portfolio" },
    {
      name: "description",
      content:
        "Full-Stack, DevOps, and ML services: product engineering, APIs, cloud, mobile/desktop, security, and MLOps with production-grade delivery.",
    },
  ];
}

/* -------------------- helpers -------------------- */

const card = "rounded-2xl bg-white/5 backdrop-blur border border-white/10";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300";

/* FAQ item (local) */
function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li className={`${card}`}>
      <button
        className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-cyan-300" />
          <span className="text-sm font-semibold">{q}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-3 pb-3 text-sm text-gray-300"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* -------------------- page -------------------- */

export default function ServicesRoute() {
  const faqs = [
    {
      q: "What’s included by default?",
      a: "Versioned source code, CI/CD pipeline, environment configs, basic monitoring, performance budgets, documentation, and a short warranty period post-launch.",
    },
    {
      q: "How do we start?",
      a: "Send your brief (goals, timeline, budget range). I’ll reply with scope, milestones, and pricing. An NDA can be signed first if needed.",
    },
    {
      q: "Do you take maintenance retainers?",
      a: "Yes—pick a support tier (Starter/Growth/Scale) with defined response times, maintenance windows, and escalation paths.",
    },
  ];

  return (
    <section
      className="
        relative w-full min-h-[100svh]
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white overflow-hidden
      "
      aria-label="Services"
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <span className={pill}>
            <Wrench className="size-4" />
            Services
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Engineering that ships <span className="text-cyan-400">reliably</span>.
          </h1>
          <p className="mt-2 text-gray-300 max-w-3xl">
            Full-stack product builds, robust APIs, cloud & DevOps, ML/MLOps, and
            mobile/desktop apps—delivered with security and observability by default.
          </p>
        </motion.header>

        {/* Service grid */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            {
              Icon: TerminalSquare,
              title: "Product Engineering (Web)",
              bullets: [
                "SSR-friendly apps (React Router v7)",
                "Design systems & a11y",
                "Performance budgets / CWV",
              ],
              footer: "Best for greenfield or redesigns.",
            },
            {
              Icon: Workflow,
              title: "APIs & Integrations",
              bullets: [
                "REST/GraphQL microservices",
                "Auth, payments, webhooks",
                "Rate limits & RBAC",
              ],
              footer: "Hardened endpoints with clear SLAs.",
            },
            {
              Icon: Cloud,
              title: "DevOps & Cloud",
              bullets: [
                "Docker/K8s, IaC, GitHub Actions",
                "Blue-green / canary deploys",
                "Monitoring & alerting",
              ],
              footer: "Production-ready CI/CD from day one.",
            },
            {
              Icon: Cpu,
              title: "ML Engineering / MLOps",
              bullets: [
                "Pipelines & registries",
                "Serving & autoscaling",
                "Model monitoring",
              ],
              footer: "From prototype to production.",
            },
            {
              Icon: Smartphone,
              title: "Mobile (RN & Kotlin/Compose)",
              bullets: [
                "Android & iOS releases",
                "OTA updates & crash analytics",
                "Native modules when needed",
              ],
              footer: "App store ready deliverables.",
            },
            {
              Icon: Monitor,
              title: "Desktop (Electron & macOS/Win)",
              bullets: [
                "Auto-update channels",
                "Secure storage & keychain",
                "Hardware/OS integrations",
              ],
              footer: "Signed builds and installers.",
            },
            {
              Icon: ShieldCheck,
              title: "Security & Hardening",
              bullets: [
                "Secrets, SBOMs, dependency scans",
                "Zero-trust & least privilege",
                "Compliance-aware practices",
              ],
              footer: "Shift-left security by default.",
            },
            {
              Icon: Database,
              title: "Data & Performance",
              bullets: [
                "Postgres/Mongo/Redis tuning",
                "Caching strategies & queues",
                "Observability dashboards",
              ],
              footer: "Predictable latency and scale.",
            },
            {
              Icon: GitBranch,
              title: "Realtime & Collaboration",
              bullets: [
                "Socket.IO/WebRTC",
                "Presence & live cursors",
                "Conflict resolution",
              ],
              footer: "Low-latency UX at scale.",
            },
          ].map(({ Icon, title, bullets, footer }) => (
            <div key={title} className={`${card} p-4`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="font-semibold">{title}</div>
              </div>
              <ul className="mt-1 text-sm text-gray-300 space-y-1">
                {bullets.map((b: string) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-[2px] text-emerald-300 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-xs text-gray-400">{footer}</div>
            </div>
          ))}
        </motion.section>

        {/* Delivery process */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
            Delivery Process
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: "01 • Discover",
                Icon: Globe2,
                text: "Scope, risks, and constraints. Align on KPIs and success metrics.",
              },
              {
                step: "02 • Plan & SOW",
                Icon: FileText,
                text: "Milestones, deliverables, timelines, and acceptance criteria.",
              },
              {
                step: "03 • Build",
                Icon: Wrench,
                text: "Short iterations, weekly demos, feature flags, and CI checks.",
              },
              {
                step: "04 • Harden",
                Icon: Lock,
                text: "Security scans, perf budgets, load tests, and staging rehearsals.",
              },
              {
                step: "05 • Launch",
                Icon: Rocket,
                text: "Blue-green/canary rollout, dashboards, and smoke tests.",
              },
              {
                step: "06 • Operate",
                Icon: Gauge,
                text: "Observability, SLOs, postmortems, and knowledge transfer.",
              },
            ].map(({ step, Icon, text }) => (
              <div key={step} className={`${card} p-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="font-semibold">{step}</div>
                </div>
                <p className="text-sm text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Packages (align with your Help SLAs) */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
            Packages & Support
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Starter",
                desc: "MVPs & small sites",
                points: [
                  "Email support",
                  "Monthly updates",
                  "Basic monitoring",
                  "Next-business-day response",
                ],
              },
              {
                name: "Growth",
                desc: "Scaling products",
                points: [
                  "Priority queue",
                  "Weekly updates",
                  "Advanced monitoring",
                  "< 8h response (business)",
                ],
              },
              {
                name: "Scale",
                desc: "Mission-critical",
                points: [
                  "Escalation path",
                  "Change windows",
                  "SLA reports",
                  "< 4h response (incl. weekends)",
                ],
              },
            ].map((t) => (
              <div key={t.name} className={`${card} p-4`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-lg font-bold">{t.name}</div>
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                </div>
                <p className="text-sm text-gray-300 mb-2">{t.desc}</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-[2px] text-emerald-300 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tech highlights */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">
            Tech Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Web & Realtime",
                items: ["MERN/PERN", "SSR (Router v7)", "Socket.IO/WebRTC"],
              },
              {
                title: "Backend & Data",
                items: ["Spring Boot / Node", "Postgres • Mongo • Redis", "Events & queues"],
              },
              {
                title: "Ops & ML",
                items: ["Docker/K8s • IaC", "Actions/Jenkins", "MLOps pipelines & serving"],
              },
            ].map(({ title, items }) => (
              <div key={title} className={`${card} p-4`}>
                <div className="font-semibold text-cyan-300 mb-2">{title}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((it) => (
                    <span
                      key={it}
                      className="text-xs rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-gray-200"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">FAQs</h2>
          <ul className="grid md:grid-cols-3 gap-3">
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={false /* collapsed by default */}
                onToggle={() => {
                  // simple no-op; feel free to wire to state if you want persistent open
                }}
              />
            ))}
          </ul>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className={`${card} p-5 sm:p-6 mt-8 sm:mt-10`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-lg font-bold">Ready to discuss your project?</div>
              <p className="text-sm text-gray-300">
                Share your goals and timeline—I’ll propose the fastest, safest way to ship.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-2xl font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Start a Project
              </Link>
              <a
                href="https://wa.me/923116521764?text=Hi%20Rana%2C%20I%27d%20like%20to%20discuss%20a%20project"
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
