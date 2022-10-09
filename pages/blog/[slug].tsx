import { readdirSync } from "fs";
import { NextPage } from "next";

const Post: NextPage = () => {
  return <h1>hi</h1>;
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

export function getStaticProps() {
  return {
    props: {},
  };
}

export default Post;
