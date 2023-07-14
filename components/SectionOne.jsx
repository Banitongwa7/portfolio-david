import React, { useCallback } from "react";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { TypeAnimation } from "react-type-animation";

export default function SectionOne() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
      <section className="h-screen w-full bg-gray-900 pt-10">
        <div>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "none",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "attract",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#43d3e9",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: false,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 20000,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "square",
              },
              size: {
                value: { min: 1, max: 90 },
              },
            },
            detectRetina: true,
          }}
        />
        </div>
        <div className="main mx-auto w-[80%] pt-20">
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
              src="/profile.png"
              priority={true}
              alt="my picture"
              width={450}
              height={800}
              className="ml-10 mt-[-21px]"
            />
          </div>
        </div>
      </section>
  );
}
