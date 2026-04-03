import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getUserByUsername(username: string) {
  try {
    const getUserByUsernameQuery = defineQuery(
      `*[_type == "user" && username == $username][0]`
    );

    const result = await sanityFetch({ query: getUserByUsernameQuery, params: { username } });
    return result.data ?? null;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
}
