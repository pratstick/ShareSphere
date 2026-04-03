"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { getPostById } from "@/sanity/lib/post/getPostById";
import { currentUser } from "@clerk/nextjs/server";

export const deletePost = async (postId: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "User not found" };
  }

  const post = await getPostById(postId);
  if (!post) {
    return { error: "Post not found" };
  }

  if (post.author?._id !== user?.id) {
    return { error: "You are not authorized to delete this post" };
  }

  const imageRef = post.image?.asset?._ref;

  // Build an atomic transaction: mark post as deleted and (if present)
  // delete the image asset in a single round-trip so there is no window
  // where the post is gone but the asset still exists, or vice-versa.
  const transaction = adminClient.transaction();

  transaction.patch(postId, (patch) =>
    patch.set({
      isDeleted: true,
      image: null,
      title: "[DELETED POST]",
      body: [{ _type: "block", _key: crypto.randomUUID(), children: [{ _type: "span", _key: crypto.randomUUID(), text: "[DELETED CONTENTS]" }] }],
    })
  );

  if (imageRef) {
    transaction.delete(imageRef);
  }

  await transaction.commit();

  return { success: "Post deleted successfully" };
};
