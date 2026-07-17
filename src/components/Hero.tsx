import Image from "next/image";
import { profile } from "@/content/profile";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* The one textured surface on the page — grid + radial falloff. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Badge variant="live">{profile.availability}</Badge>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-3 font-mono text-sm text-accent sm:text-base">{profile.title}</p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              {profile.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path
                    d="M7.5 1.5v9m0 0L4 7m3.5 3.5L11 7M2 13h11"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download résumé
              </a>
            </div>

            <p className="mt-8 font-mono text-xs text-text-dim">
              {profile.location} · {profile.timezone}
            </p>
          </div>

          <div className="order-first md:order-last">
            <div className="relative mx-auto w-44 sm:w-56 md:w-full md:max-w-[280px]">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/25 to-transparent" />
              <Image
                src={profile.headshotUrl}
                alt={`Portrait of ${profile.name}`}
                width={560}
                height={560}
                priority
                sizes="(max-width: 768px) 224px, 280px"
                className="relative rounded-2xl border border-line object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
