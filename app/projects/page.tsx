"use client";

import React from "react";
import Image from "next/image";
import AllProjects from "@/data/AllProjects";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr"; // Icon for Tech Stack

export default function Projects() {
  return (
    <section className="w-full py-24 transition duration-500">
      {/* Header Section */}
      <div className="mx-auto max-w-4xl text-center mb-16 px-4">
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Projects
        </h2>
        <p className="mt-4 text-xl font-light text-gray-600 dark:text-gray-400">
          {"Here are some projects I've worked on. I hope you find them useful and inspiring for your own journey!"}
        </p>
      </div>

      {/* Project Grid - High-Contrast Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {AllProjects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
                         overflow-hidden transform transition duration-500 
                         hover:shadow-indigo-500/50 dark:hover:shadow-cyan-400/40 border border-gray-200 dark:border-gray-700"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={project.image}
                  width={600}
                  height={400}
                  alt={`Screenshot of ${project.name}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                {/* Title and Description */}
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Footer (Icon and Tags) */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3 text-gray-500 dark:text-gray-400">
                    <GrTechnology className="w-4 h-4" />
                    <span className="text-sm font-semibold">Tech Stack:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(project.techs)
                      .slice(0, 4)
                      .map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold px-3 py-1 rounded-lg 
                                             bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Action Link Button */}
                <div className="mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center inline-flex items-center justify-center gap-x-2 text-base font-semibold py-2.5 px-4 rounded-xl 
                               bg-indigo-600 text-white dark:bg-cyan-500 dark:text-gray-900 
                               hover:bg-indigo-700 dark:hover:bg-cyan-400 transition duration-300 shadow-lg shadow-indigo-500/30 dark:shadow-cyan-400/20"
                  >
                    Explore Project
                    <FaExternalLinkAlt className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
