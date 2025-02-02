import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | About me",
  description: "Passionate and versatile Fullstack web developer, I create tailored solutions (websites, applications, etc.) that perfectly fit your needs. My skills include MERN Stack, NextJS, Python, and Microsoft Power Platform.",
  icons: "https://david-banitongwa.vercel.app/assets/icon.png",
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}
