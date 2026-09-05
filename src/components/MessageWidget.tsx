"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const PANEL_MS = 350;

type MessageWidgetProps = {
  name: string;
};

export function MessageWidget({ name }: MessageWidgetProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeChat();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openChat() {
    setVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
  }

  function closeChat() {
    setOpen(false);
    window.setTimeout(() => setVisible(false), PANEL_MS);
  }

  function handleGoogleSignIn() {
    const guestName = "Guest User";
    const guestEmail = "guest@gmail.com";
    setUserName(guestName);
    setUserEmail(guestEmail);
    setSignedIn(true);
    setStatus("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signedIn) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = String(formData.get("message") ?? "").trim();
    if (!body) return;

    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName || "Guest",
          email: userEmail || "guest@gmail.com",
          subject: "Live message",
          body,
        }),
      });

      if (!response.ok) throw new Error("Failed");
      form.reset();
      setStatus("Message sent.");
    } catch {
      setStatus("Could not send. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openChat}
        className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-white py-2 pr-4 pl-2 text-left shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition hover:scale-[1.03]"
      >
        <span className="relative shrink-0">
          <Image
            src="/avatar.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
          />
          <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
        <span className="min-w-0">
          <span className="block whitespace-nowrap text-sm font-bold text-black">
            Message {name}
          </span>
          <span className="mt-0.5 block whitespace-nowrap text-[11px] font-medium text-zinc-500">
            Online
          </span>
        </span>
      </button>

      {visible ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close chat backdrop"
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeChat}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Message ${name}`}
            className={`absolute right-5 bottom-5 z-10 flex h-[min(560px,85vh)] w-[min(100%-2.5rem,24rem)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111111] shadow-2xl transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-x-0" : "translate-x-[110%]"
            }`}
            style={{ transitionDuration: `${PANEL_MS}ms` }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative shrink-0">
                  <Image
                    src="/avatar.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-[#111111] bg-emerald-500" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold whitespace-nowrap text-white">
                    {name}
                  </p>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={closeChat}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-xl text-white/80 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6">
              {signedIn ? (
                <div className="w-full space-y-3 text-center">
                  <p className="text-sm text-white/70">
                    Signed in as <span className="text-white">{userEmail}</span>
                  </p>
                  <p className="text-sm text-white/50">
                    Send a live message — it saves to Neon via Prisma.
                  </p>
                  {status ? (
                    <p className="text-sm text-emerald-300">{status}</p>
                  ) : null}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="inline-flex items-center gap-3 rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[3px_3px_0_0_#000] transition hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_#000]"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                    <path
                      fill="#FFC107"
                      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.5 7.1l.1.1 6.2 5.2C36.8 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.5z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-[#0c0c0c] p-3"
            >
              <input
                name="message"
                disabled={!signedIn || sending}
                placeholder="Message"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-[#171717] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!signedIn || sending}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#171717] text-sky-300 transition hover:bg-white/5 disabled:opacity-40"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
