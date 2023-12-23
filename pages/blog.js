import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function blog() {
  return (
    <section className="container w-full">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%]">
        Blog
      </h2>
      <div>
        <ul class="grid grid-cols-2 gap-4 list-none w-[80%] justify-items-center mx-auto">
          <li className="w-[80%]">
            <div className="overflow-hidden w-full h-auto">
            <Image src="/blog/post.jpg" alt="blog" width={500} height={500} className="hover:scale-105 duration-300"/>
            </div>
            <div>
              <p className="text-[#6B7280] font-mono">22 Oct 2023</p>
              <hr />
              <h3>Format Blog new tool</h3>
              <div>
                <Link href="#" className="text-[#6B7280] after:content-['-'] after:ml-1 after:text-[#6B7280]">Read More</Link>
              </div>
            </div>
          </li>
          <li className="w-[80%]">
            <div className="overflow-hidden w-full h-auto">
            <Image src="/blog/post.jpg" alt="blog" width={500} height={500} className="hover:scale-105 duration-300"/>
            </div>
            <div>
              <p className="text-[#6B7280] font-mono">22 Oct 2023</p>
              <hr />
              <h3>Format Blog new tool</h3>
              <div>
                <Link href="#" className="text-[#6B7280] after:content-['-'] after:ml-1 after:text-[#6B7280]">Read More</Link>
              </div>
            </div>
          </li>
          <li className="w-[80%]">
            <div className="overflow-hidden w-full h-auto">
            <Image src="/blog/post.jpg" alt="blog" width={500} height={500} className="hover:scale-105 duration-300"/>
            </div>
            <div>
              <p className="text-[#6B7280] font-mono">22 Oct 2023</p>
              <hr />
              <h3>Format Blog new tool</h3>
              <div>
                <Link href="#" className="text-[#6B7280] after:content-['-'] after:ml-1 after:text-[#6B7280]">Read More</Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
