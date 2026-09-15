import AllProjects from "@/data/AllProjects";
import ProjectCard from "@/components/cards/ProjectCard";
import PageHeader from "@/components/pageheader/PageHeader";

export default function Projects() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="Here are some projects I've worked on. I hope you find them useful and inspiring for your own journey!"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AllProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
