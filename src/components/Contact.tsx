import { profile, contactLinks } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <Section
      id="contact"
      label="05 / Contact"
      heading="Let's talk"
      intro={`I'm open to part-time or full-time roles and currently based in ${profile.location}, working remotely across US and EU hours. The fastest way to reach me is email.`}
    >
      <Reveal>
        <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <ul className="grid gap-5 sm:grid-cols-3">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-1.5 block break-words text-sm text-text transition-colors hover:text-accent"
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <a
              href={contactLinks[0].href}
              className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90"
            >
              Email me
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
