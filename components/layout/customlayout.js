import Head from "next/head";

export default function CustomLayout({ item, children }) {
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
        <meta property="og:site_name" content="David Banitongwa" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="300" />
        
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
