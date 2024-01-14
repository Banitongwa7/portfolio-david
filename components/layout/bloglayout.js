import Head from "next/head";

export default function BlogLayout({ item, children }) {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.description} />
        <meta
          property="og:image"
          content={"https://david-banitongwa.vercel.app" + item.image}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://david-banitongwa.vercel.app/"
        />
        <meta property="twitter:title" content={item.title} />
        <meta property="twitter:description" content={item.description} />
        <meta
          property="twitter:image"
          content={"https://david-banitongwa.vercel.app" + item.image}
        />
      </Head>
      {children}
    </>
  );
}
