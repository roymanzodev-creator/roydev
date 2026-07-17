import { profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" label="01 / About" heading="What I do">
      <Reveal>
        <div className="max-w-3xl space-y-5">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
