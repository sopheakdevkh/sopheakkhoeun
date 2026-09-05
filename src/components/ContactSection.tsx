"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type ContactSectionProps = {
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
};

const MAX_MESSAGE = 1000;

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 448 512" className="text-4xl xl:text-5xl" fill="currentColor" height="1em" width="1em" aria-hidden>
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 496 512" className="text-4xl xl:text-5xl" fill="currentColor" height="1em" width="1em" aria-hidden>
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="text-4xl xl:text-5xl" fill="currentColor" height="1em" width="1em" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function ConnectButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit cursor-pointer rounded-lg border border-edge px-2 text-lg shadow-[2px_2px_var(--foreground)] transition hover:scale-105 active:translate-x-1 active:translate-y-1 active:shadow-none"
    >
      {label}
    </a>
  );
}

export function ContactSection({ email, github, linkedin }: ContactSectionProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website") ?? "").trim()) {
      setStatus("success");
      form.reset();
      setMessageLength(0);
      return;
    }

    const senderEmail = String(formData.get("email") ?? "").trim();
    const body = String(formData.get("body") ?? "").trim();
    const name = senderEmail.split("@")[0] || "Visitor";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: senderEmail,
          subject: "Portfolio contact",
          body,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setMessageLength(0);
      setStatus("success");
      setFeedback("Thanks — I’ll get back to you soon.");
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="relative my-[3rem] flex scroll-mt-24 items-center lg:min-h-screen"
    >
      <div className="m-auto w-[95%] overflow-hidden border-2 border-edge text-foreground lg:w-[85%] xl:w-[80%]">
        <div className="grid border-y border-edge md:grid-cols-2">
          <div>
            <div className="border-b-2 border-edge p-8 xl:p-12">
              <div className="text-2xl font-bold xl:text-3xl">Let&apos;s Connect</div>
              <div className="mt-4 text-sm tracking-wide text-muted xl:text-base">
                Let&apos;s bring your ideas to life! Whether you have a project in mind
                or just want to chat about web development, I&apos;d love to connect.
                Reach out, and let&apos;s create something amazing together!
              </div>
            </div>

            <div>
              {linkedin ? (
                <div className="flex border-b-2 border-edge">
                  <div className="flex items-center border-r-2 border-edge p-6">
                    <LinkedInIcon />
                  </div>
                  <div className="flex flex-grow items-center gap-4 p-4 font-bold transition hover:bg-soft-fill xl:text-xl">
                    <div className="flex flex-col gap-1">
                      Connect on linkedin
                      <ConnectButton href={linkedin} label="Connect" />
                    </div>
                  </div>
                </div>
              ) : null}

              {github ? (
                <div className="flex border-b-2 border-edge">
                  <div className="flex items-center border-r-2 border-edge p-6">
                    <GitHubIcon />
                  </div>
                  <div className="flex flex-grow items-center gap-4 p-4 font-bold transition hover:bg-soft-fill xl:text-xl">
                    <div className="flex flex-col gap-1">
                      Connect on Github
                      <ConnectButton href={github} label="Connect" />
                    </div>
                  </div>
                </div>
              ) : null}

              {email ? (
                <div className="flex flex-grow border-b-2 border-edge">
                  <div className="flex items-center border-r-2 border-edge p-6">
                    <MailIcon />
                  </div>
                  <div className="flex w-full flex-col justify-center gap-1 p-4 font-bold transition hover:bg-soft-fill xl:text-xl">
                    Connect via mail :{" "}
                    <a href={`mailto:${email}`} className="underline">
                      {email}
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="border-t-2 border-edge bg-panel p-6 text-sm md:border-t-0 md:border-l-2 lg:p-8 xl:p-12 xl:text-base"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="pl-1 font-bold">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="Enter email address"
                className="rounded-lg border-2 border-edge bg-background p-2 px-4 text-foreground outline-none transition focus:border-foreground"
              />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="relative flex items-end justify-between pr-2">
                <label htmlFor="contact-message" className="pl-1 font-bold">
                  Message
                </label>
                <div className="text-xs text-muted">
                  {MAX_MESSAGE - messageLength}
                </div>
              </div>
              <textarea
                id="contact-message"
                name="body"
                required
                maxLength={MAX_MESSAGE}
                placeholder="Enter message here..."
                onChange={(event) => setMessageLength(event.target.value.length)}
                className="min-h-[200px] w-full rounded-lg border-2 border-edge bg-background p-3 px-4 text-foreground outline-none transition focus:border-foreground xl:min-h-[300px]"
              />
            </div>

            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              type="text"
              name="website"
              defaultValue=""
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg border-2 border-foreground bg-foreground p-2 px-4 font-bold text-background transition hover:opacity-90 hover:shadow-[2px_2px_var(--btn-shadow)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60 xl:text-lg"
              >
                {status === "loading" ? "Sending…" : "Send"}
              </button>
            </div>

            {feedback ? (
              <p
                className={`mt-3 text-sm ${
                  status === "error" ? "text-red-400" : "text-emerald-300"
                }`}
              >
                {feedback}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
