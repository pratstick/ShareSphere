import { sanityFetch } from "../live";
import { defineQuery } from "groq";
import { currentUser } from "@clerk/nextjs/server";
import { addUser } from "./addUser";

interface UserResult {
  _id: string;
  username: string;
  imageUrl: string;
  email: string;
}

/**
 * Derives a stable, slug-friendly username from Clerk user fields.
 * Never uses Math.random() – uniqueness is guaranteed by Clerk's user ID
 * being used as the Sanity document _id via createIfNotExists.
 */
const deriveUsername = (user: {
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
  emailAddresses: { emailAddress: string }[];
}): string => {
  const displayName =
    user.fullName?.trim() ||
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.primaryEmailAddress?.emailAddress.split("@")[0] ||
    user.emailAddresses[0]?.emailAddress.split("@")[0] ||
    "user";

  // Convert to slug-friendly format (no random suffix needed because the
  // Clerk user ID is already used as the document _id, so two concurrent
  // requests for the same user will resolve to the same document).
  return displayName.replace(/\s+(.)/g, (_, char: string) => char.toUpperCase()).replace(/\s+/g, "");
};

export async function getUser(): Promise<UserResult | { error: string }> {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      return { error: "User not found" };
    }

    // Check if user exists in the database first
    const getExistingUserQuery = defineQuery(
      `*[_type == "user" && _id == $id][0]`
    );

    const existingUser = await sanityFetch({
      query: getExistingUserQuery,
      params: { id: loggedInUser.id },
    });

    // If user exists, return the user data
    if (existingUser.data?._id) {
      const user = {
        _id: existingUser.data._id,
        username: existingUser.data.username!,
        imageUrl: existingUser.data.imageUrl!,
        email: existingUser.data.email!,
      };

      return user;
    }

    // If user doesn't exist, create a new user.
    // addUser uses createIfNotExists, so concurrent calls for the same
    // Clerk ID are safe – only one document will ever be created.
    const newUser = await addUser({
      id: loggedInUser.id,
      username: deriveUsername(loggedInUser),
      email:
        loggedInUser.primaryEmailAddress?.emailAddress ||
        loggedInUser.emailAddresses[0].emailAddress,
      imageUrl: loggedInUser.imageUrl,
    });

    const user = {
      _id: newUser._id,
      username: newUser.username!,
      imageUrl: newUser.imageUrl,
      email: newUser.email,
    };

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return { error: "Failed to get user" };
  }
}
