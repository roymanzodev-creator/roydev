/** Which icon the footer draws for a link. See Footer.tsx for the shapes. */
export type ContactIcon = "email" | "phone" | "linkedin" | "briefcase";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: ContactIcon;
};

export const profile = {
  /** Formal name — used for the page title, OG tags, image alt, and footer. */
  name: "Roy F. Manzo",

  /** Everyday name, without the middle initial. Used in the footer. */
  shortName: "Roy Manzo",

  /** The big <h1> in the hero. Kept separate from `name` so a conversational
      greeting here doesn't leak into the page title or the copyright line. */
  heroHeading: "Hi, I'm Roy Manzo",

  title: "GoHighLevel & AI Automation Specialist",

  /** One-liner in the footer — shorter and punchier than the hero tagline. */
  footerTagline: "I help businesses automate the busywork and ship client systems fast.",

  // Shown in the hero, under the name.
  tagline:
    "I build funnels, websites, and CRM workflows — then automate the backend with n8n and AI so the busywork runs itself.",

  // Availability badge in the hero.
  availability: "Open to part-time or full-time roles",

  location: "Butuan City, Philippines",
  timezone: "PHT (UTC+8)",

  // Live domain. Drives the canonical URL and OG/Twitter preview tags.
  siteUrl: "https://roymanzo.dev",

  metaDescription:
    "Roy F. Manzo is a GoHighLevel & AI Automation Specialist who builds funnels, CRM workflows, and AI automations with n8n, OpenAI, and Claude. Open to part-time or full-time roles.",

  resumeUrl: "/roy-manzo-resume.pdf",
  headshotUrl: "/roy-manzo.png",

  email: "roymanzodev@gmail.com",
  phone: "+63 998 487 1686",

  /**
   * Where the contact form POSTs.
   *
   * This is our own API route, which forwards to the n8n webhook server-side
   * (see src/app/api/contact/route.ts). The actual webhook URL lives in
   * N8N_CONTACT_WEBHOOK_URL so it never reaches the browser.
   *
   * Set this to "" to fall back to a mailto: handoff instead.
   */
  contactFormEndpoint: "/api/contact",

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
    icon: "email",
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: "phone",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/roy-manzo",
    href: "https://www.linkedin.com/in/roy-manzo",
    icon: "linkedin",
  },
];

/**
 * Hiring-platform profiles. Rendered in the footer only — kept separate from
 * `contactLinks` so the Contact section stays focused on direct ways to reach
 * Roy. Add Upwork, Fiverr, etc. here if they're worth linking later.
 */
export const profileLinks: ContactLink[] = [
  {
    label: "OnlineJobs.ph",
    value: "OnlineJobs.ph",
    href: "https://v2.onlinejobs.ph/jobseekers/info/749513",
    icon: "briefcase",
  },
];
