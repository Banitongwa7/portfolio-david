//import md from "markdown-it";
import { motion, useScroll, useSpring } from "framer-motion";
import CustomLayout from "@/components/layout/customlayout";
import Image from "next/image";
import { useState } from "react";

function Post({ article }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isBlog, setIsBlog] = useState(true);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <CustomLayout item={article} isBlog={isBlog}>
      <motion.div
        className="fixed top-0 z-50 left-0 right-0 h-2 transform origin-left bg-[#05cab6]"
        style={{ scaleX }}
      />

      <div>
        <Image
          src={article.cover_image}
          alt="Picture of post"
          width={1000}
          height={500}
          className="object-cover w-[80%] md:w-[60%] h-[200px] sm:h-[300px] md:h-[500px] mx-auto"
        />
        <div className="my-8 space-y-5">
          <h1 className="text-2xl md:text-3xl text-center font-extrabold dark:text-gray-100">
            {article.title}
          </h1>
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <span className="font-bold">Published</span>{" "}
              {formatDate(article.published_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="prose pb-8 pt-5 mx-auto px-[30px] dark:prose-invert">
        <div
          className="text-[15px] md:text-[20px]"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />
      </div>

      <ul className="w-[80%] md:w-[40%] mx-auto flex flex-wrap mb-10">
        {article.tags.map((tag, index) => (
          <li
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag}
          </li>
        ))}
      </ul>
    </CustomLayout>
  );
}

export default Post;

export async function getStaticPaths() {
  const res = await fetch("https://dev.to/api/articles?username=daviddb");
  const allPostsData = await res.json();

  return {
    paths: allPostsData.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`https://dev.to/api/articles/daviddb/${slug}`);
  console.log(slug);
  const data = await res.json();

  return {
    props: {
      article: data,
    },
  };
}
