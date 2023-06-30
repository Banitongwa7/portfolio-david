import Navbar from "@/components/Navbar";
import SectionOne from "@/components/SectionOne";
import RootLayout from "./layout";

export default function Home() {
  return (
    <RootLayout>
      <Navbar />
      <SectionOne />
    </RootLayout>
  );
}
