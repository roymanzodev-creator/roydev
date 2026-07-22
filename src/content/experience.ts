export type Role = {
  title: string;
  org: string;
  period: string;
  current: boolean;
  bullets: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export type SideProject = {
  title: string;
  org: string;
  description: string;
};

export const roles: Role[] = [
  {
    title: "Freelance AI Automation Specialist",
    org: "Self-employed",
    period: "Oct 2024 – Present",
    current: true,
    bullets: [
      "Design and build custom AI automation workflows in n8n, integrating LLMs (OpenAI, Claude) with Supabase, Airtable, and Google Workspace to eliminate manual client processes.",
      "Develop AI agents for email handling, data extraction, and customer support, combining prompt engineering with structured backend logic.",
      "Cut manual processing time by ~75% across multiple client workflows.",
    ],
  },
  {
    title: "GoHighLevel Virtual Assistant",
    org: "Client engagement",
    period: "Feb 2025 – Jan 2026",
    current: false,
    bullets: [
      "Managed CRM pipelines, customer records, and appointment scheduling within GoHighLevel.",
      "Built automation workflows for lead nurturing, SMS/email campaigns, and appointment reminders.",
      "Reduced manual CRM workload by 70% while maintaining data accuracy.",
    ],
  },
  {
    title: "Quality Assurance Administrator",
    org: "IdeaHub IT Solutions Provider Inc.",
    period: "Sep 2018 – Jul 2022",
    current: false,
    bullets: [
      "Reviewed, approved, or rejected incoming leads based on client campaign requirements to maintain lead quality and accuracy.",
      "Performed QA testing on the company's survey website alongside the development team, identifying and reporting issues before release.",
      "Generated daily QA reports to track lead quality and testing outcomes.",
    ],
  },
];

export const sideProjects: SideProject[] = [
  {
    title: "Founder & Creator",
    org: "Outsider Wild Rift (YouTube)",
    description:
      "Run a gaming channel end-to-end: content strategy, SEO-driven title and tag optimization, and a repeatable publishing workflow to grow audience and watch time. Apply the same systems-thinking and data-driven optimization to client automation work.",
  },
];

export const education: Education = {
  degree: "Bachelor of Science in Computer Science",
  school: "Saint Michael College of Caraga",
  period: "2012 – 2016",
};
