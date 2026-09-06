import type { ReactNode } from "react";
import Link from "next/link";
import { ShineText } from "@/components/shine-text";

export function SiteHeader({ figure }: { figure?: ReactNode }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <p className="site-statement">
          <Link href="/">
            <ShineText>Sultan Ali</ShineText>
          </Link>{" "}
          makes websites, identities, and digital experiments.
        </p>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <a href="mailto:sultan91414@gmail.com">Email</a>
        </nav>
        {figure}
      </div>
    </header>
  );
}

