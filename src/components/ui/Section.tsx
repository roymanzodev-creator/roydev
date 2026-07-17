type SectionProps = {
  id: string;
  label: string;
  heading: string;
  intro?: string;
  children: React.ReactNode;
};

export function Section({ id, label, heading, intro, children }: SectionProps) {
  return (
    /* No scroll-mt here: the nav offset lives in `scroll-padding-top` on <html>.
       Setting both stacks them and pushes snap/anchor targets too far down. */
    <section id={id} aria-labelledby={`${id}-heading`} className="py-14 sm:py-18">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
