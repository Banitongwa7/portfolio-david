import React from "react";
import Image from "next/image";
import { IoIosTime } from "react-icons/io";

export default function blog({ allPostsData }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <section className="container w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%] dark:text-gray-100">
        Blog
      </h2>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
          {allPostsData.map((post, index) => (
            <li
              key={index}
              className="w-[80%] border border-gray-200 p-6 rounded-md cursor-pointer  hover:shadow-lg transition-shadow duration-300"
              onClick={() => (window.location.href = `/blog/${post.slug}`)}
            >
              <div className="overflow-hidden rounded-md">
                <Image
                  src={post.cover_image}
                  alt="blog"
                  width={500}
                  height={500}
                  className="hover:scale-105 duration-300 object-cover w-[500px] h-[300px]"
                />
              </div>
              <div className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.user.profile_image}
                      alt="profile"
                      width={50}
                      height={50}
                      className="rounded-full w-[35px]"
                    />
                    <p className="text-[#6B7280] dark:text-gray-300 font-mono">
                      {post.user.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosTime className="text-[#6B7280] dark:text-gray-300" />
                    <p className="text-[#6B7280] dark:text-gray-300 font-mono">
                      {post.reading_time_minutes} min read
                    </p>
                  </div>
                </div>
                <div className="my-[10px] w-[50%] mx-auto h-[1px] bg-gradient-to-r from-slate-100 via-slate-700 to-slate-100 dark:bg-gradient-to-r dark:from-slate-700 dark:via-slate-100 dark:to-slate-700"> </div>
                <h3 className="text-[18px] font-medium truncate dark:text-gray-100">
                  {post.title}
                </h3>

                <p className="text-[#6B7280]">{post.description}</p>

                <div className="mt-3">
                  {post.tag_list.map((tag, index) => (
                    <span key={index} className="text-[#35bcda] dark:text-[#e3f639] mr-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dev.to/api/articles?username=daviddb");
  const allPostsData = await res.json();

  return {
    props: {
      allPostsData,
    },
  };
}
