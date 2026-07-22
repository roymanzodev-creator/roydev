/**
 * Minimal in-memory, per-IP rate limiter.
 *
 * Scope and limits, so this isn't mistaken for more than it is:
 * state lives in the process, so on a serverless host each instance keeps its
 * own counter and a cold start resets it. That makes this effective against
 * naive floods (a script hammering the form) but not against a determined
 * attacker spreading requests across instances. If real abuse shows up, swap
 * the Map for a shared store (Upstash Redis, Vercel KV) — the call signature
 * here is meant to stay the same.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the Map can't grow without bound. */
function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets — for the Retry-After header. */
  retryAfter: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Cheap amortised cleanup; the Map only ever holds recent submitters.
  if (buckets.size > 500) prune(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * Best-effort client IP.
 *
 * NextRequest.ip was removed in Next 15, so read the proxy headers directly.
 * x-forwarded-for is a comma-separated chain; the first entry is the client.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
