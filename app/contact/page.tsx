"use client";

import React, { useState } from "react";
import { HiCheck, HiOutlineClipboardDocument } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { toast } from "react-toastify";
import AllLinks from "@/data/AllLinks";
import PageHeader from "@/components/pageheader/PageHeader";
import SocialLinks from "@/components/social/SocialLinks";

const EMAIL = "davidbanitongwa@gmail.com";

const INPUT_CLASS =
  "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder-slate-500";

const LABEL_CLASS = "block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName === "" || email === "" || message === "") {
      toast.warn("Please fill in all fields!");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, message }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.success("Message sent successfully!");
      setFullName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong! Please try again.");
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
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24" id="contact">
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Me"
        description="I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="card h-fit p-6 sm:p-8 md:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            My Information
          </h2>

          <ul className="mt-6 space-y-6">
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <IoMdMail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Email
                </h3>
                <div className="mt-0.5 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-sm font-semibold text-slate-900 sm:text-base transition-colors hover:text-accent-700 dark:text-slate-100 dark:hover:text-accent-400"
                  >
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    title={copied ? "Copied!" : "Copy"}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {copied ? (
                      <HiCheck className="h-4 w-4 text-accent-600 dark:text-accent-400" aria-hidden="true" />
                    ) : (
                      <HiOutlineClipboardDocument className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                  <span aria-live="polite" className="sr-only">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <FaLocationDot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Address
                </h3>
                <p className="mt-0.5 font-semibold text-slate-900 dark:text-slate-100">
                  Kinshasa, Democratic Republic of Congo
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Find me online
            </h3>
            <SocialLinks className="-ml-2.5 mt-2" />
          </div>

          <div className="mt-6 rounded-xl bg-slate-900/5 p-4 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-400">
            Looking to hire me for a project?{" "}
            <a
              href={AllLinks.needService}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Request my services
            </a>
          </div>
        </div>

        <div className="card p-6 sm:p-8 md:col-span-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Send a Message
          </h2>
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={LABEL_CLASS}>
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={fullName}
                  placeholder="Jane Doe"
                  className={INPUT_CLASS}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={LABEL_CLASS}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  placeholder="jane@example.com"
                  className={INPUT_CLASS}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={LABEL_CLASS}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                rows={6}
                placeholder="Tell me about your project..."
                className={INPUT_CLASS}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="btn btn-primary w-full py-3 sm:w-auto sm:px-8"
            >
              {sending && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                />
              )}
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
