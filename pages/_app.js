import "@/styles/globals.css";
import RootLayout from "@/components/layout/layout";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import React from "react";

function MyApp({ Component, pageProps }) {

  

  return (
    <RootLayout>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </RootLayout>
  );
}

export default MyApp;
