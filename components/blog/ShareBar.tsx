"use client";

import { useState } from "react";
import { HiCheck, HiOutlineLink } from "react-icons/hi2";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";
import s from "./article.module.css";

export default function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy the link. Copy it from the address bar instead.");
    }
  };

  return (
    <div className={s.share}>
      <p>Share this article</p>
      <button type="button" className="btn btn-line btn-sm" onClick={copy}>
        {copied ? <HiCheck aria-hidden="true" /> : <HiOutlineLink aria-hidden="true" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <a
        className="btn btn-line btn-sm"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn aria-hidden="true" />
        LinkedIn<span className="sr"> (opens in a new tab)</span>
      </a>
      <a
        className="btn btn-line btn-sm"
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter aria-hidden="true" />
        Post on X<span className="sr"> (opens in a new tab)</span>
      </a>
      <span className="sr" aria-live="polite">
        {copied ? "Link copied to the clipboard" : ""}
      </span>
    </div>
  );
}
