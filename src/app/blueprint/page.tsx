import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConceptGallery } from "@/components/concept-gallery";
import { ShineText } from "@/components/shine-text";
import { concepts } from "@/data/concepts";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Blueprint",
  description: "A drafting-table direction for the same site.",
};

export default function BlueprintPage() {
  return (
    <div className="dir dir-blueprint">
      <header className="dir-header">
        <p className="dir-statement">
          <Link href="/">
            <ShineText>Sultan Ali</ShineText>
          </Link>{" "}
          makes websites, identities, and digital experiments.
        </p>
        <nav className="dir-nav" aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <a href="mailto:sultan91414@gmail.com">Email</a>
        </nav>
      </header>

      <main className="dir-main" id="main">
        <section aria-labelledby="blueprint-work">
          <h1 id="blueprint-work" className="dir-heading">
            <ShineText>Work I&apos;ve made</ShineText>
          </h1>
          <ul className="blueprint-work">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`}>
                  <span className="blueprint-thumb">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={project.cover.width}
                      height={project.cover.height}
                      sizes="180px"
                    />
                  </span>
                  <span className="blueprint-name">{project.name}</span>
                  <small>{project.discipline}</small>
                  <ArrowUpRight className="size-4 blueprint-arrow" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="blueprint-band">
          <div>
            <h2 className="dir-heading">
              <ShineText delay="1.4s">Current practice</ShineText>
            </h2>
            <p>Design, visual direction, and frontend development.</p>
            <Link href="/about" className="dir-link">
              A little more about me
            </Link>
          </div>
          <div>
            <h2 className="dir-heading">
              <ShineText delay="2.8s">About Sultan</ShineText>
            </h2>
            <p>
              I&apos;m a computer science graduate in Dubai who designs and builds websites, identities, and digital
              experiments.
            </p>
            <p>The visual language changes with the subject. The care does not.</p>
          </div>
        </section>

        <section aria-labelledby="blueprint-concepts">
          <h2 id="blueprint-concepts" className="dir-heading">
            <ShineText delay="4.2s">Concepts</ShineText>
          </h2>
          <ConceptGallery concepts={concepts} />
        </section>
      </main>

      <footer className="dir-footer">
        <p>Sultan Ali, Dubai</p>
        <div className="dir-footer-links">
          <a href="mailto:sultan91414@gmail.com">Email</a>
          <a href="https://github.com/sultan-a2" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/">Back to the site</Link>
        </div>
      </footer>
    </div>
  );
}
