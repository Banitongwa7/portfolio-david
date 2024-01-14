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