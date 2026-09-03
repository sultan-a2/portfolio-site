import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="wordmark">
          Sultan Ali
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <a href="mailto:sultan91414@gmail.com">Email</a>
        </nav>
      </div>
    </header>
  );
}
