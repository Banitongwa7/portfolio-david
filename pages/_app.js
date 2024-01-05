import "@/styles/globals.css";
import RootLayout from "./layout";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

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
