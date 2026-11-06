import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import NavBar from "@/components/navbar/NavBar";
import Magnetic from "@/components/motion/Magnetic";
import s from "./home.module.css";

const TEAMS = ["Sofibanque", "Biware", "Synapse HR", "BhetiConnect", "ITC", "Tunisian Customs"];

// The one choreographed moment of the site: name, then role, then the way in.
// The entrance runs in CSS so it starts with the first paint.
export default function Hero() {
  return (
    <section className={s.hero} aria-label="Introduction">
      <div className={s.heroBg} aria-hidden="true">
        <span className={s.streak} />
      </div>

      <NavBar variant="dark" />

      <div className={s.heroBody}>
        <div className="wrap">
          <p className={`${s.hello} serif`}>I&apos;m David Banitongwa</p>
          <h1 className={`${s.h1} wide`}>
            <span className={s.ln}>
              <span className="neon">Software</span>
            </span>
            <span className={`${s.ln} ${s.ln2}`}>
              <span>
                <span className={s.arrowGlyph} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h16" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
                Engineer
              </span>
            </span>
          </h1>
          <div className={s.heroFoot}>
            <p className={s.heroSub}>
              Also a Microsoft Power Platform developer. I build business apps, web products and AI tools from
              Kinshasa, for teams in Africa and Europe.
            </p>
            <div className="cta-row">
              <Magnetic>
                <Link className="btn btn-neon" href="#work">
                  View my work
                  <span className="ic">
                    <HiArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
              </Magnetic>
              <Link className="btn btn-glass" href="/contact">
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={s.strip}>
        <div className={`wrap ${s.stripIn}`}>
          <p>Teams I&apos;ve built with</p>
          <ul>
            {TEAMS.map((team) => (
              <li key={team}>{team}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
