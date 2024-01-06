import React from "react";
import Link from "next/link";
import Image from "next/image";
import AllLinks from "@/data/AllLinks";

export default function Home() {

  return (
    <>
    <section className="flex flex-col items-center justify-center gap-8 container my-[100px]">
      <div>
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
        <h2 className="text-[30px] md:text-[40px] font-extrabold uppercase">
          David Banitongwa
        </h2>
        <p className="text-[18px] md:text-[20px] font-light w-[80%] md:w-1/2 mx-auto pb-10">
          I am Software Engineer and Microsoft Power-Platform Developer. Feel
          free to contact me or check out my resume here.
        </p>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <Link
            href="/contact"
            className="text-[18px] font-normal py-2 px-4 text-white rounded-md duration-200 bg-gray-900 hover:bg-gray-700 uppercase"
          >
            Contact Me
          </Link>

          <Link
            href={AllLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[18px] font-normal py-2 px-4 text-white rounded-md duration-200 bg-gray-900 hover:bg-gray-700 uppercase"
          >
            See My Resume
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
