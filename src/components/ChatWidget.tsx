"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { chat } from "@/content/chat";
import { profile } from "@/content/profile";

type Message = {
  role: "assistant" | "user";
  text: string;
};

/**
 * A stable per-visitor id, so n8n's window buffer memory keeps each visitor's
 * conversation separate. Persisted in localStorage, so it survives reloads and
 * the same visitor keeps the same thread; a new browser gets a fresh one.
 */
function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const KEY = "roy-chat-session-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

/**
 * Send a message to our API route, which forwards to n8n server-side.
 *
 * POSTs { message, history, sessionId } and expects { reply } back. The route
 * talks to n8n and filters out n8n's "workflow started" acknowledgement, so
 * anything that arrives here is a real reply.
 */
async function sendMessage(message: string, history: Message[]): Promise<string> {
  if (!chat.endpoint) {
    // Preview mode — no backend call, so styling work costs nothing.
    await new Promise((resolve) => setTimeout(resolve, 500));
    return chat.fallbackReply;
  }

  const res = await fetch(chat.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, sessionId: getSessionId() }),
  });

  if (!res.ok) throw new Error(`Chat endpoint responded ${res.status}`);

  const data = await res.json();
  if (typeof data.reply !== "string" || !data.reply.trim()) {
    throw new Error("Chat endpoint returned no reply");
  }
  return data.reply;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: chat.greeting },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the latest message in view as the thread grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const history = messages;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSending(true);

    try {
      const reply = await sendMessage(text, history);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: chat.errorReply }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : chat.launcherLabel}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-canvas shadow-lg shadow-accent/20 transition-transform hover:scale-105 focus-visible:scale-105"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M6 6l10 10M16 6L6 16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9a1.5 1.5 0 01-1.5 1.5H9l-4 3.5V16H5.5A1.5 1.5 0 014 14.5v-9z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={chat.panelTitle}
          className="fixed bottom-24 right-5 z-50 flex h-[min(30rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
            <span className="relative shrink-0">
              <Image
                src={profile.headshotUrl}
                alt={profile.name}
                width={80}
                height={80}
                className="h-9 w-9 rounded-full border border-line object-cover"
              />
              {/* Online dot, tucked into the avatar's corner */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 rounded-full border-2 border-surface-2 bg-accent"
              />
            </span>
            <div>
              <p className="text-sm font-medium text-text">{chat.panelTitle}</p>
              <p className="font-mono text-[10px] text-text-dim">{chat.panelSubtitle}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex items-end justify-start gap-2"
                }
              >
                {m.role === "assistant" && (
                  <Image
                    src={profile.headshotUrl}
                    alt=""
                    width={56}
                    height={56}
                    className="h-6 w-6 shrink-0 rounded-full border border-line object-cover"
                  />
                )}
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-accent text-canvas"
                      : "rounded-bl-sm bg-surface-2 text-text-muted"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {sending && (
              <div className="flex items-end justify-start gap-2" aria-live="polite">
                <Image
                  src={profile.headshotUrl}
                  alt=""
                  width={56}
                  height={56}
                  className="h-6 w-6 shrink-0 rounded-full border border-line object-cover"
                />
                <p className="rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5 text-sm text-text-dim">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-dim [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-dim [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-dim" />
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chat.inputPlaceholder}
              aria-label="Message"
              className="min-w-0 flex-1 rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-accent/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-canvas transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 8l12-5.5L9 14l-2.5-4.5L2 8z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
