import React from "react";
import Image from "next/image";

export default function about() {
  return (
    <section>
      <h2>About Me</h2>
      <div>
        <Image
          src="/david.jpg"
          alt="Picture of david"
          width={200}
          height={200}
          className="rounded-full h-[200px] w-[200px] object-cover"
        />
      </div>
      <div>
        <h2>David Banitongwa</h2>
        <p>Software Engineer and Microsoft Power-Platform Developer</p>
      </div>
      <hr />
      <div>
        <p>
        Passionate and versatile Fullstack web developer, I create tailored solutions (websites, applications, etc.) that perfectly fit your needs. My skills include MERN Stack, NextJS, Python, and Microsoft Power Platform.
        </p>
      </div>
      <hr />
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
