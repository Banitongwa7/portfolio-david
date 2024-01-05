import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';

export async function getStaticPaths() {
  try {
    const files = fs.readdirSync('public/posts');

    const paths = files.map((fileName) => ({
      params: {
        slug: fileName.replace('.md', '')
      }   
    }));

    return {
      paths,
      fallback: "blocking"
    }; 
  } catch (error) {
    console.error(error);

    return {
      paths: [],
      fallback: false
    };  
  }
};

export async function getStaticProps ({ params: { slug } }) {
  try {
    const fileName = fs.readFileSync(`public/posts/${slug}.md`, 'utf-8');
    const data = matter(fileName);

    return {
      props: {
        frontmatter: data.data,
        content: data.content
      }
    };
  } catch (error) {
    console.error(error);

    return {
      props: {}
    };
  }
};

function Post ({ frontmatter, content }) {
  return (
    <div className="prose mx-auto py-8 px-[30px]">
      <h1 className='text-2xl md:text-3xl'>{ frontmatter.title }</h1>
      <div className='text-[15px] md:text-[17px]' dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
};

export default Post;