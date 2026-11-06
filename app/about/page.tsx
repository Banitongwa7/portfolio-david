import Image from "next/image";
import Link from "next/link";
import { HiArrowUpRight, HiOutlineCloud, HiOutlineCodeBracket, HiOutlineSparkles, HiOutlineSquares2X2 } from "react-icons/hi2";
import AllLinks from "@/data/AllLinks";
import Experience from "@/data/Experience";
import Skills from "@/data/Skills";
import TimelineDraw from "@/components/motion/TimelineDraw";
import EndCta from "@/components/site/EndCta";
import { formatRange, formatRole } from "@/utils/format";
import s from "@/components/about/about.module.css";

// Readable labels for a few skill names stored in data/Skills.tsx.
const LABELS: Record<string, string> = {
  "Next JS": "Next.js",
  "React JS": "React",
  "Node JS": "Node.js",
  PowerFx: "Power Fx",
  Automatization: "Automation",
  "Database SQL & NoSQL": "SQL & NoSQL databases",
};

const GROUPS = [
  {
    title: "Web and mobile",
    icon: <HiOutlineCodeBracket aria-hidden="true" />,
    text: "Interfaces and APIs for products people use every day, on the web and on phones.",
    names: ["Next JS", "React JS", "React Native", "TypeScript", "Node JS", "Tailwind CSS", "Bootstrap", "UI/UX Design"],
  },
  {
    title: "Business apps",
    icon: <HiOutlineSquares2X2 aria-hidden="true" />,
    text: "Low-code apps and automated flows that replace manual work inside companies.",
    names: ["Power Platform", "PowerFx", "Microsoft", "Automatization"],
  },
  {
    title: "Data and AI",
    icon: <HiOutlineSparkles aria-hidden="true" />,
    text: "Models, dashboards and the databases behind them.",
    names: ["Artificial Intelligence", "Python", "Data Visualization", "Database SQL & NoSQL"],
  },
  {
    title: "Cloud and workflow",
    icon: <HiOutlineCloud aria-hidden="true" />,
    text: "The environment that keeps projects versioned, deployed and running.",
    names: ["Cloud Computing", "Git", "Linux"],
  },
];

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

export default function About() {
  // Every skill lands in a group; anything new falls into the last one.
  const grouped = GROUPS.map((g) => ({ ...g, skills: Skills.filter((sk) => g.names.includes(sk.name)) }));
  const ungrouped = Skills.filter((sk) => !GROUPS.some((g) => g.names.includes(sk.name)));
  grouped[grouped.length - 1].skills.push(...ungrouped);

  const current = Experience.find((e) => /now/i.test(e.date));
  const firstYear = Experience[Experience.length - 1].date.match(/\d{4}/)?.[0];

  return (
    <>
      <section className="phead" aria-labelledby="page-title">
        <div className={`wrap ${s.abHead}`}>
          <div>
            <span className="tag">About</span>
            <h1 id="page-title">
              Hi, I&apos;m <span className="serif">David Banitongwa</span>
            </h1>
            <p className={s.bio}>
              A <strong>software engineer</strong> who designs and builds modern digital solutions, from dynamic
              websites to intelligent business applications. My work spans <strong>Next.js</strong>,{" "}
              <strong>React</strong>, <strong>React Native</strong>, <strong>TypeScript</strong>,{" "}
              <strong>Node.js</strong>, <strong>Python</strong>, databases and the{" "}
              <strong>Microsoft Power Platform</strong>, along with AI, data and cloud technologies.
            </p>
            <div className="cta-row">
              <a className="btn btn-neon" href={AllLinks.needService} target="_blank" rel="noopener noreferrer">
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
          <dl className={s.facts} aria-label="Quick facts">
            <div className={s.fact}>
              <dt>Based in</dt>
              <dd>Kinshasa, DR&nbsp;Congo</dd>
            </div>
            {current && (
              <div className={s.fact}>
                <dt>Currently</dt>
                <dd>
                  {formatRole(current.position)}
                  <small>
                    {current.company}, since {formatRange(current.date).split(" – ")[0]}
                  </small>
                </dd>
              </div>
            )}
            <div className={s.fact}>
              <dt>Experience</dt>
              <dd>
                {Experience.length} experiences since {firstYear}
                <small>DR Congo, Tunisia and France</small>
              </dd>
            </div>
            <div className={s.fact}>
              <dt>Languages</dt>
              <dd>
                French, native
                <small>English, professional working proficiency</small>
              </dd>
            </div>
            <div className={s.fact}>
              <dt>Status</dt>
              <dd>
                <span className="live">
                  <span className="pulse" />
                  Open to new projects
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="skills-title">
        <div className="wrap">
          <span className="tag">Skills</span>
          <h2 id="skills-title" className="h2">
            {Skills.length} skills across {grouped.length} areas
          </h2>
          <div className={s.skills}>
            {grouped.map((group) => (
              <article key={group.title} className={s.sk}>
                <div className={s.skTop}>
                  <span className={s.skIc}>{group.icon}</span>
                  <h3>{group.title}</h3>
                  <span className={s.skCount}>{group.skills.length} skills</span>
                </div>
                <p>{group.text}</p>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill.id}>
                      <span aria-hidden="true">{skill.icon}</span>
                      {LABELS[skill.name] ?? skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="professional-journey" className={`dark ${s.journey}`} aria-labelledby="journey-title">
        <div className="wrap">
          <span className="tag tag-dark">Journey</span>
          <h2 id="journey-title" className="h2">
            From Tunis to Kinshasa: {WORDS[Experience.length] ?? Experience.length} experiences since {firstYear}
          </h2>
          <TimelineDraw className={s.tl}>
            <span className={s.tlLine} data-line aria-hidden="true" />
            <ol>
              {Experience.map((exp) => {
                const now = /now/i.test(exp.date);
                return (
                  <li key={exp.id} className={now ? `${s.item} ${s.now}` : s.item}>
                    <p className={s.date}>{formatRange(exp.date)}</p>
                    <span className={s.dot} data-dot aria-hidden="true" />
                    <div className={s.itemBody}>
                      <h3>
                        {formatRole(exp.position)}
                        {now && <span className={s.badge}>Current</span>}
                      </h3>
                      <p className={s.meta}>
                        <Image src={exp.icon} alt="" width={20} height={20} />
                        {exp.company}, {exp.location}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </TimelineDraw>
        </div>
      </section>

      <EndCta
        title="Want to build something together?"
        text="Tell me about your project and I'll come back with questions, a scope and an estimate."
      />
    </>
  );
}
