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
    <section className="container w-full">
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
          <ul id="technical-skills-custom" className="grid grid-cols-3 gap-5 justify-items-center text-center pt-[40px]">
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
          <p className="font-mono text-[20px] text-[#6B7280] text-center mt-8">And more</p>
        </div>
        <div>
          <h3 className="text-[30px] font-mono text-center">Language Skills</h3>
          <ul className="pt-[40px] grid grid-cols-2">
            <li>
            <p>English</p>
              <p>Preintermediate</p>
            </li>
            <li>
              <p>French</p>
              <p>Advanced</p>
            </li>
            <li>
              <p>Lingala</p>
              <p>Advanced</p>
            </li>
            <li>
              <p>Swahili</p>
              <p>Native</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
