import { AboutTrail } from "@/components/about-trail";
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
      <AboutTrail>
        <main className="about-main shell" id="main">
          <h1>
            <ShineText>Designer with a curious mind.</ShineText>
          </h1>
          <div className="about-grid">
            <p>I&apos;m Sultan. I studied computer science in Bristol and I&apos;m back in Dubai now.</p>
            <p>
              I like making websites, playing around with design, trying ideas out and seeing where they go. A lot of the
              time I don&apos;t really know what something is going to become until I start making it.
            </p>
            <p>I also make music sometimes.</p>
          </div>
        </main>
      </AboutTrail>
      <SiteFooter />
    </>
  );
}
