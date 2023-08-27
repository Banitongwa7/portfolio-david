import Navbar from "@/components/Navbar";
import SectionOne from "@/components/SectionOne";
import RootLayout from "./layout";
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
    </RootLayout>
  );
}
