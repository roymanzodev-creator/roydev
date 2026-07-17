# Roy F. Manzo — Portfolio

Personal portfolio site aimed at hiring managers. Built with Next.js 16 (App Router), TypeScript, and Tailwind v4. Single scrolling page, dark theme, statically prerendered.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Editing content

**You should never need to touch a component to change what the site says.** All copy lives in `src/content/`:

| File | What's in it |
|---|---|
| `src/content/profile.ts` | Name, title, tagline, availability badge, about paragraphs, contact links |
| `src/content/skills.ts` | Skill groups and their tags |
| `src/content/experience.ts` | Roles timeline and education |
| `src/content/projects.ts` | Case studies |

### Before sending this to anyone

1. **Replace the placeholder case studies.** `src/content/projects.ts` ships with `TODO` copy and fake `00%` metrics. Rewrite each one, then set `placeholder: false`. While any project has `placeholder: true`, an amber warning banner shows above the Work section and each card gets a "Draft" badge — so placeholder content can't ship unnoticed.
2. **Fix the LinkedIn URL** in `src/content/profile.ts` — it's currently a guess.
3. **Update `siteUrl`** in `src/content/profile.ts` if you deploy somewhere other than `roy-dev.vercel.app`. It drives the canonical URL and OG tags.

## Assets

- `public/roy-manzo.png` — headshot, also used as the OG/social preview image
- `public/roy-manzo-resume.pdf` — served by the "Download résumé" buttons

Replacing the résumé means dropping a new PDF at that same path.

## Design notes

Colors are defined once as CSS variables in `src/app/globals.css` and mapped into Tailwind via `@theme inline`. Changing the accent is a one-line edit to `--accent`.

One naming constraint worth knowing: the background token is `--color-canvas`, not `--color-base`. Tailwind generates a color utility per token, so a `base` token would emit `text-base` and collide with Tailwind's built-in `text-base` font-size utility — which silently paints text the background color. Avoid token names that collide with Tailwind utilities (`base`, `sm`, `lg`, etc.).

The site is dark-only by design; there is no theme toggle.

## Not built yet

- Deployment to Vercel
- A real contact form (currently mailto links)
- Analytics
