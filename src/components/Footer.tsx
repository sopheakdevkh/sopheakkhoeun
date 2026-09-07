import Link from "next/link";

type FooterProps = {
  name: string;
  github?: string | null;
  linkedin?: string | null;
  email?: string | null;
};

export function Footer({ name, github, linkedin, email }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-12 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-[0.14em]">
            {name}
          </p>
          <p className="mt-3 text-sm tracking-wide text-muted xl:text-base">
          Junior Fullstack Developer passionate about building modern, responsive, and user-friendly web applications. Always learning, always improving, and always coding.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            Pages
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/#top" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="/#work" className="hover:text-foreground">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="hover:text-foreground">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/journey" className="hover:text-foreground">
                Journey
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            Social
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {github ? (
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
            ) : null}
            {linkedin ? (
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="hover:text-foreground">
                  Email
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            Stack
          </p>
          <p className="mt-3 text-sm text-muted">NEVER STOP LEARNING & CODING</p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Copyright {year}. All rights reserved.
        </p>
        <div className="flex gap-3">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-xs hover:bg-soft-fill"
            >
              Gh
            </a>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-xs hover:bg-soft-fill"
            >
              In
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
