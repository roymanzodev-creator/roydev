export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Automation & AI",
    skills: [
      "n8n",
      "Zapier",
      "GoHighLevel",
      "OpenAI & Claude APIs",
      "Prompt Engineering",
      "AI Agents",
    ],
  },
  {
    title: "CRM & Sales Ops",
    skills: [
      "Lead Management",
      "Pipeline Management",
      "CRM Automation",
      "Landing Pages / Sales Funnels",
      "Apollo",
    ],
  },
  {
    title: "Web Development",
    skills: ["JavaScript", "React", "Express.js", "HTML & CSS", "Supabase"],
  },
  {
    title: "AI-Assisted Build Tools",
    skills: ["Claude Code", "Lovable"],
  },
  {
    title: "Creative",
    skills: ["Video Editing", "Graphic Design"],
  },
  {
    title: "Integrations",
    skills: ["REST APIs", "Webhooks", "Airtable", "Google Workspace"],
  },
];
