/**
 * Case studies shown in the Work section.
 *
 * Each entry is a real automation, with a screenshot of the workflow. Per the
 * card design, only `problem`, `result`, and `stack` are shown as text.
 *
 * To add another: drop the screenshot in public/work/, then add an entry with
 * `image` pointing at it.
 */

export type Project = {
  slug: string;
  name: string;
  /** Screenshot in /public/work. Shown at the top of the card. */
  image: string;
  problem: string;
  result: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "lead-enrichment",
    name: "Lead Enrichment System",
    image: "/work/lead-enrichment.png",
    problem:
      "Manual lead research and data entry wasted time, increased costs, and delayed sales follow-ups.",
    result:
      "Automated lead enrichment saves time and costs by instantly validating and enriching lead data, improving accuracy, and enabling faster follow-ups.",
    stack: ["n8n", "Apollo", "Google Sheets", "Slack", "Google Gemini", "Gmail"],
  },
  {
    slug: "lead-scoring",
    name: "Lead Scoring & Follow-Up Automation",
    image: "/work/lead-scoring.png",
    problem:
      "Manual lead qualification and follow-ups were slow, inconsistent, and increased operational costs.",
    result:
      "Automated lead scoring and follow-ups save time and costs by prioritizing high-value leads, sending timely responses, and improving conversion rates.",
    stack: ["n8n", "GoHighLevel", "Google Sheets", "Slack", "Gmail", "AI Model"],
  },
  {
    slug: "rag-chatbot",
    name: "RAG Knowledge-Base Chatbot",
    image: "/work/rag-chatbot.png",
    problem:
      "Customer inquiries required manual responses, increasing support costs and slowing response times.",
    result:
      "The RAG knowledge-base chatbot provides instant, accurate answers 24/7, saving time and support costs while improving customer experience.",
    stack: ["n8n", "Supabase", "Google Drive", "Google Vertex", "OpenRouter", "AI Agent"],
  },
  {
    slug: "invoice-automation",
    name: "Invoice Processing Automation",
    image: "/work/invoice-automation.png",
    problem:
      "Manual invoice processing was time-consuming, error-prone, and increased operational costs.",
    result:
      "Automated invoice processing saves time and costs by extracting data, reducing manual errors, and speeding up approvals and record-keeping.",
    stack: ["n8n", "Google Drive", "OpenRouter", "Google Sheets", "Gmail"],
  },
  {
    slug: "fb-faq-agent",
    name: "Facebook FAQ AI Agent",
    image: "/work/fb-faq-agent.png",
    problem:
      "Responding to Facebook inquiries manually was slow, repetitive, and increased support costs.",
    result:
      "The AI agent answers FAQs instantly 24/7, saving time and support costs while delivering faster, consistent customer responses.",
    stack: ["n8n", "OpenAI", "Facebook Messenger", "Webhooks", "Knowledge Base"],
  },
];
