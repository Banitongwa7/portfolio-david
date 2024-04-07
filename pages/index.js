import React from "react";
import Link from "next/link";
import Image from "next/image";
import CustomLayout from "@/components/layout/customlayout";

export default function Home() {
  const metatags = {
    title: "Portfolio | David",
    description: "Personal Portfolio created by David Banitongwa",
    image: "/assets/icon.png",
  };

  return (
    <CustomLayout item={metatags}>
      <section className="flex flex-col items-center justify-center gap-8 container my-[100px]">
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
          <div className="flex items-center justify-center">

            <Link href="/contact" className="text-[18px] font-normal py-2 px-4 text-white dark:text-[#0f172a] duration-500 ease-in-out hover:shadow-md rounded-full bg-gray-900 uppercase dark:bg-gray-100 dark:hover:bg-gray-200 group relative inline-flex items-center justify-center overflow-hidden"><span>Contact me</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20 dark:bg-gray-500/20"></div></div></Link>




          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
