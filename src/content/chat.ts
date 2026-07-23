export const chat = {
  /** Button label / accessible name for the floating launcher. */
  launcherLabel: "Chat with Roy",

  /** Title shown in the header of the open chat panel. */
  panelTitle: "Chat with Roy",

  /** Small line under the title. */
  panelSubtitle: "Usually replies within a day",

  /** The first message shown when the panel opens. Static — always displayed. */
  greeting: "Hi, I'm Roy. How can I help you today?",

  /** Placeholder text inside the message input. */
  inputPlaceholder: "Type your message…",

  /**
   * Same-origin route that proxies to the n8n agent. Set it to "" to run the
   * widget in preview mode, where it echoes `fallbackReply` and never calls a
   * backend — useful for styling work without burning LLM credit.
   *
   * The route itself POSTs to n8n; the webhook URL lives in
   * N8N_CHAT_WEBHOOK_URL, server-side only. See `src/app/api/chat/route.ts`.
   */
  endpoint: "/api/chat",

  /** Shown as the assistant reply while no endpoint is connected. */
  fallbackReply:
    "Thanks for reaching out! The live chat isn't wired up just yet — the fastest way to reach me right now is email at roymanzodev@gmail.com.",

  /** Shown if a configured webhook errors or times out. */
  errorReply:
    "Sorry — something went wrong sending that. Please email me at roymanzodev@gmail.com and I'll get right back to you.",
} as const;
