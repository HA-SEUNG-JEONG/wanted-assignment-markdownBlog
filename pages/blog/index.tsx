import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  categories: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
}

const blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <h1 className="text-blue-600">First Blog</h1>
      {posts.map((post, index) => (
        <div key={index} className="mb-5">
          <span className="text-lg text-red-500">{post.categories}</span>
          <div>
            <span>
              {post.date} / {post.description}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default blog;
