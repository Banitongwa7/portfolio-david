import React from "react";
import Image from "next/image";
import Link from "next/link";
import Skills from "@/data/Skills";
import Experience from "@/data/Experience";
import PageHeader from "@/components/pageheader/PageHeader";

const HIGHLIGHT = "font-semibold text-slate-900 dark:text-slate-100";

const LANGUAGES = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "French", level: "Native Proficiency" },
];

export default function About() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <PageHeader eyebrow="About" title="A Bit About Me" />

      <section className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/david.jpg"
            alt="Portrait of David Banitongwa"
            width={220}
            height={220}
            className="h-40 w-40 rounded-full object-cover ring-4 ring-white dark:ring-slate-800 md:h-52 md:w-52"
          />
          <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
            David Banitongwa
          </h2>
          <p className="mt-1 max-w-xs text-sm font-medium text-accent-700 dark:text-accent-400">
            Software Engineer and Microsoft Power-Platform Developer
          </p>
        </div>

        <div className="card p-6 md:p-8">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            Passionate and versatile{" "}
            <strong className={HIGHLIGHT}>Software Engineer</strong>, I design
            and build modern digital solutions, from dynamic websites to
            intelligent applications that perfectly fit your needs. My expertise
            spans the <strong className={HIGHLIGHT}>MERN Stack</strong>,{" "}
            <strong className={HIGHLIGHT}>Next.js</strong>,{" "}
            <strong className={HIGHLIGHT}>React</strong>,{" "}
            <strong className={HIGHLIGHT}>React Native</strong>,{" "}
            <strong className={HIGHLIGHT}>TypeScript</strong>,{" "}
            <strong className={HIGHLIGHT}>NodeJS</strong>,{" "}
            <strong className={HIGHLIGHT}>Database</strong>,{" "}
            <strong className={HIGHLIGHT}>Python</strong>, the{" "}
            <strong className={HIGHLIGHT}>Microsoft Power Platform</strong> and{" "}
            <strong className={HIGHLIGHT}>More</strong>.{" "}
            {"I’m also skilled in "}
            <strong className={HIGHLIGHT}>AI</strong>,{" "}
            <strong className={HIGHLIGHT}>Data</strong>,{" "}
            <strong className={HIGHLIGHT}>Cloud technologies</strong>, and{" "}
            <strong className={HIGHLIGHT}>Emerging innovations</strong> shaping
            the future of software development.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">
              Contact me
            </Link>
            <Link href="/projects" className="btn btn-secondary">
              View my projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <SectionTitle
          title="Technical Skills"
          description="Proficient across a diverse range of modern technologies and platforms."
        />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Skills.map((skill) => (
            <li
              key={skill.id}
              className="card flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <span
                aria-hidden="true"
                className="shrink-0 text-xl text-accent-600 dark:text-accent-400"
              >
                {skill.icon}
              </span>
              {skill.name}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-[1fr_2fr] md:gap-12">
        <section>
          <SectionTitle title="Languages" />
          <ul className="space-y-3">
            {LANGUAGES.map((language) => (
              <li key={language.name} className="card px-5 py-4">
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  {language.name}
                </p>
                <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                  {language.level}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="professional-journey">
          <SectionTitle title="Professional Journey" />
          <ol className="relative ms-1.5 border-s border-slate-200 dark:border-slate-800">
            {Experience.map((exp) => (
              <li key={exp.id} className="mb-8 ms-6 last:mb-0">
                <span
                  aria-hidden="true"
                  className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-[#f8f8f8] bg-accent-500 dark:border-[#0f172a]"
                />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {exp.date}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
                  {exp.position}
                </h3>
                <p className="mt-0.5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  {exp.company} · {exp.location}
                  <Image
                    src={exp.icon}
                    width={16}
                    height={16}
                    alt=""
                    className="rounded-sm"
                  />
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
