import type { Post } from "@/types/types";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogSkeleton from "@/components/blog/BlogSkeleton";

export const dynamic = "force-dynamic";

async function fetchBlogPosts() {
  try {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
      body: JSON.stringify({
        query: `
        query Publication {
          publication(host: "daviddb.hashnode.dev") {
            posts(first: 10) {
              edges {
                node {
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

    if (!res.ok) {
      return null
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}

export default async function Blog() {
  
  const data = await fetchBlogPosts();

  if (!data) {
    return (
      <section className="w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%] dark:text-gray-100">
        Blog
      </h2>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
        {
          Array.from({ length: 4 }).map((_, index) => (
            <BlogSkeleton key={index} />
          ))
        }
        </ul>
      </div>
    </section>
    );
  }

  const posts = data.data.publication.posts.edges;

  return (
    <section className="w-full pb-[100px]">
      <h2 className="text-[30px] font-extrabold pl-10 my-[50px] mx-auto w-[80%] dark:text-gray-100">
        Blog
      </h2>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none w-full md:w-[80%] justify-items-center mx-auto">
          {posts.map((post: Post, index: number) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
}