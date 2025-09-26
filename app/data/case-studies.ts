// src/data/case-studies.ts
export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  industry: string;
  timeframe?: string;
  location?: string;
  hero?: string; // image path (optional)
  stack: string[];
  tags: string[];
  problem: string[];
  approach: string[];
  results: Array<{ label: string; value: string }>;
  metrics?: Array<{ label: string; value: string }>;
  links?: { live?: string; repo?: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "citywatch-911",
    title: "CityWatch 911 — Real-Time Dispatch",
    summary:
      "Mission-critical MERN + Socket.IO platform with K8s blue-green deploys and observability.",
    industry: "Public Safety",
    timeframe: "2024",
    location: "Remote • Pakistan/Global",
    hero: "/images/case/citywatch.jpg",
    stack: ["MERN", "Socket.IO", "Kubernetes", "Postgres", "Redis", "Grafana"],
    tags: ["mern", "realtime", "devops", "security", "databases"],
    problem: [
      "Legacy system had minute-level delays and frequent downtime.",
      "No real-time location or unit presence; manual escalations.",
    ],
    approach: [
      "WebSocket channels for sub-second updates & presence.",
      "Blue-green deployments, health checks, and rollbacks.",
      "RBAC + audit trails, rate-limits, and WAF in front.",
    ],
    results: [
      { label: "Incident Latency", value: "−72%" },
      { label: "Uptime", value: "99.97%" },
      { label: "Operator Efficiency", value: "+41%" },
    ],
    metrics: [
      { label: "P95 Dispatch", value: "800ms" },
      { label: "Crash-free Sessions", value: "99.9%" },
    ],
  },
  {
    slug: "finflow-microservices",
    title: "FinFlow — Payments Microservices",
    summary:
      "PERN + Node microservices with idempotent payments, retries, and compliance hardening.",
    industry: "Fintech",
    timeframe: "2024",
    stack: ["PERN", "Node", "Kafka (optional)", "Postgres", "OpenAPI"],
    tags: ["pern", "microservices", "security", "performance", "databases"],
    problem: [
      "Coupled monolith caused reconciliation errors and deployment risk.",
      "No clear SLAs, poor tracing, and flaky webhooks.",
    ],
    approach: [
      "Service boundaries + contract tests with OpenAPI.",
      "Idempotent endpoints, retry queues, and DLQ processing.",
      "Tracing & dashboards with service-level SLOs.",
    ],
    results: [
      { label: "Reconciliation Errors", value: "−88%" },
      { label: "Release Frequency", value: "3×" },
      { label: "Time-to-Recover", value: "−60%" },
    ],
  },
  {
    slug: "meditrack-ops",
    title: "MediTrack — Hospital Ops Suite",
    summary:
      "Spring Boot APIs + React Native mobile apps for ward rounds and asset tracking.",
    industry: "HealthTech",
    timeframe: "2023–2024",
    stack: ["Java", "Spring Boot", "React Native", "Postgres", "Keycloak"],
    tags: ["spring-boot", "react-native", "security", "databases"],
    problem: [
      "Paper-based processes with low visibility and missing records.",
      "Authentication inconsistencies across apps.",
    ],
    approach: [
      "Unified auth (Keycloak), role-based scopes, and audit log.",
      "Offline-first RN apps with conflict resolution.",
      "DB indexing & partitioning for time-series events.",
    ],
    results: [
      { label: "Record Accuracy", value: "+35%" },
      { label: "Ward Round Time", value: "−28%" },
      { label: "Lost Assets", value: "−60%" },
    ],
  },
  {
    slug: "shoppulse-ssr",
    title: "ShopPulse — E-commerce SSR",
    summary:
      "React Router v7 SSR storefront with Redis edge cache and Stripe integration.",
    industry: "Retail",
    timeframe: "2024",
    stack: ["Router v7 SSR", "Node", "Redis", "Stripe", "CloudFront"],
    tags: ["mern", "performance", "realtime"],
    problem: [
      "SPA TTFB too high, SEO underperforming, cart drop-offs.",
      "Catalog updates slowed page renders.",
    ],
    approach: [
      "Server rendering + streaming; partial hydration.",
      "Edge cache for product pages; ISR style revalidation.",
      "Webhooks for inventory & price sync.",
    ],
    results: [
      { label: "Core Web Vitals", value: "Green across pages" },
      { label: "Conversion Rate", value: "+18%" },
      { label: "TTFB", value: "−65%" },
    ],
  },
  {
    slug: "boardcast-collab",
    title: "BoardCast — Realtime Whiteboard",
    summary:
      "CRDT-based collaborative whiteboard with WebRTC + Socket.IO and presence.",
    industry: "Collaboration",
    timeframe: "2023",
    stack: ["CRDT", "WebRTC", "Socket.IO", "React", "Redis"],
    tags: ["realtime", "mern", "performance"],
    problem: [
      "Conflicts and overwrites during multi-user edits.",
      "Unstable peer connections on poor networks.",
    ],
    approach: [
      "CRDT state, optimistic UI, and reconciliation.",
      "TURN/STUN fallback + adaptive bitrate.",
      "Sharding presence channels, sticky sessions.",
    ],
    results: [
      { label: "Collab Errors", value: "−90%" },
      { label: "Active Sessions", value: "3.2×" },
      { label: "Reconnect Time", value: "−50%" },
    ],
  },
  {
    slug: "insightops-desktop",
    title: "InsightOps — Desktop Observability",
    summary:
      "Electron + macOS notarized app with secure storage and OTA channels.",
    industry: "DevTools",
    timeframe: "2023",
    stack: ["Electron", "macOS Notarization", "Keychain", "Auto-update"],
    tags: ["electron", "security", "devops"],
    problem: [
      "Web dashboard wasn’t suitable for on-prem locked environments.",
      "Credential handling and updates were manual.",
    ],
    approach: [
      "Signed/notarized installers; delta updates.",
      "OS keychain storage; secure IPC boundaries.",
      "Self-update channels (beta/stable) with rollout controls.",
    ],
    results: [
      { label: "Update Time", value: "−80%" },
      { label: "Support Tickets", value: "−45%" },
    ],
  },
  {
    slug: "fleetiq-ml",
    title: "FleetIQ — Logistics ML",
    summary:
      "Demand forecasting pipelines with feature store and model monitoring.",
    industry: "Logistics",
    timeframe: "2022–2024",
    stack: ["Python", "Feature Store", "Model Registry", "Prom/Tempo"],
    tags: ["ml-mlops", "databases", "performance"],
    problem: [
      "Manual forecasts with high variance and late updates.",
      "No drift detection or rollback strategy.",
    ],
    approach: [
      "Pipelines with backtesting; registry for lineage.",
      "Canary model serving + A/B evaluation.",
      "Data drift and performance dashboards.",
    ],
    results: [
      { label: "Forecast MAPE", value: "−22%" },
      { label: "Update Cadence", value: "Daily → Hourly" },
    ],
  },
  {
    slug: "educast-mobile",
    title: "EduCast — Video Learning",
    summary:
      "Kotlin/Jetpack Compose app + Node APIs, offline modules, and analytics.",
    industry: "EdTech",
    timeframe: "2022–2023",
    stack: ["Kotlin/Compose", "Node", "Postgres", "Segment"],
    tags: ["kotlin-compose", "react-native", "databases"],
    problem: [
      "Unreliable streaming and no offline support.",
      "Poor engagement insights for course creators.",
    ],
    approach: [
      "Adaptive streaming, downloads with quotas.",
      "Event analytics and funnels; cohort reporting.",
      "Server-side rendering for public pages.",
    ],
    results: [
      { label: "DAU", value: "+27%" },
      { label: "Offline Completion", value: "+3.1×" },
    ],
  },
];

export const allTags = Array.from(
  new Set(CASE_STUDIES.flatMap((c) => c.tags))
).sort();

export function getCaseBySlug(slug?: string) {
  if (!slug) return undefined;
  return CASE_STUDIES.find((c) => c.slug === slug);
}
