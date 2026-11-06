"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { HiOutlineLockClosed, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import AllProjects, { PRACTICES, PRACTICE_SLUG, type Practice } from "@/data/AllProjects";
import s from "./projects.module.css";

type Filter = "all" | Practice;
const FILTERS: Filter[] = ["all", "pp", "web", "ai"];
const MAX_CHIPS = 4;

const practiceFromSlug = (slug: string | null): Filter =>
  (Object.keys(PRACTICE_SLUG) as Practice[]).find((p) => PRACTICE_SLUG[p] === slug) ?? "all";

export default function ProjectsExplorer() {
  const params = useSearchParams();
  const [practice, setPractice] = useState<Filter>(() => practiceFromSlug(params.get("practice")));
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const matches = (p: (typeof AllProjects)[number]) =>
    !needle || p.name.toLowerCase().includes(needle) || p.stack.some((t) => t.toLowerCase().includes(needle));
  const list = AllProjects.filter((p) => (practice === "all" || p.practice === practice) && matches(p));
  const count = (f: Filter) => AllProjects.filter((p) => (f === "all" || p.practice === f) && matches(p)).length;

  const reset = () => {
    setQuery("");
    setPractice("all");
  };

  return (
    <section className={s.panel} aria-labelledby="results-title">
      <div className="wrap">
        <h2 id="results-title" className="sr">
          All projects
        </h2>
        <div className={s.toolbar}>
          <div className={s.filters} role="group" aria-label="Filter by practice">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="fchip"
                aria-pressed={practice === f}
                onClick={() => setPractice(f)}
              >
                {f === "all" ? "All" : PRACTICES[f]}
                <small>{count(f)}</small>
              </button>
            ))}
          </div>
          <div className={s.search}>
            <label htmlFor="pj-search" className="sr">
              Search projects
            </label>
            <HiOutlineMagnifyingGlass size={18} aria-hidden="true" />
            <input
              id="pj-search"
              type="search"
              placeholder="Search by name or technology"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <p className={s.count} aria-live="polite">
          Showing <strong>{list.length}</strong> of {AllProjects.length} projects
        </p>

        {list.length > 0 ? (
          <ul className={s.grid}>
            {list.map((p) => {
              const isPrivate = !p.link || p.link === "#";
              return (
                <li key={p.id}>
                  <article className={s.pj}>
                    <div className={s.media} style={{ background: p.imageBg }}>
                      <Image
                        src={p.image}
                        alt={`${p.name} preview`}
                        fill
                        sizes="(min-width: 1080px) 380px, (min-width: 720px) 50vw, 100vw"
                        className={`${s.img} ${p.imageFit === "cover" ? s.cover : ""} ${p.imagePad ? s.pad : ""}`}
                      />
                      <span className={s.badge}>{PRACTICES[p.practice]}</span>
                    </div>
                    <div className={s.body}>
                      <h3>{p.name}</h3>
                      <p className={s.desc}>{p.description}</p>
                      <ul className={s.tech} aria-label="Technologies">
                        {p.stack.slice(0, MAX_CHIPS).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                        {p.stack.length > MAX_CHIPS && (
                          <li className={s.more}>
                            <span aria-hidden="true">+{p.stack.length - MAX_CHIPS}</span>
                            <span className="sr">{p.stack.slice(MAX_CHIPS).join(", ")}</span>
                          </li>
                        )}
                      </ul>
                      <div className={s.foot}>
                        {isPrivate ? (
                          <span className={s.private}>
                            <HiOutlineLockClosed size={16} aria-hidden="true" />
                            Private client project
                          </span>
                        ) : (
                          <>
                            <span className={s.kind}>{p.linkKind}</span>
                            <a className="btn btn-ink btn-sm" href={p.link} target="_blank" rel="noopener noreferrer">
                              {p.linkLabel ?? "Open"}
                              <span className="sr"> {p.name} (opens in a new tab)</span>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty">
            <h3>No project matches “{query}”</h3>
            <p>Try a technology like React, Python or Power Apps, or show every practice.</p>
            <button className="btn btn-line" type="button" onClick={reset}>
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
