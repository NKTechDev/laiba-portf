import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MessageCircle, MapPin, Clock, Send,
  Building2, CheckCircle2, AlertCircle, Loader2, Linkedin, Github, Globe2
} from "lucide-react";
import { BASE_URL } from "../constant";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact • RN Portfolio" },
    { name: "description", content: "Get in touch about full-stack, mobile, desktop, DevOps or ML projects." },
  ];
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  type: string;
  budget: string;
  message: string;
  prefer: "email" | "phone" | "whatsapp";
  // anti-bot
  website?: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  type: "",
  budget: "",
  message: "",
  prefer: "email",
  website: "",
};

export default function Contact() {
  const [data, setData] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ ok?: boolean; msg?: string } | null>(null);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((s) => ({ ...s, [k]: e.target.value }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // honey-pot: if filled, likely a bot — pretend success
    if (data.website && data.website.trim() !== "") {
      setToast({ ok: true, msg: "Thanks! I’ll get back to you shortly." });
      setData(initial);
      return;
    }

    // simple validation
    if (!data.name || !data.email || !data.message) {
      setToast({ ok: false, msg: "Please complete name, email and your message." });
      return;
    }

    setLoading(true);
    try {
      // You can change this to your real endpoint
      const res = await fetch(`${BASE_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // fallback: mailto as a graceful degradation
        window.location.href = `mailto:you@example.com?subject=${encodeURIComponent(
          data.subject || "New enquiry"
        )}&body=${encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nPhone/WA: ${data.phone}\nProject: ${data.type}\nBudget: ${data.budget}\nPreferred: ${data.prefer}\n\n${data.message}`
        )}`;
        setToast({
          ok: true,
          msg: "Redirected to email client. I’ll receive your message.",
        });
      } else {
        setToast({ ok: true, msg: "Thanks! I’ll get back to you shortly." });
      }
      setData(initial);
    } catch (err) {
      setToast({ ok: false, msg: "Could not send right now. Please try again or email me directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        relative w-full min-h-[100svh]
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white overflow-hidden
      "
      aria-label="Contact"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

<div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pt-20 sm:pt-14 pb-10 relative z-10">        
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            <Building2 className="size-4" />
            Let’s build something production-grade
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight">
            Contact <span className="text-cyan-400">Laiba Anjum</span>
          </h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Full-Stack • Mobile • Desktop • DevOps • ML — available for contracts and collaborations.
          </p>
        </motion.header>

        {/* Layout: Form (left) • Details (right) */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* FORM */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5 sm:p-6 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name *">
                <input
                  value={data.name}
                  onChange={onChange("name")}
                  className={inputCls}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field label="Email *">
                <input
                  type="email"
                  value={data.email}
                  onChange={onChange("email")}
                  className={inputCls}
                  placeholder="you@email.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <Field label="Phone / WhatsApp">
                <input
                  value={data.phone}
                  onChange={onChange("phone")}
                  className={inputCls}
                  placeholder="+92… or 0311…"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Subject">
                <input
                  value={data.subject}
                  onChange={onChange("subject")}
                  className={inputCls}
                  placeholder="Project / consultation / hire"
                />
              </Field>

              <Field label="Project type">
                <select
                  value={data.type}
                  onChange={onChange("type")}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  <option>Full-Stack Web (MERN/PERN)</option>
                  <option>Java / Spring Boot APIs</option>
                  <option>Kotlin / React Native Mobile</option>
                  <option>Electron (Desktop/macOS)</option>
                  <option>DevOps (Docker/K8s/CI/CD)</option>
                  <option>ML / MLOps</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Budget (USD)">
                <select
                  value={data.budget}
                  onChange={onChange("budget")}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  <option>$1k – $5k</option>
                  <option>$5k – $15k</option>
                  <option>$15k – $40k</option>
                  <option>$40k+</option>
                </select>
              </Field>
            </div>

            <Field label="Your message *" className="mt-4">
              <textarea
                value={data.message}
                onChange={onChange("message")}
                className={`${inputCls} min-h-[120px]`}
                placeholder="Tell me about the goals, timeline and any tech preferences…"
                required
              />
            </Field>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-300 mb-1">Preferred contact</div>
                <div className="flex gap-2">
                  {(["email", "phone", "whatsapp"] as const).map((k) => (
                    <label
                      key={k}
                      className={`cursor-pointer text-xs rounded-lg border px-2.5 py-1.5 ${
                        data.prefer === k
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                          : "border-white/15 bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="prefer"
                        value={k}
                        checked={data.prefer === k}
                        onChange={onChange("prefer")}
                        className="sr-only"
                      />
                      {k === "email" ? "Email" : k === "phone" ? "Phone" : "WhatsApp"}
                    </label>
                  ))}
                </div>
              </div>

              {/* Honeypot (hidden) */}
              <div className="hidden">
                <input
                  type="text"
                  value={data.website}
                  onChange={onChange("website")}
                  placeholder="Your website"
                  autoComplete="url"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 shadow-lg disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending…" : "Send message"}
            </motion.button>

            {/* Toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className={`mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    toast.ok
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"
                      : "bg-rose-500/10 text-rose-300 border border-rose-400/30"
                  }`}
                >
                  {toast.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <span>{toast.msg}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* DETAILS / CONTACT CARDS */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="space-y-4"
          >
            <Card
              title="Direct"
              items={[
                { icon: Mail, label: "you@example.com", href: "mailto:you@example.com" },
                { icon: Phone, label: "+92 311 652 1764", href: "tel:+923116521764" },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  href: "https://wa.me/923116521764?text=Hi%20Rana%2C%20let%E2%80%99s%20talk%20about%20a%20project",
                },
              ]}
            />
            <Card
              title="Social"
              items={[
                { icon: Github, label: "github.com/your-handle", href: "https://github.com/your-handle" },
                { icon: Linkedin, label: "linkedin.com/in/your-handle", href: "https://www.linkedin.com/in/your-handle" },
                { icon: Globe2, label: "Portfolio", href: "/" },
              ]}
            />
            <Card
              title="Location & Hours"
              items={[
                { icon: MapPin, label: "Pakistan (Remote • Global)" },
                { icon: Clock, label: "Mon–Fri • 10:00–18:00 PKT" },
              ]}
            />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- UI bits ---------- */

const inputCls =
  "w-full h-11 px-3.5 rounded-xl border text-sm bg-black/40 text-white placeholder-gray-400 " +
  "border-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-400/70";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <div className="mb-1.5 text-xs font-medium text-gray-300">{label}</div>
      {children}
    </label>
  );
}

function Card({
  title,
  items,
}: {
  title: string;
  items: { icon: any; label: string; href?: string }[];
}) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 sm:p-5">
      <div className="text-sm font-semibold text-cyan-300 mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            {href ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-2.5 text-sm text-gray-200 hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{label}</span>
              </a>
            ) : (
              <div className="flex items-center gap-2.5 text-sm text-gray-200">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
