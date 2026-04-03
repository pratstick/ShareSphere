"use server";

import { Post } from "@/sanity.types";
import { adminClient } from "@/sanity/lib/adminClient";
import { getSubredditBySlug } from "@/sanity/lib/subreddit/getSubredditBySlug";
import { getUser } from "@/sanity/lib/user/getUser";
import { auth } from "@clerk/nextjs/server";
import { CoreMessage, generateText } from "ai";
import { createClerkToolkit } from "@clerk/agent-toolkit/ai-sdk";
import { openai } from "@ai-sdk/openai";
import { censorPost, reportUser } from "@/tools/tools";
import { systemPrompt } from "@/tools/prompt";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export type PostImageData = {
  base64: string;
  filename: string;
  contentType: string;
} | null;

export async function createPost({
  title,
  subredditSlug,
  body,
  helpType,
  category,
  imageBase64,
  imageFilename,
  imageContentType,
}: {
  title: string;
  subredditSlug: string;
  body?: string;
  helpType?: "request" | "offer";
  category?: string;
  imageBase64?: string | null;
  imageFilename?: string | null;
  imageContentType?: string | null;
}) {
  try {
    if (!title || !subredditSlug) {
      return { error: "Title and subreddit are required" };
    }

    const user = await getUser();

    if ("error" in user) {
      return { error: user.error };
    }

    // Find the subreddit document by name
    const subreddit = await getSubredditBySlug(subredditSlug);

    if (!subreddit?._id) {
      return { error: `Subreddit "${subredditSlug}" not found` };
    }

    // Prepare image data if provided
    let imageAsset;
    if (imageBase64 && imageFilename && imageContentType) {
      // Validate MIME type
      if (!ALLOWED_IMAGE_TYPES.has(imageContentType)) {
        return { error: "Invalid image type. Allowed types: JPEG, PNG, WebP, GIF" };
      }

      try {
        // Extract base64 data (remove data:image/jpeg;base64, part)
        const base64Data = imageBase64.split(",")[1];

        // Convert base64 to buffer
        const buffer = Buffer.from(base64Data, "base64");

        // Validate file size
        if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
          return { error: "Image size must be 5 MB or less" };
        }

        // Upload to Sanity
        imageAsset = await adminClient.assets.upload("image", buffer, {
          filename: imageFilename,
          contentType: imageContentType,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        // Continue without image if upload fails
      }
    }

    // Create the post
    const postDoc: Partial<Post> = {
      _type: "post",
      title,
      body: body
        ? [
            {
              _type: "block",
              _key: crypto.randomUUID(),
              children: [
                {
                  _type: "span",
                  _key: crypto.randomUUID(),
                  text: body,
                },
              ],
            },
          ]
        : undefined,
      author: {
        _type: "reference",
        _ref: user._id,
      },
      subreddit: {
        _type: "reference",
        _ref: subreddit._id,
      },
      helpType: (helpType || "request") as "request" | "offer",
      category: (category || "other") as "grocery" | "pet-care" | "tech-support" | "home-garden" | "transportation" | "childcare" | "tutoring" | "repairs" | "food" | "deliveries" | "health" | "professional" | "events" | "books" | "other",
      publishedAt: new Date().toISOString(),
    };

    // Add image if available
    if (imageAsset) {
      postDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    const post = await adminClient.create(postDoc as Post);

    // Call the content moderation API
    const messages: CoreMessage[] = [
      {
        role: "user",
        content: `I posted this post -> Post ID: ${post._id}\nTitle: ${title}\nBody: ${body}`,
      },
    ];

    try {
      const authContext = await auth.protect();
      const toolkit = await createClerkToolkit({ authContext });
      await generateText({
        model: openai("gpt-4.1-mini"),
        messages: messages as CoreMessage[],
        system: toolkit.injectSessionClaims(systemPrompt),
        tools: {
          ...toolkit.users(),
          censorPost,
          reportUser,
        },
      });
    } catch (error) {
      console.error("Error in content moderation:", error);
      // Don't fail the whole post creation if moderation fails
    }

    return { post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
}
