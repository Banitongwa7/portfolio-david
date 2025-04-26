import Image from "next/image";
import Link from "next/link";
import { IoIosTime, IoMdEye } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import type { PostType } from "@/types/types";

interface BlogPostCardProps {
  post: PostType;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.node.slug}`}
      className="w-[80%] border border-gray-200 p-6 rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="overflow-hidden rounded-md">
        <Image
          src={post.node.coverImage.url}
          alt="blog"
          width={500}
          height={500}
          priority={true}
          className="hover:scale-105 duration-300 object-cover w-full h-[300px]"
        />
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={post.node.author.profilePicture}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full w-[35px] object-cover h-[35px]"
            />
            <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
              {post.node.author.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoIosTime className="text-[#6B7280] dark:text-gray-300" />
            <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
              {post.node.readTimeInMinutes} min read
            </p>
          </div>
        </div>
        <div className="my-[10px] w-[50%] mx-auto h-[1px] bg-gradient-to-r from-slate-100 via-slate-700 to-slate-100 dark:bg-gradient-to-r dark:from-slate-700 dark:via-slate-100 dark:to-slate-700">
          {" "}
        </div>
        <h3 className="text-[18px] font-medium truncate dark:text-gray-100">
          {post.node.title}
        </h3>

        <p className="text-[#6B7280]">{post.node.brief}</p>

        <div className="mt-3 flex items-center flex-wrap">
          {post.node.tags.map((tag, index) => (
            <p
              key={index}
              className="text-[#35bcda] dark:text-[#e3f639] mr-2"
            >
              #{tag.name}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-end gap-5 mt-5">
          <div className="flex items-center gap-2">
            <BiSolidLike className="text-[#6B7280] dark:text-gray-300" />
            <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
              {post.node.reactionCount}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdEye className="text-[#6B7280] dark:text-gray-300" />
            <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
              {post.node.views}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}