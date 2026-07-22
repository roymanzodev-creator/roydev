import { profile, contactLinks } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  return (
    <Section
      id="contact"
      label="05 / Contact"
      heading="Let's talk"
      intro={`I'm open to part-time or full-time roles and currently based in ${profile.location}, working remotely across US and EU hours. The fastest way to reach me is email.`}
    >
      <Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {/* Details card */}
          <div className="flex flex-col rounded-xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-text-muted">
              Have a role or project in mind? Reach out directly, or send a message with the form.
            </p>

            <ul className="mt-6 space-y-5">
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
                    className="mt-1 block break-words text-sm text-text transition-colors hover:text-accent"
                  >
                    {link.value}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-line pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
                Location
              </p>
              <p className="mt-1 text-sm text-text-muted">{profile.location}</p>
              <p className="mt-0.5 text-xs text-text-dim">{profile.timezone}</p>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
