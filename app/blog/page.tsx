"use client";

import type { PostType } from "@/types/types";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogSkeleton from "@/components/blog/BlogSkeleton";
import { useCallback, useEffect, useState } from "react";
import { FaBookmark, FaFeatherAlt, FaSyncAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface HashnodeData {
  data: {
    publication: {
      id: string;
      posts: {
        edges: PostType[];
        pageInfo: PageInfo;
      };
    };
  };
}

interface BlogState {
  posts: PostType[];
  pageInfo: PageInfo;
}

const POSTS_PER_LOAD = 10;

const getPostsQuery = (first: number, after: string | null) => `
  query Publication {
    publication(host: "daviddb.hashnode.dev") {
      id
      posts(first: ${first}, after: ${after ? `"${after}"` : "null"}) {
        pageInfo {
          hasNextPage
          endCursor
        }
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
`;

export default function Blog() {
  const [blogState, setBlogState] = useState<BlogState | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = useCallback(
    async (cursor: string | null = null, append: boolean = false) => {
      if (!append) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      try {
        const res = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            query: getPostsQuery(POSTS_PER_LOAD, cursor),
          }),
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const result: HashnodeData = await res.json();
        const newPosts = result.data.publication.posts.edges;
        const newPageInfo = result.data.publication.posts.pageInfo;

        console.log("info posts:", newPageInfo);

        setBlogState((prev) => {
          if (append && prev) {
            return {
              posts: [...prev.posts, ...newPosts],
              pageInfo: newPageInfo,
            };
          }

          return {
            posts: newPosts,
            pageInfo: newPageInfo,
          };
        });
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchBlogPosts(null, false);
  }, [fetchBlogPosts]);

  const handleLoadMore = () => {
    if (blogState?.pageInfo.hasNextPage) {
      fetchBlogPosts(blogState.pageInfo.endCursor, true);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-20 bg-white dark:bg-gray-900 min-h-[80vh] px-4">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Loading Articles... 🚀
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20 bg-white dark:bg-gray-900 text-center min-h-[80vh]">
        <p className="text-xl md:text-2xl text-red-600 dark:text-red-400 mt-10">
          Error loading articles
        </p>
      </section>
    );
  }

  const allPosts = blogState?.posts || [];
  if (allPosts.length === 0) {
    return (
      <section className="w-full py-20 bg-white dark:bg-gray-900 text-center min-h-[80vh]">
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-10">
          No articles found at this time. Check back soon for new content!
        </p>
      </section>
    );
  }

  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1);
  const hasMorePosts = blogState?.pageInfo.hasNextPage ?? false;

  return (
    <section className="w-full pt-16 md:pt-20 pb-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-5xl text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3">
          <FaFeatherAlt className="text-indigo-600 dark:text-cyan-400 text-2xl lg:text-3xl" />
          {"All My Blog Posts"}
        </h2>
        <p className="mt-3 md:mt-4 text-base md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {
            "Here are all my blog posts. I hope you find them helpful! If you do, feel free to share them with your friends."
          }
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 md:mb-8 flex items-center gap-2">
          <FaBookmark className="text-indigo-500 dark:text-cyan-400 text-xl" />{" "}
          {"Last Article"}
        </h3>
        <Link
          href={`/blog/${featuredPost.node.slug}`}
          className="group mb-12 md:mb-16 block bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl 
                       transition duration-500 hover:shadow-indigo-500/50 dark:hover:shadow-cyan-400/40"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-56 sm:h-64 md:h-80 w-full overflow-hidden">
              <Image
                src={featuredPost.node.coverImage?.url || "/placeholder.jpg"}
                alt={`Cover image for ${featuredPost.node.title}`}
                width={800}
                height={600}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-semibold uppercase text-indigo-600 dark:text-cyan-400 mb-2">
                {featuredPost.node.tags?.[0]?.name || "FEATURED"} •{" "}
                {featuredPost.node.readTimeInMinutes} min read
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                {featuredPost.node.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {featuredPost.node.brief}
              </p>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span>By {featuredPost.node.author.name}</span>
                <span className="dot text-gray-400">•</span>
                <span>{featuredPost.node.views || 0} views</span>
              </div>
            </div>
          </div>
        </Link>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 md:mb-8 mt-8 md:mt-12">
          More Articles
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none">
          {recentPosts.map((post: PostType) => (
            <BlogPostCard key={post.node.id} post={post} />
          ))}
        </ul>

        {hasMorePosts && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className={`
                px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out
                flex items-center justify-center mx-auto gap-2
                ${
                  loadingMore
                    ? "bg-gray-400 text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 hover:shadow-indigo-500/50 dark:hover:shadow-cyan-400/50"
                }
              `}
            >
              {loadingMore ? (
                <>
                  <FaSyncAlt className="animate-spin" /> Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
        {!hasMorePosts && allPosts.length > POSTS_PER_LOAD && (
          <div className="text-center mt-12">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              {"You've reached the end of the articles!"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
