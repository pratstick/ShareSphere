import { adminClient } from "../adminClient";

export async function getUserByUsername(username: string) {
  try {
    const user = await adminClient.fetch(
      `*[_type == "user" && username == $username][0]`,
      { username }
    );
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
}
