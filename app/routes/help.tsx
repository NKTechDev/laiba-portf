// src/routes/help.tsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LifeBuoy, HelpCircle, Search, ChevronDown, BookOpen, MessagesSquare, Mail,
  MessageCircle, Phone, Github, Linkedin, Wrench, ShieldCheck, Server, Globe2,
  Link as LinkIcon, AlertTriangle, RefreshCw, Download, Settings, Copy, CheckCircle2
} from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Help • RN Portfolio" },
    {
      name: "description",
      content:
        "Client Help Center — FAQs, onboarding, templates, support tiers, troubleshooting, and contact.",
    },
  ];
}

/* -------------------- Client-centric FAQs -------------------- */

type Faq = { q: string; a: string; cat: string };

const FAQS: Faq[] = [
  // Getting Started
  {
    cat: "Getting Started",
    q: "How do I start a project with you?",
    a: "Use the Contact page and include the project type, goals, timeline, budget range, and any technical constraints. You can also paste the Project Brief template below.",
  },
  {
    cat: "Getting Started",
    q: "Can we sign an NDA first?",
    a: "Yes. I can countersign your NDA or provide a standard mutual NDA. Include your legal entity and signatory info in your message.",
  },
  {
    cat: "Getting Started",
    q: "What stacks do you work with?",
    a: "Full-stack (MERN/PERN), Java + Spring Boot, Kotlin/Compose, React Native, Electron, PHP/Laravel, DevOps (Docker/K8s/CI/CD), and ML/MLOps.",
  },

  // Access & Demos
  {
    cat: "Access & Demos",
    q: "GitHub repository access request",
    a: "Share your GitHub handle and email using the Access Request template below. I’ll grant least-privilege access (read or triage by default).",
  },
  {
    cat: "Access & Demos",
    q: "Live demo isn’t loading",
    a: "Try a hard refresh (Ctrl/Cmd+Shift+R). If your network blocks demos, use the alternative demo link (if provided) or request a recorded walkthrough.",
  },

  // Process
  {
    cat: "Process",
    q: "What does your delivery process look like?",
    a: "Discovery → Proposal/SOW → Milestones → Weekly demos → UAT → Launch → Warranty & support. CI/CD and observability are included on production builds.",
  },
  {
    cat: "Process",
    q: "Who owns the code?",
    a: "You do. IP ownership transfers upon final payment as stated in the SOW, with all repositories and build pipelines handed over.",
  },

  // Security & Compliance
  {
    cat: "Security & Compliance",
    q: "How do you handle security?",
    a: "RBAC, dependency scanning, secrets management (env vaults/GitHub OIDC), hardened Docker images, and protected branches. Production access is audited.",
  },
  {
    cat: "Security & Compliance",
    q: "Do you follow accessibility and performance best practices?",
    a: "Yes — WCAG-aware design, automated a11y checks, Core Web Vitals budgets, and perf monitoring after launch.",
  },

  // Support & SLAs
  {
    cat: "Support",
    q: "What support options do you offer after launch?",
    a: "Choose a tier (Starter, Growth, Scale) with defined response times and maintenance windows. See Support Tiers below.",
  },
  {
    cat: "Support",
    q: "How should I report a bug?",
    a: "Use the Bug Report template below. Include reproduction steps, expected vs. actual, platform/browser, screenshots, and timestamps.",
  },

  // Billing
  {
    cat: "Billing",
    q: "How do payments work?",
    a: "Milestone-based invoicing (bank transfer, Stripe, or PayPal). A deposit may be required for project kickoff.",
  },
  {
    cat: "Billing",
    q: "What if scope changes mid-project?",
    a: "We’ll create a change request outlining impact on timeline and budget for your approval before proceeding.",
  },

  // Troubleshooting (site)
  {
    cat: "Troubleshooting",
    q: "Router v7: 'Cannot destructure basename of useContext(...) as it is null'",
    a: "In React Router v7, import components from 'react-router'. Ensure <RouterProvider router={...}/> wraps your app. Don’t mix v6 APIs from react-router-dom.",
  },
  {
    cat: "Troubleshooting",
    q: "Marquee overlaps content or header on mobile",
    a: "Define CSS vars --mobile-topbar and --marquee-top in AppShell, set top marquee top: var(--mobile-topbar), and add matching spacers above/below <Outlet/>.",
  },
];

/* -------------------- Copy-to-clipboard content -------------------- */

const PROJECT_BRIEF = `Project Brief
================
Company / Team:
Primary Contact (name, role, email, phone/WA):
NDA needed?: Yes/No (attach if yes)

What are we building?
- Goal & outcomes:
- Target users / market:
- Must-have features:
- Nice-to-have features:
- Integrations (APIs, auth, payments, etc.):

Tech preferences / constraints:
- Frontend:
- Backend:
- Data (DB/warehouse):
- DevOps/Hosting:
- Compliance/security:

Timeline & budget:
- Target launch:
- Budget range (USD):

Success metrics:
- KPIs / SLAs:

Assets:
- Design/brand links:
- Repos / credentials (if any):`;

const BUG_TEMPLATE = `Bug Report
==========
Title:
Environment: (Prod / Staging)  •  Timezone: PKT

Steps to Reproduce:
1.
2.
3.

Expected:
Actual:

Scope:
- URL / screen:
- Browser / OS / Device:
- User / role (if relevant):

Evidence:
- Screenshots / videos / logs:

Impact:
- Blocker / High / Medium / Low

Notes:
`;

const ACCESS_REQUEST = `Access Request
==============
Your name:
Company:
Email:
GitHub handle:
Access level needed: (Read / Triage / Write / Admin)
Repo(s):
Reason:
Duration: (Temporary until YYYY-MM-DD / Ongoing)

Additional notes:
`;

/* -------------------- UI helpers -------------------- */

const inputCls =
  "w-full h-11 px-3.5 rounded-xl border text-sm bg-black/40 text-white placeholder-gray-400 " +
  "border-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-400/70";

function CopyableBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-cyan-300">{title}</div>
        <button
          onClick={doCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 text-xs"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-cyan-300" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap text-gray-200">
        {text}
      </pre>
    </div>
  );
}

function HelpCard({
  title,
  items,
}: {
  title: string;
  items: { icon: any; label: string; to?: string; href?: string }[];
}) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 sm:p-5">
      <div className="text-sm font-semibold text-cyan-300 mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map(({ icon: Icon, label, to, href }) => (
          <li key={label}>
            {to ? (
              <Link to={to} className="flex items-center gap-2.5 text-sm text-gray-200 hover:text-white">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{label}</span>
              </Link>
            ) : (
              <a
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-2.5 text-sm text-gray-200 hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{label}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    <li className="rounded-xl border border-white/10 bg-white/5">
      <button
        className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-cyan-300" />
          <span className="text-sm font-semibold">{q}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
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

function GuideCard({
  icon: Icon,
  title,
  steps,
}: {
  icon: any;
  title: string;
  steps: string[];
}) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
          <Icon className="h-4 w-4" />
        </span>
        <div className="font-semibold">{title}</div>
      </div>
      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------- Page -------------------- */

export default function HelpRoute() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.cat.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    return results.reduce<Record<string, Faq[]>>((acc, f) => {
      acc[f.cat] = acc[f.cat] || [];
      acc[f.cat].push(f);
      return acc;
    }, {});
  }, [results]);

  return (
    <section
      className="
        relative w-full min-h-[100svh]
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white overflow-hidden
      "
      aria-label="Help Center"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

<div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pt-20 sm:pt-14 pb-10 relative z-10">        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            <LifeBuoy className="size-4" />
            Client Help Center
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Everything clients need to <span className="text-cyan-400">get help</span>, fast.
          </h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Onboarding, templates, support tiers, SLAs, and troubleshooting — all in one place.
          </p>
        </motion.header>

        {/* Search + Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Search + FAQs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 sm:p-5"
          >
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`${inputCls} h-10 bg-black/30`}
                placeholder="Search help (e.g., NDA, demo, access, billing, SLA)"
                aria-label="Search FAQs"
              />
            </div>

            <div className="mt-4">
              {Object.keys(grouped).length === 0 ? (
                <div className="text-sm text-gray-400">No results. Try different keywords.</div>
              ) : (
                Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat} className="mb-4">
                    <div className="text-sm font-semibold text-cyan-300 mb-2">{cat}</div>
                    <ul className="space-y-2">
                      {items.map((f) => (
                        <FaqItem
                          key={f.q}
                          q={f.q}
                          a={f.a}
                          open={open === f.q}
                          onToggle={() => setOpen(open === f.q ? null : f.q)}
                        />
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Quick cards: Start a Project / Contact / Resume */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="space-y-4"
          >
            <HelpCard
              title="Quick Actions"
              items={[
                { icon: BookOpen, label: "Browse Projects", to: "/projects" },
                { icon: MessagesSquare, label: "Contact Me", to: "/contact" },
                { icon: Download, label: "Download Résumé", href: "/RanaNomi_Resume.pdf" },
              ]}
            />
            <HelpCard
              title="Support Channels"
              items={[
                { icon: Mail, label: "Email", href: "mailto:you@example.com" },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  href: "https://wa.me/923116521764?text=Hi%20Rana%2C%20I%27d%20like%20to%20discuss%20a%20project",
                },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
                { icon: Github, label: "GitHub", href: "https://github.com/your-handle" },
              ]}
            />
            <StatusCard />
          </motion.aside>
        </div>

        {/* Client Tools: templates & checklists */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-8 sm:mt-10 grid lg:grid-cols-3 gap-4"
        >
          <CopyableBlock title="Project Brief (paste into your message)" text={PROJECT_BRIEF} />
          <CopyableBlock title="Bug Report template" text={BUG_TEMPLATE} />
          <CopyableBlock title="GitHub Access Request" text={ACCESS_REQUEST} />
        </motion.section>

        {/* Support Tiers & SLAs */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">Support Tiers & SLAs</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Starter",
                desc: "Best for MVPs and small sites.",
                srt: "Next business day",
                crit: "Best effort",
                window: "Mon–Fri, 10:00–18:00 PKT",
                includes: ["Email support", "Monthly updates", "Basic monitoring"],
              },
              {
                name: "Growth",
                desc: "Scaling products / production workloads.",
                srt: "< 8 business hours",
                crit: "< 4 hours (business)", // example SLA
                window: "Mon–Sat, 09:00–20:00 PKT",
                includes: ["Priority queue", "Weekly updates", "Advanced monitoring & alerts"],
              },
              {
                name: "Scale",
                desc: "Mission-critical apps and SLAs.",
                srt: "< 4 hours",
                crit: "< 2 hours",
                window: "Mon–Sun, 08:00–22:00 PKT",
                includes: ["Escalation path", "Change windows", "SLA reporting & postmortems"],
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-lg font-bold">{t.name}</div>
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                </div>
                <p className="text-sm text-gray-300 mb-2">{t.desc}</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>Standard Response: <span className="text-white">{t.srt}</span></li>
                  <li>Critical Response: <span className="text-white">{t.crit}</span></li>
                  <li>Support Window: <span className="text-white">{t.window}</span></li>
                </ul>
                <div className="mt-2 text-xs text-gray-300">
                  Includes:
                  <ul className="list-disc list-inside">
                    {t.includes.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-400">
            Note: Response targets are indicative and finalized in the SOW. 24×7 on-call available on request.
          </p>
        </motion.section>

        {/* Troubleshooting Guides (site & project) */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3">Troubleshooting</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <GuideCard
              icon={AlertTriangle}
              title="Router v7 Link error"
              steps={[
                "Use `import { Link } from 'react-router'` (not react-router-dom).",
                "Wrap app in `<RouterProvider router={...}/>` from 'react-router'.",
                "Avoid mixing v6 and v7 APIs.",
              ]}
            />
            <GuideCard
              icon={RefreshCw}
              title="Demo down or stale"
              steps={[
                "Hard refresh (Ctrl/Cmd+Shift+R).",
                "Try alternative demo link, or request a recorded walkthrough.",
                "If behind a corporate proxy, try a personal network or VPN.",
              ]}
            />
            <GuideCard
              icon={Settings}
              title="Icons/fonts misaligned"
              steps={[
                "Wrap icons in fixed containers (e.g., h-6 w-6).",
                "Use flex + items-center on buttons/links.",
                "Align line-heights across breakpoints.",
              ]}
            />
          </div>
        </motion.section>
      </div>
    </section>
  );
}

function StatusCard() {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 sm:p-5">
      <div className="text-sm font-semibold text-cyan-300 mb-3">System Status</div>
      <div className="flex items-center gap-2 text-sm">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        <span className="text-emerald-300">All systems operational</span>
      </div>
      <ul className="mt-3 space-y-2 text-xs text-gray-300">
        <li className="flex items-center gap-2">
          <Server className="h-3.5 w-3.5 text-gray-400" />
          API: 200 OK
        </li>
        <li className="flex items-center gap-2">
          <Globe2 className="h-3.5 w-3.5 text-gray-400" />
          Website: Up
        </li>
        <li className="flex items-center gap-2">
          <LinkIcon className="h-3.5 w-3.5 text-gray-400" />
          Integrations: Stable
        </li>
      </ul>
      <div className="mt-3 text-[11px] text-gray-400">
        Real-time status page integration can be added on request.
      </div>
    </div>
  );
}
