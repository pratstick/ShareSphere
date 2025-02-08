import { currentUser } from "@clerk/nextjs/server";
import { getUserByUsername } from "@/sanity/lib/user/getUserByUsername";
import { getUserPosts } from "@/sanity/lib/user/getUserPosts";
import { getUserComments } from "@/sanity/lib/user/getUserComments";
import Post from "@/components/post/Post";
import TimeAgo from "@/components/TimeAgo";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params;
  const currentUserData = await currentUser();
  
  // Get user profile data
  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }

  // Get user's posts and comments
  const [posts, comments] = await Promise.all([
    getUserPosts(user._id),
    getUserComments(user._id)
  ]);

  const isOwnProfile = currentUserData?.username === username;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user.firstName?.[0] || user.username[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}` 
                : user.username
              }
            </h1>
            <p className="text-gray-500">@{user.username}</p>
            {isOwnProfile && (
              <Badge variant="secondary" className="mt-1">Your Profile</Badge>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-6 mt-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{comments.length}</div>
            <div className="text-sm text-gray-500">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {posts.filter((p: { helpType: string }) => p.helpType === "offer").length}
            </div>
            <div className="text-sm text-gray-500">Help Offered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {posts.filter((p: { helpType: string }) => p.helpType === "request").length}
            </div>
            <div className="text-sm text-gray-500">Help Requested</div>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button className="py-4 px-1 border-b-2 border-blue-500 font-medium text-blue-600">
              Posts ({posts.length})
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700">
              Comments ({comments.length})
            </button>
          </nav>
        </div>

        {/* Posts Section */}
        <div className="p-6">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No posts yet.
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post: any) => (
                <div key={post._id} className="border-b pb-4 last:border-b-0">
                  <Post post={post} userId={currentUserData?.id || null} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Comments</h2>
        </div>
        <div className="p-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No comments yet.
            </div>
          ) : (
            <div className="space-y-4">
              {comments.slice(0, 5).map((comment: { 
                _id: string; 
                content: string; 
                createdAt: string;
                post: { 
                  title: string; 
                  subreddit: { 
                    slug: { current: string } 
                  } 
                }
              }) => (
                <div key={comment._id} className="border-l-2 border-blue-200 pl-4">
                  <div className="text-sm text-gray-500 mb-1">
                    Commented on{" "}
                    <a 
                      href={`/neighborhood/${comment.post.subreddit.slug.current}`}
                      className="text-blue-600 hover:underline"
                    >
                      {comment.post.title}
                    </a>{" "}
                    <TimeAgo date={new Date(comment.createdAt)} />
                  </div>
                  <div className="text-gray-900">{comment.content}</div>
                </div>
              ))}
              {comments.length > 5 && (
                <div className="text-center pt-4">
                  <button className="text-blue-600 hover:underline">
                    View all {comments.length} comments
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
