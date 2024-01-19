import "@/styles/globals.css";
import RootLayout from "@/components/layout/layout";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import Annoucement from "@/components/annoucement/Annoucement";
import React from "react";

function MyApp({ Component, pageProps }) {

  

  return (
    <RootLayout>
      <Annoucement />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </RootLayout>
  );
}

export default MyApp;
