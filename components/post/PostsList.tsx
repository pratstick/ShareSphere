import { getPosts } from "@/sanity/lib/post/getPosts";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";

interface PostsListProps {
  filterType?: "request" | "offer";
  filterCategory?: string;
}

async function PostsList({ filterType, filterCategory }: PostsListProps) {
  const posts = await getPosts();
  const user = await currentUser();

  // Filter posts by help type and category if specified
  let filteredPosts = posts;
  
  if (filterType) {
    filteredPosts = filteredPosts.filter((post) => (post as { helpType?: string }).helpType === filterType);
  }
  
  if (filterCategory) {
    filteredPosts = filteredPosts.filter((post) => (post as { category?: string }).category === filterCategory);
  }

  if (filteredPosts.length === 0 && filterType) {
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
      {filteredPosts.map((post) => (
        <Post key={post._id} post={post} userId={user?.id || null} />
      ))}
    </div>
  );
}

export default PostsList;
