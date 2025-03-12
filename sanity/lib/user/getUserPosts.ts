import { adminClient } from "../adminClient";

export async function getUserPosts(userId: string) {
  try {
    const posts = await adminClient.fetch(
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
        author->{
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
        subreddit->{
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
        "upvotes": count(*[_type == "vote" && post._ref == ^._id && type == "upvote"]),
        "downvotes": count(*[_type == "vote" && post._ref == ^._id && type == "downvote"]),
        "commentCount": count(*[_type == "comment" && post._ref == ^._id])
      }`,
      { userId }
    );
    return posts || [];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}
