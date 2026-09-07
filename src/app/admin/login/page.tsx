"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) router.replace("/admin");
      })
      .catch(() => undefined);
  }, [router]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Invalid password");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(28,25,23,0.12)]">
        <div className="bg-[#c4a46a] px-6 py-8 text-white">
          <p className="text-sm font-semibold text-white/80">Portfolio CMS</p>
          <h1 className="mt-1 text-2xl font-bold">Admin login</h1>
          <p className="mt-2 text-sm text-white/85">
            Enter the admin password to manage portfolio content.
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-3 p-6">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Admin password"
            className="rounded-2xl border border-zinc-200 bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-[#c4a46a] focus:ring-2 focus:ring-[#c4a46a]/25"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#c4a46a] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(196,164,106,0.35)] transition hover:bg-[#b89458] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Link
            href="/"
            className="pt-1 text-center text-sm font-medium text-zinc-500 hover:text-zinc-800"
          >
            ← Back to site
          </Link>
        </form>
      </div>
    </div>
  );
}
