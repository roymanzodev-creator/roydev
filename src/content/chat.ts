export const chat = {
  /** Button label / accessible name for the floating launcher. */
  launcherLabel: "Chat with Roy",

  /** Title shown in the header of the open chat panel. */
  panelTitle: "Chat with Roy",

  /** Small line under the title. */
  panelSubtitle: "Usually replies within a day",

  /** The first message shown when the panel opens. Static — always displayed. */
  greeting: "How can I help you today?",

  /** Placeholder text inside the message input. */
  inputPlaceholder: "Type your message…",

  /**
   * Where user messages are POSTed. Leave empty until the webhook exists.
   *
   * While this is "", the widget runs in preview mode: it echoes back
   * `fallbackReply` so the UI is testable without a backend. Once you paste a
   * URL here, messages POST to it as JSON { message, history } and the reply is
   * read from the response — see `ChatWidget.tsx` for the exact contract.
   */
  webhookUrl: "",

  /** Shown as the assistant reply while no webhook is connected. */
  fallbackReply:
    "Thanks for reaching out! The live chat isn't wired up just yet — the fastest way to reach me right now is email at roymanzodev@gmail.com.",

  /** Shown if a configured webhook errors or times out. */
  errorReply:
    "Sorry — something went wrong sending that. Please email me at roymanzodev@gmail.com and I'll get right back to you.",
} as const;
