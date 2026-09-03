import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <h2>
          Let&apos;s make something <em>good</em>
        </h2>
        <div className="footer-links">
          <a href="mailto:sultan91414@gmail.com">Email</a>
          <a
            href="https://github.com/sultan-a2"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link href="/about">About</Link>
          <Link href="/#work">Selected work</Link>
        </div>
        <p className="footer-note">Sultan Ali, Dubai, UAE</p>
      </div>
    </footer>
  );
}
