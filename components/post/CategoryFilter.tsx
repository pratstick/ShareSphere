"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All Categories", value: "" },
  { label: "🛒 Grocery & Shopping", value: "grocery" },
  { label: "🐕 Pet Care", value: "pet-care" },
  { label: "💻 Tech Support", value: "tech-support" },
  { label: "🏠 Home & Garden", value: "home-garden" },
  { label: "🚗 Transportation", value: "transportation" },
  { label: "👶 Childcare", value: "childcare" },
  { label: "🎓 Tutoring & Education", value: "tutoring" },
  { label: "🔧 Repairs & Maintenance", value: "repairs" },
  { label: "🍽️ Food & Cooking", value: "food" },
  { label: "📦 Deliveries & Errands", value: "deliveries" },
  { label: "🏥 Health & Medical", value: "health" },
  { label: "💼 Professional Services", value: "professional" },
  { label: "🎉 Events & Celebrations", value: "events" },
  { label: "📚 Books & Learning", value: "books" },
  { label: "🔄 Other", value: "other" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Category:
      </label>
      <select
        id="category-filter"
        value={currentCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}
