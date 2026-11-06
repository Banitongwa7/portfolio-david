"use client"
import { useState, useSyncExternalStore } from "react";
import { HiOutlineCalendarDays, HiOutlineClipboardDocument, HiCheck } from "react-icons/hi2";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";
import Quotes from "@/data/quotes.json";
import s from "@/components/quote/quote.module.css";

// The quote depends on the visitor's local date, which the server can't know,
// so it is only resolved in the browser to keep server and client HTML equal.
const subscribe = () => () => {};
const getToday = () => new Date().toDateString();
const getServerToday = () => null;

// The data uses "--" for a dash; show the real character.
const tidy = (text: string) => text.replace(/\s--\s/g, " — ");

export default function Quote() {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const currentDate = today ? new Date(today) : null;
  const [copied, setCopied] = useState(false);

  const quote = currentDate
    ? Quotes.find((q) => q.day === currentDate.getDate() && q.month === (currentDate.getMonth() + 1)) || Quotes[0]
    : null;

  const formattedDate = currentDate?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const text = quote ? tidy(quote.quote) : "";

  const copy = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(`“${text}” ${quote.author}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy the quote.");
    }
  };

  return (
    <section className={`night ${s.qod}`} aria-labelledby="page-title">
      <div className={`wrap ${s.inner}`}>
        <span className={s.glow} aria-hidden="true" />
        <p className={s.date}>
          <HiOutlineCalendarDays aria-hidden="true" />
          {currentDate ? <time dateTime={currentDate.toISOString().slice(0, 10)}>{formattedDate}</time> : "Today"}
        </p>
        <h1 id="page-title">Quote of the day</h1>
        <span className={s.markQ} aria-hidden="true">
          “
        </span>
        {quote ? (
          <>
            <figure className={s.figure}>
              <blockquote>
                <p>{text}</p>
              </blockquote>
              <figcaption>
                <cite>{quote.author}</cite>
              </figcaption>
            </figure>
            <div className={s.actions}>
              <button type="button" className="btn btn-neon" onClick={copy}>
                {copied ? "Quote copied" : "Copy quote"}
                <span className="ic">
                  {copied ? <HiCheck aria-hidden="true" /> : <HiOutlineClipboardDocument aria-hidden="true" />}
                </span>
              </button>
              <a
                className="btn btn-glass"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${text}” ${quote.author}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter aria-hidden="true" />
                Share on X<span className="sr"> (opens in a new tab)</span>
              </a>
              <span className="sr" aria-live="polite">
                {copied ? "Quote copied to the clipboard" : ""}
              </span>
            </div>
          </>
        ) : (
          <div aria-hidden="true" className={s.skeleton}>
            <span />
            <span />
            <span />
          </div>
        )}
        <p className={s.note}>A new quote every day, {Quotes.length} in all. Come back tomorrow.</p>
      </div>
    </section>
  );
}
