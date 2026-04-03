import { ImageData } from "@/action/createCommunity";
import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";
import { Subreddit } from "@/sanity.types";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const SLUG_REGEX = /^[a-z0-9-]+$/;

export async function createSubreddit(
  name: string,
  moderatorId: string,
  imageData: ImageData | null,
  customSlug?: string,
  customDescription?: string
) {
  try {
    // Validate and sanitize slug before any DB operations
    const rawSlug = customSlug || name.toLowerCase().replace(/\s+/g, "-");
    if (!SLUG_REGEX.test(rawSlug)) {
      return { error: "URL slug may only contain lowercase letters, numbers, and hyphens" };
    }
    const slug = rawSlug;

    // Check if subreddit with this name already exists
    const checkExistingQuery = defineQuery(`
        *[_type == "subreddit" && title == $name][0] {
          _id
        }
      `);

    const existingSubreddit = await sanityFetch({
      query: checkExistingQuery,
      params: { name },
    });

    if (existingSubreddit.data) {
      return { error: "A subreddit with this name already exists" };
    }

    // Check if slug already exists
    const checkSlugQuery = defineQuery(`
        *[_type == "subreddit" && slug.current == $slug][0] {
          _id
        }
      `);

    const existingSlug = await sanityFetch({
      query: checkSlugQuery,
      params: { slug },
    });

    if (existingSlug.data) {
      return { error: "A subreddit with this URL already exists" };
    }

    // Upload image if provided
    let imageAsset;
    if (imageData) {
      // Validate MIME type
      if (!ALLOWED_IMAGE_TYPES.has(imageData.contentType)) {
        return { error: "Invalid image type. Allowed types: JPEG, PNG, WebP, GIF" };
      }

      try {
        // Extract base64 data (remove data:image/jpeg;base64, part)
        const base64Data = imageData.base64.split(",")[1];

        // Convert base64 to buffer
        const buffer = Buffer.from(base64Data, "base64");

        // Validate file size
        if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
          return { error: "Image size must be 5 MB or less" };
        }

        // Upload to Sanity
        imageAsset = await adminClient.assets.upload("image", buffer, {
          filename: imageData.filename,
          contentType: imageData.contentType,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        // Continue without image if upload fails
      }
    }

    // Create the subreddit
    const subredditDoc: Partial<Subreddit> = {
      _type: "subreddit",
      title: name,
      description: customDescription || `Welcome to r/${name}!`,
      slug: {
        current: slug,
        _type: "slug",
      },
      moderator: {
        _type: "reference",
        _ref: moderatorId,
      },
      createdAt: new Date().toISOString(),
    };

    // Add image if available
    if (imageAsset) {
      subredditDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    const subreddit = await adminClient.create(subredditDoc as Subreddit);
    console.log(`Subreddit created successfully with ID: ${subreddit._id}`);

    return { subreddit };
  } catch (error) {
    console.error("Error creating subreddit:", error);
    return { error: "Failed to create subreddit" };
  }
}
