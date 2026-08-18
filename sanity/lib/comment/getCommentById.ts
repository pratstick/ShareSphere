import { sanityFetch, sanityTags } from "../fetch";
import { defineQuery } from "groq";
import type { GetCommentByIdQueryResult } from "@/sanity.types";

export async function getCommentById(commentId: string) {
  const getCommentByIdQuery =
    defineQuery(`*[_type == "comment" && _id == $commentId][0] {
    _id,
    content,
    createdAt,
    "author": author->,
    isDeleted
  }`);

  const comment = await sanityFetch<GetCommentByIdQueryResult>({
    query: getCommentByIdQuery,
    params: { commentId },
    tags: [sanityTags.comments],
  });
  return comment.data;
}
