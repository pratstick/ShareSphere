import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShareSphere Admin Panel",
  description: "ShareSphere Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
