import PostsList from "@/components/post/PostsList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plus, ArrowLeft } from "lucide-react";

export default function HelpNeededPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Help Needed
                </h1>
                <p className="text-lg text-gray-600">
                  Neighbors who need assistance in your community
                </p>
              </div>
            </div>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/create-post?type=request">
                <Plus className="w-5 h-5 mr-2" />
                Request Help
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Help Requests */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Current Help Requests</h2>
            </div>
            <p className="text-gray-600">
              Browse help requests from neighbors across all communities. Click on any post to offer assistance.
            </p>
          </div>
          
          {/* Filter Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-900">Showing help requests only</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              This page filters posts to show only help requests. To see all posts or help offers, visit the homepage.
            </p>
          </div>

          {/* Posts List - filtered for help requests */}
          <div className="flex flex-col gap-4">
            <PostsList filterType="request" />
          </div>

          {/* Empty State or Call to Action */}
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Want to help your neighbors?
            </h3>
            <p className="text-gray-600 mb-4">
              Every small act of kindness makes our community stronger. Browse the requests above and see how you can help.
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/">
                  View All Posts
                </Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/create-post?type=offer">
                  <Plus className="w-4 h-4 mr-2" />
                  Offer Help
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
