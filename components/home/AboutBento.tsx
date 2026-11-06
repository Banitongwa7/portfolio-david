import Image from "next/image";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import ScrollFill from "@/components/motion/ScrollFill";
import AllProjects from "@/data/AllProjects";
import Experience from "@/data/Experience";
import DRCongo from "../../public/assets/dr-congo.svg";
import Tunisia from "../../public/assets/tunisia.svg";
import France from "../../public/assets/france.svg";
import s from "./home.module.css";

const FLAGS = [
  { src: DRCongo, alt: "DR Congo" },
  { src: Tunisia, alt: "Tunisia" },
  { src: France, alt: "France" },
];

export default function AboutBento() {
  const firstYear = Experience[Experience.length - 1].date.match(/\d{4}/)?.[0];

  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap">
        <div className={s.aboutHead}>
          <div>
            <span className="tag">About</span>
            <ScrollFill id="about-title" className={s.aboutTitle}>
              I turn manual business processes into apps that run themselves, and build the web products around them.
            </ScrollFill>
            <p className="lead">
              My toolkit has two sides: Next.js, React, Node.js and Python for products; Power Apps, Power Automate,
              Dataverse and Power BI for business processes.
            </p>
          </div>
          <div className={s.deco} aria-hidden="true">
            <span className={`${s.gp} ${s.g1}`} />
            <span className={`${s.gp} ${s.g2}`} />
            <span className={`${s.gp} ${s.g3}`} />
          </div>
        </div>

        <div className={s.bento}>
          <article className={`${s.b} ${s.bA}`}>
            <span className={s.bIc}>
              <HiOutlineGlobeAlt size={24} aria-hidden="true" />
            </span>
            <div>
              <p className={s.num}>
                5 <span className={s.unit}>countries</span>
              </p>
              <p className={s.bText}>
                DigiLAF, a credit analysis app built on Power Platform, is deployed in Côte d&apos;Ivoire, Tunisia,
                Ghana, Nigeria and Cameroon.
              </p>
            </div>
          </article>
          <article className={`${s.b} ${s.bB}`}>
            <div className={s.flags}>
              {FLAGS.map((flag) => (
                <Image key={flag.alt} src={flag.src} alt={flag.alt} width={52} height={52} />
              ))}
            </div>
            <div>
              <p className={s.bTitle}>Since {firstYear}</p>
              <p className={s.bText}>{Experience.length} experiences across DR&nbsp;Congo, Tunisia and France.</p>
            </div>
          </article>
          <article className={`${s.b} ${s.bD}`}>
            <span className={s.bRings} aria-hidden="true">
              <span className={s.bPin} />
            </span>
            <div>
              <span className="live">
                <span className="pulse" />
                Open to new projects
              </span>
              <p>Based in Kinshasa, DR&nbsp;Congo. Working in French and English.</p>
            </div>
          </article>
          <article className={`${s.b} ${s.bC}`}>
            <p className={`${s.num} ink-grad`}>{AllProjects.length}</p>
            <p className={s.bText}>projects shipped, from CRM pipelines to AI copilots.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
