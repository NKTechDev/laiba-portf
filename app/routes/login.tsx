// src/routes/login.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { fetchUser } from "../redux/slices/authSlice";
import { BASE_URL } from "../constant";
import {
  LogIn, Shield, Loader2, Facebook, Apple,
  Mail, Lock
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Sign in • RN Portfolio" },
    { name: "description", content: "Secure sign-in to your RN Portfolio account." },
  ];
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: [0, 0.35, 0],
    scale: 1.2,
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const controls = useAnimation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [modal, setModal] = useState<{ isOpen: boolean; message?: string; isError?: boolean }>({
    isOpen: false,
    message: "",
    isError: false,
  });
  const [loading, setLoading] = useState(false);
  const [hoveredField, setHoveredField] = useState<"email" | "password" | null>(null);

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");

      // refresh auth state
      // @ts-ignore
      await dispatch(fetchUser());
      setModal({ isOpen: true, message: "Login Successful!", isError: false });

      setTimeout(() => {
        setModal({ isOpen: false });
        navigate("/home");
      }, 1200);
    } catch (err: any) {
      setModal({ isOpen: true, message: err?.message || "Login failed", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen px-6 flex items-start pt-10 md:pt-0 justify-start overflow-hidden   text-white">
      {/* Background accents (same family as other routes) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl"
        variants={glowVariants}
        initial="initial"
        animate={controls}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl"
        variants={glowVariants}
        initial="initial"
        animate={controls}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute top-2/3 right-1/3 w-56 h-56 rounded-full bg-cyan-300/20 blur-3xl"
        variants={glowVariants}
        initial="initial"
        animate={controls}
        transition={{ delay: 1 }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* Mobile spacer so the top marquee/header won't overlap */}
      <div
        className="md:hidden absolute top-0 left-0 right-0"
        style={{ height: "calc(var(--mobile-topbar, 56px) + var(--marquee-top, 44px) + 8px)" }}
      />

      {/* Login Card (dark / glass, identical language to Contact) */}
      <motion.section
        className="relative w-full max-w-[28rem] mx-auto mt-6 md:mt-10
                   p-5 sm:p-6 md:p-8 backdrop-blur-xl
                   rounded-2xl text-center border border-white/10
                    z-10"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        whileHover={{ y: -3 }}
      >
        {/* Title */}
        <motion.div
          className="mb-6 sm:mb-7 flex items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-cyan-400/25 rounded-full blur-md" />
            <div className="relative p-2.5 sm:p-3 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 text-white ring-1 ring-white/10">
              <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
          <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Sign in
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3.5 sm:space-y-4 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Email (icon + glass input) */}
          <motion.label variants={itemVariants} className="block">
            <span className="sr-only">Email</span>
            <div className="relative">
              {hoveredField === "email" && (
                <motion.div
                  className="absolute inset-0 bg-cyan-500/10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18 }}
                />
              )}
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setHoveredField("email")}
                onBlur={() => setHoveredField(null)}
                className="relative w-full h-12 sm:h-12 rounded-xl
                           border border-white/10 bg-black/40
                           pl-10 pr-3.5 text-[15px] sm:text-base text-white
                           placeholder:text-gray-400 outline-none
                           focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </motion.label>

          {/* Password (icon + glass input) */}
          <motion.label variants={itemVariants} className="block">
            <span className="sr-only">Password</span>
            <div className="relative">
              {hoveredField === "password" && (
                <motion.div
                  className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18 }}
                />
              )}
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300 pointer-events-none" />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setHoveredField("password")}
                onBlur={() => setHoveredField(null)}
                className="relative w-full h-12 sm:h-12 rounded-xl
                           border border-white/10 bg-black/40
                           pl-10 pr-3.5 text-[15px] sm:text-base text-white
                           placeholder:text-gray-400 outline-none
                           focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </motion.label>

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              className="relative w-full h-12 sm:h-12 rounded-xl font-semibold
                         bg-gradient-to-r from-cyan-600 to-emerald-600 text-white
                         shadow-sm hover:shadow-md active:scale-[0.99]
                         transition-all duration-200 flex items-center justify-center gap-2
                         overflow-hidden group"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-700/0 via-white/10 to-emerald-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-[15px]">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
              </span>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Links */}
        <motion.div
          className="mt-4 sm:mt-5 text-xs sm:text-sm text-slate-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Link to="/forgetpass" className="text-cyan-300 hover:text-cyan-200 hover:underline">
            Forgot password?
          </Link>
        </motion.div>
        <motion.p
          className="mt-2 text-xs sm:text-sm text-slate-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Don’t have an account?{" "}
          <Link to="/register" className="text-emerald-300 hover:text-emerald-200 hover:underline font-medium">
            Create one
          </Link>
        </motion.p>

        {/* Divider */}
        <motion.div
          className="relative my-5 sm:my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-black/70 text-slate-300 text-[11px] sm:text-sm">
              Or continue with
            </span>
          </div>
        </motion.div>

        {/* OAuth (dark/glass, compact) */}
        <motion.div
          className="grid grid-cols-3 gap-2.5 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <OAuthButton
            href={`${BASE_URL}/auth/google?source=web`}
            icon={<FaGoogle className="text-[15px]" />}
            color="from-white/10 to-white/10"
          />
          <OAuthButton
            href={`${BASE_URL}/auth/facebook?source=web`}
            icon={<Facebook className="text-[15px]" />}
            color="from-white/10 to-white/10"
          />
          <OAuthButton
            href={`${BASE_URL}/auth/apple?source=web`}
            icon={<Apple className="text-[15px]" />}
            color="from-white/10 to-white/10"
          />
        </motion.div>

        {/* Security Note (same pattern as other routes) */}
        <motion.div
          className="mt-5 sm:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="relative p-3 sm:p-3.5 text-left rounded-xl bg-amber-500/10 border border-amber-400/20">
            <div className="absolute -inset-1 bg-amber-400/10 rounded-xl blur-[2px]" />
            <div className="relative flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 text-amber-300" />
              <div className="text-[12px] sm:text-xs leading-relaxed text-amber-200">
                <p className="font-medium">Security notice</p>
                <p>
                  You have <span className="font-semibold">4 login attempts</span> per day.
                  After that, your account will be temporarily locked.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl w-96 max-w-[90vw] border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
            >
              <motion.div
                className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${modal.isError ? "bg-red-500/15 ring-1 ring-red-500/30" : "bg-emerald-500/15 ring-1 ring-emerald-500/30"}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                {modal.isError ? (
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </motion.div>
              <h3 className={`mt-3 text-lg font-medium ${modal.isError ? "text-red-400" : "text-emerald-400"}`}>{modal.message}</h3>
              <div className="mt-5">
                <button
                  onClick={() => setModal({ isOpen: false })}
                  className={`px-4 py-2 rounded-lg font-medium text-white ${modal.isError ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"} transition-colors`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dark/glass OAuth button (theme-aligned)
function OAuthButton({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) {
  return (
    <motion.a
      href={href}
      className={`relative overflow-hidden p-2 text-white rounded-lg shadow-md bg-gradient-to-r ${color} ring-1 ring-white/10 hover:ring-white/20 hover:shadow-lg transition-all`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-1 text-sm">
        <span className="text-lg">{icon}</span>
      </span>
      <motion.span
        className="absolute inset-0 bg-white/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
