// src/routes/blog/_data.ts
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  cover?: string;
  content: string; // simple markdown-ish blocks for now
  tags: string[];
  createdAt: string; // ISO
  readingHint?: string;
};

export const POSTS: BlogPost[] = [
  {
    slug: "deploying-mern-like-a-pro",
    title: "Deploying MERN Like a Pro: CI/CD, Blue-Green & Zero-Downtime",
    summary:
      "A practical guide to shipping MERN apps with confidence—pipelines, health checks, blue-green, and rollbacks.",
    tags: ["mern", "devops", "kubernetes", "ci-cd"],
    createdAt: "2025-08-14T09:00:00.000Z",
    cover: "/images/blog/mern-ship.jpg",
    content: `
# Why Pipelines Matter
Zero-downtime deploys need three things: a pipeline, a health signal, and a safe rollback.

## Steps
1. Build your Docker image (multi-stage).
2. Run tests + lint + typecheck.
3. Push image to registry with immutable tags.
4. Roll out with blue-green or canary; switch traffic after healthcheck.

\`\`\`bash
kubectl apply -f deployment.yaml
kubectl rollout status deploy/web
\`\`\`

## Health, Metrics, and Alerts
Expose \`/health\`, add Prometheus metrics, wire alerts for error budgets.
    `,
  },
  {
    slug: "spring-boot-observability-otel",
    title: "Spring Boot Observability with OpenTelemetry",
    summary:
      "Traces, metrics, and logs wired cleanly with OTel—sampling, baggage, and dashboards.",
    tags: ["spring-boot", "java", "observability", "otel"],
    createdAt: "2025-07-12T10:00:00.000Z",
    cover: "/images/blog/spring-otel.jpg",
    content: `
# OTEL in Practice
Add OTel SDK, set exporters, propagate context across async boundaries.

## Sampling
Start with parent-based traceidratio at 0.1 → increase for incidents.

## Dashboards
Hook to Grafana or Datadog; chart latency, error rate, and saturation.
    `,
  },
  {
    slug: "react-native-offline-first",
    title: "React Native: Offline-First Patterns That Scale",
    summary:
      "SQLite, sync queues, conflict resolution patterns, and UX that respects poor connectivity.",
    tags: ["react-native", "mobile", "offline", "sqlite"],
    createdAt: "2025-06-02T08:30:00.000Z",
    cover: "/images/blog/rn-offline.jpg",
    content: `
# Storage
Use SQLite for reliability; keep a small write-ahead queue.

# Sync
Batch and debounce; resolve conflicts by domain rules, not timestamps.

# UX
Show optimistic updates + banners; avoid blocking spinners.
    `,
  },
  {
    slug: "ml-inference-on-a-budget",
    title: "ML Inference on a Budget: Batching, Caching & Autoscaling",
    summary:
      "Keep latency tight and cost low with batching windows, feature caches, and predictive scaling.",
    tags: ["ml", "mlops", "python", "fastapi"],
    createdAt: "2025-05-20T12:00:00.000Z",
    cover: "/images/blog/ml-infer.jpg",
    content: `
# Batching
Aggregate requests into small micro-batches (10–30ms windows).

# Caching
Cache features + outputs (with TTL) when safe; add cache keys for models.

# Autoscaling
Use queue depth + latency as signals; scale to zero when idle.
    `,
  },
  {
    slug: "electron-security-hardening",
    title: "Electron Security Hardening Essentials",
    summary:
      "IPC isolation, CSP, safe preload bridges, and auto-update with signature verification.",
    tags: ["electron", "desktop", "security"],
    createdAt: "2025-04-03T11:00:00.000Z",
    cover: "/images/blog/electron-secure.jpg",
    content: `
# Threat Model
Disable remote module; enable contextIsolation and sandbox.

# IPC
Only allow whitelisted channels; validate payloads strictly.

# Updates
Sign assets; verify before swapping; keep rollbacks ready.
    `,
  },
  {
    slug: "postgres-partitioning-playbook",
    title: "Postgres Partitioning Playbook",
    summary:
      "When and how to partition, index strategies, and safe migrations in production.",
    tags: ["postgres", "databases", "performance"],
    createdAt: "2025-03-01T09:45:00.000Z",
    cover: "/images/blog/pg-partition.jpg",
    content: `
# When to Partition
Big tables with time-based access patterns; avoid unbounded indexes.

# Strategy
Range by date; local indexes; always test query plans.

# Migration
Backfill in chunks; verify with explain analyze before cutting over.
    `,
  },
];

export function allTags(): string[] {
  return Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort();
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}
