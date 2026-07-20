import Image from "next/image";
import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  return (
    <Section
      id="work"
      label="04 / Work"
      heading="Selected case studies"
      intro="Automations I've built — the problem each one solved, and what changed once it was live."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <article className="lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface hover:border-accent/40">
              {/* Workflow screenshot */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-surface-2">
                <Image
                  src={project.image}
                  alt={`${project.name} workflow diagram`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-medium text-text">{project.name}</h3>

                <dl className="mt-4 space-y-4">
                  {[
                    { term: "Problem", detail: project.problem },
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
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
