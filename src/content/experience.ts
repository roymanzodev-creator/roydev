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

export const roles: Role[] = [
  {
    title: "Freelance AI Automation Specialist",
    org: "Self-employed",
    period: "Oct 2025 – Present",
    current: true,
    bullets: [
      "Design and build custom AI automation workflows in n8n, integrating LLMs (OpenAI, Claude) with tools like Supabase, Airtable, and Google Workspace to eliminate manual client processes.",
      "Develop AI agents for email handling, data extraction, and customer support, combining prompt engineering with structured backend logic.",
    ],
  },
  {
    title: "Freelance GoHighLevel Funnel Builder",
    org: "Self-employed",
    period: "Nov 2024 – Present",
    current: true,
    bullets: [
      "Designed and built custom sales funnels, landing pages, and websites in GoHighLevel for small business and coaching clients.",
      "Set up automated email/SMS follow-up sequences, lead pipelines, and CRM workflows to capture and convert leads.",
      "Integrated GoHighLevel with third-party tools (n8n, payment processors, calendars) to streamline client operations end-to-end.",
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
      "Improved sales operations by reducing manual CRM tasks and maintaining accurate customer data.",
    ],
  },
];

export const education: Education = {
  degree: "Bachelor of Science in Computer Science",
  school: "Saint Michael College of Caraga",
  period: "2012 – 2016",
};
