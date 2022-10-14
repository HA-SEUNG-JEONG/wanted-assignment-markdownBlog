import { NextPage } from "next";
import { getPosts } from "../api/getPosts";

interface Post {
  id: number;
  categories: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
}

const blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      {posts.map((post, id) => (
        <main key={id} className="my-5 ml-10">
          <section className="font-bold">{post.title}</section>
          <span>
            <h2 className="opacity-50">
              {post.date} / {post.description}
            </h2>
          </span>
        </main>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const blogPosts = getPosts;
  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default blog;
