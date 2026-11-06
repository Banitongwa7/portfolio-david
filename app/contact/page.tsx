"use client";

import React, { useRef, useState } from "react";
import {
  HiArrowUpRight,
  HiCheck,
  HiOutlineClipboardDocument,
  HiOutlineEnvelope,
  HiOutlineExclamationCircle,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import AllLinks from "@/data/AllLinks";
import PageHead from "@/components/site/PageHead";
import { SOCIALS } from "@/components/site/socials";
import s from "@/components/contact/contact.module.css";

const EMAIL = "davidbanitongwa@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<{ name: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);
  // When the visitor first touched the form; the API turns away instant posts.
  const startedAt = useRef(0);
  const trap = useRef<HTMLInputElement>(null);

  const nameError = tried && !fullName.trim() ? "Enter your full name." : "";
  const emailError =
    tried && !EMAIL_PATTERN.test(email.trim())
      ? email.trim()
        ? "Enter an email address like jane@company.com."
        : "Enter your email address."
      : "";
  const messageError = tried && !message.trim() ? "Write a short message so I know how to help." : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName.trim() || !EMAIL_PATTERN.test(email.trim()) || !message.trim()) {
      setTried(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          message,
          startedAt: startedAt.current,
          website: trap.current?.value ?? "",
        }),
      });

      if (!res.ok) {
        // Validation and rate-limit answers explain what to do; show them.
        const data = await res.json().catch(() => null);
        if (res.status !== 500 && typeof data?.error === "string") {
          toast.error(data.error);
          return;
        }
        throw new Error(`Request failed with status ${res.status}`);
      }

      setSentTo({ name: fullName.trim(), email: email.trim() });
      setTried(false);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("The message could not be sent. Try again, or write to me by email.");
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the email address.");
    }
  };

  return (
    <>
      <PageHead
        tag="Contact"
        title={
          <>
            Let&apos;s talk about <span className="serif">your project</span>
          </>
        }
        text="I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."
      />

      <section className="sec" style={{ paddingTop: 0 }} id="contact" aria-label="Contact options">
        <div className={`wrap ${s.grid}`}>
          <aside className={s.info} aria-labelledby="info-title">
            <h2 id="info-title">My information</h2>
            <ul className={s.list}>
              <li className={s.item}>
                <span className={s.ic} aria-hidden="true">
                  <HiOutlineEnvelope />
                </span>
                <div>
                  <h3>Email</h3>
                  <div className={s.mailRow}>
                    <a className={s.mail} href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                    <button type="button" className={s.copy} onClick={copyEmail}>
                      {copied ? <HiCheck aria-hidden="true" /> : <HiOutlineClipboardDocument aria-hidden="true" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                    <span aria-live="polite" className="sr">
                      {copied ? "Email address copied to clipboard" : ""}
                    </span>
                  </div>
                </div>
              </li>
              <li className={s.item}>
                <span className={s.ic} aria-hidden="true">
                  <HiOutlineMapPin />
                </span>
                <div>
                  <h3>Address</h3>
                  <p>Kinshasa, Democratic Republic of Congo</p>
                </div>
              </li>
            </ul>
            <div className={s.online}>
              <h3>Find me online</h3>
              <ul>
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon aria-hidden="true" />
                      {label}
                      <span className="sr"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className={s.hire}>
              Looking to hire me for a project?{" "}
              <a href={AllLinks.needService} target="_blank" rel="noopener noreferrer">
                Start a project
              </a>{" "}
              with a few details about your needs.
            </p>
          </aside>

          <div className={s.card}>
            {sentTo ? (
              <div className={s.done} role="status">
                <span className={s.doneIc} aria-hidden="true">
                  <HiCheck />
                </span>
                <h2>Message sent</h2>
                <p>
                  Thanks, {sentTo.name}. I&apos;ll reply to {sentTo.email} as soon as I can.
                </p>
                <button type="button" className="btn btn-line" onClick={() => setSentTo(null)}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2>Send a message</h2>
                <p>All fields are required.</p>
                <form
                  id="contactForm"
                  className={s.form}
                  onSubmit={handleSubmit}
                  onFocus={() => {
                    if (!startedAt.current) startedAt.current = Date.now();
                  }}
                  noValidate
                >
                  <div className={s.trap} aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input ref={trap} type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className={s.two}>
                    <div className={s.field}>
                      <label htmlFor="name">Full name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        maxLength={100}
                        placeholder="Jane Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        aria-invalid={Boolean(nameError)}
                        aria-describedby={nameError ? "name-err" : undefined}
                      />
                      {nameError && (
                        <p className={s.err} id="name-err">
                          <HiOutlineExclamationCircle aria-hidden="true" />
                          {nameError}
                        </p>
                      )}
                    </div>
                    <div className={s.field}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        maxLength={254}
                        placeholder="jane@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(emailError)}
                        aria-describedby={emailError ? "email-err" : undefined}
                      />
                      {emailError && (
                        <p className={s.err} id="email-err">
                          <HiOutlineExclamationCircle aria-hidden="true" />
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={s.field}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      maxLength={5000}
                      placeholder="Tell me about your project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(messageError)}
                      aria-describedby={messageError ? "message-err" : undefined}
                    />
                    {messageError && (
                      <p className={s.err} id="message-err">
                        <HiOutlineExclamationCircle aria-hidden="true" />
                        {messageError}
                      </p>
                    )}
                  </div>
                  <div className={s.formFoot}>
                    <small>Your message goes straight to my inbox.</small>
                    <button type="submit" className="btn btn-neon" disabled={sending}>
                      {sending ? "Sending…" : "Send message"}
                      <span className="ic">
                        <HiArrowUpRight aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
