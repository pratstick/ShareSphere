import { getPosts } from "@/sanity/lib/post/getPosts";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";
import type { GetAllPostsQueryResult } from "@/sanity.types";

interface PostsListProps {
  filterType?: "request" | "offer";
  filterCategory?: string;
}

async function PostsList({ filterType, filterCategory }: PostsListProps) {
  const posts = await getPosts(filterType, filterCategory);
  const user = await currentUser();

  if (posts.length === 0 && filterType) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No {filterType === "request" ? "help requests" : "help offers"} found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {(posts as GetAllPostsQueryResult).map((post) => (
        <Post key={post._id} post={post} userId={user?.id || null} />
      ))}
    </div>
  );
}

export default PostsList;
