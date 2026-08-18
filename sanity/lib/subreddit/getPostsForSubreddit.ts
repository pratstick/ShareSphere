import { defineQuery } from "groq";
import { sanityFetch, sanityTags } from "../fetch";
import type { GetPostsForSubredditQueryResult } from "@/sanity.types";

export async function getPostsForSubreddit(id: string) {
  const getPostsForSubredditQuery = defineQuery(`
      *[_type == "post" && subreddit._ref == $id] {
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
      } | order(publishedAt desc) 
    `);

  const result = await sanityFetch<GetPostsForSubredditQueryResult>({
    query: getPostsForSubredditQuery,
    params: { id },
    tags: [sanityTags.posts, sanityTags.subreddits],
  });

  return result.data;
}
