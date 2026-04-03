import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getPosts(filterType?: string, filterCategory?: string) {
  const getAllPostsQuery =
    defineQuery(`*[_type == "post" && isDeleted != true
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

  const posts = await sanityFetch({
    query: getAllPostsQuery,
    params: {
      filterType: filterType ?? null,
      filterCategory: filterCategory ?? null,
    },
  });
  return posts.data;
}
