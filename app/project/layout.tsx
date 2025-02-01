import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Project",
  description: "Feel free to discover my projects.",
  icons: "https://david-banitongwa.vercel.app/assets/icon.png",
};

export default function ProjectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
