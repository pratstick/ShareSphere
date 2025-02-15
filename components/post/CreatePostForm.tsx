"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/action/createPost";

function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const neighborhood = searchParams.get("neighborhood");
  const helpType = searchParams.get("type"); // "offer" or "request"

  if (!neighborhood) {
    return (
      <div className="text-center p-4">
        <p>Please select a neighborhood first</p>
      </div>
    );
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Post title is required");
      return;
    }

    if (!category) {
      setErrorMessage("Please select a category");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      let imageBase64: string | null = null;
      let fileName: string | null = null;
      let fileType: string | null = null;

      if (imageFile) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
        fileName = imageFile.name;
        fileType = imageFile.type;
      }

      const result = await createPost({
        title: title.trim(),
        subredditSlug: neighborhood,
        body: body.trim() || undefined,
        helpType: (helpType as "offer" | "request") || "request",
        category: category,
        imageBase64: imageBase64,
        imageFilename: fileName,
        imageContentType: fileType,
      });

      resetForm();
      console.log("Finished creating post", result);

      if ("error" in result && result.error) {
        setErrorMessage(result.error);
      } else {
        router.push(`/neighborhood/${neighborhood}`);
      }
    } catch (err) {
      console.error("Failed to create post", err);
      setErrorMessage("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setCategory("");
    setErrorMessage("");
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <form onSubmit={handleCreatePost} className="space-y-4 mt-2">
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            {helpType === "request" ? "What help do you need?" : "What help can you offer?"}
          </label>
          <Input
            id="title"
            name="title"
            placeholder={
              helpType === "request" 
                ? "I need help with..." 
                : "I can help with..."
            }
            className="w-full focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={300}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="body" className="text-sm font-medium">
            Details (optional)
          </label>
          <Textarea
            id="body"
            name="body"
            placeholder={
              helpType === "request"
                ? "Describe what you need help with, when you need it, and any other relevant details..."
                : "Describe how you can help, your availability, and any requirements..."
            }
            className="w-full focus:ring-2 focus:ring-blue-500"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category...</option>
            <option value="grocery">🛒 Grocery & Shopping</option>
            <option value="pet-care">🐕 Pet Care</option>
            <option value="tech-support">💻 Tech Support</option>
            <option value="home-garden">🏠 Home & Garden</option>
            <option value="transportation">🚗 Transportation</option>
            <option value="childcare">👶 Childcare</option>
            <option value="tutoring">🎓 Tutoring & Education</option>
            <option value="repairs">🔧 Repairs & Maintenance</option>
            <option value="food">🍽️ Food & Cooking</option>
            <option value="deliveries">📦 Deliveries & Errands</option>
            <option value="health">🏥 Health & Medical</option>
            <option value="professional">💼 Professional Services</option>
            <option value="events">🎉 Events & Celebrations</option>
            <option value="books">📚 Books & Learning</option>
            <option value="other">🔄 Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image (optional)</label>

          {imagePreview ? (
            <div className="relative w-full h-64 mx-auto">
              <Image
                src={imagePreview}
                alt="Post preview"
                fill
                className="object-contain"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="post-image"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="w-6 h-6 mb-2 text-gray-400" />
                  <p className="text-xs text-gray-500">
                    Click to upload an image
                  </p>
                </div>
                <input
                  id="post-image"
                  name="post-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className={`w-full font-medium py-2 transition-colors ${
            helpType === "request" 
              ? "bg-orange-600 hover:bg-orange-700" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          disabled={isLoading}
        >
          {isLoading 
            ? "Posting..." 
            : helpType === "request" 
              ? "Post Help Request" 
              : "Post Help Offer"
          }
        </Button>
      </form>
    </div>
  );
}

export default CreatePostForm;
