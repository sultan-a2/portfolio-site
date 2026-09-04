import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ShineText } from "@/components/shine-text";

export const metadata = {
  title: "About",
  description: "About Sultan Ali, a designer working across visual direction and frontend in Dubai.",
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
          <p>I&apos;m Sultan Ali, a computer science graduate working deeply in design and frontend in Dubai.</p>
          <p>I work across web design, product ideas, visual direction, and print. I like entering a subject, finding its visual language, then building it into something people can actually use.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
