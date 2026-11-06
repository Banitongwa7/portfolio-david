import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// Gmail is never contacted: nodemailer is replaced by a spy.
const sendMail = vi.hoisted(() => vi.fn(async () => ({})));
vi.mock("nodemailer", () => ({ default: { createTransport: () => ({ sendMail }) } }));

import { POST } from "@/app/api/mail/route";

let ipCounter = 0;
// Each test posts from its own address so the rate limit doesn't leak between them.
const freshIp = () => `203.0.113.${++ipCounter}`;

const valid = () => ({
  fullName: "Jane Doe",
  email: "jane@company.com",
  message: "Hello David",
  startedAt: Date.now() - 10_000,
  website: "",
});

function request(body: unknown, ip = freshIp(), headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/mail", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  process.env.EMAIL = "me@example.com";
  process.env.PASSWORD = "app-password";
  sendMail.mockClear();
});

describe("POST /api/mail", () => {
  it("sends a valid message, with Reply-To set to the visitor", async () => {
    const res = await POST(request({ ...valid(), fullName: "Jane\r\nBcc: spam@x.test" }));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();
    const mail = (sendMail.mock.calls[0] as unknown[])[0] as Record<string, unknown>;
    expect(mail.replyTo).toEqual({ name: "Jane Bcc: spam@x.test", address: "jane@company.com" });
    // Line breaks never reach the subject header.
    expect(mail.subject).toBe("Message from Jane Bcc: spam@x.test");
  });

  it.each([
    ["invalid JSON", "{not json"],
    ["a bad email", { ...valid(), email: "nope" }],
    ["a name that isn't text", { ...valid(), fullName: { a: 1 } }],
    ["an empty message", { ...valid(), message: "   " }],
    ["a message over 5000 characters", { ...valid(), message: "x".repeat(5001) }],
    ["a form sent instantly", { ...valid(), startedAt: Date.now() }],
    ["no start time", { ...valid(), startedAt: undefined }],
  ])("rejects %s", async (_label, body) => {
    const res = await POST(request(body));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("refuses bodies announced as too large", async () => {
    const res = await POST(request(valid(), freshIp(), { "content-length": "30000" }));
    expect(res.status).toBe(413);
  });

  it("answers bots that fill the hidden field as if it worked, without sending", async () => {
    const res = await POST(request({ ...valid(), website: "https://spam.test" }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("allows 5 messages per address per hour, then 429", async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i++) {
      expect((await POST(request(valid(), ip))).status).toBe(200);
    }
    const blocked = await POST(request(valid(), ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBe("3600");
    // Another visitor is not affected.
    expect((await POST(request(valid()))).status).toBe(200);
  });

  it("fails cleanly when the Gmail credentials are missing", async () => {
    delete process.env.PASSWORD;
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(request(valid()));
    expect(res.status).toBe(500);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
