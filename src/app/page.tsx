import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero shell">
          <h1>Sultan Ali</h1>
          <div className="hero-copy">
            <p>Designer + Creative Developer</p>
            <p>Dubai, UAE</p>
          </div>
          <p className="intro">
            I&apos;m a junior designer and creative developer making websites,
            identities, and visual experiments with a strong point of view.
          </p>
        </section>

        <section className="work shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Selected work</h2>
            <p>Four projects, shown properly.</p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-preview" key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="project-image-link"
                  aria-label={`View ${project.name} project`}
                >
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                    sizes="(max-width: 900px) 100vw, 92vw"
                    priority={index === 0}
                  />
                </Link>
                <div className="project-caption">
                  <h3>
                    <Link href={`/work/${project.slug}`}>{project.name}</Link>
                  </h3>
                  <p>{project.discipline}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
