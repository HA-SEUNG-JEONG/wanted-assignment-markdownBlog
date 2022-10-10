import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  id: number;
  categories: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
}

const blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      {posts.map((post, id) => (
        <div key={id} className="mb-5">
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
  const blogPosts = readdirSync("./__posts").map((file) => {
    const content = readFileSync(`./__posts/${file}`, "utf-8");
    return matter(content).data;
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default blog;
