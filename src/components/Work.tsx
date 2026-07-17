import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Work() {
  const hasPlaceholders = projects.some((p) => p.placeholder);

  return (
    <Section
      id="work"
      label="04 / Work"
      heading="Selected case studies"
      intro="A few systems I've built, and what changed for the team once they were live."
    >
      {hasPlaceholders && (
        <div className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <p className="font-mono text-xs leading-relaxed text-amber-300">
            Placeholder content — edit{" "}
            <code className="text-amber-200">src/content/projects.ts</code> and set{" "}
            <code className="text-amber-200">placeholder: false</code> to hide this notice.
          </p>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-text">{project.name}</h3>
                {project.placeholder && <Badge>Draft</Badge>}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.blurb}</p>

              {project.metric && (
                <div className="mt-6 border-y border-line py-4">
                  <p className="font-mono text-3xl font-semibold text-accent">
                    {project.metric.value}
                  </p>
                  <p className="mt-1 text-xs text-text-dim">{project.metric.label}</p>
                </div>
              )}

              <dl className="mt-6 space-y-4">
                {[
                  { term: "Problem", detail: project.problem },
                  { term: "Approach", detail: project.approach },
                  { term: "Result", detail: project.result },
                ].map(({ term, detail }) => (
                  <div key={term}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
                      {term}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-text-muted">{detail}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2 pt-2">
                {project.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-dim"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
