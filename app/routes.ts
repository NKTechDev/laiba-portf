// routes.ts
import { route, index } from "@react-router/dev/routes";

export default [
  route("", "routes/AppShell.tsx", [
    index("routes/PortfolioHero.tsx"),
    route("projects", "routes/Projects.tsx"),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("auth/callback", "routes/auth-callback.tsx"),
    route("chatscreen", "routes/chatscreen.tsx"),
    route("contact", "routes/contact.tsx"), // 👈 add this
    route("help", "routes/help.tsx"), // ← add this
    route("about", "routes/about.tsx"), // ← add this
    route("services", "routes/services.tsx"),
    route("case-studies", "routes/case-studies/index.tsx"),
    route("case-studies/:slug", "routes/case-studies/$slug.tsx"),
    route("open-source", "routes/open-source.tsx"),
    route("blog", "routes/blog/index.tsx"),
    route("blog/:slug", "routes/blog/$slug.tsx"),
  ]),
];
