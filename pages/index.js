import Navbar from "@/components/Navbar";
import SectionOne from "@/components/SectionOne";
import RootLayout from "./layout";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Awards from "@/components/Awards";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";

export default function Home() {
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
