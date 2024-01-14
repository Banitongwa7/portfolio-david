import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { motion, useScroll, useSpring } from "framer-motion";
import CustomLayout from "@/components/layout/customlayout";

function Post({ frontmatter, content }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <CustomLayout item={frontmatter}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 transform origin-left bg-[#05cab6]"
        style={{ scaleX }}
      />
      <div className="prose mx-auto py-8 px-[30px]">
        <h1 className="text-2xl md:text-3xl">{frontmatter.title}</h1>
        <p className="text-sm"><span className="font-bold">Published</span> {formatDate(frontmatter.date)}</p>
        <div
          className="text-[15px] md:text-[17px]"
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
      </div>
      <ul className="w-[80%] md:w-[40%] mx-auto flex flex-wrap mb-10">
        {frontmatter.tags.map((tag, index) => (
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
