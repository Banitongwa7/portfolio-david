import React from "react";
import Image from "next/image";
import Skills from "@/data/Skills";
import CustomLayout from "@/components/layout/customlayout";

export default function about() {
  const metatags = {
    title: "About me",
    description: "Passionate and versatile Fullstack web developer, I create tailored solutions (websites, applications, etc.) that perfectly fit your needs. My skills include MERN Stack, NextJS, Python, and Microsoft Power Platform.",
    image: "/assets/icon.png",
  }

  return (
    <CustomLayout item={metatags}>
      <section className="container w-full pb-[100px]">
        <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%]">
          About Me
        </h2>
        <div className="flex flex-col items-center justify-center gap-8">
          <div>
            <Image
              src="/assets/david.jpg"
              alt="Picture of david"
              width={200}
              height={200}
              className="rounded-full h-[200px] w-[200px] object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-[30px] font-medium">David Banitongwa</h2>
            <p className="text-[20px] font-mono text-[#6B7280]">
              Software Engineer and Microsoft Power-Platform Developer
            </p>
          </div>
        </div>
        <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30" />
        <div className="w-[80%] mx-auto">
          <p className="font-['Poppins', sans-serif] text-[20px] text-[#6B7280]">
            Passionate and versatile{" "}
            <span className="font-bold">Fullstack web developer</span>, I create
            tailored solutions (websites, applications, etc.) that perfectly fit
            your needs. My skills include{" "}
            <span className="font-bold">MERN Stack</span>,{" "}
            <span className="font-bold">NextJS</span>,{" "}
            <span className="font-bold">Python</span>, and{" "}
            <span className="font-bold">Microsoft Power Platform</span>.
          </p>
        </div>
        <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30" />
        <div className="w-[80%] mx-auto space-y-5">
          <h3 className="text-[30px] font-mono text-center">
            Technical Skills
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center text-center pt-[40px] skills-custom">
            {Skills.map((skill, index) => (
              <li key={index}>
                {skill.icon}
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[20px] text-[#6B7280] text-center mt-8">
            And more
          </p>
        </div>

        <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30" />

        <div className="w-[80%] mx-auto space-y-5">
          <h3 className="text-[30px] font-mono text-center">Language Skills</h3>
          <ul className="pt-[40px] grid grid-cols-1 md:grid-cols-2 justify-items-center text-center skills-custom">
            <li>
              <p className="icon-language">English</p>
              <p>Professional</p>
            </li>
            <li>
              <p className="icon-language">French</p>
              <p>Native</p>
            </li>
            <li>
              <p className="icon-language">Lingala</p>
              <p>Native</p>
            </li>
            <li>
              <p className="icon-language">Swahili</p>
              <p>Native</p>
            </li>
          </ul>
        </div>

        <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30" />

        <div id="education-experience-custom" className=" w-[80%] mx-auto">
          <div className="experience space-y-16">
            <h3 className="text-[30px] font-mono text-center">Experience</h3>
            <ul className="relative space-y-14">
              <li className="pl-8 relative">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#d5d5d5] text-[12px] md:text-[15px] font-semibold rounded-full px-2 py-2 md:px-4 md:py-2">
                    02/2023 - Now
                  </div>
                  <div className="w-[70%] space-y-2">
                    <p className="font-semibold">Full Stack Web Developer</p>
                    <p className="text-[12px] font-mono">
                      Synapse-HR - Tunis/Tunisie
                    </p>
                  </div>
                </div>
              </li>

              <li className="pl-8 relative">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#d5d5d5] text-[12px] md:text-[15px] font-semibold rounded-full px-2 py-2 md:px-4 md:py-2">
                    10/2022 - Now
                  </div>
                  <div className="w-[70%] space-y-2">
                    <p className="font-semibold">
                      Consultant Microsoft Power Platform
                    </p>
                    <p className="text-[12px] font-mono">
                      Biware - Tunis/Tunisie
                    </p>
                  </div>
                </div>
              </li>

              <li className="pl-8 relative">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#d5d5d5] text-[12px] md:text-[15px] font-semibold rounded-full px-2 py-2 md:px-4 md:py-2">
                    09/2022 - 08/2023
                  </div>
                  <div className="w-[70%] space-y-2">
                    <p className="font-semibold">
                      React JS developer - Freelance
                    </p>
                    <p className="text-[12px] font-mono">
                      BhetiConnect - France
                    </p>
                  </div>
                </div>
              </li>

              <li className="pl-8 relative">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#d5d5d5] text-[12px] md:text-[15px] font-semibold rounded-full px-2 py-2 md:px-4 md:py-2">
                    02/2022 - 06/2022
                  </div>
                  <div className="w-[70%] space-y-2">
                    <p className="font-semibold">
                      Full Stack Web Developer - Intern
                    </p>
                    <p className="text-[12px] font-mono">ITC - Tunis/Tunisie</p>
                  </div>
                </div>
              </li>

              <li className="pl-8 relative">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#d5d5d5] text-[12px] md:text-[15px] font-semibold rounded-full px-2 py-2 md:px-4 md:py-2">
                    07/2021 - 10/2021
                  </div>
                  <div className="w-[70%] space-y-2">
                    <p className="font-semibold">Assistant Technique</p>
                    <p className="text-[12px] font-mono">
                      Allo Pc - Tunis/Tunisie
                    </p>
                  </div>
                </div>
              </li>

              <li className="pl-8 relative">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#d5d5d5] text-[12px] md:text-[15px] font-semibold rounded-full px-2 py-2 md:px-4 md:py-2">
                    08/2020 - 11/2020
                  </div>
                  <div className="w-[70%] space-y-2">
                    <p className="font-semibold">
                      SAP Next-Gen Challenge d&#39;été
                    </p>
                    <p className="text-[12px] font-mono">
                      Douane Tunisienne - Tunis/Tunisie
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

{/*
          <div class="min-h-screen bg-blue-500 py-6 flex flex-col justify-center sm:py-12">
  <div class="py-3 sm:max-w-xl sm:mx-auto w-full px-2 sm:px-0">

    <div class="relative text-gray-700 antialiased text-sm font-semibold">

      <!-- Vertical bar running through middle -->
      <div class="hidden sm:block w-1 bg-blue-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>

      <!-- Left section, set by justify-start and sm:pr-8 -->
      <div class="mt-6 sm:mt-0 sm:mb-12">
        <div class="flex flex-col sm:flex-row items-center">
          <div class="flex justify-start w-full mx-auto items-center">
            <div class="w-full sm:w-1/2 sm:pr-8">
              <div class="p-4 bg-white rounded shadow">
                Now this is a story all about how,
              </div>
            </div>
          </div>
          <div class="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Right section, set by justify-end and sm:pl-8 -->
      <div class="mt-6 sm:mt-0 sm:mb-12">
        <div class="flex flex-col sm:flex-row items-center">
          <div class="flex justify-end w-full mx-auto items-center">
            <div class="w-full sm:w-1/2 sm:pl-8">
              <div class="p-4 bg-white rounded shadow">
                My life got flipped turned upside down,
              </div>
            </div>
          </div>
          <div class="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Left section, set by justify-start and sm:pr-8 -->
      <div class="mt-6 sm:mt-0 sm:mb-12">
        <div class="flex flex-col sm:flex-row items-center">
          <div class="flex justify-start w-full mx-auto items-center">
            <div class="w-full sm:w-1/2 sm:pr-8">
              <div class="p-4 bg-white rounded shadow">
                And I'd like to take a minute, just sit right there,
              </div>
            </div>
          </div>
          <div class="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Right section, set by justify-end and sm:pl-8 -->
      <div class="mt-6 sm:mt-0">
        <div class="flex flex-col sm:flex-row items-center">
          <div class="flex justify-end w-full mx-auto items-center">
            <div class="w-full sm:w-1/2 sm:pl-8">
              <div class="p-4 bg-white rounded shadow">
                I'll tell you how I became the Prince of a town called Bel Air.
              </div>
            </div>
          </div>
          <div class="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </div>



    </div>

  </div>
</div>
*/}
        </div>
      </section>
    </CustomLayout>
  );
}
