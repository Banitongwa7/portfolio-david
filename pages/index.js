import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 container mt-[100px]">
      <div>
        <Image
          src="/david.jpg"
          alt="Picture of david"
          width={200}
          height={200}
          className="rounded-full h-[200px] w-[200px] object-cover"
        />
      </div>
      <div className="text-center space-y-4">
        <h2 className="text-[40px] font-extrabold uppercase">David Banitongwa</h2>
        <p className="text-[20px] font-light w-1/2 mx-auto pb-10">I am software engineer and microsoft power-platform developer based in Tunisia. Feel free to contact me or check out my resume here.</p>
        <Link href="#" className="text-[20px] font-medium py-2 px-4 text-white rounded-sm duration-200 bg-gray-900 hover:bg-gray-700">
        Get Resume
        </Link>
      </div>

    </section>
  );
}
