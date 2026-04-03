import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getUserPosts(userId: string) {
  try {
    const getUserPostsQuery = defineQuery(
      `*[_type == "post" && author._ref == $userId && !isDeleted] | order(publishedAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        originalTitle,
        slug,
        body,
        helpType,
        category,
        publishedAt,
        isDeleted,
        "author": author->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          username,
          firstName,
          lastName,
          email,
          image,
          isReported
        },
        "subreddit": subreddit->{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          title,
          slug,
          description
        },
        image,
        "upvotes": count(*[_type == "vote" && post._ref == ^._id && voteType == "upvote"]),
        "downvotes": count(*[_type == "vote" && post._ref == ^._id && voteType == "downvote"]),
        "commentCount": count(*[_type == "comment" && post._ref == ^._id])
      }`
    );

    const result = await sanityFetch({ query: getUserPostsQuery, params: { userId } });
    return result.data || [];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}
