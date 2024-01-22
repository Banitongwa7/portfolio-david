import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {

  return (
    <>
      <Head>
        <title>Portfolio | David</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personal Portfolio created by David Banitongwa" />
        <meta name="author" content="David Banitongwa" />
        <meta charSet="utf-8" />
        <meta name="keywords" content="portfolio, david, banitongwa, developer, developer portfolio" />
        <link rel="canonical" href="https://david-banitongwa.vercel.app" />

        <link rel="apple-touch-icon" sizes="180x180" href="https://david-banitongwa.vercel.app/assets/favicon/apple-touch-icon.png" />
        <link rel="icon" sizes="32x32" href="https://david-banitongwa.vercel.app/assets/favicon/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="https://david-banitongwa.vercel.app/assets/favicon/favicon-16x16.png" />
        <link rel="manifest" href="https://david-banitongwa.vercel.app/assets/favicon/site.webmanifest" />
      </Head>
      <div
        className={inter.className}
      >
        {children}
      </div>
      <Analytics />
    </>
  );
}
