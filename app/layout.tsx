import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./../styles/globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="dbanitongwa" data-description="Support me on Buy me a coffee!" data-message="Thanks for your support 💖" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18" defer></script>
      </body>
    </html>
  );
}
