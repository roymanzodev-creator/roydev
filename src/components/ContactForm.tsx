"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "sending" | "sent" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function validate(): string | null {
    if (!name.trim()) return "Please enter your name.";
    if (!emailPattern.test(email.trim())) return "Please enter a valid email address.";
    if (!message.trim()) return "Please enter a message.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setError("");
    setStatus("sending");

    const payload = { name: name.trim(), email: email.trim(), message: message.trim() };

    // No backend yet: hand off to the visitor's email client so the message
    // still reaches Roy. Once contactFormEndpoint is set, POST there instead.
    if (!profile.contactFormEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
      const body = encodeURIComponent(
        `${payload.message}\n\n— ${payload.name}\n${payload.email}`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch(profile.contactFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError(
        `Something went wrong sending that. Please email me directly at ${profile.email}.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/10 p-6 text-center">
        <p className="text-sm font-medium text-accent">Thanks — your message is on its way.</p>
        <p className="mt-1.5 text-sm text-text-muted">I&apos;ll get back to you as soon as I can.</p>
        <button
          type="button"
          onClick={() => {
            setName("");
            setEmail("");
            setMessage("");
            setError("");
            setStatus("idle");
          }}
          className="mt-4 text-xs font-mono text-text-dim underline underline-offset-4 hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Your Name
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            autoComplete="name"
            className="w-full rounded-lg border border-line bg-canvas px-3.5 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-accent/50 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="sr-only">
            Your Email
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            autoComplete="email"
            className="w-full rounded-lg border border-line bg-canvas px-3.5 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-accent/50 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="sr-only">
          Your Message
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          rows={5}
          className="w-full resize-y rounded-lg border border-line bg-canvas px-3.5 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-accent/50 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
