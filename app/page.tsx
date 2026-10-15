import Link from "next/link";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import type { PostType } from "@/types/types";
import AllLinks from "@/data/AllLinks";
import AllProjects from "@/data/AllProjects";
import ProjectCard from "@/components/cards/ProjectCard";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import Intro from "@/components/motion/Intro";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/section/SectionHeading";
import SocialLinks from "@/components/social/SocialLinks";
import { getPosts } from "@/utils/hashnode";

const FEATURED_PROJECTS = 3;
const LATEST_POSTS = 3;

export default async function Home() {
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
        <Intro className="order-2 md:order-1">
          <HeadlineReveal
            text="Hi, I'm David Banitongwa."
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl"
          />
          <p
            data-intro
            className="mt-3 text-xl font-semibold text-slate-500 dark:text-slate-400 sm:text-2xl"
          >
            Software Engineer &amp; Microsoft Power Platform Developer
          </p>
          <p
            data-intro
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            I design and build modern digital solutions, from dynamic websites
            to intelligent business applications, with Next.js, React, Node.js,
            Python and the Microsoft Power Platform.
          </p>

          <div data-intro className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link href="/contact" className="btn btn-primary">
                Contact me
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/projects" className="btn btn-secondary">
                View my projects
              </Link>
            </Magnetic>
          </div>

          <div data-intro>
            <SocialLinks className="-ml-2.5 mt-8" />
          </div>
        </Intro>

        <Intro className="order-1 flex justify-center md:order-2" delay={0.1}>
          <div data-intro className="relative">
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
        </Intro>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            title="Work"
            meta={`${AllProjects.length} projects`}
            href="/projects"
            linkLabel="All projects"
          />
          <Reveal items="article" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AllProjects.slice(0, FEATURED_PROJECTS).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Reveal>
      </section>

      {latestPosts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <SectionHeading
              title="Writing"
              meta="Tools, dev and AI — in French and English"
              href="/blog"
              linkLabel="All articles"
            />
            <Reveal items="li" className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group -mx-3 flex flex-col gap-1 rounded-xl px-3 py-5 transition-colors hover:bg-slate-900/[0.03] sm:flex-row sm:items-baseline sm:gap-8 dark:hover:bg-white/[0.04]"
                  >
                    <span className="text-base font-semibold text-slate-900 transition-colors group-hover:text-accent-700 dark:text-slate-100 dark:group-hover:text-accent-400 sm:text-lg">
                      {post.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400 sm:ml-auto">
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                      <span aria-hidden="true">·</span>
                      {post.readTimeInMinutes} min
                      <HiArrowRight
                        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </Reveal>
        </section>
      )}

      <Reveal className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <section className="flex flex-col gap-6 border-t border-slate-200 pt-12 md:flex-row md:items-center md:justify-between dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
              {"I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
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
        </section>
      </Reveal>
    </>
  );
}
