import { apiVersion, dataset, projectId } from "../env";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
  cache?: RequestCache;
};

type SanityResponse<T> = { result: T };

/**
 * Fetches a GROQ query through Next.js' data cache. Keep the query tags aligned
 * with the mutations that change the underlying documents.
 */
export async function sanityFetch<T = unknown>({
  query,
  params,
  tags,
  revalidate = 60,
  cache,
}: SanityFetchOptions): Promise<{ data: T }> {
  const searchParams = new URLSearchParams({ query });

  for (const [name, value] of Object.entries(params ?? {})) {
    searchParams.set(`$${name}`, JSON.stringify(value));
  }

  const token = process.env.SANITY_API_READ_TOKEN;
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${searchParams}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache,
      next: cache === "no-store" ? undefined : { revalidate, tags },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Sanity query failed: ${response.status} ${response.statusText}`,
    );
  }

  const { result } = (await response.json()) as SanityResponse<T>;
  return { data: result };
}

export const sanityTags = {
  posts: "sanity:posts",
  comments: "sanity:comments",
  subreddits: "sanity:subreddits",
  post: (postId: string) => `sanity:post:${postId}`,
  subreddit: (slug: string) => `sanity:subreddit:${slug.toLowerCase()}`,
  user: (userId: string) => `sanity:user:${userId}`,
};
