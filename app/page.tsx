"use client";
import Link from "next/link";
import Image from "next/image";
import AllLinks from "@/data/AllLinks";
import Quotes from "@/data/quotes.json";

export default function Home() {
  const currentDate = new Date()
  const currentDay = Number(String(currentDate.getDate()).padStart(2, "0"));
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const quote = Quotes.find(
    (quote) => quote.day === currentDay && quote.month === currentMonth
  ) || Quotes[0];

  const formatCurrentDate = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[currentMonth - 1]} ${currentDay}, ${currentYear}`;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8 mb-[100px] mt-40">
      <div className="bg-gray-200 relative p-1 rounded-full">
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-green-400 via-cyan-300 to-emerald-400 z-[-1] animate-[ping_5s_linear_infinite] opacity-20"></div>
        <Image
          src="/assets/david.jpg"
          alt="Picture of david"
          priority={true}
          width={200}
          height={200}
          className="rounded-full h-[200px] w-[200px] object-cover"
        />
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-[30px] md:text-[40px] font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-cyan-600 to-green-700 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-slate-300 dark:via-cyan-500 dark:to-green-400">
          David Banitongwa
        </h2>
        <p className="text-[18px] md:text-[20px] font-light w-[80%] md:w-1/2 mx-auto pb-10 dark:text-gray-100">
          I am Software Engineer and Microsoft Power-Platform Developer. Feel
          free to contact me or check out my resume here.
        </p>
        <div className="flex md:flex-row flex-col items-center justify-center gap-5">
          <Link
            href="/contact"
            className="text-[18px] font-normal py-2 px-4 text-white dark:text-[#0f172a] duration-500 ease-in-out hover:shadow-md rounded-full bg-gray-900 dark:bg-gray-100 dark:hover:bg-gray-200 group relative inline-flex items-center justify-center overflow-hidden"
          >
            <span>Contact me</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20 dark:bg-gray-500/20"></div>
            </div>
          </Link>
          <Link
            href={AllLinks.needService}
            target="_blank"
            className="text-[18px] font-normal py-2 px-4 text-[#0f172a] border border-[#0f172a] dark:text-white duration-500 ease-in-out hover:shadow-md rounded-full group relative inline-flex items-center justify-center overflow-hidden dark:border dark:border-white"
          >
            <span>Need my services?</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20 dark:bg-gray-500/20"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quote of the day */}

      <figure className="max-w-screen-md mx-auto text-center mt-28">
        <svg
          className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        {/* title Quote of the day */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 text-center">Quote of the day</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-9 text-center mt-2">{formatCurrentDate()}</p>
        <blockquote>
          <p className="text-2xl italic font-medium text-gray-900 dark:text-white">{`"${quote.quote}"`}</p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <cite className="pe-3 font-medium text-gray-900 dark:text-gray-300">
              {quote.author}
            </cite>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
