/**
 * PLACEHOLDER CONTENT — replace before sending this site to anyone.
 *
 * Every field marked TODO is a placeholder. The metrics are intentionally
 * fake-looking ("00%") so a real number is never implied by accident.
 *
 * How to write a good case study here:
 *   problem  — what was broken, in the client's words. One or two sentences.
 *   approach — what you actually built. Name the tools.
 *   result   — what changed. A number if you have one; an honest outcome if not.
 *   metric   — the single number worth putting in big type. Omit if you don't have one.
 */

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  problem: string;
  approach: string;
  result: string;
  metric?: {
    value: string;
    label: string;
  };
  stack: string[];
  /** Flip to false once real content replaces the placeholder copy. */
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "lead-enrichment-pipeline",
    name: "TODO: Lead Enrichment Pipeline",
    blurb: "TODO: One line on what this system does and who it was for.",
    problem:
      "TODO: Describe the manual process that existed before. Who was doing what by hand, and how often?",
    approach:
      "TODO: Describe what you built — the trigger, the enrichment step, where the data landed, and how the team got notified.",
    result:
      "TODO: Describe what changed for the team. Time saved, errors avoided, or volume handled.",
    metric: { value: "00%", label: "TODO: what this number measures" },
    stack: ["n8n", "Apollo", "Airtable", "Slack"],
    placeholder: true,
  },
  {
    slug: "ai-lead-scoring",
    name: "TODO: AI Lead Scoring & Follow-Up",
    blurb: "TODO: One line on what this system does and who it was for.",
    problem:
      "TODO: Describe how leads were being triaged before, and what was falling through the cracks.",
    approach:
      "TODO: Describe the scoring logic, which model you used, and how the follow-up sequences were wired up.",
    result: "TODO: Describe the outcome for response time or conversion.",
    metric: { value: "00", label: "TODO: what this number measures" },
    stack: ["GoHighLevel", "OpenAI", "n8n"],
    placeholder: true,
  },
  {
    slug: "support-chatbot",
    name: "TODO: Knowledge-Based Support Assistant",
    blurb: "TODO: One line on what this system does and who it was for.",
    problem:
      "TODO: Describe the support load — what questions kept coming in, and who was answering them.",
    approach:
      "TODO: Describe how you built the knowledge base, which model answers, and what happens on an escalation.",
    result: "TODO: Describe the change in ticket volume or response time.",
    metric: { value: "00%", label: "TODO: what this number measures" },
    stack: ["Claude", "n8n", "Supabase"],
    placeholder: true,
  },
  {
    slug: "ghl-crm-overhaul",
    name: "TODO: GoHighLevel CRM Overhaul",
    blurb: "TODO: One line on what this system does and who it was for.",
    problem:
      "TODO: Describe the state of the CRM when you inherited it — messy pipelines, no follow-up, whatever it was.",
    approach:
      "TODO: Describe the rebuild — pipeline structure, automations, and any integrations you added.",
    result: "TODO: Describe what the team could do afterward that they couldn't before.",
    stack: ["GoHighLevel", "Twilio", "Google Calendar"],
    placeholder: true,
  },
];
