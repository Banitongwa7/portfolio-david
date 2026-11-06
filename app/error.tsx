"use client";

import Link from "next/link";
import { HiArrowPath } from "react-icons/hi2";
import s from "@/components/quote/quote.module.css";

// Shown inside the site's layout when a page fails to render, for example
// when the blog feed is unreachable. Same look as the 404 page.
export default function PageError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className={`night ${s.nf}`} aria-labelledby="page-title">
      <span className={s.streak} aria-hidden="true" />
      <div className={`wrap ${s.inner}`}>
        <h1 id="page-title">This page could not load</h1>
        <p className={s.lead}>
          Something went wrong on my side, often a service the page depends on. Try again in a moment.
        </p>
        <div className="cta-row">
          <button type="button" className="btn btn-neon" onClick={reset}>
            Try again
            <span className="ic">
              <HiArrowPath aria-hidden="true" />
            </span>
          </button>
          <Link href="/" className="btn btn-glass">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
