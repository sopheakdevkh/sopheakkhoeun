"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="mx-auto mt-16 max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h1 className="text-xl font-bold">Admin login</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Enter the admin password to manage portfolio content.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Admin password"
          className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none focus:border-zinc-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </form>
    </div>
  );
}
