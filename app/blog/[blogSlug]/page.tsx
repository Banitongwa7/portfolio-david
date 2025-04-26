import Image from "next/image";
import type { TagType } from "@/types/types";
import ProgressBar from "./progressbar";
import { IoIosTime, IoMdEye } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}): Promise<Metadata> {
  
  const slug = (await params).blogSlug;
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
      query Publication {
        publication(host: "daviddb.hashnode.dev") {
          post(slug: "${slug}") {
            brief
            coverImage{
              url
            }
            title
          }
        }
      }
      `,
    }),
  });
  const article = await res.json();

  return {
    title: article.data.publication.post.title,
    description: article.data.publication.post.brief,
    openGraph: {
      images: [
        {
          url: article.data.publication.post.coverImage.url,
          width: 1000,
          height: 500,
          alt: article.data.publication.post.title,
        },
      ],
    },
  };
}

export default async function PostArticle({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {

  const slug = (await params).blogSlug;
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
      query Publication {
        publication(host: "daviddb.hashnode.dev") {
          id
          post(slug: "${slug}") {
            id
            views
            reactionCount
            readTimeInMinutes
            brief
            coverImage{
              url
            }
            title
            publishedAt
            content {
              html
            }
            tags{
              id
              name
            }
          }
        }
      }
      `,
    })
  });
  const article = await res.json();

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <ProgressBar>
      <div>
        <Image
          src={article.data.publication.post.coverImage.url}
          alt="Picture of post"
          width={1000}
          height={500}
          priority={true}
          className="object-cover w-[80%] md:w-[60%] h-[200px] sm:h-[300px] md:h-[500px] mx-auto"
        />
        <div className="my-8 space-y-5 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl text-center font-extrabold dark:text-gray-100">
            {article.data.publication.post.title}
          </h1>
          <div className="flex items-center gap-5 text-[#6B7280] dark:text-gray-300">
            <div className="flex items-center gap-2">
              <BiSolidLike className="text-[#6B7280] dark:text-gray-300" />
              <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
                {article.data.publication.post.reactionCount}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IoMdEye className="text-[#6B7280] dark:text-gray-300" />
              <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
                {article.data.publication.post.views}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IoIosTime className="text-[#6B7280] dark:text-gray-300" />
              <p className="text-[#6B7280] dark:text-gray-300 font-mono text-[12px] md:text-[14px]">
                {article.data.publication.post.readTimeInMinutes} min read
              </p>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <span className="font-bold">Published</span>{" "}
              {formatDate(article.data.publication.post.publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="prose pb-8 pt-5 mx-auto px-[30px] dark:prose-invert">
        <div
          className="text-[15px] md:text-[20px]"
          dangerouslySetInnerHTML={{
            __html: article.data.publication.post.content.html,
          }}
        />
      </div>

      <ul className="w-[80%] md:w-[40%] mx-auto flex flex-wrap mb-10">
        {article.data.publication.post.tags.map((tag: TagType, index: number) => (
          <li
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </ProgressBar>
  );
}
