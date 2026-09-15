import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./../styles/globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ClarityComponent from "@/utils/Clarity";


export const metadata: Metadata = {
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
    url: "https://david-banitongwa.vercel.app/",
    siteName: "Portfolio | David",
    images: [
      {
        url: "https://david-banitongwa.vercel.app/assets/icon.png",
        width: 1200,
        height: 630,
        alt: "Portfolio | David",
      },
    ],
  },
};

// Applies the saved theme before the first paint to avoid a light/dark flash.
// Dark is the default; "darkMode" is the key used by the previous switcher
// (where "true" meant light).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=localStorage.getItem("darkMode")==="true"?"light":"dark"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <NavBar />
        <main id="main" className="scroll-mt-16">{children}</main>
        <Footer />
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
