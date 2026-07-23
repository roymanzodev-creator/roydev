"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  const [index, setIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const count = projects.length;
  const project = projects[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  const closeRef = useRef<HTMLButtonElement>(null);

  // While the lightbox is open: lock body scroll, close on Escape, and move
  // focus to the close button so keyboard users land inside the dialog.
  useEffect(() => {
    if (!previewOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [previewOpen]);

  return (
    <Section
      id="work"
      label="04 / Work"
      heading="AI Automation Projects"
      intro="Explore real-world AI automation systems I've built to streamline operations, eliminate repetitive tasks, and help businesses save time, reduce costs, and scale efficiently."
    >
      <Reveal>
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Project case studies"
          className="rounded-2xl border border-line bg-surface"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(-1);
            }
          }}
        >
          {/* Slide — keyed so it re-mounts and fades on change */}
          <div
            key={index}
            className="fade-in grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:items-center md:gap-10"
            aria-live="polite"
          >
            {/* Left: details */}
            <div>
              <p className="font-mono text-xs text-text-dim">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>

              <h3 className="mt-3 text-xl font-semibold text-text sm:text-2xl">{project.name}</h3>

              <dl className="mt-6 space-y-5">
                {[
                  { term: "Problem", detail: project.problem },
                  { term: "Result", detail: project.result },
                ].map(({ term, detail }) => (
                  <div key={term}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
                      {term}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-text-muted">{detail}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: screenshot — click to preview the full image */}
            <div className="group relative order-first aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-surface-2 md:order-last">
              <Image
                src={project.image}
                alt={`${project.name} workflow diagram`}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                priority={index === 0}
              />
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                aria-label={`Preview full ${project.name} screenshot`}
                className="absolute inset-0 flex items-end justify-end bg-canvas/0 p-3 transition-colors duration-300 group-hover:bg-canvas/40 focus-visible:bg-canvas/40"
              >
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-canvas/80 px-3 py-1.5 text-xs font-medium text-text opacity-90 backdrop-blur transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent group-hover:opacity-100 group-focus-within:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M10 10l3 3M6.5 4.5v4M4.5 6.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Preview
                </span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M9 3L5 7.5 9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>

            {/* Dots — jump straight to a project */}
            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${p.name}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-2 bg-line hover:bg-text-dim"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              Next
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M6 3l4 4.5L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Reveal>

      {/* Lightbox — full, uncropped screenshot */}
      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} — full screenshot`}
          onClick={() => setPreviewOpen(false)}
          className="fade-in fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-canvas/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setPreviewOpen(false)}
            aria-label="Close preview"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Stop propagation so clicking the image doesn't close the dialog */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-xl border border-line bg-surface-2"
          >
            <Image
              src={project.image}
              alt={`${project.name} full workflow diagram`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <p className="font-mono text-xs text-text-dim">
            {project.name} — click outside or press Esc to close
          </p>
        </div>
      )}
    </Section>
  );
}
