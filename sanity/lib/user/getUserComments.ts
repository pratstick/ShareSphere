import { sanityFetch, sanityTags } from "../fetch";
import { defineQuery } from "groq";
import type { GetUserCommentsQueryResult } from "@/sanity.types";

export async function getUserComments(userId: string) {
  try {
    const getUserCommentsQuery = defineQuery(
      `*[_type == "comment" && author._ref == $userId] | order(createdAt desc) {
        _id,
        content,
        createdAt,
        "author": author->{
          _id,
          username,
          firstName,
          lastName
        },
        "post": post->{
          _id,
          title,
          "subreddit": subreddit->{
            _id,
            title,
            slug
          }
        }
      }`,
    );

    const result = await sanityFetch<GetUserCommentsQueryResult>({
      query: getUserCommentsQuery,
      params: { userId },
      tags: [sanityTags.comments, sanityTags.user(userId)],
    });
    return result.data || [];
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return [];
  }
}
