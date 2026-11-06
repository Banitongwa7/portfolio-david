import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Sends the contact form to my inbox through Gmail. The endpoint is public,
// so it validates everything itself, drops obvious bots and caps how many
// messages go out, to keep the Gmail account from being used for spam.

const MAX_BODY_BYTES = 20_000;
const LIMITS = { name: 100, email: 254, message: 5_000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A person needs a few seconds to fill the form; scripts post at once.
const MIN_FILL_MS = 2_500;

// Best-effort rate limits, kept in the memory of each server instance. They
// stop a single script hammering the form; a Vercel Firewall rule on
// /api/mail gives a hard limit across instances.
const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_LIMIT = 5;
const GLOBAL_LIMIT = 30;
const sentByIp = new Map<string, number[]>();
let sentGlobal: number[] = [];

const recent = (times: number[], now: number) => times.filter((t) => now - t < WINDOW_MS);

function takeSlot(ip: string, now: number): boolean {
  sentGlobal = recent(sentGlobal, now);
  const mine = recent(sentByIp.get(ip) ?? [], now);
  if (mine.length >= PER_IP_LIMIT || sentGlobal.length >= GLOBAL_LIMIT) {
    sentByIp.set(ip, mine);
    return false;
  }
  mine.push(now);
  sentGlobal.push(now);
  sentByIp.set(ip, mine);
  // Forget visitors whose window has passed so the map stays small.
  if (sentByIp.size > 1_000) {
    for (const [key, times] of sentByIp) {
      if (recent(times, now).length === 0) sentByIp.delete(key);
    }
  }
  return true;
}

const clientIp = (req: NextRequest) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

const fail = (error: string, status: number, headers?: HeadersInit) =>
  NextResponse.json({ error }, { status, headers });

// Trims a field and checks it is a non-empty string within its limit.
function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return fail("The message is too long.", 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object") throw new Error("Not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("Invalid request.", 400);
  }

  // The hidden "website" field is invisible to people; only bots fill it.
  // They get a normal answer so they don't adapt, and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return fail("That was very fast. Please check your message and send it again.", 400);
  }

  // Line breaks are removed from the name because it goes into the subject.
  const fullName = text(body.fullName, LIMITS.name)?.replace(/[\r\n\t]+/g, " ");
  const email = text(body.email, LIMITS.email);
  const message = text(body.message, LIMITS.message);
  if (!fullName || !email || !EMAIL_PATTERN.test(email) || !message) {
    return fail("Check your name, email address and message, then send again.", 400);
  }

  if (!takeSlot(clientIp(req), Date.now())) {
    return fail("Too many messages for now. Try again later, or write to me by email.", 429, {
      "Retry-After": String(WINDOW_MS / 1000),
    });
  }

  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("Email sending error: EMAIL or PASSWORD is not set");
    return fail("Failed to send email.", 500);
  }

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transport.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      // "Reply" in the inbox answers the visitor, not myself.
      replyTo: { name: fullName, address: email },
      subject: `Message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return fail("Failed to send email.", 500);
  }
}
