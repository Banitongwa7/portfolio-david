"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { HiArrowUpRight } from "react-icons/hi2";
import { gsap, prefersReducedMotion, registerGsap } from "@/utils/motion";
import AllProjects, { PRACTICE_SLUG, type Practice } from "@/data/AllProjects";
import s from "./home.module.css";

const CARDS: {
  practice: Practice;
  className: string;
  title: React.ReactNode;
  label: string;
  description: string;
  chips: string[];
  lead: string;
}[] = [
  {
    practice: "pp",
    className: s.pc1,
    title: (
      <>
        Power <span className="serif">Platform</span>
      </>
    ),
    label: "Power Platform",
    description:
      "Business apps that replace spreadsheets and email chains: credit scoring, CRM pipelines and idea management.",
    chips: ["Power Apps", "Power Automate", "Dataverse", "Power BI", "SQL Server"],
    lead: "Credit Squares",
  },
  {
    practice: "web",
    className: s.pc2,
    title: (
      <>
        Web &amp; <span className="serif">Mobile</span>
      </>
    ),
    label: "web and mobile",
    description:
      "Product interfaces and the APIs behind them, from an HR engagement platform to an investor network for Francophone Africa.",
    chips: ["React", "Next.js", "Node.js", "Laravel", "Angular", "Swift & Kotlin"],
    lead: "Synapse HR",
  },
  {
    practice: "ai",
    className: s.pc3,
    title: (
      <>
        AI &amp; <span className="serif">Data</span>
      </>
    ),
    label: "AI and data",
    description:
      "Models and copilots wrapped in tools people can use: waste sorting, emotion detection in text, a virtual friend.",
    chips: ["Python", "Django", "OpenAI", "Streamlit"],
    lead: "RecycleAI",
  },
];

// The signature scroll: each practice card pins, and the next one slides over
// it while the covered card shrinks and dims. Sticky positioning does the
// pinning; ScrollTrigger only scrubs the depth.
export default function WorkStack() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!scope.current || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", scope.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.94,
            filter: "brightness(0.8)",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => `top ${88 + (i + 1) * 28}px`,
              scrub: true,
            },
          });
        });

        const giant = scope.current?.querySelector("[data-giant]");
        if (giant) {
          gsap.to(giant, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "top top", scrub: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} id="work" className={s.work} aria-labelledby="work-title">
      <div className="wrap">
        <div className={s.workTop}>
          <div>
            <span className="tag tag-dark">Selected work</span>
            <h2 id="work-title" className={s.workH}>
              {AllProjects.length} projects across three practices
            </h2>
          </div>
          <Link className="btn btn-glass" href="/projects">
            All projects
          </Link>
        </div>
        <p className={`${s.giant} wide`} aria-hidden="true" data-giant>
          Projects
        </p>
        <div className={s.stack}>
          {CARDS.map((card) => {
            const projects = AllProjects.filter((p) => p.practice === card.practice);
            const lead = projects.find((p) => p.name === card.lead) ?? projects[0];
            const others = projects.filter((p) => p !== lead);
            return (
              <article key={card.practice} className={`${s.pcard} ${card.className}`} data-card>
                <div className={s.pcCopy}>
                  <h3 className={s.pcTitle}>{card.title}</h3>
                  <p className={s.pcDesc}>{card.description}</p>
                  <ul className={s.chips}>
                    {card.chips.map((chip) => (
                      <li key={chip}>{chip}</li>
                    ))}
                  </ul>
                  <div className={s.pcFoot}>
                    <p className={s.pcCount}>
                      <strong>{projects.length} projects</strong>
                      {projects.map((p) => p.name).join(", ")}
                    </p>
                    <Link
                      className="round-link"
                      href={`/projects?practice=${PRACTICE_SLUG[card.practice]}`}
                      aria-label={`See ${card.label} projects`}
                    >
                      <HiArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className={s.pcMedia} style={{ background: lead.imageBg }}>
                  <Image
                    src={lead.image}
                    alt={`${lead.name} preview`}
                    fill
                    sizes="(min-width: 1080px) 560px, 100vw"
                    className={`${s.pcImg} ${lead.imagePad ? s.pad : ""}`}
                  />
                  {others.length > 0 && (
                    <div className={s.pcThumbs}>
                      <span>
                        {others.slice(0, 3).map((p) => (
                          <Image key={p.id} src={p.image} alt="" width={34} height={34} />
                        ))}
                      </span>
                      +{others.length} projects
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className={s.workMore}>
          <Link className="btn btn-neon" href="/projects">
            Browse all {AllProjects.length} projects
            <span className="ic">
              <HiArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
