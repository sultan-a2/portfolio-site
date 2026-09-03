import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.intro };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <SiteHeader />
      <main>
        <header className="project-hero shell">
          <div className="project-kicker project-meta">
            <p>{project.discipline}</p>
            {project.context ? <p>{project.context}</p> : null}
          </div>
          <h1>{project.name}</h1>
          <div className="project-intro-row">
            <p className="project-intro">{project.intro}</p>
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-action">
                View live site ↗
              </a>
            ) : null}
          </div>
        </header>

        <div className="case-study">
          {project.blocks.map((block, index) => (
            <figure className="media-block" key={`${project.slug}-${index}`}>
              {block.type === "image" ? (
                <div className="media-frame">
                  <Image src={block.image.src} alt={block.image.alt} width={block.image.width} height={block.image.height} sizes="100vw" priority={index === 0} />
                </div>
              ) : null}
              {block.type === "pair" ? (
                <div className="media-pair">
                  {block.images.map((image) => (
                    <div className="media-frame" key={image.src}>
                      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 50vw" />
                    </div>
                  ))}
                </div>
              ) : null}
              {block.type === "video" ? (
                <div className="media-frame">
                  <video
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster={block.poster}
                    width={block.width}
                    height={block.height}
                    style={{ aspectRatio: `${block.width} / ${block.height}` }}
                    aria-label={block.caption ?? "Project walkthrough"}
                  >
                    <source src={block.src} type="video/mp4" />
                    Your browser cannot play this video.
                  </video>
                </div>
              ) : null}
              {block.caption ? <figcaption className="media-caption">{block.caption}</figcaption> : null}
            </figure>
          ))}

          <div className="project-next">
            <Link href={`/work/${nextProject.slug}`}>
              <span>Next project</span>
              <strong>{nextProject.name}</strong>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
