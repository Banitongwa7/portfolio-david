import React from "react";
import Image from "next/image";
import { AiOutlineHtml5 } from "react-icons/ai";
import { FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import {
  FaReact,
  FaPython,
  FaBootstrap,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss } from "react-icons/bi";
import { DiLinux } from "react-icons/di";
import { BsMicrosoft } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { RiFlowChart } from "react-icons/ri";

export default function about() {
  return (
    <section className="container w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%]">
        About Me
      </h2>
      <div className="flex flex-col items-center justify-center gap-8">
        <div>
          <Image
            src="/david.jpg"
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

      <div className="w-[80%] mx-auto grid grid-cols-2">
        <div className="space-y-5">
          <p>
            <span className="font-bold">Email :</span>{" "}
            <em>davidbanitongwa@outlook.com</em>
          </p>
          <p>
            <span className="font-bold">Phone :</span> <em>+216 54 482 172</em>
          </p>
          <p>
            <span className="font-bold">Location :</span>{" "}
            <em>Tunis, Tunisia</em>
          </p>
        </div>

        <div className="space-y-5">
          <p>
            <span className="font-bold">Nationality :</span> <em>Congolese</em>
          </p>
          <p>
            <span className="font-bold">Degree :</span> <em>Master</em>
          </p>
          <p>
            <span className="font-bold">Freelance :</span> <em>Available</em>
          </p>
        </div>
      </div>
      <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30" />
      <div className="w-[80%] mx-auto space-y-5">
        <div className="w-full">
          <h3 className="text-[30px] font-mono text-center">
            Technical Skills
          </h3>
          <ul className="grid grid-cols-3 gap-5 justify-items-center text-center pt-[40px] skills-custom">
            <li>
              <AiOutlineHtml5 />
              <p>HTML 5</p>
            </li>
            <li>
              <FaCss3Alt />
              <p>CSS 3</p>
            </li>
            <li>
              <IoLogoJavascript />
              <p>JavaScript</p>
            </li>
            <li>
              <FaReact />
              <p>React JS</p>
            </li>
            <li>
              <TbBrandNextjs />
              <p>Next JS</p>
            </li>
            <li>
              <FaNodeJs />
              <p>Node JS</p>
            </li>
            <li>
              <FaPython />
              <p>Python</p>
            </li>
            <li>
              <BiLogoTailwindCss />
              <p>Tailwind CSS</p>
            </li>
            <li>
              <FaBootstrap />
              <p>Bootstrap</p>
            </li>
            <li>
              <FaGitAlt />
              <p>Git</p>
            </li>
            <li>
              <DiLinux />
              <p>Linux</p>
            </li>
            <li>
              <BsMicrosoft />
              <p>Microsoft</p>
            </li>
            <li>
              <FaDatabase />
              <p>Database SQL & NoSQL</p>
            </li>
            <li>
              <MdOutlineDesignServices />
              <p>UI/UX Design</p>
            </li>
            <li>
              <RiFlowChart />
              <p>Automatization</p>
            </li>
          </ul>
          <p className="font-mono text-[20px] text-[#6B7280] text-center mt-8">
            And more
          </p>
        </div>

        <div>
          <h3 className="text-[30px] font-mono text-center">Language Skills</h3>
          <ul className="pt-[40px] grid grid-cols-2 justify-items-center text-center skills-custom">
            <li>
              <p className="icon-language">English</p>
              <p>Preintermediate - A2</p>
            </li>
            <li>
              <p className="icon-language">French</p>
              <p>Advanced - C1</p>
            </li>
            <li>
              <p className="icon-language">Lingala</p>
              <p>Advanced - C1</p>
            </li>
            <li>
              <p className="icon-language">Swahili</p>
              <p>Native</p>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30" />

      <div id="education-experience-custom" className="grid grid-cols-2 w-[80%] mx-auto">
        <div className="education space-y-8">
          <h3 className="text-[30px] font-bold">Education</h3>
          <ul className="relative space-y-14">
            <li className="pl-8 relative">
              <div className="flex items-center space-x-3">
                <div className="bg-[#d5d5d5] text-[15px] font-semibold rounded-full px-4 py-2">2022 - 2024</div>
                <div className="w-[70%]">
                  Développement logiciel et système d&#39;information (Bac +5)
                </div>
              </div>
            </li>

            <li className="pl-8 relative">
              <div className="flex items-center space-x-3">
                <div className="bg-[#d5d5d5] text-[15px] font-semibold rounded-full px-4 py-2">2019 - 2022</div>
                <div className="w-[70%]">
                Génie logicielle et système d&#39;information (Bac +3)
                </div>
              </div>
            </li>

            <li className="pl-8 relative">
              <div className="flex items-center space-x-3">
                <div className="bg-[#d5d5d5] text-[15px] font-semibold rounded-full px-4 py-2">2018 - 2019</div>
                <div className="w-[70%]">
                Informatique de gestion (Bac + 1)
                </div>
              </div>
            </li>

            <li className="pl-8 relative">
              <div className="flex items-center space-x-3">
                <div className="bg-[#d5d5d5] text-[15px] font-semibold rounded-full px-4 py-2">2016 - 2018</div>
                <div className="w-[70%]">
                Médecine générale (Bac + 1)
                </div>
              </div>
            </li>

            
          </ul>
        </div>

        <div className="experience">
          <h3 className="text-[30px] font-bold">Experience</h3>
        </div>
      </div>
    </section>
  );
}
