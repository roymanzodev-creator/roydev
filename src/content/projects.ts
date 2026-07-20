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
      "New leads arrived as little more than an email address. Someone had to look up each company by hand, judge how valuable the lead was, and decide who to tell — slow, inconsistent, and easy to drop.",
    result:
      "Every lead is now validated, enriched with company data from Apollo, scored into a value tier, and written to the CRM automatically. High-value leads fire an instant Slack alert, and a follow-up email is drafted with AI and sent without anyone touching it.",
    stack: ["n8n", "Apollo", "Google Sheets", "Slack", "Google Gemini", "Gmail"],
  },
  {
    slug: "lead-scoring",
    name: "Lead Scoring & Follow-Up Automation",
    image: "/work/lead-scoring.png",
    problem:
      "Inbound form leads were scored by gut feel and followed up whenever someone got to them. Hot leads cooled off waiting, and the CRM fell out of sync with reality.",
    result:
      "Submissions are cleaned, scored HOT / WARM / COLD by an AI model, and pushed straight into GoHighLevel as contacts. Each tier gets its own Slack notification and email sequence the moment it lands, and failures are logged and flagged instead of disappearing silently.",
    stack: ["n8n", "GoHighLevel", "Google Sheets", "Slack", "Gmail", "AI Model"],
  },
  {
    slug: "rag-chatbot",
    name: "RAG Knowledge-Base Chatbot",
    image: "/work/rag-chatbot.png",
    problem:
      "The team wanted a chatbot that answered from their own documents, but the documents kept changing — so any answer was only as current as the last manual re-upload.",
    result:
      "A Google Drive knowledge base now syncs itself into a Supabase vector store: files added, updated, or deleted are re-embedded automatically. An AI agent answers questions against that always-current store, with memory for natural back-and-forth.",
    stack: ["n8n", "Supabase", "Google Drive", "Google Vertex", "OpenRouter", "AI Agent"],
  },
  {
    slug: "invoice-automation",
    name: "Invoice Processing Automation",
    image: "/work/invoice-automation.png",
    problem:
      "Invoices landed as PDFs in a Drive folder and had to be opened, read, and typed into a spreadsheet one by one — tedious, and a magnet for typos.",
    result:
      "A new PDF in Drive now triggers the workflow end to end: the invoice is parsed, the key fields are pulled out by an LLM into structured data, the record is logged to the database, and an internal notification email goes out — no manual entry at all.",
    stack: ["n8n", "Google Drive", "OpenRouter", "Google Sheets", "Gmail"],
  },
  {
    slug: "fb-faq-agent",
    name: "Facebook FAQ AI Agent",
    image: "/work/fb-faq-agent.png",
    problem:
      "A Facebook page kept getting the same questions, and someone had to sit there answering them by hand — with replies slowing down outside working hours.",
    result:
      "A webhook-driven AI agent now answers Messenger FAQs automatically from a knowledge base, with short-term memory for context, and replies around the clock. Facebook's verification handshake is handled in the same workflow.",
    stack: ["n8n", "OpenAI", "Facebook Messenger", "Webhooks", "Knowledge Base"],
  },
];
