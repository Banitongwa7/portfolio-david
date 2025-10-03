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
      className="w-full border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-lg cursor-pointer 
                 hover:shadow-xl dark:hover:shadow-indigo-500/10 transition-shadow duration-300 transform hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-md">
        <Image
          src={post.node.coverImage.url}
          alt="blog cover image"
          width={500}
          height={300}
          priority={true}
          className="hover:scale-105 duration-300 object-cover w-full h-48 md:h-60"
        />
      </div>
      <div className="pt-4 sm:pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={post.node.author.profilePicture}
              alt="Author profile"
              width={35}
              height={35}
              className="rounded-full w-8 h-8 object-cover"
            />

            <p className="text-gray-600 dark:text-gray-300 font-mono text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
              {post.node.author.name}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <IoIosTime className="text-gray-600 dark:text-gray-300 w-4 h-4" />
            <p className="text-gray-600 dark:text-gray-300 font-mono text-xs sm:text-sm">
              {post.node.readTimeInMinutes} min read
            </p>
          </div>
        </div>

        <div className="my-3 md:my-4 w-1/2 h-[1px] bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-400 dark:to-gray-700 mx-auto">
          {" "}
        </div>

        <h3 className="text-lg sm:text-xl font-bold line-clamp-2 dark:text-gray-100 mb-2">
          {post.node.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {post.node.brief}
        </p>

        <div className="mt-2 flex items-center flex-wrap gap-x-3 gap-y-1">
          {post.node.tags.map((tag, index) => (
            <p
              key={index}
              className="text-indigo-600 dark:text-cyan-400 text-xs font-medium"
            >
              #{tag.name}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-5 mt-4 sm:mt-5">
          <div className="flex items-center gap-1">
            <BiSolidLike className="text-gray-500 dark:text-gray-400 w-4 h-4" />
            <p className="text-gray-600 dark:text-gray-300 font-mono text-xs sm:text-sm">
              {post.node.reactionCount}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <IoMdEye className="text-gray-500 dark:text-gray-400 w-4 h-4" />
            <p className="text-gray-600 dark:text-gray-300 font-mono text-xs sm:text-sm">
              {post.node.views}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
