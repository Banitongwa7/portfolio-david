import Head from "next/head";

export default function CustomLayout({ item, children }) {
  return (
    <>
      <Head>
      <meta name="robots" content="max-snippet:-1, max-image-preview:standard, max-video-preview:-1" />
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
        <meta property="og:site_name" content="David Banitongwa" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content={item.title} />
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
