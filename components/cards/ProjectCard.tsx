import Image from "next/image";
import { HiArrowUpRight, HiLockClosed } from "react-icons/hi2";
import type AllProjects from "@/data/AllProjects";

type Project = (typeof AllProjects)[number];

const MAX_TECHS = 4;

const TECH_LABELS: Record<string, string> = {
  angular: "Angular",
  azure: "Azure",
  csharp: "C#",
  dataverse: "Dataverse",
  django: "Django",
  express: "Express",
  java: "Java",
  kotlin: "Kotlin",
  kubernetes: "Kubernetes",
  laravel: "Laravel",
  nextjs: "Next.js",
  nodejs: "Node.js",
  openai: "OpenAI",
  postgresql: "PostgreSQL",
  powerapps: "Power Apps",
  powerautomate: "Power Automate",
  powerbi: "Power BI",
  python: "Python",
  reactjs: "React",
  sass: "Sass",
  springboot: "Spring Boot",
  sqlserver: "SQL Server",
  streamlit: "Streamlit",
  swift: "Swift",
  tailwind: "Tailwind CSS",
};

export default function ProjectCard({ project }: { project: Project }) {
  const techs = Object.entries(project.techs);
  const hasPublicLink = project.link !== "#";

  return (
    <article className="card group relative flex flex-col overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {hasPublicLink ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
          {techs.slice(0, MAX_TECHS).map(([key, icon]) => (
            <li
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              <span aria-hidden="true">{icon}</span>
              {TECH_LABELS[key] ?? key}
            </li>
          ))}
          {techs.length > MAX_TECHS && (
            <li
              title={techs
                .slice(MAX_TECHS)
                .map(([key]) => TECH_LABELS[key] ?? key)
                .join(", ")}
              className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400"
            >
              +{techs.length - MAX_TECHS}
            </li>
          )}
        </ul>

        <div className="mt-auto pt-5 text-sm">
          {hasPublicLink ? (
            <span className="text-link">
              View project
              <HiArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
              <HiLockClosed className="h-4 w-4" aria-hidden="true" />
              No public link
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
