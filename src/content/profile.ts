export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export const profile = {
  /** Formal name — used for the page title, OG tags, image alt, and footer. */
  name: "Roy F. Manzo",

  /** The big <h1> in the hero. Kept separate from `name` so a conversational
      greeting here doesn't leak into the page title or the copyright line. */
  heroHeading: "Hi, I'm Roy Manzo",

  title: "GoHighLevel & AI Automation Specialist",

  // Shown in the hero, under the name.
  tagline:
    "I build funnels, websites, and CRM workflows — then automate the backend with n8n and AI so the busywork runs itself.",

  // Availability badge in the hero.
  availability: "Open to part-time or full-time roles",

  location: "Butuan City, Philippines",
  timezone: "PHT (UTC+8) · Remote, flexible with US & EU hours",

  // TODO: update if you buy a custom domain. Used for OG tags and canonical URL.
  siteUrl: "https://roy-dev.vercel.app",

  metaDescription:
    "Roy F. Manzo is a GoHighLevel & AI Automation Specialist who builds funnels, CRM workflows, and AI automations with n8n, OpenAI, and Claude. Open to part-time or full-time roles.",

  resumeUrl: "/roy-manzo-resume.pdf",
  headshotUrl: "/roy-manzo.png",

  email: "roymanzodev@gmail.com",
  phone: "+63 998 487 1686",

  // Paragraphs for the About section, written for a hiring manager.
  about: [
    "I'm a GoHighLevel and AI automation specialist. Most of my work starts the same way: a team is drowning in manual steps — copying leads between tools, chasing follow-ups, answering the same questions over and over — and needs someone to turn that into a system that runs without them.",
    "I build the front end of that system (funnels, landing pages, websites) and the back end that makes it work (CRM pipelines, n8n workflows, AI agents built on OpenAI and Claude). I'm comfortable owning a project end-to-end, from figuring out what the business actually needs to shipping it and keeping it running.",
    "I lean hard on AI tools to build and ship fast, and I care more about a system being live and working than being perfect on paper. I'm looking for a part-time or full-time role where I can own automation and CRM systems for a team that wants to move quickly.",
  ],
} as const;

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}?subject=${encodeURIComponent("Role opportunity for Roy")}`,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    // TODO: replace with your real LinkedIn URL.
    label: "LinkedIn",
    value: "linkedin.com/in/roymanzo",
    href: "https://www.linkedin.com/in/roymanzo",
  },
];
