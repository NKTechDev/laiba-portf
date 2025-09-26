// src/routes/case-studies/index.tsx
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import type { Route } from "../+types/home";
import { CASE_STUDIES, allTags } from "../../data/case-studies";
import {
  Briefcase, Layers, Filter, Tag, Search, ArrowRight, Globe2,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  const SITE = "https://nktech.giyiyorum.com";   // ← update to your domain
  const PATH = "/case-studies";
  const TITLE =
    "Case Studies — Real-World Results by Laiba Anjum | Full-Stack, DevOps & ML";
  const DESC =
    "In-depth breakdowns of shipped work by Laiba Anjum: problem framing, constraints, architecture, stack (MERN/PERN, Spring Boot, Kotlin, React Native, Electron), DevOps (Docker, K8s, CI/CD), cloud, databases, observability, security, and measurable outcomes (latency, cost, uptime, conversion).";
  const OG_IMG = `${SITE}/og/case-studies.jpg`; // 1200×630 image in /public/og/

  return [
    // Core
    { title: TITLE },
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "Laiba Anjum, RN Portfolio, software case studies, architecture, MERN, PERN, React, Node.js, Spring Boot, Java, Kotlin, Jetpack Compose, React Native, Electron, PostgreSQL, MongoDB, Redis, microservices, Docker, Kubernetes, CI/CD, AWS, GCP, Azure, Observability, OpenTelemetry, Prometheus, Grafana, Security, RBAC, performance, cost optimization, scalability, real-time, Socket.IO",
    },
    { name: "author", content: "Laiba Anjum" },
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
    { name: "theme-color", content: "#0b0f14" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "RN • Portfolio" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESC },
    { property: "og:url", content: `${SITE}${PATH}` },
    { property: "og:image", content: OG_IMG },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESC },
    { name: "twitter:image", content: OG_IMG },
    // { name: "twitter:creator", content: "@your_handle" }, // optional
  ];
}


const card =
  "rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/8 transition-colors";

export default function CaseStudiesIndex() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q")?.toLowerCase() ?? "";
  const tag = sp.get("tag") ?? "";
  const industry = sp.get("industry") ?? "";

  const filtered = CASE_STUDIES.filter((cs) => {
    const qHit =
      !q ||
      cs.title.toLowerCase().includes(q) ||
      cs.summary.toLowerCase().includes(q) ||
      cs.stack.join(" ").toLowerCase().includes(q);
    const tagHit = !tag || cs.tags.includes(tag);
    const indHit = !industry || cs.industry === industry;
    return qHit && tagHit && indHit;
  });

  const industries = Array.from(new Set(CASE_STUDIES.map((c) => c.industry))).sort();

  function setParam(name: string, value: string) {
    const next = new URLSearchParams(sp);
    if (!value) next.delete(name);
    else next.set(name, value);
    setSp(next, { replace: true });
  }

  return (
    <section className="relative min-h-[100svh] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* mobile spacer for top marquee/header */}
      <div className="md:hidden" style={{ height: "calc(var(--mobile-topbar,56px) + var(--marquee-top,44px) + 8px)" }} />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pt-8 sm:pt-12 pb-12 relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            <Briefcase className="h-4 w-4" />
            Case Studies
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Outcomes you can <span className="text-cyan-400">measure</span>.
          </h1>
          <p className="mt-2 text-gray-300 max-w-3xl">
            A selection of projects across public safety, fintech, healthtech, devtools,
            logistics, and edtech—each with problem, approach, stack, and results.
          </p>
        </motion.header>

        {/* Filters */}
        <div className={`${card} p-3 sm:p-4 mb-4 sm:mb-6`}>
          <div className="grid md:grid-cols-3 gap-3">
            {/* Search */}
            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <input
                placeholder="Search title, summary or stack…"
                className="bg-transparent outline-none text-sm w-full"
                value={q}
                onChange={(e) => setParam("q", e.target.value)}
              />
            </label>

            {/* Industry */}
            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Globe2 className="h-4 w-4 text-cyan-300" />
              <select
                className="bg-transparent outline-none text-sm w-full"
                value={industry}
                onChange={(e) => setParam("industry", e.target.value)}
              >
                <option value="">All industries</option>
                {industries.map((i) => (
                  <option key={i} value={i}>{i}</option>
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
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Chips quick filters */}
        <div className="mb-4 sm:mb-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-cyan-300">
            <Filter className="h-3.5 w-3.5" /> Quick tags:
          </span>
          {["mern", "pern", "spring-boot", "react-native", "electron", "devops", "ml-mlops", "realtime"].map((t) => (
            <Link
              key={t}
              to={`?${new URLSearchParams({ q, industry, tag: t }).toString()}`}
              className={`text-[11px] px-2 py-1 rounded-lg border ${tag === t ? "bg-cyan-500 text-black border-cyan-500" : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"}`}
            >
              #{t}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cs) => (
            <Link key={cs.slug} to={`/case-studies/${cs.slug}`} className={`${card} group`}>
              {/* cover */}
              <div className="h-40 sm:h-44 rounded-t-2xl overflow-hidden bg-gradient-to-br from-cyan-700/20 to-emerald-600/10">
                {cs.hero ? (
                  <img
                    src={cs.hero}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                    onError={(e: any) => (e.currentTarget.style.display = "none")}
                  />
                ) : null}
              </div>

              {/* body */}
              <div className="p-4">
                <div className="text-xs text-cyan-300">{cs.industry}</div>
                <div className="mt-1 font-semibold">{cs.title}</div>
                <p className="mt-1 text-sm text-gray-300 line-clamp-2">{cs.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cs.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-200">{s}</span>
                  ))}
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 group-hover:gap-2 transition-all">
                  Read case study <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className={`${card} p-6 mt-6 text-center text-sm text-gray-300`}>
            No case studies match your filters. Try clearing search or selecting a different tag.
          </div>
        )}
      </div>
    </section>
  );
}
