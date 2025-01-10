import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import "./../styles/globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Portfolio | David",
  description: "Personal Portfolio created by David Banitongwa",
  authors: ["David Banitongwa"],
  keywords: ["portfolio", "david", "banitongwa", "developer", "developer portfolio"],
  viewport: "width=device-width, initial-scale=1",
  favicon: "/assets/icon.png",
  appleTouchIcon: "/assets/favicon/apple-touch-icon.png",
  verification: {
    google: "jkG2w3_QBheX-Gux8DE8N80vTRwrbTFFvaiFWG8xVh4",
    others:,
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Portfolio | David</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Personal Portfolio created by David Banitongwa"
        />
        <meta
          name="google-site-verification"
          content="jkG2w3_QBheX-Gux8DE8N80vTRwrbTFFvaiFWG8xVh4"
        />
        <meta name="msvalidate.01" content="2BFB76FBE029311BC23600887905E043" />
        <meta name="author" content="David Banitongwa" />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="portfolio, david, banitongwa, developer, developer portfolio"
        />
        <link rel="icon" href="/assets/icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
      </Head>
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
