import Image from "next/image";
import { IoIosTime } from "react-icons/io";
import Link from "next/link";
import type { Post } from "@/types/types";

export default async function Blog() {
  
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600, // 1 hour
    }
    ,
    body: JSON.stringify({
      query: `
      query Publication {
        publication(host: "daviddb.hashnode.dev") {
          posts(first: 10) {
            edges {
              node {
                coverImage{
                  url
                }
                title
                readTimeInMinutes
                tags{
                  name
                }
                brief
                slug
                author{
                  profilePicture
                  name
                }
              }
            }
          }
        }
      }
      `,
    }),
  });
  const allPostsData = await res.json();

  return (
    <section className="w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%] dark:text-gray-100">
        Blog
      </h2>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
          {allPostsData.data.publication.posts.edges.map(
            (post: Post, index: number) => (
              <Link href={`/blog/${post.node.slug}`} key={index}
                className="w-[80%] border border-gray-200 p-6 rounded-md cursor-pointer  hover:shadow-lg transition-shadow duration-300"
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
                </div>
              </Link>
            )
          )}
        </ul>
      </div>
    </section>
  );
}