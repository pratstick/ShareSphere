import { sanityFetch, sanityTags } from "../fetch";
import { defineQuery } from "groq";
import type { GetSubredditsQueryResult } from "@/sanity.types";

export async function getSubreddits() {
  const getSubredditsQuery = defineQuery(`*[_type == "subreddit"] {
        ...,
        "slug": slug.current,
        "moderator": moderator->,
      } | order(createdAt desc)`);

  const subreddits = await sanityFetch<GetSubredditsQueryResult>({
    query: getSubredditsQuery,
    tags: [sanityTags.subreddits],
  });

  return subreddits.data;
}
