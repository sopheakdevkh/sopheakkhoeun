"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/#home", section: "home", label: "Home" },
  { href: "/about", section: null, label: "About" },
  { href: "/#skills", section: "skills", label: "Skills" },
  { href: "/#work", section: "work", label: "Projects" },
  { href: "/journey", section: null, label: "Journey" },
  { href: "/#contact", section: "contact", label: "Contact" },
] as const;

type HeaderProps = {
  name: string;
};

function Brand({
  name,
  size = 40,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 text-sm font-bold uppercase text-foreground xl:text-base ${className}`}
    >
      <Image
        src="/avatar.svg"
        alt=""
        width={size}
        height={size}
        className="cursor-pointer overflow-hidden rounded-full border border-black object-cover shadow-[0.2vmin_0.2vmin_#ffffff] light:shadow-[0.2vmin_0.2vmin_#00000040] active:translate-x-[0.3vmin] active:translate-y-[0.3vmin] active:shadow-[0.1vmin_0.1vmin_#000000]"
        style={{ width: size, height: size }}
        priority={size <= 30}
      />
      <span>{name}</span>
    </Link>
  );
}

function routeActiveFromPath(pathname: string) {
  if (pathname === "/journey") return "/journey";
  if (pathname === "/about") return "/about";
  return null;
}

export function Header({ name }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrollActive, setScrollActive] = useState("/#top");
  const routeActive = routeActiveFromPath(pathname);
  const active = routeActive ?? scrollActive;

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = links
      .map((link) => link.section)
      .filter((section): section is NonNullable<typeof section> => section != null);

    function onScroll() {
      let current = "/#top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) {
          current = `/#${id}`;
        }
      }
      setScrollActive(current);
    }

    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      data-menu-open={open}
      className="sticky top-0 z-50 border-b-2 border-edge bg-nav-bg p-3 backdrop-blur-md xl:p-4 xl:px-8"
    >
      <div className="flex items-center justify-between gap-2 p-2 text-2xl text-foreground lg:hidden">
        <Brand name={name} size={30} className="gap-2" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[1em] w-[1em]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 z-10 grid h-screen w-full items-center gap-2 bg-background text-foreground transition-transform duration-300 lg:relative lg:h-fit lg:translate-x-0 lg:grid-cols-3 lg:justify-between lg:bg-transparent ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Brand
          name={name}
          size={40}
          className="mt-10 justify-center gap-3 lg:m-0 lg:justify-start"
        />

        <div className="mt-10 lg:m-0">
          <ul className="flex flex-col items-center justify-center gap-2 text-sm text-foreground xl:text-base lg:flex-row">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={
                      isActive
                        ? "rounded-lg border border-foreground p-1 px-4 font-bold shadow-[1px_1px_var(--foreground)]"
                        : "rounded-lg p-1 px-4 font-bold transition hover:scale-105 hover:border hover:border-foreground hover:shadow-[1px_1px_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-end lg:mt-0">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-2xl text-foreground lg:hidden"
        >
          <svg viewBox="0 0 15 15" className="h-[1em] w-[1em]" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
