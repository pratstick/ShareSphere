import { sanityFetch, sanityTags } from "../fetch";
import { defineQuery } from "groq";
import type { GetAllPostsQueryResult } from "@/sanity.types";

const getAllPostsQuery = defineQuery(`*[_type == "post" && isDeleted != true
  && ($filterType == null || helpType == $filterType)
  && ($filterCategory == null || category == $filterCategory)
] {
  _id,
  title,
  "slug": slug.current,
  body,
  publishedAt,
  "author": author->,
  "subreddit": subreddit->,
  image,
  helpType,
  category,
  isDeleted
} | order(publishedAt desc)`);

export async function getPosts(
  filterType?: "request" | "offer",
  filterCategory?: string,
): Promise<GetAllPostsQueryResult> {
  const posts = await sanityFetch({
    query: getAllPostsQuery,
    params: {
      filterType: filterType ?? null,
      filterCategory: filterCategory ?? null,
    },
    tags: [sanityTags.posts],
  });
  return posts.data as GetAllPostsQueryResult;
}
