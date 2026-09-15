import CardTool from "@/components/cards/CardTool";
import PageHeader from "@/components/pageheader/PageHeader";
import AllTools from "@/data/AllTools";

export default function Tools() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <PageHeader
        eyebrow="Free tools"
        title="Tools to Empower Your Journey"
        description="Here are some tools I've created to support you on your professional journey."
      />

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AllTools.map((item) => (
          <CardTool key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
