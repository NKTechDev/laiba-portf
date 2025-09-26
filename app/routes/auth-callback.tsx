import { useEffect } from "react";

export default function RedirectHandler() {
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        localStorage.setItem("accessToken", token);
      } catch {
        // ignore storage errors
      }

      // Clean the URL so the token isn't visible
      const cleanUrl = `${window.location.origin}/`;
      window.history.replaceState({}, document.title, cleanUrl);

      // Reload to rehydrate app state with the new token
      window.location.reload();
    } else {
      // No token -> send to login
      window.location.assign("/login");
    }
  }, []);

  return <p>Processing login...</p>;
}
