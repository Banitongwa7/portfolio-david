import React from "react";
import Image from "next/image";
import Skills from "@/data/Skills";
import Experience from "@/data/Experience";
import { MdOutlineWork } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";

export default function About() {
  return (
    <section className="w-full pb-20 transition duration-500">
      {/* 1. Header and Bio Section - Retained from previous iteration */}
      <div className="py-20 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
          A Bit About Me
        </h2>

        <div className="flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto px-4">
          {/* Profile Picture */}
          <div className="p-1 rounded-full border-4 border-indigo-500 dark:border-cyan-400 shadow-xl shadow-indigo-300/50 dark:shadow-cyan-600/30">
            <Image
              src="/assets/david.jpg"
              alt="Picture of david"
              width={180}
              height={180}
              className="rounded-full h-[180px] w-[180px] object-cover"
            />
          </div>

          {/* Title Block */}
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              David Banitongwa
            </h3>
            <p className="text-xl font-medium text-indigo-600 dark:text-cyan-400">
              Software Engineer and Microsoft Power-Platform Developer
            </p>
          </div>

          {/* Main Bio Card */}
          <div className="mt-8 max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border-l-4 border-indigo-500 dark:border-cyan-400">
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-light">
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

      {/* 2. Technical Skills Section - Retained */}
      <div className="w-[90%] md:w-[80%] pt-20 pb-16 mx-auto">
        <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-4">
          <FaLaptopCode className="text-indigo-500 dark:text-cyan-400 text-3xl" />
          Technical Skills
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center">
          {Skills &&
            Skills.map((skill, index) => (
              <div
                key={index}
                className="group flex flex-col items-center p-4 w-full cursor-pointer 
                         transition-all duration-300 ease-in-out transform 
                         hover:scale-105 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg"
              >
                {/* Skill Icon */}
                <div className="text-5xl mb-3 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {skill.icon}
                </div>
                {/* Skill Name */}
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-cyan-300 transition-colors duration-300">
                  {skill.name}
                </p>
              </div>
            ))}
        </div>
        <p className="text-base text-gray-500 dark:text-gray-400 text-center mt-12">
          Proficient across a diverse range of modern technologies and
          platforms.
        </p>
      </div>

      {/* 3. Language Skills Section - Retained */}
      <div className="py-16 border-b border-t border-gray-200 dark:border-gray-800">
        <div className="w-[90%] md:w-[80%] mx-auto">
          <h3 className="text-3xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-100">
            Language Proficiency
          </h3>
          <ul className="grid grid-cols-2 max-w-md mx-auto gap-8 text-center">
            {/* English */}
            <li className="p-4 border-b-2 border-indigo-500 dark:border-cyan-400">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                English
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Professional Working Proficiency
              </p>
            </li>
            {/* French */}
            <li className="p-4 border-b-2 border-indigo-500 dark:border-cyan-400">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                French
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Native Proficiency
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Experience Section - NEW TIMELINE UI */}
      <div
        id="professional-journey"
        className="w-[90%] md:w-[70%] mx-auto pt-20"
      >
        <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-900 dark:text-gray-100">
          Professional Journey 🚀
        </h3>

        {/* Timeline Container */}
        <div className="relative border-l-4 border-indigo-200 dark:border-cyan-900 ml-4 md:ml-12">
          {Experience &&
            Experience.map((exp, index) => (
              <div key={index} className="mb-10 ml-6 md:ml-10">
                {/* Timeline Dot (Pill) */}
                <div
                  className="absolute w-6 h-6 rounded-full -left-3 md:-left-3.5 mt-1.5 
                            bg-indigo-500 dark:bg-cyan-400 border-4 border-white dark:border-gray-900 shadow-md"
                ></div>

                {/* Timeline Card Content */}
                <div
                  className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                            transform transition duration-300 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-cyan-400"
                >
                  <div className="flex items-center justify-between mb-3">
                    {/* Date */}
                    <div className="text-sm font-semibold text-indigo-700 dark:text-cyan-400 tracking-wide">
                      {exp.date}
                    </div>
                    {/* Icon */}
                    <div className="p-1.5 rounded-full bg-indigo-100 dark:bg-cyan-900/50 text-indigo-600 dark:text-cyan-400">
                      <MdOutlineWork className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Position and Company */}
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {exp.position}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium">
                      {exp.company} - {exp.location}
                    </p>
                    {/* Country Icon */}
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
