import { defineQuery } from "groq";
import { sanityFetch } from "../live";

// Get post votes summarized by type
export async function getPostVotes(postId: string) {
  const getPostVotesQuery = defineQuery(`
      {
        "upvotes": count(*[_type == "vote" && post._ref == $postId && voteType == "upvote"]),
        "downvotes": count(*[_type == "vote" && post._ref == $postId && voteType == "downvote"])
      }
    `);

  const result = await sanityFetch({
    query: getPostVotesQuery,
    params: { postId },
  });

  const { upvotes, downvotes } = result.data ?? { upvotes: 0, downvotes: 0 };
  return { upvotes, downvotes, netScore: upvotes - downvotes };
}
