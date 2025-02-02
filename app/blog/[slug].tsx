//import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

type Tag = {
  name: string;
};

  
  export default async function PostArticle({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
            publishedAt
            content {
              html
            }
            tags{
              name
            }
          }
        }
      }
      `,
    }),
  });
    const article = await res.json();
  
    /*
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });
    */
  
    const formatDate = (date: string) => {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    };
    
    console.log(article)
    console.log(slug)
  
    return (
      <>
       
     

{/*
 <motion.div
        className="fixed top-0 z-50 left-0 right-0 h-2 transform origin-left bg-[#05cab6]"
        style={{ scaleX }}
      />
      */}
      <div>
        <Image
          src={article.data.publication.post.coverImage.url}
          alt="Picture of post"
          width={1000}
          height={500}
          priority={true}
          className="object-cover w-[80%] md:w-[60%] h-[200px] sm:h-[300px] md:h-[500px] mx-auto"
        />
        <div className="my-8 space-y-5">
          <h1 className="text-2xl md:text-3xl text-center font-extrabold dark:text-gray-100">
            {article.data.publication.post.title}
          </h1>
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
          dangerouslySetInnerHTML={{ __html: article.data.publication.post.content.html }}
        />
      </div>

      <ul className="w-[80%] md:w-[40%] mx-auto flex flex-wrap mb-10">
        {article.data.publication.post.tags.map((tag: Tag, index: number) => (
          <li
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag.name}
          </li>
        ))}
      </ul>
     </>
  );
}


/*

export async function getStaticPaths() {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query Publication {
        publication(host: "daviddb.hashnode.dev") {
          posts(first: 10) {
            edges {
              node {
                slug
              }
            }
          }
        }
      }
      `,
    }),
  });
  const allPostsData = await res.json();

  return {
    paths: allPostsData.data.publication.posts.edges.map((post) => ({
      params: {
        slug: post.node.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
            publishedAt
            content {
              html
            }
            tags{
              name
            }
          }
        }
      }
      `
    }),
  });
  const data = await res.json();

  return {
    props: {
      article: data,
    },
  };
}
*/