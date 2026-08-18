import { defineQuery } from "groq";
import { sanityFetch, sanityTags } from "../fetch";
import type { GetPostCommentsQueryResult } from "@/sanity.types";

// Get all top-level comments for a post
export async function getPostComments(postId: string, userId: string | null) {
  const getPostCommentsQuery = defineQuery(`
    *[_type == "comment" && post._ref == $postId && !defined(parentComment)] {
        ...,
      _id,
      content,
      createdAt,
      "author": author->,
      "replies": *[_type == "comment" && parentComment._ref == ^._id],
      "votes": {
        "upvotes": count(*[_type == "vote" && comment._ref == ^._id && voteType == "upvote"]),
        "downvotes": count(*[_type == "vote" && comment._ref == ^._id && voteType == "downvote"]),
        "netScore": count(*[_type == "vote" && comment._ref == ^._id && voteType == "upvote"]) - count(*[_type == "vote" && comment._ref == ^._id && voteType == "downvote"]),
        "voteStatus": *[_type == "vote" && comment._ref == ^._id && user._ref == $userId][0].voteType,
      },
    } | order(votes.netScore desc, createdAt desc) // votes.netScore desc -> if you want to sort by net score
  `);

  const result = await sanityFetch<GetPostCommentsQueryResult>({
    query: getPostCommentsQuery,
    params: { postId, userId: userId || "" },
    tags: [sanityTags.comments, sanityTags.post(postId)],
    cache: "no-store",
  });

  return result.data || [];
}
