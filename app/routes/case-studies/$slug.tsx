// src/routes/case-studies/$slug.tsx
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import type { Route } from "../+types/home";
import { getCaseBySlug } from "../../data/case-studies";
import {
  ArrowLeft, Award, CheckCircle2, Gauge, Layers, Workflow, Database,
  ShieldCheck, Globe2, Calendar, Zap, Rocket, FileText, ExternalLink
} from "lucide-react";

export function meta(): Route.MetaDescriptor[] {
  return [
    { title: "Case Study • RN Portfolio" },
    { name: "description", content: "Detailed case study with problem, approach, stack, and results." },
  ];
}

const card =
  "rounded-2xl bg-white/5 backdrop-blur border border-white/10";

export default function CaseStudySlug() {
  const { slug } = useParams();
  const cs = getCaseBySlug(slug);

  if (!cs) {
    return (
      <section className="relative min-h-[100svh] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white grid place-items-center">
        <div className="md:hidden" style={{ height: "calc(var(--mobile-topbar,56px) + var(--marquee-top,44px) + 8px)" }} />
        <div className="text-center px-6">
          <div className="text-2xl font-bold">Case study not found</div>
          <p className="text-gray-300 mt-1">The case study you’re looking for doesn’t exist or was moved.</p>
          <Link to="/case-studies" className="inline-flex mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400">
            Back to all case studies
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100svh] bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
      {/* mobile spacer */}
      <div className="md:hidden" style={{ height: "calc(var(--mobile-topbar,56px) + var(--marquee-top,44px) + 8px)" }} />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pt-8 sm:pt-12 pb-12 relative z-10">
        {/* Back + Title */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="text-xs text-cyan-300">{cs.industry}</div>
          <h1 className="mt-1 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            {cs.title}
          </h1>
          <p className="mt-2 text-gray-300 max-w-3xl">{cs.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-300">
            {cs.timeframe && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2 py-1">
                <Calendar className="h-3.5 w-3.5 text-cyan-300" /> {cs.timeframe}
              </span>
            )}
            {cs.location && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2 py-1">
                <Globe2 className="h-3.5 w-3.5 text-cyan-300" /> {cs.location}
              </span>
            )}
          </div>
        </motion.header>

        {/* Cover */}
        {cs.hero && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-6 sm:mb-8 bg-gradient-to-br from-cyan-700/20 to-emerald-600/10">
            <img
              src={cs.hero}
              alt={cs.title}
              className="w-full max-h-[380px] object-cover"
              onError={(e: any) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}

        {/* Layout: left content + right summary */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Problem & Approach */}
          <div className="lg:col-span-2 grid gap-6">
            <section className={`${card} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-cyan-300" />
                <div className="font-semibold">Problem</div>
              </div>
              <ul className="mt-1 list-disc list-inside text-sm text-gray-300 space-y-1">
                {cs.problem.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </section>

            <section className={`${card} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <Workflow className="h-4 w-4 text-cyan-300" />
                <div className="font-semibold">Approach</div>
              </div>
              <ul className="mt-1 text-sm text-gray-300 space-y-1">
                {cs.approach.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-[2px] text-emerald-300 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Results / Metrics */}
            {(cs.results?.length ?? 0) > 0 && (
              <section className={`${card} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-cyan-300" />
                  <div className="font-semibold">Results</div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {cs.results.map((r) => (
                    <div key={r.label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                      <div className="text-xl font-extrabold">{r.value}</div>
                      <div className="text-[11px] text-gray-400">{r.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Stack & Links */}
          <aside className="grid gap-6">
            <section className={`${card} p-4`}>
              <div className="font-semibold text-cyan-300 mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className={`${card} p-4`}>
              <div className="font-semibold text-cyan-300 mb-2">Highlights</div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center gap-2"><Gauge className="h-4 w-4 text-cyan-300" /> Performance budgets & P95s</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" /> RBAC & audit trails</li>
                <li className="flex items-center gap-2"><Database className="h-4 w-4 text-cyan-300" /> DB indexing & caching</li>
                <li className="flex items-center gap-2"><Layers className="h-4 w-4 text-cyan-300" /> Strong contracts & E2E tests</li>
              </ul>
            </section>

            {(cs.links?.live || cs.links?.repo) && (
              <section className={`${card} p-4`}>
                <div className="font-semibold text-cyan-300 mb-2">Links</div>
                <div className="flex flex-col gap-2 text-sm">
                  {cs.links?.live && (
                    <a href={cs.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-300 hover:text-white">
                      <ExternalLink className="h-4 w-4" /> Live site
                    </a>
                  )}
                  {cs.links?.repo && (
                    <a href={cs.links.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-300 hover:text-white">
                      <ExternalLink className="h-4 w-4" /> Repository
                    </a>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>

        {/* CTA */}
        <section className={`${card} p-5 sm:p-6 mt-8 sm:mt-10`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-lg font-bold">Want a similar outcome?</div>
              <p className="text-sm text-gray-300">
                Tell me your goals, constraints, and timeline—I’ll propose the safest way to ship fast.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-2xl font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition inline-flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Start a Project
              </Link>
              <a
                href="https://wa.me/923116521764?text=Hi%20Rana%2C%20I%27d%20like%20a%20project%20like%20this:%20{{title}}"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-2xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                WhatsApp Me
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
