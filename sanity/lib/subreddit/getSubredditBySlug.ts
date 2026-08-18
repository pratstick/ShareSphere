import { defineQuery } from "groq";
import { sanityFetch, sanityTags } from "../fetch";
import type { GetSubredditBySlugQueryResult } from "@/sanity.types";

export async function getSubredditBySlug(slug: string) {
  const lowerCaseSlug = slug.toLowerCase();
  const getSubredditBySlugQuery =
    defineQuery(`*[_type == "subreddit" && slug.current == $slug][0] {
      ...,
      "slug": slug.current,
      "moderator": moderator->,
    }`);

  const subreddit = await sanityFetch<GetSubredditBySlugQueryResult>({
    query: getSubredditBySlugQuery,
    params: { slug: lowerCaseSlug },
    tags: [sanityTags.subreddits, sanityTags.subreddit(lowerCaseSlug)],
  });

  return subreddit.data;
}
