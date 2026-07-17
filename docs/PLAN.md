# Portfolio Rebuild — Roy F. Manzo

## Context

Roy is a GoHighLevel & AI Automation Specialist looking for a **part-time or full-time role**. His current site (`roy-dev.vercel.app`) is client/freelance-facing — it sells services to buyers. A job search needs a different site: one that convinces a hiring manager he can own systems end-to-end, not one that pitches project work.

This is a fresh rebuild that will eventually replace `roy-dev.vercel.app`. Goal for this first pass: a **running site he can open in a browser and click through**, with real structure and placeholder case-study content he swaps out later.

Source material available in `files/`:
- `Roy's Resume.pdf` — experience, skills, education (already extracted)
- `portfolio-png.png` — professional headshot, square, dark background (pairs well with the chosen dark theme)

## Decisions (confirmed with Roy)

| Decision | Choice |
|---|---|
| Scope | Fresh rebuild, eventually replaces the old site |
| Stack | Next.js (App Router) + TypeScript + Tailwind |
| Case studies | Placeholder content, real structure |
| Design | Dark technical — builder/engineer feel |

## Stack & Setup

- `create-next-app` — App Router, TypeScript, Tailwind, ESLint, `src/` dir, `@/*` alias
- No CMS, no database, no auth. Content lives in typed TS data files.
- Deploy target is Vercel, but **deploying is out of scope for this pass** — local `npm run dev` only.
- Fonts via `next/font`: Inter (body) + JetBrains Mono (accents/labels). Self-hosted by `next/font`, no external requests.

## Design System

Dark technical, restrained — the risk with this style is looking like a template, so the rules are tight:

- **Color**: near-black base (`#0A0A0B`), elevated surface (`#141416`), single cyan/emerald accent used sparingly (links, active state, metric numbers). No neon gradients, no glow-on-everything.
- **Type**: large tight headings, generous body line-height, mono only for labels/tags/metrics.
- **Texture**: one subtle grid or noise treatment in the hero, nothing below it.
- **Motion**: fade/rise on scroll via CSS + IntersectionObserver. No animation library.
- **Accessibility**: all text meets WCAG AA on the dark base; visible focus rings; `prefers-reduced-motion` honored.

Tokens defined once in `globals.css` as CSS variables and mapped into `tailwind.config.ts` — so a later color change is one file.

## Page Structure

Single scrolling page (`/`) with anchored nav. A hiring manager reads in one pass; multi-page adds friction.

1. **Hero** — name, "GoHighLevel & AI Automation Specialist", one-line positioning, headshot, **"Open to part-time or full-time"** availability badge, primary CTA (Contact) + secondary (Download résumé).
2. **About** — the professional summary from the résumé, rewritten for an employer audience (ownership, speed, shipping) rather than a client one.
3. **Skills** — grouped exactly as the résumé does: Automation, AI, CRM, Funnel/Web, Integrations, Additional.
4. **Experience** — timeline of the four résumé roles (Freelance AI Automation Specialist, Freelance GHL Funnel Builder, GHL Virtual Assistant, plus education).
5. **Work** — 3–4 case-study cards in a **problem → approach → result** shape, with a metric slot. Placeholder copy, clearly marked `TODO` in the data file so it's obvious what to replace.
6. **Contact** — email, phone, LinkedIn, location + remote availability. Mailto-based for now; a real form API route is a follow-up.

Nav is sticky, collapses to a mobile menu, highlights the active section.

## Content Model

All copy lives in `src/content/*.ts` behind exported types — Roy edits these files, never the components:

```
src/content/profile.ts     // name, title, tagline, availability, contact links
src/content/skills.ts      // skill groups from the résumé
src/content/experience.ts  // roles + education timeline
src/content/projects.ts    // case studies (placeholder, TODO-marked)
```

## File Layout

```
portfolio/
├── public/
│   ├── roy-manzo.png          // from files/portfolio-png.png
│   └── roy-manzo-resume.pdf   // from files/Roy's Resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx         // fonts, metadata, OG tags
│   │   ├── page.tsx           // composes sections
│   │   └── globals.css        // tokens
│   ├── components/
│   │   ├── Nav.tsx  Hero.tsx  About.tsx  Skills.tsx
│   │   ├── Experience.tsx  Work.tsx  Contact.tsx  Footer.tsx
│   │   └── ui/  Section.tsx  Badge.tsx  Reveal.tsx
│   └── content/               // see above
├── tailwind.config.ts
└── README.md                  // how to run + where to edit content
```

## Build Order

1. Scaffold Next.js, set up tokens + fonts, copy assets into `public/`
2. Content files with real résumé data + placeholder projects
3. Layout primitives (`Section`, `Badge`, `Reveal`) and `Nav`
4. Sections top to bottom: Hero → About → Skills → Experience → Work → Contact → Footer
5. Responsive pass (375 / 768 / 1280), a11y pass, SEO metadata
6. README

## Verification

Roy asked for something testable, so this pass ends with the site actually running and driven, not just compiling:

- `npm run dev`, then drive the real page in the browser: scroll each section, click every nav anchor, open the mobile menu, tab through for focus rings, confirm the résumé download resolves and the mailto link is correct.
- Screenshot at 375px, 768px, and 1280px to confirm no horizontal scroll and that the hero holds up on mobile.
- `npm run build` must pass clean — no type errors, no ESLint errors.
- Check the console for React/Next warnings.

## Explicitly Out of Scope (candidates for next pass)

- Deploying to Vercel / pointing a domain
- A real contact form with an API route + spam protection
- Replacing placeholder case studies with real metrics — Roy supplies these
- Blog, analytics, dark/light toggle (site is dark-only by design)
