/**
 * Chat endpoint.
 *
 * The widget posts here (same-origin) and this forwards to the n8n chat
 * webhook server-side — same reasoning as the contact route: no CORS to
 * configure, and the webhook URL never reaches the browser where it could be
 * scraped and spammed.
 *
 * Set N8N_CHAT_WEBHOOK_URL in .env.local and in the host's env vars.
 *
 * IMPORTANT — the n8n workflow must end in a "Respond to Webhook" node that
 * returns the assistant's text. If the Webhook node is left on "Respond
 * immediately", n8n answers {"message":"Workflow was started"} before the
 * workflow runs; that is an acknowledgement, not a reply, and is filtered out
 * below so it can never be shown to a visitor as if Roy said it.
 */

import { getClientIp, rateLimit } from "@/lib/rate-limit";

/** Chat is conversational, so the ceiling is higher than the contact form's. */
const MAX_MESSAGES = 20;
const WINDOW_MS = 10 * 60 * 1000;

/** Shapes n8n returns when it acknowledges instead of replying. */
const ACK_PATTERN = /^workflow (was )?started$/i;

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("N8N_CHAT_WEBHOOK_URL is not set");
    return Response.json({ error: "Chat is not configured." }, { status: 500 });
  }

  const ip = getClientIp(request);
  const { allowed, retryAfter } = rateLimit(`chat:${ip}`, MAX_MESSAGES, WINDOW_MS);

  if (!allowed) {
    return Response.json(
      { error: "Too many messages. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: { message?: string; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_WEBHOOK_SECRET
          ? { "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        message,
        history: Array.isArray(body.history) ? body.history : [],
        sentAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`n8n chat webhook responded ${res.status}: ${detail.slice(0, 200)}`);
      return Response.json({ error: "Could not reach the assistant." }, { status: 502 });
    }

    const raw = await res.text();

    // n8n may answer with JSON or bare text depending on the Respond node.
    let reply: string | undefined;
    try {
      const data = JSON.parse(raw);
      reply =
        typeof data === "string"
          ? data
          : (data.reply ?? data.output ?? data.text ?? data.message ?? undefined);
    } catch {
      reply = raw;
    }

    reply = typeof reply === "string" ? reply.trim() : undefined;

    // Never surface n8n's "workflow started" acknowledgement as Roy's reply.
    if (!reply || ACK_PATTERN.test(reply)) {
      console.warn(
        "n8n chat webhook returned no reply — is the workflow ending in a 'Respond to Webhook' node?",
      );
      return Response.json({ error: "No reply from the assistant." }, { status: 502 });
    }

    return Response.json({ reply });
  } catch (err) {
    console.error("Failed to reach n8n chat webhook:", err);
    return Response.json({ error: "Could not reach the assistant." }, { status: 502 });
  }
}
