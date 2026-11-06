import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./../styles/globals.css";
import "./../styles/site.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ConsentManager from "@/components/site/ConsentManager";
import IntroLoader from "@/components/intro/IntroLoader";
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

// Decides before the first paint whether the intro plays: once per session,
// never with reduced motion. If the app never takes over, the page unlocks
// itself after a few seconds.
const introScript = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem("intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.setAttribute("data-intro","playing");setTimeout(function(){if(d.getAttribute("data-intro")){d.removeAttribute("data-intro");window.dispatchEvent(new Event("intro:done"))}},6000)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <IntroLoader />
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
        {/* Cookieless, so they need no consent. */}
        <Analytics />
        <SpeedInsights />
        {/* Clarity and the Tawk chat only start after the visitor accepts. */}
        <ConsentManager />
      </body>
    </html>
  );
}
