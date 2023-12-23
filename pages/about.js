import React from "react";
import Image from "next/image";

export default function about() {
  return (
    <section className="container w-full">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%]">About Me</h2>
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
          <p className="text-[20px] font-mono text-[#6B7280]">Software Engineer and Microsoft Power-Platform Developer</p>
        </div>
      </div>
      <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30"/>
      <div className="w-[80%] mx-auto">
        <p className="font-['Poppins', sans-serif] text-[20px] text-[#6B7280]">
          Passionate and versatile <span className="font-bold">Fullstack web developer</span>, I create tailored
          solutions (websites, applications, etc.) that perfectly fit your
          needs. My skills include <span className="font-bold">MERN Stack</span>, <span className="font-bold">NextJS</span>, <span className="font-bold">Python</span>, and <span className="font-bold">Microsoft
          Power Platform</span>.
        </p>
      </div>
      <hr className="my-[50px] w-[80%] mx-auto border-[#6B7280] opacity-30"/>
      <div>
        <div>
          <p>
            <span>Email :</span> <em>l7nqA@example.com</em>
          </p>
          <p>
            <span>Phone :</span> <em>+234 813 123 4567</em>
          </p>
          <p>
            <span>Location :</span> <em>Tunis, Tunisia</em>
          </p>
        </div>
        <div>
          <p>
            <span>Nationality :</span> <em>Congolian</em>
          </p>
          <p>
            <span>Degree :</span> <em>Master</em>
          </p>
          <p>
            <span>Freelance :</span> <em>Available</em>
          </p>
        </div>
      </div>

      <div className="skills">
        <div>
          <h3>Programming Skills</h3>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Node</li>
            <li>Express</li>
            <li>Tailwind</li>
            <li>Bootstrap</li>
            <li>Git</li>
          </ul>
        </div>
        <div>
          <h3>Language Skills</h3>
          <ul>
            <li>English</li>
            <li>French</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
