import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="og:title" content="Portfolio | David" />
        <meta
          property="og:description"
          content="Personal Portfolio created by David Banitongwa"
        />
        <meta
          property="og:image"
          content="https://david-banitongwa.vercel.app/assets/icon.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="twitter:title" content="Portfolio | David" />
        <meta
          property="twitter:description"
          content="Personal Portfolio created by David Banitongwa"
        />
        <meta
          property="twitter:image"
          content="https://david-banitongwa.vercel.app/assets/icon.png"
        />
      </Head>
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
          <div className="flex items-center justify-center">
            <Link
              href="/contact"
              className="text-[18px] font-normal py-2 px-4 text-white hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-md rounded-full bg-gray-900 hover:bg-gray-700 uppercase"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
