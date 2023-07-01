import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ComingSoon() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {}, []);
  return (
    <>
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
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: ["grab"],
              },
              onclick: {
                enable: false,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          particles: {
            color: {
              value: "#5387a6",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      <div
        className="w-full h-screen"
        style={{
          backgroundImage:
            "url(https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg)",
        }}
      >
        <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-xl flex items-center justify-center text-cyan-100 space-x-2 lg:space-x-4">
              <span className="text-xl lg:text-2xl xl:text-3xl font-bold">
                Hey ! It&#39;s David 😊
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl xl:text-6xl text-white tracking-wider font-bold font-serif mt-12 text-center">
              My Portfolio is coming soon
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
