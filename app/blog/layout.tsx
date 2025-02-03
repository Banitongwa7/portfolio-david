import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Blog",
  description: "My blog",
  icons: "https://david-banitongwa.vercel.app/assets/icon.png",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
