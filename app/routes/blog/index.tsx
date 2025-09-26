// src/routes/blog/index.tsx
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import type { Route } from "../+types/home";
import { Search, Tag, Calendar, BookOpen, Code2, Filter } from "lucide-react";
import { POSTS, allTags, formatDate, readingTime } from "../../data/blog-data";

export function meta({}: Route.MetaArgs) {
  const SITE = "https://nktech.giyiyorum.com";       // ← update to your domain
  const PATH = "/blog";
  const TITLE =
    "Blog — Engineering Notes by Laiba Anjum | MERN, Spring Boot, DevOps, ML";
  const DESC =
    "Deep dives, quick tips, and case notes by Laiba Anjum on MERN/PERN, Java & Spring Boot, Kotlin/Compose, React Native, Electron, Postgres/Mongo/Redis, DevOps (Docker, K8s, CI/CD), Cloud (AWS/GCP/Azure), Observability, Realtime, and MLOps.";
  const OG_IMG = `${SITE}/og/blog.jpg`;         // ← 1200×630 image in /public/og/

  return [
    // Core
    { title: TITLE },
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "Laiba Anjum, RN Portfolio, engineering blog, MERN, PERN, React, Node.js, Spring Boot, Java, Kotlin, Jetpack Compose, React Native, Electron, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, CI/CD, GitHub Actions, Jenkins, AWS, GCP, Azure, Microservices, Socket.IO, Realtime, Observability, Prometheus, Grafana, OpenTelemetry, Machine Learning, MLOps",
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
    // { name: "twitter:creator", content: "@your_handle" }, // ← optional
  ];
}


const card = "rounded-2xl bg-white/5 backdrop-blur border border-white/10";
const pill =
  "inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300";

export default function BlogIndexRoute() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q")?.toLowerCase() ?? "";
  const tag = sp.get("tag") ?? "";

  const tags = allTags();
  const posts = POSTS
    .slice()
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .filter((p) => {
      const qHit =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q);
      const tagHit = !tag || p.tags.includes(tag);
      return qHit && tagHit;
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
      aria-label="Blog"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* mobile spacer so top marquee/header won't overlap */}
      <div
        className="md:hidden"
        style={{ height: "calc(var(--mobile-topbar, 56px) + var(--marquee-top, 44px) + 8px)" }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pt-8 sm:pt-12 pb-12 relative z-10">
        {/* hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <span className={pill}>
            <BookOpen className="size-4" />
            Engineering Blog
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Notes from the <span className="text-cyan-400">trenches</span>.
          </h1>
          <p className="mt-2 text-gray-300 max-w-3xl">
            Practical guides and case notes across web, backend, DevOps, ML, mobile, and desktop—written for
            production engineers.
          </p>
        </motion.header>

        {/* filters */}
        <div className={`${card} p-3 sm:p-4 mb-6`}>
          <div className="grid md:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <input
                placeholder="Search title, summary, tags…"
                className="bg-transparent outline-none text-sm w-full"
                value={q}
                onChange={(e) => setParam("q", e.target.value)}
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Tag className="h-4 w-4 text-cyan-300" />
              <select
                className="bg-transparent outline-none text-sm w-full"
                value={tag}
                onChange={(e) => setParam("tag", e.target.value)}
              >
                <option value="">All tags</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-2 justify-end">
              {tag && (
                <button
                  onClick={() => setParam("tag", "")}
                  className="text-xs rounded-xl px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Clear tag
                </button>
              )}
              {q && (
                <button
                  onClick={() => setParam("q", "")}
                  className="text-xs rounded-xl px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* list */}
        {posts.length === 0 ? (
          <div className={`${card} p-6 text-center text-sm text-gray-300`}>
            No posts found. Try different filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4 }}
                className={`${card} overflow-hidden group`}
              >
                {p.cover && (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-white/5">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(p.createdAt)}</span>
                    <span>•</span>
                    <span>{readingTime(p.content)}</span>
                  </div>
                  <h2 className="mt-1 font-semibold text-lg">
                    <Link to={`/blog/${p.slug}`} className="hover:text-cyan-300">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-3">{p.summary}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <Link
                        key={t}
                        to={`?tag=${encodeURIComponent(t)}`}
                        className="text-[11px] rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-200 hover:bg-white/10"
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-2 text-sm rounded-2xl bg-cyan-500 text-black px-3 py-2 font-semibold hover:bg-cyan-400 transition"
                    >
                      <Code2 className="h-4 w-4" />
                      Read post
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
