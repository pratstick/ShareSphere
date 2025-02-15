"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function CreatePost() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const handleCreatePost = (helpType: "offer" | "request") => {
    // Extract the neighborhood name from the pathname if it follows the pattern /neighborhood/[name]
    const neighborhoodName = pathname.includes("/neighborhood/")
      ? pathname.split("/neighborhood/")[1]
      : null;

    // If we're in a neighborhood, redirect to create post with that neighborhood pre-selected
    if (neighborhoodName) {
      router.push(`/create-post?neighborhood=${neighborhoodName}&type=${helpType}`);
    } else {
      // Otherwise just go to the create post page
      router.push(`/create-post?type=${helpType}`);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => handleCreatePost("offer")} disabled={!user} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        {user ? "Offer Help" : "Sign in to offer help"}
      </Button>
      <Button onClick={() => handleCreatePost("request")} disabled={!user} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
        <Plus className="w-4 h-4 mr-2" />
        {user ? "Request Help" : "Sign in to request help"}
      </Button>
    </div>
  );
}

export default CreatePost;
