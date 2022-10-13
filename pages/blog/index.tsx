import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
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
      {posts.map((post) => (
        <main className="my-5 ml-10">
          <section className="font-bold">{post.title}</section>
          <div>
            <span>
              <h2 className="title">
                {post.date} / {post.description}
              </h2>
            </span>
          </div>
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
