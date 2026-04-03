import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ShareSphere Admin Panel",
  description: "ShareSphere Content Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
