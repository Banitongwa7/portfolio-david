import "@/styles/globals.css";
import RootLayout from "@/components/layout/layout";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import Annoucement from "@/components/annoucement/Annoucement";
import AnimatedCursor from "react-animated-cursor";
import React from "react";

function MyApp({ Component, pageProps }) {

  return (
    <RootLayout>
      <Annoucement />
      <NavBar />
      <Component {...pageProps} />
      <Footer />

      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "#1D2B53",
        }}
        outerStyle={{
          border: "2px solid #1D2B53",
        }}
      />
    </RootLayout>
  );
}

export default MyApp;
