import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { RxReader } from "react-icons/rx";



export default function blog({ allPostsData }) {

  const formaterURL = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    return url;
  }

  const handleLink = (item) => {
    if (item.link){
      window.location.href = formaterURL(item.link)
    }else {
      window.location.href = `/blog/${item.id}`
    }
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }


  return (
    <section className="container w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%] dark:text-white">
        Blog
      </h2>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
          {allPostsData.map((post, index) => (
            <li key={index} className="w-[80%] border border-gray-200 p-6 rounded-md cursor-pointer  hover:shadow-lg transition-shadow duration-300" onClick={() => handleLink(post)}>
              <div className="overflow-hidden rounded-md">
                <Image
                  src={post.image}
                  alt="blog"
                  width={500}
                  height={500}
                  className="hover:scale-105 duration-300 object-cover w-[500px] h-[300px]"
                />
              </div>
              <div className="pt-6">
                <p className="text-[#6B7280] dark:text-gray-300 font-mono">{formatDate(post.date)}</p>
                <hr className="my-[10px]"/>
                <h3 className="text-[20px] font-medium truncate dark:text-gray-100">{post.title}</h3>
                <div className="mt-4 hover:text-green-500">
                  <Link
                    href={post.link ? formaterURL(post.link) : `/blog/${post.id}`}
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
