import React from "react";
import Image from "next/image";
import AllProjects from "@/data/AllProjects";
import CustomLayout from "@/components/layout/customlayout";

export default function projects() {
  const metatags = {
    title: "My Projects",
    description: "Feel free to discover my projects.",
    image: "/assets/icon.png",
  }

  return (
    <CustomLayout item={metatags}>
      <section className="container w-full">
        <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%]">
          Projects
        </h2>

        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
            {AllProjects.map((project, index) => (
              <a
                className="group rounded-xl overflow-hidden"
                href={project.link}
                key={index}
              >
                <div className="sm:flex">
                  <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                    <Image
                      src={project.image}
                      width={500}
                      height={500}
                      alt="Image Description"
                      className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover rounded-xl"
                    />
                  </div>

                  <div className="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-gray-600">{project.description}</p>
                    <ul className="py-3 flex flex-wrap gap-4 items-center">
                      {Object.keys(project.techs).map((key, index) => (
                        <li key={index} className="text-2xl">
                          {project.techs[key]}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 inline-flex items-center gap-x-1 text-green-500 decoration-2 hover:underline font-medium">
                      See Project
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
