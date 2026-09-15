"use client"
import { useSyncExternalStore } from "react";
import Quotes from "@/data/quotes.json";
import PageHeader from "@/components/pageheader/PageHeader";

// The quote depends on the visitor's local date, which the server can't know,
// so it is only resolved in the browser to keep server and client HTML equal.
const subscribe = () => () => {};
const getToday = () => new Date().toDateString();
const getServerToday = () => null;

export default function Quote() {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const currentDate = today ? new Date(today) : null;

  const quote = currentDate
    ? Quotes.find((q) => q.day === currentDate.getDate() && q.month === (currentDate.getMonth() + 1)) || Quotes[0]
    : null;

  const formattedDate = currentDate?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 md:py-24">
      <PageHeader eyebrow={formattedDate ?? " "} title="Quote of the Day" />

      <figure className="card relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 left-4 select-none font-serif text-[10rem] leading-none text-accent-500/10 sm:left-8"
        >
          “
        </span>
        {quote ? (
          <>
            <blockquote className="relative">
              <p className="font-serif text-2xl italic leading-relaxed text-slate-900 dark:text-slate-100 md:text-3xl">
                {quote.quote}
              </p>
            </blockquote>
            <figcaption className="relative mt-8 text-base font-semibold text-accent-700 dark:text-accent-400">
              <cite className="not-italic">{quote.author}</cite>
            </figcaption>
          </>
        ) : (
          <div aria-hidden="true" className="mx-auto max-w-md animate-pulse space-y-3">
            <div className="h-6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mx-auto h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mx-auto mt-8 h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        )}
      </figure>
    </section>
  );
}
