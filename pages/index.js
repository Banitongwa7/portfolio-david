import ComingSoon from "@/components/ComingSoon";
import RootLayout from "./layout";

export default function Home() {
  /*
 <Head>
      <title>Portfolio David</title>
      <meta name='description' content='Personal Portfolio create with Next JS' />
      <link rel='icon' href='favicon.ico' />
    </Head>
  */
  return (
    <RootLayout>
      <ComingSoon />
    </RootLayout>
  );
}
