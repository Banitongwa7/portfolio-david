import React from "react";
import Image from "next/image";
import Skills from "@/data/Skills";
import CustomLayout from "@/components/layout/customlayout";
import Experience from "@/data/Experience";
import { MdOutlineWork } from "react-icons/md";

export default function about() {
  const metatags = {
    title: "About me",
    description:
      "Passionate and versatile Fullstack web developer, I create tailored solutions (websites, applications, etc.) that perfectly fit your needs. My skills include MERN Stack, NextJS, Python, and Microsoft Power Platform.",
    image: "/assets/icon.png",
  };

  return (
    <CustomLayout item={metatags}>
      <section className="container w-full pb-[100px]">
        <div className="bg-gray-100 dark:bg-[#0f172a] py-[50px] ">
          <h2 className="text-[30px] font-extrabold pl-10 pb-10 mx-auto w-[80%] dark:text-gray-100">
            About Me
          </h2>
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="bg-gray-200 p-1 rounded-full">
              <Image
                src="/assets/david.jpg"
                alt="Picture of david"
                width={200}
                height={200}
                className="rounded-full h-[200px] w-[200px] object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-[30px] font-medium dark:text-gray-100">David Banitongwa</h2>
              <p className="text-[20px] font-mono text-[#6B7280]">
                Software Engineer and Microsoft Power-Platform Developer
              </p>
            </div>
          </div>

          <div className="p-[2px] w-[80%] mx-auto my-[50px] bg-gradient-to-r from-green-400 via-cyan-300 to-emerald-400 rounded">
            <div className=" bg-gray-100 dark:bg-slate-800 p-[50px] dark:text-white text-[#0f172a] rounded">
              <p className="font-['Poppins', sans-serif] text-[20px]">
                Passionate and versatile{" "}
                <span className="font-bold">Fullstack web developer</span>, I
                create tailored solutions (websites, applications, etc.) that
                perfectly fit your needs. My skills include{" "}
                <span className="font-bold">MERN Stack</span>,{" "}
                <span className="font-bold">NextJS</span>,{" "}
                <span className="font-bold">Python</span>, and{" "}
                <span className="font-bold">Microsoft Power Platform</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[80%] pt-[80px] pb-[80px] mx-auto space-y-5">
          <h3 className="text-[30px] font-mono text-center dark:text-gray-100">
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

        <div className="bg-gray-100 dark:bg-[#0f172a] py-[80px]">
          <div className="w-[80%] mx-auto space-y-5">
            <h3 className="text-[30px] font-mono text-center dark:text-gray-100">
              Language Skills
            </h3>
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
        </div>

        <div
          id="education-experience-custom"
          className=" w-[80%] mx-auto pt-[80px]"
        >
          <div className="experience space-y-16">
            <h3 className="text-[30px] font-mono text-center dark:text-gray-100">Experience</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {Experience.map((exp, index) => (
                <li
                  className="rounded p-[2px] bg-gradient-to-r from-green-400 via-cyan-300 to-emerald-400"
                  key={index}
                >
                  <div className="space-x-3 rounded p-5 bg-gray-100 dark:bg-slate-800 dark:text-white text-[#0f172a]">
                    <div className="flex items-center justify-between px-2 py-2 md:px-4 md:py-2">
                      <div className="text-[12px] md:text-[15px] font-semibold">
                        {exp.date}
                      </div>
                      <div className="bg-white p-2 rounded-full">
                        <MdOutlineWork className="text-[#0f172a]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">{exp.position}</p>
                      <div className="flex items-center gap-[10px]">
                        <p className="text-[12px] font-mono">
                          {exp.company} - {exp.location}
                        </p>
                        <Image
                          src={exp.icon}
                          width={20}
                          height={20}
                          alt="icon country"
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
