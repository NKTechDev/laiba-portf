// src/routes/blog/$slug.tsx
import { Link, useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import type { Route } from "../+types/home";
import {
  Calendar, Clock, ArrowLeft, Share2, Tag, Copy, Check, MessageSquare, ExternalLink,
} from "lucide-react";
import { POSTS, formatDate, readingTime } from "../../data/blog-data";
import { useEffect, useMemo, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog Post • RN Portfolio" },
    { name: "description", content: "Deep-dive engineering article." },
  ];
}

const card = "rounded-2xl bg-white/5 backdrop-blur border border-white/10";

export default function BlogSlugRoute() {
  const { slug = "" } = useParams();
  const nav = useNavigate();
  const postIndex = POSTS.findIndex((p) => p.slug === slug);
  const post = postIndex >= 0 ? POSTS[postIndex] : null;

  // basic 404
  if (!post) {
    return (
      <section className="min-h-[60svh] grid place-items-center bg-black text-white">
        <div className="text-center px-6">
          <h1 className="text-2xl font-extrabold">Post not found</h1>
          <p className="text-gray-400 mt-2">The article you’re looking for doesn’t exist.</p>
          <Link to="/blog" className="mt-4 inline-block px-4 py-2 rounded-2xl bg-cyan-500 text-black font-semibold">
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  // compute prev/next
  const prev = POSTS[postIndex - 1] || null;
  const next = POSTS[postIndex + 1] || null;

  // share/copy
  const [copied, setCopied] = useState(false);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  // very light markdown-to-jsx rendering (headings, code, paragraphs)
  const blocks = useMemo(() => {
    const lines = post.content.trim().split("\n");
    const out: JSX.Element[] = [];
    let codeMode = false;
    let codeBuf: string[] = [];

    for (const ln of lines) {
      if (ln.startsWith("```")) {
        if (!codeMode) {
          codeMode = true;
          codeBuf = [];
        } else {
          out.push(
            <pre key={`code-${out.length}`} className="mt-4 overflow-x-auto rounded-xl bg-black/70 border border-white/10 p-3 text-sm">
              <code>{codeBuf.join("\n")}</code>
            </pre>
          );
          codeMode = false;
        }
        continue;
      }
      if (codeMode) {
        codeBuf.push(ln);
        continue;
      }
      if (ln.startsWith("# ")) {
        out.push(
          <h2 key={`h1-${out.length}`} className="mt-6 text-2xl font-extrabold">{ln.replace(/^# /, "")}</h2>
        );
      } else if (ln.startsWith("## ")) {
        out.push(
          <h3 key={`h2-${out.length}`} className="mt-5 text-xl font-bold">{ln.replace(/^## /, "")}</h3>
        );
      } else if (ln.trim() === "") {
        out.push(<div key={`sp-${out.length}`} className="h-2" />);
      } else {
        out.push(<p key={`p-${out.length}`} className="mt-3 text-gray-200">{ln}</p>);
      }
    }
    return out;
  }, [post.content]);

  return (
    <section
      className="
        relative w-full min-h-[100svh]
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white overflow-hidden
      "
      aria-label="Blog Post"
    >
      {/* accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* mobile spacer */}
      <div
        className="md:hidden"
        style={{ height: "calc(var(--mobile-topbar, 56px) + var(--marquee-top, 44px) + 8px)" }}
      />

      <div className="max-w-4xl mx-auto w-full px-6 sm:px-8 pt-6 sm:pt-10 pb-12 relative z-10">
        {/* back + meta */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => nav(-1)}
            className="inline-flex items-center gap-2 text-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.createdAt)}
            <span>•</span>
            <Clock className="h-3.5 w-3.5" />
            {readingTime(post.content)}
          </div>
        </div>

        {/* title */}
        <header className="mt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-gray-300">{post.summary}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Link
                key={t}
                to={`/blog?tag=${encodeURIComponent(t)}`}
                className="text-[11px] rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-200 hover:bg-white/10"
              >
                #{t}
              </Link>
            ))}
          </div>
        </header>

        {/* cover */}
        {post.cover && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* content */}
        <article className="mt-6 prose prose-invert max-w-none prose-pre:bg-black/70 prose-pre:border prose-pre:border-white/10 prose-a:text-cyan-300">
          {blocks}
        </article>

        {/* share / copy */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <a
            className="inline-flex items-center gap-2 text-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.href : ""
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <Share2 className="h-4 w-4" />
            Share
          </a>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 text-sm rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm rounded-2xl bg-cyan-500 text-black px-3 py-2 font-semibold hover:bg-cyan-400 transition"
          >
            <MessageSquare className="h-4 w-4" />
            Discuss a project
          </Link>
        </div>

        {/* prev / next */}
        {(prev || next) && (
          <div className="mt-10 grid md:grid-cols-2 gap-3">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className={`${card} p-4 hover:bg-white/8 transition-colors`}>
                <div className="text-xs text-gray-400 mb-1">Previous</div>
                <div className="font-semibold">{prev.title}</div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link to={`/blog/${next.slug}`} className={`${card} p-4 hover:bg-white/8 transition-colors text-right`}>
                <div className="text-xs text-gray-400 mb-1">Next</div>
                <div className="font-semibold">{next.title}</div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* back to blog */}
        <div className="mt-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
        </div>
      </div>
    </section>
  );
}
