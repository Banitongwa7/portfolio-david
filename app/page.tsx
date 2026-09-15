import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import type { PostType } from "@/types/types";
import AllLinks from "@/data/AllLinks";
import AllProjects from "@/data/AllProjects";
import Experience from "@/data/Experience";
import ProjectCard from "@/components/cards/ProjectCard";
import SocialLinks from "@/components/social/SocialLinks";
import { getPosts } from "@/utils/hashnode";

const FEATURED_PROJECTS = 3;
const LATEST_POSTS = 3;

export default async function Home() {
  const currentRole = Experience[0];
  let latestPosts: PostType[] = [];

  try {
    latestPosts = (await getPosts()).slice(0, LATEST_POSTS);
  } catch (err) {
    // The home page stays usable without the articles section.
    console.error("Error fetching blog posts:", err);
  }

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1fr_auto] md:gap-16 md:pb-12 md:pt-24">
        <div className="order-2 md:order-1">
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
            {"Hi, I'm David Banitongwa."}
          </h1>
          <p className="mt-3 text-xl font-semibold text-slate-500 dark:text-slate-400 sm:text-2xl">
            Software Engineer &amp; Microsoft Power Platform Developer
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            I design and build modern digital solutions, from dynamic websites
            to intelligent business applications, with Next.js, React, Node.js,
            Python and the Microsoft Power Platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">
              Contact me
            </Link>
            <Link href="/projects" className="btn btn-secondary">
              View my projects
            </Link>
          </div>

          <SocialLinks className="-ml-2.5 mt-8" />
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent-400/40 via-cyan-400/20 to-transparent blur-2xl"
            />
            <Image
              src="/assets/david.jpg"
              alt="Portrait of David Banitongwa"
              priority={true}
              width={320}
              height={320}
              className="relative h-40 w-40 rounded-full object-cover ring-4 ring-white dark:ring-slate-800 sm:h-56 sm:w-56 md:h-72 md:w-72"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading title="Selected projects" href="/projects" linkLabel="All projects" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AllProjects.slice(0, FEATURED_PROJECTS).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading title="Latest articles" href="/blog" linkLabel="All articles" />
          <ul className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="text-base font-semibold text-slate-900 transition-colors group-hover:text-accent-700 dark:text-slate-100 dark:group-hover:text-accent-400 sm:text-lg">
                    {post.title}
                  </span>
                  <span className="shrink-0 text-sm tabular-nums text-slate-500 dark:text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · {post.readTimeInMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6">
        <div className="card relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent-400/20 blur-3xl"
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            {"I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."}
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <a
              href={AllLinks.needService}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Need my services?
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
        {title}
      </h2>
      <Link href={href} className="text-link shrink-0 text-sm">
        {linkLabel}
        <HiArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
