import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "About",
  description: "About Sultan Ali, a designer and creative developer in Dubai.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-main shell">
        <h1>Designer with a curious <em>mind</em></h1>
        <div className="about-grid">
          <p>I&apos;m Sultan Ali, a junior designer and creative developer based in Dubai.</p>
          <p>I work across web design, product ideas, visual direction, and print. I like finding a distinct visual language, then building it into something people can actually use.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
