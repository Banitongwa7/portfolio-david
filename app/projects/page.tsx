import { Suspense } from "react";
import PageHead from "@/components/site/PageHead";
import EndCta from "@/components/site/EndCta";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import s from "@/components/projects/projects.module.css";

export default function Projects() {
  return (
    <>
      <PageHead
        className={s.head}
        tag="Projects"
        title={
          <>
            Things I&apos;ve built, for teams <span className="serif">and for myself</span>
          </>
        }
        text="Business apps on Microsoft Power Platform, web and mobile products, and AI experiments. Filter by practice or search a technology."
      />
      {/* The explorer reads ?practice= from the URL. */}
      <Suspense>
        <ProjectsExplorer />
      </Suspense>
      <EndCta
        title="Need something similar?"
        text="Tell me about your project and I'll come back with a scope and an estimate."
      />
    </>
  );
}
