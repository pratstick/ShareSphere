import { sanityFetch } from "../fetch";
import { defineQuery } from "groq";
import type { GetUserByUsernameQueryResult } from "@/sanity.types";

export async function getUserByUsername(username: string) {
  try {
    const getUserByUsernameQuery = defineQuery(
      `*[_type == "user" && username == $username][0]`,
    );

    const result = await sanityFetch<GetUserByUsernameQueryResult>({
      query: getUserByUsernameQuery,
      params: { username },
      cache: "no-store",
    });
    return result.data ?? null;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
}
