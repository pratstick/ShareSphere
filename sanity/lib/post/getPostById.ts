import { sanityFetch, sanityTags } from "../fetch";
import { defineQuery } from "groq";
import type { GetPostByIdQueryResult } from "@/sanity.types";

export async function getPostById(postId: string) {
  const getPostByIdQuery = defineQuery(`*[_type == "post" && _id == $postId] {
    _id,
    title,
    "slug": slug.current,
    body,
    publishedAt,
    "author": author->,
    "subreddit": subreddit->,
    image,
    isDeleted
  }[0]`);

  const post = await sanityFetch<GetPostByIdQueryResult>({
    query: getPostByIdQuery,
    params: { postId },
    tags: [sanityTags.posts, sanityTags.post(postId)],
  });
  return post.data;
}
