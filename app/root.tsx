// src/root.tsx
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches, // ✅ use hook INSIDE App, not Layout
} from "react-router";
import type { Route } from "./+types/root";
import Header from "./component/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },

  // combined stylesheet for Inter, Bebas Neue, Winky Sans
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?" +
      "family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900" +
      "&family=Bebas+Neue" +
      "&family=Winky+Sans:ital,wght@0,300..900;1,300..900" +
      "&display=swap",
  },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
  { rel: "icon", href: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },

  // Fallbacks / platform-specific
  { rel: "icon", href: "/favicon.ico" }, // optional fallback
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#06b6d4" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }, // optional
  { rel: "manifest", href: "/site.webmanifest" }, // optional PWA
];



export const meta: MetaFunction = () => ([
  { title: "RN • Portfolio" },
]);

// ⛔️ No router hooks here — Layout is outside the Router
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ✅ App is inside the Router; hooks are allowed here
export default function App() {
  const matches = useMatches();
  // const hideHeader = matches.some((m) => (m.handle as any)?.hideHeader);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

// Error boundary unchanged
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-2">{message}</h1>
      <p className="mb-4 text-gray-700">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-50 border rounded">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
