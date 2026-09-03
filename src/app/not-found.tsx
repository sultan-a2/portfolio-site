import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="about-main shell">
        <h1>Nothing here</h1>
        <div className="about-grid">
          <p>This page does not exist.</p>
          <p><Link href="/" className="text-link">Return to selected work</Link></p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
