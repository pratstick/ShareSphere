import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: FileText,
  description: "A user-submitted post in a subreddit",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the post",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "originalTitle",
      title: "Original Title",
      type: "string",
      description: "Stores the original title if the post is deleted",
      hidden: true,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "The user who created this post",
      to: [{ type: "user" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subreddit",
      title: "Subreddit",
      type: "reference",
      description: "The subreddit this post belongs to",
      to: [{ type: "subreddit" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "The main content of the post",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Optional image for the post",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Alternative text for screen readers and SEO",
        },
      ],
    }),
    defineField({
      name: "helpType",
      title: "Help Type",
      type: "string",
      description: "Whether this is a help offer or request",
      options: {
        list: [
          { title: "Offer Help", value: "offer" },
          { title: "Request Help", value: "request" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Help Category",
      type: "string",
      description: "Category of help being offered or requested",
      options: {
        list: [
          { title: "🛒 Grocery & Shopping", value: "grocery" },
          { title: "🐕 Pet Care", value: "pet-care" },
          { title: "💻 Tech Support", value: "tech-support" },
          { title: "🏠 Home & Garden", value: "home-garden" },
          { title: "🚗 Transportation", value: "transportation" },
          { title: "👶 Childcare", value: "childcare" },
          { title: "🎓 Tutoring & Education", value: "tutoring" },
          { title: "🔧 Repairs & Maintenance", value: "repairs" },
          { title: "🍽️ Food & Cooking", value: "food" },
          { title: "📦 Deliveries & Errands", value: "deliveries" },
          { title: "🏥 Health & Medical", value: "health" },
          { title: "💼 Professional Services", value: "professional" },
          { title: "🎉 Events & Celebrations", value: "events" },
          { title: "📚 Books & Learning", value: "books" },
          { title: "🔄 Other", value: "other" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isReported",
      title: "Is Reported",
      type: "boolean",
      description: "Indicates if this post has been reported by users",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "When this post was published",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isDeleted",
      title: "Is Deleted",
      type: "boolean",
      description: "Indicates if this post has been deleted",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.username",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
