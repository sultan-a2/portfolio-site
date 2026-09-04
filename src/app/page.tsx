import Image from "next/image";
import Link from "next/link";
import { ConceptGallery } from "@/components/concept-gallery";
import { ShineText } from "@/components/shine-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { concepts } from "@/data/concepts";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="home">
      <SiteHeader />
      <main className="home-main" id="main">
        <section id="work" aria-labelledby="work-title">
          <h1 id="work-title" className="home-heading">
            <ShineText>Work I&apos;ve made</ShineText>
          </h1>
          <div className="home-work">
            {projects.map((project) => (
              <LiquidGlassCard key={project.slug} glassSize="sm" className="work-card p-0">
                <Link href={`/work/${project.slug}`}>
                  <span className="work-card-image">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={project.cover.width}
                      height={project.cover.height}
                      sizes="(max-width: 760px) 90vw, 420px"
                      priority
                    />
                  </span>
                  <span className="work-card-name">{project.name}</span>
                  <small>{project.discipline}</small>
                </Link>
                {project.liveUrl ? (
                  <a className="work-live" href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                ) : null}
              </LiquidGlassCard>
            ))}
          </div>
        </section>

        <section className="home-band" aria-label="Practice and introduction">
          <div>
            <h2 className="home-heading">
              <ShineText delay="0.5s">Current practice</ShineText>
            </h2>
            <p>Design, visual direction, and frontend development.</p>
            <Link href="/about" className="text-link">
              A little more about me
            </Link>
          </div>
          <div>
            <h2 className="home-heading">
              <ShineText delay="1s">About Sultan</ShineText>
            </h2>
            <p>I&apos;m Sultan. I studied computer science in Bristol and I&apos;m back in Dubai now.</p>
            <p>I like making websites, playing around with design, trying ideas out and seeing where they go.</p>
          </div>
        </section>

        <section id="concepts" aria-labelledby="concepts-title">
          <h2 id="concepts-title" className="home-heading">
            <ShineText delay="1.5s">Concepts</ShineText>
          </h2>
          <ConceptGallery concepts={concepts} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
