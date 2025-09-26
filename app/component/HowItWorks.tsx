// src/components/HowItWorks.tsx
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Building2,
  MapPinned,
  Waves,
  DoorOpen,
  Cpu,
  Siren,
  Radio,
  Map,
  MessageSquare,
  Phone,
  ChevronRight,
  ChevronDown
} from "lucide-react";

type Step = {
  title: string;
  desc: string;
  icon: JSX.Element;
  img: string; // PNG path, e.g. /assets/...
  pill?: string; // small label (e.g., "AI", "E2EE")
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  viewport: { once: true, amount: 0.2 },
};

const dotAnim = {
  animate: {
    x: [0, 6, 0],
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function HowItWorks() {
  // PREMIUM plan steps (full flow)
  const premium: Step[] = [
    {
      title: "User",
      desc: "User create the place after creating account in s3r mobile app.",
      icon: <UserIcon className="h-5 w-5" />,
      img: "/assets/hiw-user.png",
    },
    {
      title: "Place",
      desc: "Then user crate the place in the app then this place will add into our system.",
      icon: <Building2 className="h-5 w-5" />,
      img: "/assets/hiw-place.png",
    },
    {
      title: "Zone",
      desc: "Then user create the zone in the selected place.",
      icon: <MapPinned className="h-5 w-5" />,
      img: "/assets/hiw-zone.png",
    },
    
    {
      title: "Room",
      desc: "User create the room in the specific zoon.",
      icon: <DoorOpen className="h-5 w-5" />,
      img: "/assets/hiw-room.png",
    },
    {
      title: "Device",
      desc: "Linked devices & sensors.",
      icon: <Cpu className="h-5 w-5" />,
      img: "/assets/hiw-device.png",
    },
    {
      title: "Dispatch",
      desc: "When motion detect by devices a notification came to user mobile user can decide it want to dispatch emergency or not Force receives alert in < 5s with nav-ready location.",
      icon: <Siren className="h-5 w-5" />,
      img: "/assets/hiw-dispatch.png",
    },
    {
      title: "Live Tracking",
      desc: "When dispatch system active user can see the forces cuurent location in the app.",
      icon: <Map className="h-5 w-5" />,
      img: "/assets/hiw-tracking.png",
      pill: "Map",
    },
    {
      title: "Chat & Call",
      desc: "User can did call and chat with forces",
      icon: <MessageSquare className="h-5 w-5" />,
      img: "/assets/hiw-chat.png",
      pill: "E2EE",
    },
   
  ];

  // STANDARD plan steps (lean flow)
  const standard: Step[] = [
    {
      title: "User",
      desc: "Taps Emergency Dispatch.",
      icon: <UserIcon className="h-5 w-5" />,
      img: "/assets/hiw-user.png",
    },
    {
      title: "Dispatch",
      desc: "Jurisdiction engine routes to nearest available unit.",
      icon: <Siren className="h-5 w-5" />,
      img: "/assets/hiw-dispatch.png",
    },
  ];

  return (
    <section className="w-full bg-white">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
            Premium Pack • S3R
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            How S3R Works — from SOS to Resolution
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-gray-700">
            A visual walkthrough of the Premium and Standard plans. Fully responsive, app-like experience.
          </p>
        </motion.div>

        {/* PREMIUM PLAN */}
        <motion.div
          className="mt-10 md:mt-12 rounded-3xl border border-gray-200 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-5 sm:p-6 md:p-8"
          {...fadeUp}
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-lg sm:text-xl font-bold">
              Premium Plan — Emergency Dispatch + Live Tracking + Chat/Call + Motion AI
            </h3>
            <span className="text-xs font-medium rounded-full bg-pink-600 text-white px-3 py-1">
              Most capable
            </span>
          </div>

          {/* Diagram: vertical on mobile, horizontal on lg+ */}
          <div className="mt-6">
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-5">
              {premium.map((step, idx) => (
                <DiagramStep
                  key={step.title}
                  step={step}
                  isLast={idx === premium.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Note */}
          <p className="mt-5 text-xs text-gray-600">
            Pressing the Emergency Dispatch button shares the user’s current location with forces. In Premium, the user can follow units on a live map,
            chat securely, send voice notes, and optionally stream motion signals from devices or zones for richer context.
          </p>
        </motion.div>

        {/* STANDARD PLAN */}
        <motion.div
          className="mt-8 md:mt-10 rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8"
          {...fadeUp}
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-lg sm:text-xl font-bold">
              Standard Plan — Core Emergency Dispatch
            </h3>
            <span className="text-xs font-medium rounded-full bg-gray-900 text-white px-3 py-1">
              Lean & effective
            </span>
          </div>

          <div className="mt-6">
            <div className="flex flex-col lg:flex-row gap-5">
              {standard.map((step, idx) => (
                <DiagramStep
                  key={step.title}
                  step={step}
                  isLast={idx === standard.length - 1}
                />
              ))}
            </div>
          </div>

          <p className="mt-5 text-xs text-gray-600">
            Standard focuses on reliable dispatch: user location is sent, units get navigation-ready coordinates. Live tracking, chat/call, and motion
            signals are excluded to keep the package lightweight.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- helpers ----------------------------- */

function DiagramStep({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <div className="flex items-stretch lg:items-center gap-3 lg:gap-4">
      {/* Card */}
      <motion.div
        className="relative w-full lg:w-[280px] xl:w-[300px] rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-md transition"
        {...fadeUp}
      >
        {/* image */}
        <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          {/* Keep equal width/height feel with object-contain for PNGs */}
          <img
            src={step.img}
            alt={step.title}
            className="absolute inset-0 h-full w-full object-contain"
          />
          {/* soft glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40" />
        </div>

        {/* title + icon */}
        <div className="mt-3 flex items-center gap-2">
          <span className="h-8 w-8 grid place-items-center rounded-lg bg-pink-50 text-pink-700">
            {step.icon}
          </span>
          <p className="font-semibold">{step.title}</p>
          {step.pill && (
            <span className="ml-auto text-[10px] font-semibold rounded-full bg-purple-600 text-white px-2 py-0.5">
              {step.pill}
            </span>
          )}
        </div>

        {/* description */}
        <p className="mt-1 text-sm text-gray-700">{step.desc}</p>
      </motion.div>

      {/* Arrow */}
      {!isLast && (
        <>
          {/* desktop: right arrow */}
          <div className="hidden lg:flex items-center">
            <AnimatedArrowRight />
          </div>
          {/* mobile: down arrow */}
          <div className="lg:hidden flex items-start justify-center w-full">
            <AnimatedArrowDown />
          </div>
        </>
      )}
    </div>
  );
}

function AnimatedArrowRight() {
  return (
    <div className="relative h-10 w-10 shrink-0 grid place-items-center">
      <ChevronRight className="h-6 w-6 text-pink-600" />
      <motion.span
        className="absolute right-2 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-pink-600"
        {...dotAnim}
      />
    </div>
  );
}

function AnimatedArrowDown() {
  return (
    <div className="relative h-8 w-full grid place-items-center">
      <ChevronDown className="h-6 w-6 text-pink-600" />
      <motion.span
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-pink-600"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
