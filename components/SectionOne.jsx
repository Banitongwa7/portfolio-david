import React from "react";
import profile from "./../public/profile_picture.png";

export default function SectionOne() {
  /*


<section className="md:max-h-screen md:max-w-full bg-gray-900 pt-10">
        <div className="main w-full md:w-[80%] mx-auto flex flex-col md:flex-none md:flex-row">
          <div className="social mx-auto pt-10 pb-10 md:pt-0 md:pb-0">
            <a href={links.github}>
              <i className="bi bi-github"></i>
            </a>
            <a href={links.twitter}>
              <i className="bi bi-twitter"></i>
            </a>
            <a href={links.linkedin}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href={links.behance}>
              <i className="bi bi-behance"></i>
            </a>
          </div>
          <div className="text-white ml-10 md:ml-0">
            <h1>
              <span>Hi, It&#39;s Me</span> <br /> I&#39;m{" "}
              <span style={{ color: "#43d3e9" }}>David</span>
            </h1>
            <div className="mt-[1rem] md:text-xl">
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
              className="md:font-medium"
              />
            </div>
            <div className="button">
              <button>Download CV</button>
            </div>
          </div>
          <div className="images">
            <Image
              src="/profile_picture.png"
              alt="my picture"
              loading="lazy"
              width={3240}
              height={5463}
              className="object-cover mt-[66px] ml-20 drop-shadow-lg"
            />
          </div>
        </div>
      </section>
  
  */

  return (
    <section id="home-section" className="hero">
      <div className="home-slider">
        <div className="slider-item ">
          <div className="overlay"></div>
          <div className="container">
            <div
              className="row d-md-flex no-gutters slider-text align-items-end justify-content-end"
            >
              <div
                className="one-third js-fullheight order-md-last img"
                style={{
                  backgroundImage: `url(${profile.src})`,
                  width: "100%",
                  height: "100%",
                  
                }}
              >
                <div className="overlay"></div>
              </div>
              <div
                className="one-forth d-flex  align-items-center ftco-animate"
              >
                <div className="text">
                  <span className="subheading">Hello!</span>
                  <h1 className="mb-4 mt-3">
                    Im <span>Clark Thompson</span>
                  </h1>
                  <h2 className="mb-4">A Freelance Web Designer</h2>
                  <p>
                    <a href="#" className="btn btn-primary py-3 px-4">
                      Hire me
                    </a>{" "}
                    <a
                      href="#"
                      className="btn btn-white btn-outline-white py-3 px-4"
                    >
                      My works
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
