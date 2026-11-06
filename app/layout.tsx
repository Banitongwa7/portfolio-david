import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./../styles/globals.css";
import "./../styles/site.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClarityComponent from "@/utils/Clarity";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { SITE_URL } from "@/utils/site";

// Archivo carries the whole interface; its width axis gives the stretched
// display caps. Instrument Serif is only used for one italic accent per title.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Portfolio | David",
  description: "Personal Portfolio created by David Banitongwa",
  keywords: [
    "portfolio",
    "david",
    "banitongwa",
    "developer",
    "developer portfolio",
  ],
  icons: "https://david-banitongwa.vercel.app/assets/icon.png",
  verification: {
    google: "jkG2w3_QBheX-Gux8DE8N80vTRwrbTFFvaiFWG8xVh4",
    other: {
      name: "msvalidate.01",
      content: "2BFB76FBE029311BC23600887905E043",
    },
  },
  authors: {
    name: "David Banitongwa",
  },
  openGraph: {
    title: "Portfolio | David",
    description: "Personal Portfolio created by David Banitongwa",
    type: "website",
    url: SITE_URL,
    siteName: "Portfolio | David",
    // The share image comes from app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSerif.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <SmoothScroll />
        <div className="pg" id="top">
          <div className="sheet">
            {/* The home page draws its own dark navigation inside the hero. */}
            <NavBar />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </div>
        <Analytics />
        <ClarityComponent />
        <SpeedInsights />
        <Script id="tawk-script" strategy="lazyOnload" defer>
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            Tawk_API.onLoad = function(){
              Tawk_API.minimize();
            };
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/680b9cb34b378d190bfa0fa3/1ipmlo7jl';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
