import { defineQuery } from "groq";
import { sanityFetch } from "../fetch";
import type { GetUserPostVoteStatusQueryResult } from "@/sanity.types";

// Get user vote status for a post
export async function getUserPostVoteStatus(
  postId: string,
  userId: string | null,
) {
  const getUserPostVoteStatusQuery = defineQuery(
    `*[_type == "vote" && post._ref == $postId && user._ref == $userId][0].voteType`,
  );

  const result = await sanityFetch<GetUserPostVoteStatusQueryResult>({
    query: getUserPostVoteStatusQuery,
    params: { postId, userId: userId || "" },
    cache: "no-store",
  });

  // Returns "upvote", "downvote", or null if no vote
  return result.data;
}
