import Image from "next/image";
import Link from "next/link";
import { ConceptGallery } from "@/components/concept-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { concepts } from "@/data/concepts";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="archive-home" id="main">
        <section className="archive-work" id="work" aria-labelledby="work-title">
          <h1 id="work-title">Work I&apos;ve made</h1>
          <div className="project-shelf">
            {projects.map((project) => (
              <article className="shelf-project" key={project.slug}>
                <Link href={`/work/${project.slug}`}>
                  <span className="shelf-image">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={project.cover.width}
                      height={project.cover.height}
                      sizes="(max-width: 680px) 46vw, 220px"
                      priority
                    />
                  </span>
                  <span className="shelf-title">{project.name}</span>
                  <small>{project.discipline}</small>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-practice" aria-labelledby="practice-title">
          <h2 id="practice-title">Current practice</h2>
          <p>Design, visual direction, and frontend development.</p>
          <Link href="/about">A little more about me</Link>
        </section>

        <section className="archive-lower" aria-label="Concepts and introduction">
          <div className="archive-studies" id="concepts">
            <h2>Concepts</h2>
            {concepts.length ? (
              <ConceptGallery concepts={concepts} />
            ) : (
              <p className="concepts-empty">
                Mockups, generated images, and landing ideas I&apos;m cooking up.
              </p>
            )}
          </div>

          <aside className="archive-about">
            <h2>About Sultan</h2>
            <p>I&apos;m a computer science graduate in Dubai who designs and builds websites, identities, and digital experiments.</p>
            <p>The visual language changes with the subject. The care does not.</p>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
