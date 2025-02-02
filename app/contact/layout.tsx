import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Contact me",
  description: "Discuss a project or just want to say hi ? my inbox is open for all.",
  icons: "https://david-banitongwa.vercel.app/assets/icon.png",
};


export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}
