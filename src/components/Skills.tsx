import { skillGroups } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      label="02 / Skills"
      heading="Tools I build with"
      intro="The stack I reach for when turning a manual process into something that runs on its own."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 60}>
            <div className="lift group h-full rounded-xl border border-line bg-surface p-5 hover:border-accent/40">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-text-dim transition-colors group-hover:text-accent">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm text-text-muted transition-colors group-hover:border-line/80 group-hover:text-text"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
