import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  const metadata = {
    title: "Portfolio David",
    description: "Personal Portfolio created by David Banitongwa",
  };

  return (
    <>
      <Head>
        <title>Portfolio | David</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="https://david-banitongwa.vercel.app/assets/icon.png" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="og:title" content="Portfolio | David" />
        <meta
          property="og:description"
          content="Personal Portfolio created by David Banitongwa"
        />
        <meta
          property="og:image"
          content="https://david-banitongwa.vercel.app/assets/icon.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="twitter:title" content="Portfolio | David" />
        <meta
          property="twitter:description"
          content="Personal Portfolio created by David Banitongwa"
        />
        <meta
          property="twitter:image"
          content="https://david-banitongwa.vercel.app/assets/icon.png"
        />
      </Head>
      <div
        className={inter.className}
        data-spy="scroll"
        data-target=".site-navbar-target"
        data-offset="300"
      >
        {children}
      </div>
      <Analytics />
    </>
  );
}
