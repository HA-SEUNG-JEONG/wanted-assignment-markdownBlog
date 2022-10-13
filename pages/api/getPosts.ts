import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

export const getPosts = readdirSync("./__posts").map((file) => {
  const content = readFileSync(`./__posts/${file}`, "utf-8");
  return JSON.parse(JSON.stringify(matter(content).data));
});
