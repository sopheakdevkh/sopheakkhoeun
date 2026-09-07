import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

type AboutSectionProps = {
  name: string;
  title: string;
  about: string;
  photoUrl?: string | null;
  location?: string | null;
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  resumeUrl?: string | null;
};

function isRemoteUrl(src: string) {
  return /^https?:\/\//i.test(src);
}

function isSvgUrl(src: string) {
  return /\.svg(\?|#|$)/i.test(src);
}

/** Local optimized images via next/image; remote + SVG via <img> so any URL works. */
function AboutPhoto({ src, name }: { src: string; name: string }) {
  const className = "absolute inset-0 h-full w-full object-cover object-center";

  if (isRemoteUrl(src) || isSvgUrl(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      priority
      sizes="(max-width: 768px) 95vw, 40vw"
      className="object-cover object-center"
    />
  );
}

export function AboutSection({
  name,
  title,
  about,
  photoUrl,
  location,
  email,
  github,
  linkedin,
  resumeUrl,
}: AboutSectionProps) {
  const paragraphs = about
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const src = photoUrl?.trim() || "/avatar.svg";

  return (
    <section className="relative w-full py-10 text-foreground md:py-16">
      <div className="mx-auto w-[95%] border-2 border-edge lg:w-[85%] xl:w-[80%]">
        <div className="flex h-[70px] w-full border-b-2 border-edge">
          <div className="w-[50px] md:w-[100px]" />
          <div className="flex flex-grow items-center justify-center text-2xl font-bold uppercase xl:text-4xl">
            About
          </div>
          <div className="w-[50px] md:w-[100px]" />
        </div>

        <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal className="">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-soft-fill md:aspect-auto md:min-h-[520px] md:h-full">
              <AboutPhoto src={src} name={name} />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent md:from-background/40"
                aria-hidden
              />
              <div className="absolute right-4 bottom-4 left-4 md:right-6 md:bottom-6 md:left-6">
                <p className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                  {name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted md:text-sm">
                  {title}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center px-5 py-10 sm:px-8 md:px-10 md:py-14">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                Background
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl xl:text-5xl">
                Who I am
              </h1>
              {location ? (
                <p className="mt-3 text-sm text-muted">{location}</p>
              ) : null}
            </Reveal>

            <div className="mt-8 space-y-5 text-sm tracking-wide text-muted xl:text-base">
              {paragraphs.map((paragraph, index) => (
                <Reveal key={index} delayMs={index * 80}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delayMs={240} className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="rounded-lg border-2 border-foreground bg-foreground px-4 py-2 text-sm font-bold text-background shadow-[2px_2px_var(--btn-shadow)] transition hover:scale-105 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Contact Me
              </Link>
              <Link
                href="/journey"
                className="rounded-lg border border-foreground px-4 py-2 text-sm font-bold shadow-[2px_2px_var(--foreground)] transition hover:scale-105 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                My Journey
              </Link>
              {resumeUrl && resumeUrl !== "#" ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-edge px-4 py-2 text-sm font-bold text-muted transition hover:border-foreground hover:text-foreground"
                >
                  Resume
                </a>
              ) : null}
            </Reveal>

            <Reveal delayMs={320} className="mt-8 flex gap-4 text-xl text-foreground">
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:scale-125"
                >
                  <svg viewBox="0 0 448 512" className="h-[1em] w-[1em]" fill="currentColor" aria-hidden>
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
              ) : null}
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:scale-125"
                >
                  <svg viewBox="0 0 496 512" className="h-[1em] w-[1em]" fill="currentColor" aria-hidden>
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email}`} aria-label="Email" className="hover:scale-125">
                  <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="currentColor" aria-hidden>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
