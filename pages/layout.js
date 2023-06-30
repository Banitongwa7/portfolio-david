import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const metadata = {
    title: "Portfolio David",
    description: "Personal Portfolio create with Next JS",
  };

  return (
    <>
      <Head>
        <title>Portfolio David</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className={inter.className}>{children}</div>
    </>
  );
}
