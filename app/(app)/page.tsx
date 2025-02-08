import PostsList from "@/components/post/PostsList";
import CategoryFilter from "@/components/post/CategoryFilter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Users, HandHeart, HelpCircle } from "lucide-react";

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-50 to-orange-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to ShareSphere
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Connect with neighbors • Offer help • Build community
            </p>
            <p className="text-lg text-gray-500 mb-8">
              From groceries to pet care, tutoring to rides - we&apos;re here to help each other
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/create-post?type=offer">
                  <HandHeart className="w-5 h-5 mr-2" />
                  Offer Help
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                <Link href="/create-post?type=request">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Request Help
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-500 text-gray-600 hover:bg-gray-50">
                <Link href="/help-needed">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Browse Requests
                </Link>
              </Button>
            </div>

            {/* Featured Neighborhood */}
            <div className="bg-white rounded-lg p-6 shadow-sm border max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Featured Neighborhood</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chandigarh</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chandigarh, the City Beautiful
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/neighborhood/chandigarh">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Community Activity</h2>
            <p className="text-gray-600">See how neighbors are helping each other across all neighborhoods</p>
          </div>
          
          <CategoryFilter />
          
          <div className="flex flex-col gap-4">
            <PostsList filterCategory={params.category} />
          </div>
        </div>
      </section>
    </>
  );
}
