"use client";

import { useState } from "react";
import Link from "next/link";
import { HiArrowUpRight, HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import AllLinks from "@/data/AllLinks";
import s from "./home.module.css";

const FAQS = [
  {
    q: "What can you build for my business?",
    a: "Internal business apps on Microsoft Power Platform (Power Apps, Power Automate, Dataverse, Power BI), web apps with Next.js, React and Node.js, mobile apps with React Native, and AI features in Python.",
  },
  {
    q: "Can you improve an existing Power Platform solution?",
    a: "Yes. Share what you have and what slows your team down. I review the apps, flows and data model before suggesting changes.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. I'm based in Kinshasa, DR Congo (UTC+1) and have worked with teams in Tunisia and France.",
  },
  {
    q: "How do we get started?",
    a: "Fill in the project form with your goals and timeline. I'll reply with questions, a scope and an estimate.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={s.faq} aria-labelledby="faq-title">
      <span className={s.faqDeco} aria-hidden="true" />
      <div className="wrap">
        <span className="tag tag-dark">FAQ</span>
        <h2 id="faq-title" className="h2">
          Questions clients ask before we start
        </h2>
        <div className={s.faqGrid}>
          <aside className={s.start} aria-label="Start a project">
            <span className={s.avatar} aria-hidden="true">
              <HiOutlineChatBubbleOvalLeft />
            </span>
            <div className={s.startBody}>
              <h3>Have a project in mind?</h3>
              <p>Tell me what you need. I&apos;ll come back with questions, a scope and an estimate.</p>
              <div className="cta-row">
                <a className="btn btn-ink" href={AllLinks.needService} target="_blank" rel="noopener noreferrer">
                  Start a project<span className="sr"> (opens in a new tab)</span>
                  <span className="ic">
                    <HiArrowUpRight aria-hidden="true" />
                  </span>
                </a>
                <Link className="btn btn-line" href="/contact">
                  Send a message
                </Link>
              </div>
            </div>
          </aside>
          <div>
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className={isOpen ? `${s.faqItem} ${s.isOpen}` : s.faqItem}>
                  <h3>
                    <button
                      type="button"
                      className={s.faqBtn}
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span>{item.q}</span>
                      <span className={s.faqIcon} aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className={s.faqBody}
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    aria-hidden={!isOpen}
                  >
                    <div className={s.faqInner}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
