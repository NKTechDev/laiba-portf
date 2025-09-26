// src/routes/Projects.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Server, Database, Cloud, Cpu, Smartphone, Monitor, Workflow, Container,
  GitBranch, Globe, ShieldCheck, Layers, Sparkles, Rocket, Settings, TerminalSquare,
} from "lucide-react";
import { Link } from "react-router"
import type { Route } from "./+types/home";

type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];         // used for filtering
  links?: { label: string; href: string }[];
  icon?: JSX.Element;     // Lucide icon
};

export function meta({ location }: Route.MetaArgs) {
  const url = `https://nktech.giyiyorum.com${location?.pathname ?? "/projects"}`;
  const title = "Projects • RN Portfolio — Full-Stack, DevOps & ML";
  const desc =
    "Explore production-grade projects by Laiba Anjum: MERN & PERN apps, Java/Spring Boot microservices, Kotlin/React Native mobile, Electron desktop, PHP/Laravel, and ML pipelines—built with Docker, K8s, CI/CD, and cloud (AWS/GCP/Azure). Security, performance, and observability first.";

  return [
    { title },
    { name: "description", content: desc },
    {
      name: "keywords",
      content:
        "Laiba Anjum, RN Portfolio, projects, MERN, PERN, React, Node.js, Express, Spring Boot, Java, Kotlin, Jetpack Compose, React Native, Electron, PHP, Laravel, Postgres, MongoDB, Redis, Docker, Kubernetes, CI/CD, AWS, GCP, Azure, ML, MLOps, microservices, realtime, Socket.IO, security, observability",
    },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#06b6d4" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:image", content: "/og/projects.jpg" }, // put your preview image

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: "/og/projects.jpg" },

    // Canonical
    { tagName: "link", rel: "canonical", href: url },
  ];
}

const TAGS = [
  "All",
  "MERN",
  "PERN",
  "Spring Boot",
  "Kotlin/Compose",
  "React Native",
  "Electron",
  "Laravel/PHP",
  "DevOps",
  "ML/MLOps",
  "Microservices",
  "Realtime",
] as const;

const tagIcon: Record<string, JSX.Element> = {
  MERN: <Code2 className="size-4" />,
  PERN: <Code2 className="size-4" />,
  "Spring Boot": <Server className="size-4" />,
  "Kotlin/Compose": <Smartphone className="size-4" />,
  "React Native": <Smartphone className="size-4" />,
  Electron: <Monitor className="size-4" />,
  "Laravel/PHP": <TerminalSquare className="size-4" />,
  DevOps: <Container className="size-4" />,
  "ML/MLOps": <Cpu className="size-4" />,
  Microservices: <Layers className="size-4" />,
  Realtime: <GitBranch className="size-4" />,
  Database: <Database className="size-4" />,
  Cloud: <Cloud className="size-4" />,
};

const projects: Project[] = [
  // --- 30 industry-style concise entries (mixing your skills) ---
  // {
  //   id: "dispatch-platform",
  //   title: "S3R Dispatch Platform",
  //   blurb: "Realtime emergency dispatch (Socket.IO), geolocation, chat, role-based HQ → officer routing.",
  //   tags: ["MERN", "Realtime", "Microservices", "DevOps"],
  //   links: [{ label: "Case Study", href: "/projects/dispatch" }],
  //   icon: <GitBranch className="size-5 text-cyan-300" />,
  // },
  {
    id: "cooee-mobile",
    title: "Cooee Mobile Telco",
    blurb: "SIM-only storefront with plan engine, Octane API integration, CIS + SFOA docs delivery.",
    tags: ["PERN", "Microservices", "DevOps"],
    links: [{ label: "Live", href: "#" }],
    icon: <Globe className="size-5 text-emerald-300" />,
  },
  {
    id: "dropship-saas",
    title: "Dropshipping Auto-Sync SaaS",
    blurb: "AliExpress → Shopify importer, supplier detection, price rules, live stock sync.",
    tags: ["MERN", "Microservices", "DevOps"],
    links: [{ label: "Repo", href: "#" }],
    icon: <Workflow className="size-5 text-cyan-300" />,
  },
  {
    id: "faceverify-iot",
    title: "FaceVerify IoT Console",
    blurb: "Device pairing, alarm modes, flows with Nami; secure control and telemetry.",
    tags: ["PERN", "Microservices", "Realtime"],
    icon: <ShieldCheck className="size-5 text-cyan-300" />,
  },
  {
    id: "ml-risk-scorer",
    title: "ML Risk Scorer",
    blurb: "Model serving (FastAPI/Node), feature store, A/B policy, monitoring & drift alerts.",
    tags: ["ML/MLOps", "DevOps"],
    icon: <Cpu className="size-5 text-emerald-300" />,
  },
  {
    id: "pos-suite",
    title: "Retail POS Suite",
    blurb: "Ingredient stock, purchase tracking, dynamic pricing, multi-tenant analytics.",
    tags: ["MERN", "PERN", "DevOps"],
    icon: <Database className="size-5 text-cyan-300" />,
  },
  {
    id: "react-native-emergency",
    title: "RN Emergency Mobile",
    blurb: "Socket rooms, live officer tracking with MapLibre, FCM, deep links.",
    tags: ["React Native", "Realtime"],
    icon: <Smartphone className="size-5 text-emerald-300" />,
  },
  {
    id: "compose-location",
    title: "Compose Location SDK",
    blurb: "Kotlin/Compose kit for precise foreground tracking with permissions & battery guard.",
    tags: ["Kotlin/Compose"],
    icon: <Smartphone className="size-5 text-cyan-300" />,
  },
  {
    id: "spring-api-gw",
    title: "Spring Boot API Gateway",
    blurb: "Edge routing, token introspection, rate limiting, zero-downtime deploys.",
    tags: ["Spring Boot", "Microservices", "DevOps"],
    icon: <Server className="size-5 text-emerald-300" />,
  },
  {
    id: "electron-desk",
    title: "Electron Ops Desk",
    blurb: "Desktop console for dispatchers: live maps, ticketing, offline-first cache.",
    tags: ["Electron", "Realtime"],
    icon: <Monitor className="size-5 text-cyan-300" />,
  },
  {
    id: "laravel-billing",
    title: "Laravel Billing & Invoicing",
    blurb: "Stripe webhooks, receipt PDFs, tax rules, dunning and retries.",
    tags: ["Laravel/PHP"],
    icon: <TerminalSquare className="size-5 text-emerald-300" />,
  },
  {
    id: "mlops-pipeline",
    title: "MLOps CI/CD",
    blurb: "Dockerized training, model registry, canary rollouts, metrics in Grafana.",
    tags: ["ML/MLOps", "DevOps"],
    icon: <Container className="size-5 text-cyan-300" />,
  },
  {
    id: "realtime-analytics",
    title: "Realtime Analytics Bus",
    blurb: "Kafka + Websockets for event ingestion and live dashboard streams.",
    tags: ["PERN", "Realtime", "Microservices"],
    icon: <GitBranch className="size-5 text-emerald-300" />,
  },
  {
    id: "kotlin-payments",
    title: "Kotlin Payments SDK",
    blurb: "Secure card capture, tokenization, 3DS, drop-in UI for Android.",
    tags: ["Kotlin/Compose"],
    icon: <Smartphone className="size-5 text-cyan-300" />,
  },
  {
    id: "spring-auth-sso",
    title: "Spring Boot SSO",
    blurb: "JWT + OAuth2, Role/Scope policies, audit logs with SIEM hooks.",
    tags: ["Spring Boot", "Microservices"],
    icon: <ShieldCheck className="size-5 text-emerald-300" />,
  },
  {
    id: "mern-collab",
    title: "MERN Collaboration Hub",
    blurb: "Docs, comments, presence, CRDT syncing, offline conflict resolution.",
    tags: ["MERN", "Realtime"],
    icon: <Code2 className="size-5 text-cyan-300" />,
  },
  {
    id: "pern-erp",
    title: "PERN Mini-ERP",
    blurb: "Inventory, orders, ledger, multi-warehouse sync with cron workers.",
    tags: ["PERN", "Microservices"],
    icon: <Layers className="size-5 text-emerald-300" />,
  },
  {
    id: "rn-chat",
    title: "RN Chat + Calls",
    blurb: "1:1 & group chat, typing indicators, voice notes, WebRTC calls.",
    tags: ["React Native", "Realtime"],
    icon: <Smartphone className="size-5 text-cyan-300" />,
  },
  {
    id: "compose-iot",
    title: "Compose IoT Controls",
    blurb: "BLE/Wi-Fi commissioning, scenes, schedules, OTA firmware triggers.",
    tags: ["Kotlin/Compose"],
    icon: <Settings className="size-5 text-emerald-300" />,
  },
  {
    id: "elec-macos",
    title: "Electron macOS Admin",
    blurb: "Menu bar agent, auto-updates, secure keychain + sandbox rules.",
    tags: ["Electron", "DevOps"],
    icon: <Monitor className="size-5 text-cyan-300" />,
  },
  {
    id: "php-portal",
    title: "PHP Client Portal",
    blurb: "Ticketing, audits, attachments, activity feeds, email piping.",
    tags: ["Laravel/PHP"],
    icon: <TerminalSquare className="size-5 text-emerald-300" />,
  },
  {
    id: "spring-observability",
    title: "Spring Observability Stack",
    blurb: "OpenTelemetry traces, logs, metrics; SLOs and error budgets.",
    tags: ["Spring Boot", "DevOps"],
    icon: <Server className="size-5 text-cyan-300" />,
  },
  {
    id: "ml-feature-store",
    title: "ML Feature Store",
    blurb: "Batch + streaming features, point-in-time joins, versioning.",
    tags: ["ML/MLOps", "Microservices"],
    icon: <Cpu className="size-5 text-emerald-300" />,
  },
  {
    id: "realtime-maps",
    title: "Realtime Maps",
    blurb: "MapLibre + websockets, clustering, animated polylines, playback.",
    tags: ["MERN", "Realtime"],
    icon: <Globe className="size-5 text-cyan-300" />,
  },
  {
    id: "pern-compliance",
    title: "PERN Compliance Vault",
    blurb: "Doc workflows, signatures, role locks, retention schedules.",
    tags: ["PERN"],
    icon: <ShieldCheck className="size-5 text-emerald-300" />,
  },
  {
    id: "spring-batch",
    title: "Spring Batch Engine",
    blurb: "ETL orchestration, retries, DLQ, chunking with observability.",
    tags: ["Spring Boot", "DevOps"],
    icon: <Server className="size-5 text-cyan-300" />,
  },
  {
    id: "rn-field",
    title: "RN Field Ops",
    blurb: "Offline-first forms, background sync, media capture & compression.",
    tags: ["React Native"],
    icon: <Smartphone className="size-5 text-emerald-300" />,
  },
  {
    id: "electron-studio",
    title: "Electron Studio",
    blurb: "Cross-platform desktop shell for plugins, theming, and hot reload.",
    tags: ["Electron"],
    icon: <Monitor className="size-5 text-cyan-300" />,
  },
  {
    id: "laravel-headless",
    title: "Headless Laravel API",
    blurb: "Sanctum auth, transformers, rate limits, cache keys and tags.",
    tags: ["Laravel/PHP", "Microservices"],
    icon: <TerminalSquare className="size-5 text-emerald-300" />,
  },
  {
    id: "ml-monitor",
    title: "ML Monitor",
    blurb: "Live drift charts, PSI, SHAP summaries, alert routing.",
    tags: ["ML/MLOps", "DevOps"],
    icon: <Sparkles className="size-5 text-cyan-300" />,
  },
  // ⬇️ Append these to your `projects` array
{
  id: "geo-fleet",
  title: "GeoFleet Orchestrator",
  blurb: "Fleet telemetry, trip scoring, geofences, fuel fraud detection with alerts.",
  tags: ["PERN", "Realtime", "DevOps"],
  icon: <Globe className="size-5 text-emerald-300" />,
},
{
  id: "spring-quote",
  title: "Spring Boot Quote Engine",
  blurb: "Pricing rules DSL, underwriter overrides, audit trails, rate exports.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "mern-okr",
  title: "MERN OKR Tracker",
  blurb: "Team goals, key results, progress heatmaps, Slack notifications.",
  tags: ["MERN"],
  icon: <Layers className="size-5 text-emerald-300" />,
},
{
  id: "rn-survey",
  title: "RN Survey Capture",
  blurb: "Offline forms, conditional logic, media uploads, background sync.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "compose-wallet",
  title: "Compose Wallet",
  blurb: "Secure PIN/biometrics, on-device vault, deep links for pay flows.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "electron-uploader",
  title: "Electron Bulk Uploader",
  blurb: "Chunked uploads, resumable transfers, checksum validation.",
  tags: ["Electron", "DevOps"],
  icon: <Monitor className="size-5 text-cyan-300" />,
},
{
  id: "php-cms",
  title: "Laravel Headless CMS",
  blurb: "Schema builder, roles & workflows, CDN image transforms.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-emerald-300" />,
},
{
  id: "ml-reco",
  title: "ML Recommendations",
  blurb: "Embedding search, bandits for ranking, feature logging.",
  tags: ["ML/MLOps"],
  icon: <Cpu className="size-5 text-cyan-300" />,
},
{
  id: "spring-inventory",
  title: "Spring Inventory API",
  blurb: "Reservations, backorders, event sourcing, projections.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-emerald-300" />,
},
{
  id: "mern-kb",
  title: "MERN Knowledge Base",
  blurb: "Full-text search, highlighting, roles, suggested articles.",
  tags: ["MERN"],
  icon: <Code2 className="size-5 text-cyan-300" />,
},
{
  id: "pern-hris",
  title: "PERN HRIS",
  blurb: "Leave management, payroll exports, approvals, audits.",
  tags: ["PERN"],
  icon: <Workflow className="size-5 text-emerald-300" />,
},
{
  id: "rn-tracker",
  title: "RN Asset Tracker",
  blurb: "Beacon scanning, background tasks, map playback timelines.",
  tags: ["React Native", "Realtime"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "compose-chat",
  title: "Compose Chat Kit",
  blurb: "End-to-end encrypted DM, typing indicators, message reactions.",
  tags: ["Kotlin/Compose", "Realtime"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "electron-logs",
  title: "Electron Log Studio",
  blurb: "Tail multiple logs, regex filters, timeline correlator.",
  tags: ["Electron"],
  icon: <Monitor className="size-5 text-cyan-300" />,
},
{
  id: "php-quotas",
  title: "Laravel Quotas",
  blurb: "Tenant quotas, rate caps, burst control, usage reports.",
  tags: ["Laravel/PHP", "Microservices"],
  icon: <TerminalSquare className="size-5 text-emerald-300" />,
},
{
  id: "ml-fraud",
  title: "ML Fraud Watch",
  blurb: "Graph features, risk signals, triage queues, analyst tooling.",
  tags: ["ML/MLOps", "DevOps"],
  icon: <Sparkles className="size-5 text-cyan-300" />,
},
{
  id: "spring-mailer",
  title: "Spring Transactional Mailer",
  blurb: "Templates, per-tenant themes, webhooks, re-try policies.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-emerald-300" />,
},
{
  id: "mern-epub",
  title: "MERN ePub Reader",
  blurb: "Annotations, sync across devices, reading insights.",
  tags: ["MERN"],
  icon: <Code2 className="size-5 text-cyan-300" />,
},
{
  id: "pern-okr-insights",
  title: "PERN OKR Insights",
  blurb: "Trend charts, burndown, predictive goal completion.",
  tags: ["PERN", "DevOps"],
  icon: <Layers className="size-5 text-emerald-300" />,
},
{
  id: "rn-orders",
  title: "RN Orders Lite",
  blurb: "Scan-to-add, offline cart, push confirmations, receipts.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "compose-cam",
  title: "Compose Camera SDK",
  blurb: "HDR pipeline, stabilization, background processing.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "electron-viewer",
  title: "Electron 3D Viewer",
  blurb: "Model importers, orbit controls, annotations, snapshots.",
  tags: ["Electron"],
  icon: <Monitor className="size-5 text-cyan-300" />,
},
{
  id: "php-subscriptions",
  title: "Laravel Subscriptions",
  blurb: "Proration, seat management, coupons, tax inclusive prices.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-emerald-300" />,
},
{
  id: "ml-labeler",
  title: "ML Data Labeler",
  blurb: "Human-in-the-loop, consensus, active learning queues.",
  tags: ["ML/MLOps"],
  icon: <Cpu className="size-5 text-cyan-300" />,
},
{
  id: "spring-docs",
  title: "Spring Docs Service",
  blurb: "Versioned docs, diffing, approvals, publishing pipelines.",
  tags: ["Spring Boot"],
  icon: <Server className="size-5 text-emerald-300" />,
},
{
  id: "mern-events",
  title: "MERN Event Hub",
  blurb: "Tickets, seating charts, QR access, settlement reports.",
  tags: ["MERN", "Realtime"],
  icon: <GitBranch className="size-5 text-cyan-300" />,
},
{
  id: "pern-lms",
  title: "PERN LMS",
  blurb: "Courses, lessons, quizzes, proctoring, SCORM imports.",
  tags: ["PERN"],
  icon: <Workflow className="size-5 text-emerald-300" />,
},
{
  id: "rn-health",
  title: "RN Health Tracker",
  blurb: "Steps, heart rate, permissions, goals, charts, reminders.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "compose-notes",
  title: "Compose Notes",
  blurb: "Markdown, sync, end-to-end encryption, share links.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "elec-audit",
  title: "Electron Audit Agent",
  blurb: "File integrity scans, sig verify, secure upload of reports.",
  tags: ["Electron", "DevOps"],
  icon: <Monitor className="size-5 text-cyan-300" />,
},
// ⬇️ Append to projects array
{
  id: "finpay-mern",
  title: "FinPay Wallet",
  blurb: "Digital wallet with QR pay, ledger, settlements, and fraud checks.",
  tags: ["MERN", "Realtime", "DevOps"],
  icon: <Code2 className="size-5 text-cyan-300" />,
},
{
  id: "pern-logistics",
  title: "PERN Logistics Cloud",
  blurb: "Route optimization, fleet tracking, delivery proof with geofences.",
  tags: ["PERN", "Microservices", "Realtime"],
  icon: <Globe className="size-5 text-emerald-300" />,
},
{
  id: "spring-claims",
  title: "Spring Boot Claims Engine",
  blurb: "Insurance claims workflow with validations, payments, audit trails.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "rn-healthcare",
  title: "RN Telehealth App",
  blurb: "Video calls, prescriptions, secure patient records, FHIR APIs.",
  tags: ["React Native", "Realtime"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-smart-home",
  title: "Compose Smart Home",
  blurb: "IoT controls for lights, sensors, alarms with automation rules.",
  tags: ["Kotlin/Compose", "Realtime"],
  icon: <Settings className="size-5 text-cyan-300" />,
},
{
  id: "electron-trader",
  title: "Electron Trader Desk",
  blurb: "Stock charts, WebSocket tickers, alerts, and trading terminals.",
  tags: ["Electron", "Realtime"],
  icon: <Monitor className="size-5 text-emerald-300" />,
},
{
  id: "laravel-marketplace",
  title: "Laravel Marketplace",
  blurb: "Multi-vendor store, commissions, payouts, live order tracking.",
  tags: ["Laravel/PHP", "Microservices"],
  icon: <TerminalSquare className="size-5 text-cyan-300" />,
},
{
  id: "ml-nlp",
  title: "ML NLP Engine",
  blurb: "Custom transformer models for classification and chat insights.",
  tags: ["ML/MLOps"],
  icon: <Cpu className="size-5 text-emerald-300" />,
},
{
  id: "spring-loan",
  title: "Spring Boot Loan Engine",
  blurb: "Credit scoring, EMI schedules, regulatory reporting.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "mern-collab-whiteboard",
  title: "MERN Whiteboard",
  blurb: "Collaborative canvas with drawing, sticky notes, live cursors.",
  tags: ["MERN", "Realtime"],
  icon: <Layers className="size-5 text-emerald-300" />,
},
{
  id: "pern-ecom",
  title: "PERN E-Commerce",
  blurb: "Cart, checkout, payments, search, warehouse syncing.",
  tags: ["PERN", "Microservices"],
  icon: <Workflow className="size-5 text-cyan-300" />,
},
{
  id: "rn-finance",
  title: "RN Finance Tracker",
  blurb: "Budgeting, bank sync via Plaid, goal insights, charts.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-fitness",
  title: "Compose Fitness Coach",
  blurb: "Workout plans, wearables integration, offline logging.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "electron-devops",
  title: "Electron DevOps Console",
  blurb: "CI/CD pipelines view, logs tailing, alerts, one-click deploys.",
  tags: ["Electron", "DevOps"],
  icon: <Monitor className="size-5 text-emerald-300" />,
},
{
  id: "php-crm",
  title: "Laravel CRM",
  blurb: "Leads, pipelines, deals, campaigns, activity tracking.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-cyan-300" />,
},
{
  id: "ml-predictive",
  title: "Predictive Analytics",
  blurb: "Time-series forecasting with Prophet and LSTM pipelines.",
  tags: ["ML/MLOps", "DevOps"],
  icon: <Sparkles className="size-5 text-emerald-300" />,
},
{
  id: "spring-chatbot",
  title: "Spring Chatbot Platform",
  blurb: "NLP bots with intents, flows, context, and analytics.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "mern-docs",
  title: "MERN Docs Editor",
  blurb: "Google Docs-like editor with presence, comments, history.",
  tags: ["MERN", "Realtime"],
  icon: <Code2 className="size-5 text-emerald-300" />,
},
{
  id: "pern-payroll",
  title: "PERN Payroll",
  blurb: "Salary processing, deductions, compliance, reports.",
  tags: ["PERN"],
  icon: <Workflow className="size-5 text-cyan-300" />,
},
{
  id: "rn-delivery",
  title: "RN Delivery App",
  blurb: "Order assignment, route nav, proof of delivery, chat.",
  tags: ["React Native", "Realtime"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-bank",
  title: "Compose Bank Client",
  blurb: "Secure account views, transactions, loan servicing.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "electron-monitoring",
  title: "Electron Monitoring Suite",
  blurb: "System stats, process kill, logs, performance charts.",
  tags: ["Electron", "DevOps"],
  icon: <Monitor className="size-5 text-emerald-300" />,
},
{
  id: "php-elearning",
  title: "Laravel eLearning",
  blurb: "Courses, quizzes, scoring, progress dashboards.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-cyan-300" />,
},
{
  id: "ml-chat-analyzer",
  title: "Chat Analyzer ML",
  blurb: "Sentiment, toxicity, topic detection with dashboards.",
  tags: ["ML/MLOps"],
  icon: <Cpu className="size-5 text-emerald-300" />,
},
{
  id: "spring-reports",
  title: "Spring Reports API",
  blurb: "PDF/Excel exports, schedulers, multi-tenant branding.",
  tags: ["Spring Boot"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "mern-tasker",
  title: "MERN Tasker",
  blurb: "Kanban boards, drag/drop, realtime collaboration.",
  tags: ["MERN", "Realtime"],
  icon: <Layers className="size-5 text-emerald-300" />,
},
{
  id: "pern-insights",
  title: "PERN Insights",
  blurb: "BI dashboards, cubes, filters, role-based access.",
  tags: ["PERN", "DevOps"],
  icon: <Workflow className="size-5 text-cyan-300" />,
},
{
  id: "rn-gig",
  title: "RN Gig Platform",
  blurb: "Worker signups, bookings, chats, push notifications.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-edtech",
  title: "Compose EdTech",
  blurb: "Classrooms, attendance, grades, messaging, offline.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "electron-vault",
  title: "Electron Vault",
  blurb: "Password manager with encryption, autofill, sync.",
  tags: ["Electron"],
  icon: <Monitor className="size-5 text-emerald-300" />,
},
{
  id: "php-booking",
  title: "Laravel Booking",
  blurb: "Multi-resource bookings, payments, cancellations.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-cyan-300" />,
},
// ⬇️ Append these 30 more projects
{
  id: "fintrack-mern",
  title: "FinTrack SaaS",
  blurb: "Personal finance tracking with charts, bank sync, and export tools.",
  tags: ["MERN", "DevOps"],
  icon: <Code2 className="size-5 text-cyan-300" />,
},
{
  id: "pern-supply",
  title: "Supply Chain Manager",
  blurb: "End-to-end supplier → retailer tracking, contracts, and ERP sync.",
  tags: ["PERN", "Microservices"],
  icon: <Workflow className="size-5 text-emerald-300" />,
},
{
  id: "spring-ticketing",
  title: "Spring Ticketing API",
  blurb: "Ticket lifecycle, SLA rules, webhook automation, insights.",
  tags: ["Spring Boot"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "rn-fitness",
  title: "RN Fitness Club",
  blurb: "Workouts, challenges, leaderboards, wearables integration.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-banking",
  title: "Compose Mobile Banking",
  blurb: "Secure login, fund transfers, bill payments, statements.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "electron-media",
  title: "Electron Media Hub",
  blurb: "Cross-platform video player with subtitles and plugins.",
  tags: ["Electron"],
  icon: <Monitor className="size-5 text-emerald-300" />,
},
{
  id: "laravel-insurance",
  title: "Laravel Insurance Portal",
  blurb: "Quote → bind → policy lifecycle with customer self-service.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-cyan-300" />,
},
{
  id: "ml-vision",
  title: "ML Vision Hub",
  blurb: "Image classification, object detection, and OCR pipelines.",
  tags: ["ML/MLOps"],
  icon: <Cpu className="size-5 text-emerald-300" />,
},
{
  id: "spring-erp",
  title: "Spring ERP",
  blurb: "Accounting, HR, CRM, inventory modules with APIs.",
  tags: ["Spring Boot", "Microservices"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "mern-blog",
  title: "MERN Blog Engine",
  blurb: "Rich text editor, tags, comments, markdown, and SEO.",
  tags: ["MERN"],
  icon: <Code2 className="size-5 text-emerald-300" />,
},
{
  id: "pern-gov",
  title: "Gov Records Portal",
  blurb: "Citizen self-service, case tracking, and digital forms.",
  tags: ["PERN"],
  icon: <Globe className="size-5 text-cyan-300" />,
},
{
  id: "rn-social",
  title: "RN Social App",
  blurb: "Feeds, likes, stories, push notifications, and chat.",
  tags: ["React Native", "Realtime"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-wallet-plus",
  title: "Compose Wallet+",
  blurb: "Crypto + fiat wallet with secure biometrics and QR pay.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "electron-analytics",
  title: "Electron Analytics Desk",
  blurb: "Desktop dashboards with live metrics, charting, and exports.",
  tags: ["Electron", "DevOps"],
  icon: <Monitor className="size-5 text-cyan-300" />,
},
{
  id: "laravel-portal",
  title: "Laravel Customer Portal",
  blurb: "Tickets, documents, and payments with email notifications.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-emerald-300" />,
},
{
  id: "ml-chatbot",
  title: "ML Chatbot",
  blurb: "Conversational AI with sentiment detection and escalation.",
  tags: ["ML/MLOps", "Realtime"],
  icon: <Sparkles className="size-5 text-cyan-300" />,
},
{
  id: "spring-compliance",
  title: "Spring Compliance Service",
  blurb: "Audit logs, access policies, regulator reports with dashboards.",
  tags: ["Spring Boot", "DevOps"],
  icon: <ShieldCheck className="size-5 text-emerald-300" />,
},
{
  id: "mern-video",
  title: "MERN Video Rooms",
  blurb: "WebRTC calls, recording, screen share, chat overlays.",
  tags: ["MERN", "Realtime"],
  icon: <GitBranch className="size-5 text-cyan-300" />,
},
{
  id: "pern-sales",
  title: "Sales CRM",
  blurb: "Deals, leads, pipeline stages, analytics, and integrations.",
  tags: ["PERN", "Microservices"],
  icon: <Workflow className="size-5 text-emerald-300" />,
},
{
  id: "rn-taxi",
  title: "RN Taxi Clone",
  blurb: "Driver tracking, bookings, ETA calc, and live rides.",
  tags: ["React Native", "Realtime"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "compose-edtech-pro",
  title: "Compose EdTech Pro",
  blurb: "Courses, attendance, assignments, chat, notifications.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "electron-stocks",
  title: "Electron Stock Watcher",
  blurb: "Realtime stock feeds, alerts, and chart analysis.",
  tags: ["Electron", "Realtime"],
  icon: <Monitor className="size-5 text-cyan-300" />,
},
{
  id: "laravel-events",
  title: "Laravel Events System",
  blurb: "Registrations, tickets, check-ins, invoicing, reports.",
  tags: ["Laravel/PHP"],
  icon: <TerminalSquare className="size-5 text-emerald-300" />,
},
{
  id: "ml-forecast",
  title: "ML Forecasting",
  blurb: "Demand planning with ARIMA, Prophet, and neural nets.",
  tags: ["ML/MLOps"],
  icon: <Cpu className="size-5 text-cyan-300" />,
},
{
  id: "spring-payment",
  title: "Spring Payments Hub",
  blurb: "Card processing, ACH, reconciliation, disputes, reports.",
  tags: ["Spring Boot"],
  icon: <Server className="size-5 text-cyan-300" />,
},
{
  id: "mern-edu",
  title: "MERN Education Platform",
  blurb: "Student profiles, quizzes, scoring, live classes.",
  tags: ["MERN"],
  icon: <Layers className="size-5 text-emerald-300" />,
},
{
  id: "pern-health",
  title: "PERN Health Records",
  blurb: "Patient records, prescriptions, scheduling, compliance.",
  tags: ["PERN", "Microservices"],
  icon: <Workflow className="size-5 text-cyan-300" />,
},
{
  id: "rn-food",
  title: "RN Food Delivery",
  blurb: "Menu browsing, ordering, real-time delivery tracking.",
  tags: ["React Native"],
  icon: <Smartphone className="size-5 text-emerald-300" />,
},
{
  id: "compose-travel",
  title: "Compose Travel App",
  blurb: "Bookings, itineraries, maps, chat support, offline mode.",
  tags: ["Kotlin/Compose"],
  icon: <Smartphone className="size-5 text-cyan-300" />,
},
{
  id: "electron-editor",
  title: "Electron Markdown Editor",
  blurb: "Live preview, export to PDF/HTML, theme customization.",
  tags: ["Electron"],
  icon: <Monitor className="size-5 text-emerald-300" />,
},
{
  id: "laravel-saas",
  title: "Laravel SaaS Boilerplate",
  blurb: "Multi-tenancy, subscriptions, RBAC, API keys, billing.",
  tags: ["Laravel/PHP", "DevOps"],
  icon: <TerminalSquare className="size-5 text-cyan-300" />,
},


];

const techPalette: Record<string, string> = {
  // chip styles per tag
  MERN: "text-cyan-300",
  PERN: "text-emerald-300",
  "Spring Boot": "text-teal-300",
  "Kotlin/Compose": "text-cyan-300",
  "React Native": "text-emerald-300",
  Electron: "text-cyan-300",
  "Laravel/PHP": "text-emerald-300",
  DevOps: "text-cyan-300",
  "ML/MLOps": "text-emerald-300",
  Microservices: "text-cyan-300",
  Realtime: "text-emerald-300",
};

export default function Projects() {
  const [active, setActive] = useState<(typeof TAGS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const byTag = active === "All" ? true : p.tags.includes(active as string);
      const byQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return byTag && byQuery;
    });
  }, [active, query]);

  return (
    <section
      className="
        relative min-h-[100svh] w-full
        bg-gradient-to-br from-gray-900 via-black to-gray-800
        text-white
      "
    >
      {/* glow + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(0,201,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_110%,rgba(0,255,165,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-cyan-400">Projects</span> Showcase
            </h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              A curated set of real-world builds across web, mobile, desktop, DevOps, and ML—optimized for scale,
              observability, and real-time experiences.
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:w-[400px]">
            <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
              <Rocket className="size-5 text-cyan-300" />
              <input
                className="w-full bg-transparent placeholder:text-gray-400 text-sm outline-none"
                placeholder="Search by title, tech, or domain..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {TAGS.map((t) => {
            const selected = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 transition",
                  selected
                    ? "bg-gradient-to-r from-cyan-600 to-emerald-500 text-white ring-white/20 shadow-[0_6px_16px_rgba(0,201,255,.25)]"
                    : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10",
                ].join(" ")}
              >
                {tagIcon[t as string] ?? <Sparkles className="size-4" />}
                {t}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
              className="group rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/40 ring-1 ring-white/10">
                  {p.icon ?? <Code2 className="size-5 text-cyan-300" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-tight truncate">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">{p.blurb}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={[
                      "inline-flex items-center gap-1 rounded-full bg-black/30 ring-1 ring-white/10 px-2 py-1 text-[11px] font-semibold",
                      techPalette[t] ?? "text-slate-200",
                    ].join(" ")}
                  >
                    {(tagIcon[t] ?? <Sparkles className="size-3" />)}
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              {p.links && p.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.links.map((l) =>
                    l.href.startsWith("/") ? (
                      <Link
                        key={l.label}
                        to={l.href}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30 hover:bg-cyan-500/20"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/20"
                      >
                        {l.label}
                      </a>
                    )
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-gray-300">
            <p>No projects match your search/filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
