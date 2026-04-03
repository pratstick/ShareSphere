"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { getUser } from "@/sanity/lib/user/getUser";

const REPORTABLE_TYPES = new Set(["post", "comment"]);

export async function reportContent(contentId: string) {
  const user = await getUser();
  if ("error" in user) return { error: user.error };

  // Fetch the document to validate its type and ownership
  const doc = await adminClient.fetch<{ _type: string; author?: { _ref: string } } | null>(
    `*[_id == $id][0]{ _type, "author": author->{ "_ref": _id } }`,
    { id: contentId }
  );

  if (!doc || !REPORTABLE_TYPES.has(doc._type)) {
    return { error: "Content not found or cannot be reported" };
  }

  if (doc.author?._ref === user._id) {
    return { error: "You cannot report your own content" };
  }

  const result = await adminClient
    .patch(contentId)
    .set({ isReported: true })
    .commit();

  return { result };
}
