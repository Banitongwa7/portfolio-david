import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { motion, useScroll } from "framer-motion";
import Head from "next/head";

function Post({ frontmatter, content }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="og:title" content={frontmatter.title} />
        <meta
          property="og:description"
          content={frontmatter.description}
        />
        <meta
          property="og:image"
          content={frontmatter.image}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="twitter:title" content={frontmatter.title} />
        <meta
          property="twitter:description"
          content={frontmatter.description}
        />
        <meta
          property="twitter:image"
          content={frontmatter.image}
        />
      </Head>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 transform origin-left bg-[#05cab6]"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="prose mx-auto py-8 px-[30px]">
        <h1 className="text-2xl md:text-3xl">{frontmatter.title}</h1>
        <div
          className="text-[15px] md:text-[17px]"
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
      </div>
    </>
  );
}

export default Post;

export async function getStaticPaths() {
  try {
    const files = fs.readdirSync("public/posts");

    const paths = files.map((fileName) => ({
      params: {
        slug: fileName.replace(".md", ""),
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);

    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const fileName = fs.readFileSync(`public/posts/${slug}.md`, "utf-8");
    const data = matter(fileName);

    return {
      props: {
        frontmatter: data.data,
        content: data.content,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}
