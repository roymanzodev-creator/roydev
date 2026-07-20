import Image from "next/image";
import { profile } from "@/content/profile";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section
      id="top"
      /* Fills the screen minus the 4rem sticky nav. svh (not vh) so mobile
         browser chrome doesn't push the bottom of the hero out of view. */
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
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

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-14 pt-10 sm:pb-18 sm:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h1
              className="hero-item text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              {profile.heroHeading}
            </h1>

            <p
              className="hero-item mt-3 font-mono text-sm text-accent sm:text-base"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              {profile.title}
            </p>

            <p
              className="hero-item mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              {profile.tagline}
            </p>

            <div
              className="hero-item mt-9 flex flex-wrap items-center gap-3"
              style={{ "--delay": "320ms" } as React.CSSProperties}
            >
              <a
                href="#contact"
                className="rounded-lg bg-accent px-6 py-3 text-base font-medium text-canvas transition-opacity hover:opacity-90"
              >
                Hire me
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume (opens in a new tab)"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-base font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
              >
                <svg width="17" height="17" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path
                    d="M6 2.5H2.5v10h10V9M9.5 1.5h4m0 0v4m0-4L7 8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View resume
              </a>
            </div>

            <p
              className="hero-item mt-8 font-mono text-xs text-text-dim"
              style={{ "--delay": "400ms" } as React.CSSProperties}
            >
              {profile.location} · {profile.timezone}
            </p>
          </div>

          <div className="order-first md:order-last">
            <div
              className="hero-item relative mx-auto w-52 sm:w-64 md:w-full md:max-w-[340px]"
              style={{ "--delay": "0ms" } as React.CSSProperties}
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/25 to-transparent" />
              <Image
                src={profile.headshotUrl}
                alt={`Portrait of ${profile.name}`}
                width={560}
                height={560}
                priority
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 340px"
                className="relative rounded-2xl border border-line object-cover"
              />
            </div>

            <div
              className="hero-item mt-5 flex justify-center"
              style={{ "--delay": "480ms" } as React.CSSProperties}
            >
              <Badge variant="live">{profile.availability}</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
