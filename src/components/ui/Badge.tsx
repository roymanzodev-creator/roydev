type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "live";
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "border-line bg-surface-2 text-text-muted",
    accent: "border-accent/30 bg-accent/10 text-accent",
    live: "border-accent/30 bg-accent/10 text-accent",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs ${styles}`}
    >
      {variant === "live" && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}
