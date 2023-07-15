import React, { useCallback } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function SectionOne() {


  return (
      <section className="h-screen w-full bg-gray-900 pt-10">
        <div className="main w-[80%] mx-auto">
          <div className="social">
            <a href="#">
              <i className="bi bi-github"></i>
            </a>
            <a href="#">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
          <div className="detail text-white">
            <h1>
              <span>Hi, It&#39;s Me</span> <br /> I&#39;m{" "}
              <span style={{ color: "#43d3e9" }}>David</span>
            </h1>
            <div className="type-animation">
              I am
              <TypeAnimation 
              sequence={[
                ' Full Stack Web Developer',
                1000,
                ' Microsoft Power Platform Consultant',
                1000,
                ' Software Engineer',
                1000
              ]}
              speed={50}
              style={{ color: "#dd3dc4" }}
              repeat={Infinity}
              />
            </div>
            <div className="button">
              <button>Download CV</button>
            </div>
          </div>
          <div className="images">
            <Image
              src="/profile_picture.png"
              priority={true}
              alt="my picture"
              width={2750}
              height={2349}
              className="object-cover mt-20 grayscale drop-shadow-lg"
            />
          </div>
        </div>
      </section>
  );
}
