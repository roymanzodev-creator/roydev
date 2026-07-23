import { roles, sideProjects, education } from "@/content/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Experience() {
  return (
    <Section id="experience" label="03 / Experience" heading="Where I've worked">
      <div className="relative">
        {/* Timeline spine, hidden on mobile where the indent would cost too much width. */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-full w-px bg-line sm:block"
        />

        <div className="space-y-8">
          {roles.map((role, i) => (
            <Reveal key={`${role.title}-${role.period}`} delay={i * 60}>
              <article className="relative sm:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 hidden h-[15px] w-[15px] rounded-full border-2 sm:block ${
                    role.current ? "border-accent bg-accent/20" : "border-line bg-surface-2"
                  }`}
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <h3 className="text-lg font-medium text-text">{role.title}</h3>
                  {role.current && <Badge variant="accent">Current</Badge>}
                </div>

                <p className="mt-1 font-mono text-xs text-text-dim">
                  {role.org} · {role.period}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {role.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal delay={roles.length * 60}>
            <article className="relative sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] rounded-full border-2 border-line bg-surface-2 sm:block"
              />
              <h3 className="text-lg font-medium text-text">{education.degree}</h3>
              <p className="mt-1 font-mono text-xs text-text-dim">
                {education.school} · {education.period}
              </p>
            </article>
          </Reveal>
        </div>
      </div>

      {/* Side projects sit outside the employment timeline — they're relevant
          experience, but not roles. */}
      <div className="mt-14 border-t border-line pt-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Additional experience
          </p>

          <div className="mt-6 space-y-6">
            {sideProjects.map((project) => (
              <article
                key={`${project.title}-${project.org}`}
                className="rounded-xl border border-line bg-surface p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="text-lg font-medium text-text">{project.title}</h3>
                  <span className="font-mono text-xs text-text-dim">{project.org}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
