import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import Experience from "@/data/Experience";
import { formatRange, formatRole } from "@/utils/format";
import s from "./home.module.css";

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

export default function JourneyGrid() {
  const recent = Experience.slice(0, 5);
  const earlier = Experience.slice(5);
  const firstYear = Experience[Experience.length - 1].date.match(/\d{4}/)?.[0];
  const count = WORDS[Experience.length] ?? String(Experience.length);

  return (
    <section id="journey" className="sec" aria-labelledby="journey-title">
      <div className="wrap">
        <span className="tag">Journey</span>
        <h2 id="journey-title" className="h2">
          From Tunis to Kinshasa: {count} experiences since {firstYear}.
        </h2>
        <div className={s.jgrid}>
          {recent.map((exp) => {
            const current = /now/i.test(exp.date);
            return (
              <article key={exp.id} className={current ? `${s.jc} ${s.jcDark}` : s.jc}>
                <div className={s.jcTop}>
                  <Image className={s.flag} src={exp.icon} alt="" width={40} height={40} />
                  <div>
                    <p className={s.jcCo}>{exp.company}</p>
                    <p className={s.jcLoc}>{exp.location}</p>
                  </div>
                  {current && (
                    <span className={s.jcBadge}>
                      <span className="pulse" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className={s.jcRole}>{formatRole(exp.position)}</h3>
                <p className={s.jcDate}>{formatRange(exp.date)}</p>
              </article>
            );
          })}
          {earlier.length > 0 && (
            <article className={`${s.jc} ${s.jcGrad}`}>
              <p className={s.jcLabel}>Earlier</p>
              <div className={s.jcCap}>
                <ul className={s.jcEarly}>
                  {earlier.map((exp) => (
                    <li key={exp.id}>
                      <strong>{exp.company}</strong>
                      {formatRole(exp.position)}, {exp.date.match(/\d{4}/)?.[0]}
                    </li>
                  ))}
                </ul>
                <Link className="round-link" href="/about#professional-journey" aria-label="See the full journey">
                  <HiArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
