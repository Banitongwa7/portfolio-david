"use client";
import React from "react";
import Image from "next/image";
import Skills from "@/data/Skills";
import Experience from "@/data/Experience";
import { MdOutlineWork } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { HiMiniRocketLaunch } from "react-icons/hi2";

export default function About() {
  return (
    <section className="w-full pt-10 pb-20 transition duration-500">
      <div className="py-12 md:py-20 border-b border-gray-200 dark:border-gray-800 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10 md:mb-12 text-center text-gray-900 dark:text-gray-100">
          A Bit About Me
        </h2>

        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="p-1 rounded-full border-4 border-indigo-500 dark:border-cyan-400 shadow-xl shadow-indigo-300/50 dark:shadow-cyan-600/30">
            <Image
              src="/assets/david.jpg"
              alt="Picture of david"
              width={180}
              height={180}
              className="rounded-full h-[150px] w-[150px] md:h-[180px] md:w-[180px] object-cover transition-all duration-300"
            />
          </div>

          <div className="text-center space-y-1 px-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              David Banitongwa
            </h3>
            <p className="text-base md:text-xl font-medium text-indigo-600 dark:text-cyan-400">
              Software Engineer and Microsoft Power-Platform Developer
            </p>
          </div>

          <div className="mt-6 md:mt-8 max-w-3xl w-full bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border-l-4 border-indigo-500 dark:border-cyan-400">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-light">
              Passionate and versatile{" "}
              <strong className="font-semibold text-indigo-600 dark:text-cyan-400">
                Full-stack Web Developer
              </strong>
              , I create tailored solutions (websites, applications, etc.) that
              perfectly fit your needs. My core competencies include the{" "}
              <strong className="font-semibold">MERN Stack</strong>,{" "}
              <strong className="font-semibold">Next.js</strong>,{" "}
              <strong className="font-semibold">Python</strong>, and the{" "}
              <strong className="font-semibold">
                Microsoft Power Platform
              </strong>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full pt-16 md:pt-20 pb-12 md:pb-16 mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 md:mb-16 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-4">
          <FaLaptopCode className="text-indigo-500 dark:text-cyan-400 text-3xl" />
          Technical Skills
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 justify-items-center">
          {Skills &&
            Skills.map((skill, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-3 md:p-4 w-full cursor-pointer 
                  transition-all duration-300 ease-in-out transform 
                  hover:scale-105 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg"
              >
                <div className="text-4xl md:text-5xl mb-2 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {skill.icon}
                </div>

                <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-cyan-300 transition-colors duration-300 text-center">
                  {skill.name}
                </p>
              </div>
            ))}
        </div>

        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center mt-8 md:mt-12 px-4">
          Proficient across a diverse range of modern technologies and
          platforms.
        </p>
      </div>

      <div className="py-12 md:py-16 border-b border-t border-gray-200 dark:border-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 md:mb-16 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-4">
            <IoLanguage className="text-indigo-500 dark:text-cyan-400 text-3xl" />
            Language Proficiency
          </h3>

          <ul className="grid grid-cols-2 w-full max-w-sm sm:max-w-md mx-auto gap-4 md:gap-8 text-center">
            <li className="p-3 md:p-4 border-b-2 border-indigo-500 dark:border-cyan-400">
              <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                English
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Professional Working Proficiency
              </p>
            </li>

            <li className="p-3 md:p-4 border-b-2 border-indigo-500 dark:border-cyan-400">
              <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                French
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Native Proficiency
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="professional-journey"
        className="max-w-4xl w-full mx-auto pt-16 md:pt-20 px-4"
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-10 md:mb-16 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-4">
          <HiMiniRocketLaunch className="text-indigo-500 dark:text-cyan-400 text-3xl" />
          Professional Journey
        </h3>

        <div className="relative border-l-4 border-indigo-200 dark:border-cyan-900 ml-4 sm:ml-8 md:ml-12">
          {Experience &&
            Experience.map((exp, index) => (
              <div key={index} className="mb-8 md:mb-10 ml-6 sm:ml-8 md:ml-10">
                <div
                  className="absolute w-5 h-5 md:w-6 md:h-6 rounded-full -left-2.5 sm:-left-3.5 md:-left-3.5 mt-1.5 
                             bg-indigo-500 dark:bg-cyan-400 border-4 border-white dark:border-gray-900 shadow-md"
                ></div>

                <div
                  className="p-4 md:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                             transform transition duration-300 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-cyan-400"
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="text-xs md:text-sm font-semibold text-indigo-700 dark:text-cyan-400 tracking-wide">
                      {exp.date}
                    </div>

                    <div className="p-1 md:p-1.5 rounded-full bg-indigo-100 dark:bg-cyan-900/50 text-indigo-600 dark:text-cyan-400">
                      <MdOutlineWork className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>

                  <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
                    {exp.position}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium">
                      {exp.company} - {exp.location}
                    </p>

                    <Image
                      src={exp.icon}
                      width={16}
                      height={16}
                      alt={`Flag for ${exp.location}`}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
