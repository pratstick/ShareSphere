import {
  GetAllPostsQueryResult,
  GetPostsForSubredditQueryResult,
} from "@/sanity.types";
import { getPostComments } from "@/sanity/lib/vote/getPostComments";
import { getPostVotes } from "@/sanity/lib/vote/getPostVotes";
import { getUserPostVoteStatus } from "@/sanity/lib/vote/getUserPostVoteStatus";
import TimeAgo from "../TimeAgo";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MessageSquare } from "lucide-react";
import CommentInput from "../comment/CommentInput";
import CommentList from "../comment/CommentList";
import PostVoteButtons from "./PostVoteButtons";
import ReportButton from "../ReportButton";
import DeleteButton from "../DeleteButton";

interface PostProps {
  post:
    | GetAllPostsQueryResult[number]
    | GetPostsForSubredditQueryResult[number];
  userId: string | null;
}

async function Post({ post, userId }: PostProps) {
  const votes = await getPostVotes(post._id);
  const vote = await getUserPostVoteStatus(post._id, userId);
  const comments = await getPostComments(post._id, userId);
  
  // Get category emoji
  const getCategoryEmoji = (category: string) => {
    const categoryMap: Record<string, string> = {
      grocery: "🛒",
      "pet-care": "🐕",
      "tech-support": "💻",
      "home-garden": "🏠",
      transportation: "🚗",
      childcare: "👶",
      tutoring: "🎓",
      repairs: "🔧",
      food: "🍽️",
      deliveries: "📦",
      health: "🏥",
      professional: "💼",
      events: "🎉",
      books: "📚",
      other: "🔄",
    };
    return categoryMap[category] || "🔄";
  };

  // Use the new helpType field if available, otherwise fallback to old logic
  const helpType = (post as { helpType?: string }).helpType;
  const category = (post as { category?: string }).category;
  const isHelpRequest = helpType === "request" || 
                       (!helpType && (post.title?.toLowerCase().includes('need') || 
                       post.title?.toLowerCase().includes('request') ||
                       post.title?.toLowerCase().includes('looking for') ||
                       (post.body?.[0]?.children?.[0]?.text?.toLowerCase().includes('need help'))));

  return (
    <article
      key={post._id}
      className="relative bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="flex">
        {/* Vote Buttons */}
        <PostVoteButtons
          contentId={post._id}
          votes={votes}
          vote={vote}
          contentType="post"
        />

        {/* Post Content */}
        <div className="flex-1 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            {post.subreddit && (
              <>
                <a
                  href={`/neighborhood/${post.subreddit.slug}`}
                  className="font-medium hover:underline"
                >
                  {post.subreddit.title}
                </a>
                <span>•</span>
                <span>Posted by</span>
                {post.author && (
                  <a
                    href={`/u/${post.author.username}`}
                    className="hover:underline"
                  >
                    {post.author.username}
                  </a>
                )}
                <span>•</span>
                {post.publishedAt && (
                  <TimeAgo date={new Date(post.publishedAt)} />
                )}
              </>
            )}
          </div>

          {post.subreddit && (
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-medium text-gray-900 flex-1">
                {post.title}
              </h2>
              <div className="flex items-center gap-2">
                {category && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {getCategoryEmoji(category)} {category.replace('-', ' ')}
                  </span>
                )}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isHelpRequest 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isHelpRequest ? '🙋 Help Needed' : '🤝 Help Offered'}
                </span>
              </div>
            </div>
          )}

          {post.body && post.body[0]?.children?.[0]?.text && (
            <div className="prose prose-sm max-w-none text-gray-700 mb-3">
              {post.body[0].children[0].text}
            </div>
          )}

          {post.image && post.image.asset?._ref && (
            <div className="relative w-full h-64 mb-3 px-2 bg-gray-100/30 ">
              <Image
                src={urlFor(post.image).url()}
                alt={post.image.alt || "Post image"}
                fill
                className="object-contain rounded-md p-2"
              />
            </div>
          )}

          <button className="flex items-center px-1 py-2 gap-1 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </button>

          <CommentInput postId={post._id} />
          <CommentList postId={post._id} comments={comments} userId={userId} />
        </div>
      </div>

      {/* Buttons */}
      <div className="absolute top-2 right-2">
        <div className="flex items-center gap-2">
          <ReportButton contentId={post._id} />

          {post.author?._id && (
            <DeleteButton
              contentOwnerId={post.author?._id}
              contentId={post._id}
              contentType="post"
            />
          )}
        </div>
      </div>
    </article>
  );
}

export default Post;
