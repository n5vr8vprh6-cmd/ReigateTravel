import { createHash, randomBytes } from "node:crypto";

/**
 * Charter §13 lists rate limiting as a required control. This is an honest, bounded
 * implementation of it, and the limits of the approach are the point of this comment.
 *
 * **What this does.** Two sliding windows plus a global cap, held in module scope.
 *
 * **What this does not do.** The `Map` lives in one serverless instance. Vercel runs many, in
 * several regions, and recycles them on cold start, so an attacker who bursts — or whose
 * requests simply land on fresh instances — walks straight through it. This is a speed bump
 * against naive repetition, not a control against a determined attacker.
 *
 * **Why not a shared store.** Upstash has a REST API, so it would cost no dependency. What it
 * costs is infrastructure: an account, a fourth secret, and a service that can be down — at
 * which point the choice is fail-open (no control) or fail-closed (lose real inquiries). For a
 * form nobody has submitted yet, that is premature. If abuse ever appears, the better answer is
 * a Vercel Firewall rate-limit rule on /begin-planning: no code, no dependency, and enforced at
 * the edge before this function ever runs.
 *
 * This tension between a required control and the approved architecture is recorded in
 * docs/decisions/source-conflicts.md rather than being resolved silently here.
 */

const SHORT_WINDOW_MS = 15 * 60 * 1000;
const SHORT_WINDOW_MAX = 3;
const LONG_WINDOW_MS = 24 * 60 * 60 * 1000;
const LONG_WINDOW_MAX = 10;

/** Blast radius cap: protects sender reputation if any of the above is bypassed. */
const INSTANCE_HOURLY_MAX = 40;
const INSTANCE_WINDOW_MS = 60 * 60 * 1000;

/**
 * Per-boot salt. The hash is only ever compared against other hashes from the same instance,
 * so a random salt costs nothing and means the stored value cannot be reversed to an IP even
 * if a heap dump were obtained. Relevant to the consent copy, which promises no storage.
 */
const SALT = randomBytes(16).toString("hex");

const submissions = new Map<string, number[]>();
let instanceTimestamps: number[] = [];

export function hashClient(ip: string | null): string {
  return createHash("sha256")
    .update(SALT)
    .update(ip ?? "unknown")
    .digest("hex")
    .slice(0, 32);
}

function withinWindow(times: number[], now: number, windowMs: number): number[] {
  return times.filter((t) => now - t < windowMs);
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: "per-client" | "instance";
}

export function checkRateLimit(clientHash: string, now: number = Date.now()): RateLimitResult {
  instanceTimestamps = withinWindow(instanceTimestamps, now, INSTANCE_WINDOW_MS);
  if (instanceTimestamps.length >= INSTANCE_HOURLY_MAX) {
    return { allowed: false, reason: "instance" };
  }

  const history = withinWindow(submissions.get(clientHash) ?? [], now, LONG_WINDOW_MS);
  const recent = withinWindow(history, now, SHORT_WINDOW_MS);

  if (recent.length >= SHORT_WINDOW_MAX || history.length >= LONG_WINDOW_MAX) {
    // Persist the pruned history so the window keeps sliding rather than resetting.
    submissions.set(clientHash, history);
    return { allowed: false, reason: "per-client" };
  }

  submissions.set(clientHash, [...history, now]);
  instanceTimestamps.push(now);
  return { allowed: true };
}

/** Test seam. Never called in application code. */
export function resetRateLimit(): void {
  submissions.clear();
  instanceTimestamps = [];
}
