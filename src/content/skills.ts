export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Automation",
    skills: ["n8n", "Zapier", "GoHighLevel"],
  },
  {
    title: "AI",
    skills: ["OpenAI", "Claude", "Claude Code", "Lovable", "Prompt Engineering", "AI Agents"],
  },
  {
    title: "CRM",
    skills: [
      "Lead Management",
      "CRM Automation",
      "Pipeline Management",
      "Apollo",
    ],
  },
  {
    title: "Funnels & Web",
    skills: ["Custom JavaScript", "HTML & CSS", "Landing Pages", "Sales Funnels"],
  },
  {
    title: "Integrations",
    skills: ["REST APIs", "Webhooks", "Supabase", "Airtable", "Google Workspace"],
  },
  {
    title: "Also familiar with",
    skills: ["React", "Express.js", "Full-Stack Basics"],
  },
];
