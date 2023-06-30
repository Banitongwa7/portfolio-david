import React, {useCallback} from "react";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"

export default function SectionOne() {
    
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);
    const particlesLoaded = useCallback(async container => {
    }, []);

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
                    mode: ["grab"]
                },
                onclick: {
                    enable: false,
                    mode: "bubble"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
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
      <section>
        <div className="main">
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
          <div className="detail">
            <h1>
              <span>Hi, It&#39;s Me</span> <br /> I&#39;m{" "}
              <span style={{ color: "#113D6B" }}>David</span>
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing <br /> and
              typesetting industry.{" "}
            </p>
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
    </>
  );
}
