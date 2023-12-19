import "@/styles/globals.css";
import RootLayout from "./layout";
import NavBar from "@/components/navbar/NavBar";

function MyApp({ Component, pageProps }) {
  
  return (
    <RootLayout>
      <NavBar />
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
