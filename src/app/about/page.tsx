import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ShineText } from "@/components/shine-text";

export const metadata = {
  title: "About",
  description: "Sultan Ali, a computer science graduate from Bristol working across design and frontend in Dubai.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-main shell" id="main">
        <h1>
          <ShineText>Designer with a curious mind.</ShineText>
        </h1>
        <div className="about-grid">
          <p>
            I&apos;m Sultan Ali. I studied computer science in Bristol, England, and I&apos;m back in Dubai, the city
            that raised me.
          </p>
          <p>
            I build websites and identities, and I keep a pile of concepts running alongside them: mockups, generated
            images, landing pages for things that don&apos;t exist yet.
          </p>
          <p>
            I work across web design, product ideas, visual direction, and print. I like entering a subject, finding
            its visual language, then building it into something people can actually use.
          </p>
          <p>Some nights I make music instead.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
