import { sanityFetch } from "../live";
import { defineQuery } from "groq";

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
      }`
    );

    const result = await sanityFetch({ query: getUserCommentsQuery, params: { userId } });
    return result.data || [];
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return [];
  }
}
