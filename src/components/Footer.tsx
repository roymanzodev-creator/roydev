import { profile, contactLinks, profileLinks, type ContactIcon } from "@/content/profile";

function Icon({ name }: { name: ContactIcon }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "email":
      return (
        <svg {...common}>
          <rect
            x="1.75"
            y="3.25"
            width="12.5"
            height="9.5"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M2.5 4.5L8 8.75l5.5-4.25"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M5.6 2.5H3.4c-.6 0-1.1.5-1 1.1.2 2.3 1.2 4.4 2.7 6 1.6 1.6 3.7 2.6 6 2.8.6 0 1.1-.4 1.1-1v-2.2c0-.5-.4-.9-.9-1l-1.8-.3c-.4-.1-.8.1-1 .5l-.5.9c-1.3-.7-2.4-1.8-3.1-3.1l.9-.5c.4-.2.6-.6.5-1l-.3-1.8c-.1-.5-.5-.9-1-.9z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect
            x="1.75"
            y="1.75"
            width="12.5"
            height="12.5"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M5 6.75v4.5M5 4.6v.05M8 11.25v-2.5a1.5 1.5 0 013 0v2.5M8 6.75v.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect
            x="1.75"
            y="5.25"
            width="12.5"
            height="8"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M5.75 5V3.9c0-.6.5-1.15 1.1-1.15h2.3c.6 0 1.1.55 1.1 1.15V5M1.75 8.5h12.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function Footer() {
  const links = [...contactLinks, ...profileLinks];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          {/* Identity */}
          <div>
            <p className="text-lg font-semibold tracking-tight text-text">{profile.shortName}</p>
            <p className="mt-1 font-mono text-sm text-accent">{profile.title}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
              {profile.footerTagline}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    <span className="text-text-dim transition-colors group-hover:text-accent">
                      <Icon name={link.icon} />
                    </span>
                    <span className="break-all">{link.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-xs text-text-dim">
            © {new Date().getFullYear()} {profile.shortName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
