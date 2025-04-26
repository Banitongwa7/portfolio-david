"use client";

import type { PostType } from "@/types/types";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogSkeleton from "@/components/blog/BlogSkeleton";
import { useEffect, useState } from "react";


export default function Blog() {
  const [data, setData] = useState<{ data: { publication: { posts: { edges: PostType[] } } } } | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store',
          body: JSON.stringify({
            query: `
            query Publication {
              publication(host: "daviddb.hashnode.dev") {
                id
                posts(first: 10) {
                  edges {
                    node {
                      id
                      views
                      reactionCount
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
                        id
                        profilePicture
                        name
                      }
                    }
                  }
                }
              }
            }
            `,
          })
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    }
    fetchBlogPosts();
  }, []);

  if (!data) {
    return (
      <section className="w-full pb-[100px]">
        <h2 className="text-[30px] font-extrabold my-[50px] mx-auto w-[80%] dark:text-gray-100">
          Blog
        </h2>
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold mt-[50px] mb-5 mx-auto w-[80%] dark:text-gray-100 text-center">
        All My Blog Posts
      </h2>
      <p className="text-center text-gray-400 mb-10">
        {"Here are all my blog posts. I hope you find them helpful! If you do, feel free to share them with your friends."}
      </p>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
          {data.data.publication.posts.edges.map((post: PostType, index: number) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
}