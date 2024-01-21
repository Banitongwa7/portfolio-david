import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {

  return (
    <>
      <Head>
        <title>Portfolio | David</title>
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
