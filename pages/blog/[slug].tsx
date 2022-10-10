import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse/lib";
import { unified } from "unified";

const Post: NextPage<{ post: string }> = ({ post }) => {
  return <h1>{post}</h1>;
};

//getStaticPaths는 동적인 URL 페이지에서 getStaticProps을 사용할 때 필요함
export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    //paths와 fallback은 반드시 필요 -> 이 부분은 더 찾아봐야 할듯
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

  return {
    props: {
      post: value,
    },
  };
};

export default Post;
