import React from "react";
import Image from "next/image";
import Skills from "@/data/Skills";

export default function about() {
  return (
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

      <div
        id="education-experience-custom"
        className=" w-[80%] mx-auto"
      >
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
                  <p className="text-[12px] font-mono">BhetiConnect - France</p>
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
      </div>
    </section>
  );
}
