import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

const Post: NextPage<{ post: string; data: string }> = ({ post, data }) => {
  return (
    <main>
      <h1 className="ml-2 font-bold mb-2">{data}</h1>
      <section className="blog-post-content" dangerouslySetInnerHTML={{ __html: post }} />;
    </main>
  );
};

//getStaticPaths는 동적인 URL 페이지에서 getStaticProps을 사용할 때 필요함
export function getStaticPaths() {
  const files = readdirSync("./__posts").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content } = matter.read(`./__posts/${ctx.params?.slug}.md`);
  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);
  return {
    props: {
      post: value,
      data: ctx.params?.slug,
    },
  };
};

export default Post;
