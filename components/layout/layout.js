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
