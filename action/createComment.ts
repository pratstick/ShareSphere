"use server";

import { addComment } from "@/sanity/lib/comment/addComment";
import { getUser } from "@/sanity/lib/user/getUser";
import { revalidateTag } from "next/cache";
import { sanityTags } from "@/sanity/lib/fetch";

export async function createComment(
  postId: string,
  content: string,
  parentCommentId?: string,
) {
  const user = await getUser();

  if ("error" in user) {
    return { error: user.error };
  }

  try {
    const comment = await addComment({
      postId,
      userId: user._id,
      content,
      parentCommentId,
    });

    revalidateTag(sanityTags.comments, "max");
    revalidateTag(sanityTags.post(postId), "max");
    revalidateTag(sanityTags.user(user._id), "max");

    return { comment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { error: "Failed to add comment" };
  }
}
