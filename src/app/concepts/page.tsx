import { ConceptCards } from "@/components/concept-cards";
import { ShineText } from "@/components/shine-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { concepts } from "@/data/concepts";

export const metadata = {
  title: "Concepts",
  description: "Mockups, generated images and landing ideas by Sultan Ali.",
};

export default function ConceptsPage() {
  return (
    <>
      <SiteHeader />
      <main className="concepts-main" id="main">
        <h1 className="home-heading">
          <ShineText>Concepts</ShineText>
        </h1>
        <ConceptCards concepts={concepts} />
      </main>
      <SiteFooter />
    </>
  );
}
