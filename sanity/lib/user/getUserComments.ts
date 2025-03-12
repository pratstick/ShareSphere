import { adminClient } from "../adminClient";

export async function getUserComments(userId: string) {
  try {
    const comments = await adminClient.fetch(
      `*[_type == "comment" && author._ref == $userId] | order(createdAt desc) {
        _id,
        content,
        createdAt,
        author->{
          _id,
          username,
          firstName,
          lastName
        },
        post->{
          _id,
          title,
          subreddit->{
            _id,
            title,
            slug
          }
        }
      }`,
      { userId }
    );
    return comments || [];
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return [];
  }
}
