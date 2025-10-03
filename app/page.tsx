"use client";
import Link from "next/link";
import Image from "next/image";
import AllLinks from "@/data/AllLinks";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20 md:py-32 lg:py-40 px-4 min-h-[80vh]">
      <div className="bg-gray-200 relative p-1 rounded-full">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-green-400 via-cyan-300 to-emerald-400 z-[-1] animate-[ping_5s_linear_infinite] opacity-20"></div>
        <Image
          src="/assets/david.jpg"
          alt="Picture of david"
          priority={true}
          width={200}
          height={200}
          className="rounded-full h-32 w-32 md:h-48 md:w-48 object-cover transition-all duration-300"
        />
      </div>

      <div className="text-center space-y-4 max-w-4xl w-full">
        <h2 className="text-[30px] md:text-[40px] font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-cyan-600 to-green-700 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-slate-300 dark:via-cyan-500 dark:to-green-400">
          David Banitongwa
        </h2>

        <p className="text-lg md:text-xl font-light w-full max-w-xl mx-auto pb-10 dark:text-gray-100 px-4">
          I am Software Engineer and Microsoft Power-Platform Developer. Feel
          free to contact me or check out my resume here.
        </p>
        <div className="flex md:flex-row flex-col items-center justify-center gap-4 md:gap-8 px-4">
          <Link
            href="/contact"
            className="text-lg font-medium py-3 px-6 text-white dark:text-[#0f172a] duration-500 ease-in-out hover:shadow-lg rounded-full bg-gray-900 dark:bg-gray-100 dark:hover:bg-gray-200 group relative inline-flex items-center justify-center overflow-hidden w-full md:w-auto transition-colors"
          >
            <span>Contact me</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20 dark:bg-gray-500/20"></div>
            </div>
          </Link>
          <Link
            href={AllLinks.needService}
            target="_blank"
            className="text-lg font-medium py-3 px-6 text-[#0f172a] border border-[#0f172a] dark:text-white duration-500 ease-in-out hover:shadow-lg rounded-full group relative inline-flex items-center justify-center overflow-hidden dark:border-white w-full md:w-auto transition-colors"
          >
            <span>Need my services?</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20 dark:bg-gray-500/20"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
