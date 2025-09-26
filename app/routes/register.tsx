import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { Eye, EyeOff, Github, Facebook, Apple } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../constant";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "S3rhub " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dateOfBirth: "",
    password: "",
    otp: "",
    consent: false,
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [otpMessage, setOtpMessage] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", isSuccess: false });
  const [otpSent, setOtpSent] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [otpLimitReached, setOtpLimitReached] = useState(false);

  const MAX_OTP_ATTEMPTS = 5;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.consent) newErrors.consent = "You must agree to the privacy policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm() || !otpVerified) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/register`, formData, {
        withCredentials: true,
      });
      setModal({
        show: true,
        message: response.data.message || "Registration Successful!",
        isSuccess: true,
      });
      setTimeout(() => {
        setModal({ show: false, message: "", isSuccess: false });
        navigate("/");
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration Failed! Please try again.";
      setModal({ show: true, message: errorMessage, isSuccess: false });
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (otpAttempts >= MAX_OTP_ATTEMPTS) {
      setOtpMessage("You've reached your daily OTP limit.");
      setOtpLimitReached(true);
      return;
    }
    if (!formData.email || !formData.email.includes("@")) {
      setOtpMessage("Enter a valid email first.");
      return;
    }

    setLoadingOtp(true);
    setOtpMessage("");
    try {
      await axios.post(`${BASE_URL}/api/v1/otp/send-otp`, { email: formData.email });
      setOtpMessage("OTP sent to your email");
      setOtpSent(true);
      setOtpAttempts((prev) => prev + 1);
    } catch (error: any) {
      setOtpMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setLoadingOtp(true);
    setOtpMessage("");
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/otp/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });
      if (response.data.success) {
        setOtpVerified(true);
        setOtpMessage("OTP verified successfully");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error: any) {
      setOtpMessage(error.response?.data?.message || "OTP verification failed");
      setOtpVerified(false);
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 sm:px-6 py-6 md:py-10
                 text-white flex items-center justify-center overflow-hidden"
    >

       <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>
      <motion.div
        layout
        initial={{ scale: 0.98, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="w-full max-w- pt-10 md:pt-0  
                   border border-white/10 
                   rounded-2xl overflow-hidden"
      >
        {/* App-like card header */}
        <div className="border-b border-white/10 bg-black/60">
          <div className="flex items-center justify-between px-6 md:px-8 py-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Create Your Account</h2>
              <p className="text-xs sm:text-sm text-slate-300">Join our community in just a few steps</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Secure sign-up
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Two-column layout */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {/* Left */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-200">Username *</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 rounded-xl border text-sm
                               bg-black/40 border-white/10 text-white
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-cyan-500"
                  />
                  {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-200">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 rounded-xl border text-sm
                               bg-black/40 border-white/10 text-white
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-cyan-500"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-200">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-11 pr-11 px-3.5 rounded-xl border text-sm
                                 bg-black/40 border-white/10 text-white
                                 placeholder-gray-400 focus:outline-none
                                 focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-2.5 flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Inline password checklist */}
                  {formData.password && (
                    <div className="mt-1 grid grid-cols-2 gap-1 text-[0.7rem]">
                      <span className={`${formData.password.length >= 8 ? "text-emerald-400" : "text-red-400"} flex items-center gap-1`}>{formData.password.length >= 8 ? "✓" : "✗"} 8+ chars</span>
                      <span className={`${/[A-Z]/.test(formData.password) ? "text-emerald-400" : "text-red-400"} flex items-center gap-1`}>{/[A-Z]/.test(formData.password) ? "✓" : "✗"} Uppercase</span>
                      <span className={`${/[0-9]/.test(formData.password) ? "text-emerald-400" : "text-red-400"} flex items-center gap-1`}>{/[0-9]/.test(formData.password) ? "✓" : "✗"} Number</span>
                      <span className={`${/[^A-Za-z0-9]/.test(formData.password) ? "text-emerald-400" : "text-red-400"} flex items-center gap-1`}>{/[^A-Za-z0-9]/.test(formData.password) ? "✓" : "✗"} Special</span>
                    </div>
                  )}

                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-200">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    autoComplete="bday"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 rounded-xl border text-sm
                               bg-black/40 border-white/10 text-white
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-cyan-500"
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-xs text-red-400">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-200">OTP Verification *</label>
                  <div className="flex flex-col sm:flex-row gap-1.5">
                    <input
                      type="text"
                      name="otp"
                      inputMode="numeric"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      disabled={otpVerified}
                      className="flex-1 h-11 px-3.5 rounded-xl border text-sm
                                 bg-black/40 border-white/10 text-white
                                 placeholder-gray-400 focus:outline-none
                                 focus:ring-2 focus:ring-cyan-500 disabled:bg-black/30"
                    />
                    <div className="flex gap-1.5 sm:w-60">
                      {!otpSent ? (
                        <motion.button
                          type="button"
                          onClick={sendOtp}
                          disabled={loadingOtp || otpLimitReached}
                          className={`h-11 flex-1 rounded-xl text-sm text-white ${otpLimitReached ? "bg-gray-600" : "bg-cyan-600 hover:bg-cyan-500"}`}
                          whileHover={{ scale: otpLimitReached ? 1 : 1.01 }}
                          whileTap={{ scale: otpLimitReached ? 1 : 0.99 }}
                        >
                          {loadingOtp ? "Sending..." : "Send OTP"}
                        </motion.button>
                      ) : !otpVerified ? (
                        <motion.button
                          type="button"
                          onClick={verifyOtp}
                          disabled={loadingOtp}
                          className="h-11 flex-1 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-500"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          {loadingOtp ? "Verifying..." : "Verify"}
                        </motion.button>
                      ) : (
                        <span className="h-11 flex-1 rounded-xl text-sm bg-emerald-600 text-white grid place-items-center">Verified</span>
                      )}
                    </div>
                  </div>
                  {otpMessage && <p className={`mt-1 text-xs ${otpVerified ? "text-emerald-400" : "text-red-400"}`}>{otpMessage}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-200">Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Full address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 rounded-xl border text-sm
                               bg-black/40 border-white/10 text-white
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-cyan-500"
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-black/70 text-[11px] sm:text-xs text-slate-300">Or continue with</span>
              </div>
            </div>

            {/* OAuth Buttons (small, equal size) */}
            <motion.div
              className="grid grid-cols-3 gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <OAuthButton href={`${BASE_URL}/auth/google?source=web`} icon={<FaGoogle className="text-[15px]" />} color="from-white/10 to-white/10" />
              <OAuthButton href={`${BASE_URL}/auth/facebook?source=web`} icon={<Facebook size={16} />} color="from-white/10 to-white/10" />
              <OAuthButton href={`${BASE_URL}/auth/apple?source=web`} icon={<Apple size={16} />} color="from-white/10 to-white/10" />
            </motion.div>

            {/* Consent */}
            <div className="flex justify-center pt-2">
              <label className="flex items-start gap-2 max-w-md text-xs text-slate-300">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 accent-cyan-500"
                  id="consent-checkbox"
                />
                <span>
                  I agree to the{" "}
                  <a href="/privacy" className="text-cyan-300 hover:text-cyan-200 hover:underline">Privacy Policy</a> and{" "}
                  <a href="/terms" className="text-cyan-300 hover:text-cyan-200 hover:underline">Terms</a>
                </span>
              </label>
            </div>
            {errors.consent && <p className="text-center text-xs text-red-400">{errors.consent}</p>}

            {/* Submit */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="pt-1">
              <motion.button
                type="submit"
                disabled={loading || !otpVerified}
                className={`w-full h-12 rounded-xl text-sm font-semibold text-white ${
                  loading || !otpVerified ? "bg-gray-600" : "bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500"
                } transition-colors`}
                whileHover={{ scale: !(loading || !otpVerified) ? 1.01 : 1 }}
                whileTap={{ scale: !(loading || !otpVerified) ? 0.99 : 1 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full"
                    />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </motion.div>

            {/* Footer */}
            <div className="text-center mt-3">
              <p className="text-xs text-slate-300">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-emerald-300 hover:text-emerald-200 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modal.show && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="p-5 rounded-2xl shadow-2xl max-w-xs w-full bg-gray-900 text-white border border-white/10"
            >
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    modal.isSuccess ? "bg-emerald-500/20 ring-1 ring-emerald-500/30" : "bg-red-500/20 ring-1 ring-red-500/30"
                  }`}
                >
                  {modal.isSuccess ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${modal.isSuccess ? "text-emerald-300" : "text-red-300"}`}>
                  {modal.isSuccess ? "Success!" : "Error!"}
                </h3>
                <p className="mb-3 text-sm text-slate-300">{modal.message}</p>
                <motion.button
                  onClick={() => setModal({ show: false, message: "", isSuccess: false })}
                  className={`px-3 py-2 rounded-lg text-sm text-white ${
                    modal.isSuccess ? "bg-emerald-600 hover:bg-emerald-500" : "bg-red-600 hover:bg-red-500"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Register;

function OAuthButton({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) {
  return (
    <motion.a
      href={href}
      className={`relative overflow-hidden p-2 text-white rounded-lg shadow-sm bg-gradient-to-r ${color}
                  ring-1 ring-white/10 hover:ring-white/20 hover:shadow-md transition-all`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center">
        <span className="text-sm">{icon}</span>
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
