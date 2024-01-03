import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { RxReader } from "react-icons/rx";



export default function blog({ allPostsData }) {
  return (
    <section className="container w-full">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%]">
        Blog
      </h2>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-[80%] justify-items-center mx-auto">
          {allPostsData.map((post, index) => (
            <li key={index} className="w-[80%] rounded-md cursor-pointer shadow-lg" onClick={() => window.location.href = `/blog/${post.id}`}>
              <div className="overflow-hidden rounded-t-md">
                <Image
                  src={post.image}
                  alt="blog"
                  width={500}
                  height={500}
                  className="hover:scale-105 duration-300 object-cover w-[500px] h-[300px]"
                />
              </div>
              <div className="p-6">
                <p className="text-[#6B7280] font-mono">{post.date}</p>
                <hr className="my-[10px]"/>
                <h3 className="text-[20px] font-medium truncate">{post.title}</h3>
                <div className="mt-4 hover:text-green-500">
                  <Link
                    href={`/blog/${post.id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <RxReader className="inline mr-2 mb-[2px] text-white text-[20px]" />
                    Read More
                  </Link>
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
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
