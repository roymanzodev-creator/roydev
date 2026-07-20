"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport so fast scrolls don't
        // leave two sections fighting over the active state.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-72px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-line bg-canvas/80 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
      >
        <a href="#top" aria-label="RoyDev — back to top" className="font-mono text-base font-semibold tracking-tight">
          Roy<span className="text-accent">Dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-text ${
                  active === link.href ? "text-accent" : "text-text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
            >
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path
                  d="M7.5 1.5v9m0 0L4 7m3.5 3.5L11 7M2 13h11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-text-muted md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h14M2 9h14M2 13h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-center text-sm font-medium text-canvas"
              >
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path
                    d="M7.5 1.5v9m0 0L4 7m3.5 3.5L11 7M2 13h11"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
