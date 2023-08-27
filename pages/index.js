import Navbar from "@/components/Navbar";
import SectionOne from "@/components/SectionOne";
import RootLayout from "./layout";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Awards from "@/components/Awards";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <RootLayout>
      <Navbar />
      <SectionOne />
      <Awards />
      <Skills />
      <Experience />
      <Blogs />
      <Footer />
    </RootLayout>
  );
}
