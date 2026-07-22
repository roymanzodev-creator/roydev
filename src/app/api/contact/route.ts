/**
 * Contact form endpoint.
 *
 * The browser posts here (same-origin), and this forwards to the n8n webhook
 * server-side. Going through the server rather than posting to n8n directly
 * from the page means:
 *   - no CORS to configure on the n8n Webhook node
 *   - the webhook URL stays out of the page source, so it can't be scraped
 *     and spammed
 *
 * Set N8N_CONTACT_WEBHOOK_URL in .env.local, and in your host's env vars when
 * you deploy — .env.local is gitignored, so it does not travel with the repo.
 */

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("N8N_CONTACT_WEBHOOK_URL is not set");
    return Response.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  // Validate again here — client-side checks can be bypassed.
  if (!name || !email || !message) {
    return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
      }),
      // Don't hang the request forever if n8n is slow or asleep.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`n8n webhook responded ${res.status}: ${detail.slice(0, 200)}`);
      return Response.json({ error: "Could not deliver your message." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Failed to reach n8n webhook:", err);
    return Response.json({ error: "Could not deliver your message." }, { status: 502 });
  }
}
