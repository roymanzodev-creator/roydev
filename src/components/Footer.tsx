import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-text-dim">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-text-dim">Built with Next.js & Tailwind</p>
      </div>
    </footer>
  );
}
