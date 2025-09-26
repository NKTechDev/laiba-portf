// src/routes/open-source.tsx
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import type { Route } from "./+types/home";
import {
  Github, Star, Bug, Package, FileText, ShieldCheck, Rocket, TerminalSquare,
  Code2, Database, Cloud, Cpu, Smartphone, Monitor, Layers, ExternalLink, Zap, Tag, Search
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Open Source • RN Portfolio" },
    {
      name: "description",
      content:
        "Open-source projects, libraries, starters, and tools across MERN/PERN, Spring Boot, DevOps, ML, mobile, and desktop.",
    },
  ];
}

type Repo = {
  slug: string;
  name: string;
  summary: string;
  type: "Library" | "Starter" | "CLI" | "Example" | "Tool";
  stack: string[];
  tags: string[]; // for filtering
  license: "MIT" | "Apache-2.0" | "GPL-3.0" | "ISC";
  repo: string; // github url
  npm?: string; // npm url (optional)
  featured?: boolean;
};

const card = "rounded-2xl bg-white/5 backdrop-blur border border-white/10";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300";

/** Curated OSS dataset (edit slugs/links to your repos later) */
const REPOS: Repo[] = [
  {
    slug: "router7-ssr-starter",
    name: "router7-ssr-starter",
    summary:
      "Production-grade React Router v7 SSR starter with Tailwind, Framer Motion, typed meta, and CI.",
    type: "Starter",
    stack: ["TypeScript", "React Router v7", "Tailwind", "Framer Motion"],
    tags: ["web", "ssr", "starter", "performance"],
    license: "MIT",
    repo: "https://github.com/your-handle/router7-ssr-starter",
    featured: true,
  },
  {
    slug: "socket-realtime-kit",
    name: "socket-realtime-kit",
    summary:
      "Drop-in Socket.IO kit with presence, rooms, auth middleware, and reconnection helpers.",
    type: "Library",
    stack: ["Node", "Socket.IO", "Redis"],
    tags: ["realtime", "node", "redis"],
    license: "MIT",
    repo: "https://github.com/your-handle/socket-realtime-kit",
    npm: "https://www.npmjs.com/package/socket-realtime-kit",
    featured: true,
  },
  {
    slug: "spring-boot-observability",
    name: "spring-boot-observability",
    summary:
      "Opinionated Spring Boot starter for metrics, tracing, and logs with OpenTelemetry wiring.",
    type: "Starter",
    stack: ["Java", "Spring Boot", "OTel"],
    tags: ["spring-boot", "observability", "java"],
    license: "Apache-2.0",
    repo: "https://github.com/your-handle/spring-boot-observability",
    featured: true,
  },
  {
    slug: "ml-infer-service",
    name: "ml-infer-service",
    summary:
      "Minimal inference server blueprint with batching, health checks, autoscaling hints, and metrics.",
    type: "Example",
    stack: ["Python", "FastAPI", "Prometheus"],
    tags: ["ml", "mlops", "python"],
    license: "MIT",
    repo: "https://github.com/your-handle/ml-infer-service",
  },
  {
    slug: "k8s-github-actions",
    name: "k8s-github-actions",
    summary:
      "Reusable GitHub Actions for Docker build, SBOM scan, and K8s blue-green deploys.",
    type: "Tool",
    stack: ["Docker", "Kubernetes", "GitHub Actions"],
    tags: ["devops", "security", "k8s"],
    license: "Apache-2.0",
    repo: "https://github.com/your-handle/k8s-github-actions",
    featured: true,
  },
  {
    slug: "rn-offline-starter",
    name: "rn-offline-starter",
    summary:
      "React Native offline-first starter with SQLite, sync queues, and conflict resolution patterns.",
    type: "Starter",
    stack: ["React Native", "SQLite"],
    tags: ["mobile", "react-native", "offline"],
    license: "MIT",
    repo: "https://github.com/your-handle/rn-offline-starter",
  },
  {
    slug: "electron-secure-store",
    name: "electron-secure-store",
    summary:
      "Electron secure storage with OS keychain, IPC isolation, and auto-update friendly APIs.",
    type: "Library",
    stack: ["Electron", "TypeScript"],
    tags: ["desktop", "electron", "security"],
    license: "MIT",
    repo: "https://github.com/your-handle/electron-secure-store",
  },
  {
    slug: "pern-api-starter",
    name: "pern-api-starter",
    summary:
      "PERN REST starter (Postgres, Express, Router v7 client) with OpenAPI contracts & tests.",
    type: "Starter",
    stack: ["Postgres", "Express", "Node", "TypeScript"],
    tags: ["pern", "api", "testing"],
    license: "MIT",
    repo: "https://github.com/your-handle/pern-api-starter",
  },
  {
    slug: "db-partitioning-playbook",
    name: "db-partitioning-playbook",
    summary:
      "Live cookbook for Postgres partitioning, indexes, and migration strategies.",
    type: "Example",
    stack: ["Postgres"],
    tags: ["databases", "postgres", "performance"],
    license: "MIT",
    repo: "https://github.com/your-handle/db-partitioning-playbook",
  },
  {
    slug: "next-queue-worker",
    name: "next-queue-worker",
    summary:
      "Queue worker template (BullMQ) with retries, backoff, metrics, and graceful shutdown.",
    type: "Library",
    stack: ["Node", "BullMQ", "Redis"],
    tags: ["node", "queues", "redis"],
    license: "MIT",
    repo: "https://github.com/your-handle/next-queue-worker",
  },
  {
    slug: "compose-analytics-kit",
    name: "compose-analytics-kit",
    summary:
      "Kotlin/Compose analytics helpers, event funnel DSL, and privacy-aware sinks.",
    type: "Library",
    stack: ["Kotlin", "Jetpack Compose"],
    tags: ["kotlin", "compose", "mobile"],
    license: "Apache-2.0",
    repo: "https://github.com/your-handle/compose-analytics-kit",
  },
  {
    slug: "php-laravel-sane-starter",
    name: "php-laravel-sane-starter",
    summary:
      "Sane Laravel boilerplate with auth scaffolding, queues, caching, and testing.",
    type: "Starter",
    stack: ["PHP", "Laravel", "MySQL"],
    tags: ["php", "laravel", "starter"],
    license: "MIT",
    repo: "https://github.com/your-handle/php-laravel-sane-starter",
  },
];

/* ---------- Small helpers ---------- */
function RepoBadges({ r }: { r: Repo }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      <span className="text-[10px] rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-200">
        {r.type}
      </span>
      <span className="inline-flex items-center gap-1 text-[10px] rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-200">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
        {r.license}
      </span>
      {r.stack.slice(0, 3).map((s) => (
        <span
          key={s}
          className="text-[10px] rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-200"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function OpenSourceRoute() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q")?.toLowerCase() ?? "";
  const tag = sp.get("tag") ?? "";
  const type = sp.get("type") ?? "";

  const allTags = Array.from(new Set(REPOS.flatMap((r) => r.tags))).sort();
  const types = Array.from(new Set(REPOS.map((r) => r.type))).sort();

  const filtered = REPOS.filter((r) => {
    const qHit =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.stack.join(" ").toLowerCase().includes(q);
    const tagHit = !tag || r.tags.includes(tag);
    const typeHit = !type || r.type === (type as Repo["type"]);
    return qHit && tagHit && typeHit;
  });

  function setParam(name: string, value: string) {
    const next = new URLSearchParams(sp);
    if (!value) next.delete(name);
    else next.set(name, value);
    setSp(next, { replace: true });
  }

  return (
    <section
      className="
        relative w-full min-h-[100svh]
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white overflow-hidden
      "
      aria-label="Open Source"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* Mobile spacer so the fixed top marquee/header never overlaps */}
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
            <Github className="size-4" />
            Open Source
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Building in the <span className="text-cyan-400">open</span>.
          </h1>
          <p className="mt-2 text-gray-300 max-w-3xl">
            Libraries, starters, CLIs, and examples across web, backend, DevOps,
            mobile/desktop, and ML—shipped with tests, docs, and hardening.
          </p>

          {/* Quick stats (static placeholders—swap to live if you wire GitHub API) */}
          <div className="mt-4 grid grid-cols-3 max-w-md gap-2">
            {[
              { k: "40+", v: "Public Repos" },
              { k: "120+", v: "PRs Merged" },
              { k: "20+", v: "Packages" },
            ].map((it) => (
              <div key={it.v} className="rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-extrabold">{it.k}</div>
                <div className="text-[11px] text-gray-400">{it.v}</div>
              </div>
            ))}
          </div>
        </motion.header>

        {/* Filters */}
        <div className={`${card} p-3 sm:p-4 mb-5`}>
          <div className="grid md:grid-cols-3 gap-3">
            {/* Search */}
            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <input
                placeholder="Search name, summary, or stack…"
                className="bg-transparent outline-none text-sm w-full"
                value={q}
                onChange={(e) => setParam("q", e.target.value)}
              />
            </label>
            {/* Type */}
            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Package className="h-4 w-4 text-cyan-300" />
              <select
                className="bg-transparent outline-none text-sm w-full"
                value={type}
                onChange={(e) => setParam("type", e.target.value)}
              >
                <option value="">All types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            {/* Tag */}
            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Tag className="h-4 w-4 text-cyan-300" />
              <select
                className="bg-transparent outline-none text-sm w-full"
                value={tag}
                onChange={(e) => setParam("tag", e.target.value)}
              >
                <option value="">All tags</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Featured */}
        {REPOS.some((r) => r.featured) && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6"
          >
            <div className="mb-2 text-sm font-bold text-cyan-300">Featured</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REPOS.filter((r) => r.featured).map((r) => (
                <a
                  key={r.slug}
                  href={r.repo}
                  target="_blank"
                  rel="noreferrer"
                  className={`${card} p-4 hover:bg-white/8 transition-colors block`}
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                      <Code2 className="h-4 w-4" />
                    </span>
                    <div className="font-semibold">{r.name}</div>
                    <ExternalLink className="h-4 w-4 text-cyan-300 ml-auto" />
                  </div>
                  <p className="mt-1 text-sm text-gray-300">{r.summary}</p>
                  <RepoBadges r={r} />
                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2">
                    {r.npm && (
                      <a
                        href={r.npm}
                        className="inline-flex items-center gap-1 text-xs rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-gray-200 hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Package className="h-3.5 w-3.5 text-cyan-300" />
                        npm
                      </a>
                    )}
                    <a
                      href={r.repo}
                      className="inline-flex items-center gap-1 text-xs rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-gray-200 hover:bg-white/10"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="h-3.5 w-3.5 text-cyan-300" />
                      GitHub
                    </a>
                  </div>
                </a>
              ))}
            </div>
          </motion.section>
        )}

        {/* All repositories */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <div className="mb-2 text-sm font-bold text-cyan-300">
            All Repositories
          </div>
          {filtered.length === 0 ? (
            <div className={`${card} p-6 text-center text-sm text-gray-300`}>
              No repositories match your filters. Try clearing search or choosing
              a different type/tag.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((r) => (
                <a
                  key={r.slug}
                  href={r.repo}
                  target="_blank"
                  rel="noreferrer"
                  className={`${card} p-4 hover:bg-white/8 transition-colors block`}
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                      {/* Choose an icon by rough category */}
                      {r.tags.includes("ml") ? (
                        <Cpu className="h-4 w-4" />
                      ) : r.tags.includes("mobile") ? (
                        <Smartphone className="h-4 w-4" />
                      ) : r.tags.includes("desktop") ? (
                        <Monitor className="h-4 w-4" />
                      ) : r.tags.includes("databases") ? (
                        <Database className="h-4 w-4" />
                      ) : r.tags.includes("devops") ? (
                        <Cloud className="h-4 w-4" />
                      ) : r.tags.includes("pern") || r.tags.includes("api") ? (
                        <Layers className="h-4 w-4" />
                      ) : (
                        <Code2 className="h-4 w-4" />
                      )}
                    </span>
                    <div className="font-semibold">{r.name}</div>
                    <ExternalLink className="h-4 w-4 text-cyan-300 ml-auto" />
                  </div>
                  <p className="mt-1 text-sm text-gray-300">{r.summary}</p>
                  <RepoBadges r={r} />
                </a>
              ))}
            </div>
          )}
        </motion.section>

        {/* How to contribute */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 sm:mt-10 grid md:grid-cols-3 gap-4"
        >
          {[
            {
              title: "Open an Issue",
              icon: <Bug className="h-4 w-4" />,
              text: "Describe the bug or proposal with steps to reproduce and expected behavior. Add labels if you can.",
            },
            {
              title: "Send a PR",
              icon: <TerminalSquare className="h-4 w-4" />,
              text: "Fork → branch → commit with tests → PR. Keep changes focused. Include before/after notes.",
            },
            {
              title: "Ship a Release",
              icon: <Rocket className="h-4 w-4" />,
              text: "For maintainers: semantic versioning, changelog, tags, and CI artifacts (npm or GH releases).",
            },
          ].map((x) => (
            <div key={x.title} className={`${card} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                  {x.icon}
                </span>
                <div className="font-semibold">{x.title}</div>
              </div>
              <p className="text-sm text-gray-300">{x.text}</p>
            </div>
          ))}
        </motion.section>

        {/* Security, License, Support */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 sm:mt-10 grid md:grid-cols-3 gap-4"
        >
          <div className={`${card} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <div className="font-semibold">Security</div>
            </div>
            <p className="text-sm text-gray-300">
              Please disclose vulnerabilities privately via{" "}
              <a href="mailto:you@example.com" className="text-cyan-300 hover:text-white">
                email
              </a>
              . I’ll acknowledge within 24–48h and coordinate a fix/release.
            </p>
          </div>
          <div className={`${card} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-cyan-300" />
              <div className="font-semibold">License</div>
            </div>
            <p className="text-sm text-gray-300">
              Projects are primarily <span className="text-emerald-300 font-semibold">MIT</span> or{" "}
              <span className="text-emerald-300 font-semibold">Apache-2.0</span>. See each repo’s LICENSE file.
            </p>
          </div>
          <div className={`${card} p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-cyan-300" />
              <div className="font-semibold">Sponsor / Support</div>
            </div>
            <p className="text-sm text-gray-300">
              Have a bug or feature request that needs priority? Reach out for small support contracts or one-off tasks.
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                to="/contact"
                className="px-4 py-2 rounded-2xl font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition inline-flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Contact
              </Link>
              <a
                href="https://wa.me/923116521764?text=Hi%20Rana%2C%20OSS%20support%20request%3A"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-2xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
