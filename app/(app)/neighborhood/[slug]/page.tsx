import Post from "@/components/post/Post";
import { urlFor } from "@/sanity/lib/image";
import { getPostsForSubreddit } from "@/sanity/lib/subreddit/getPostsForSubreddit";
import { getSubredditBySlug } from "@/sanity/lib/subreddit/getSubredditBySlug";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const neighborhood = await getSubredditBySlug(slug);
  if (!neighborhood) return null;

  const user = await currentUser();
  const posts = await getPostsForSubreddit(neighborhood._id);

  return (
    <>
      {/* Neighborhood Banner */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            {neighborhood?.image && neighborhood.image.asset?._ref && (
              <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                <Image
                  src={urlFor(neighborhood.image).url()}
                  alt={
                    neighborhood.image.alt || `${neighborhood.title} neighborhood icon`
                  }
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{neighborhood?.title}</h1>
              {neighborhood?.description && (
                <p className="text-sm text-gray-600">{neighborhood.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post._id} post={post} userId={user?.id || null} />
              ))
            ) : (
              <div className="bg-white rounded-md p-6 text-center">
                <p className="text-gray-500">No help requests or offers in this neighborhood yet.</p>
                <p className="text-sm text-gray-400 mt-2">Be the first to share how you can help your neighbors!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default NeighborhoodPage;
