import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <p>Sultan Ali, Dubai</p>
      <div className="footer-links">
        <a href="mailto:sultan91414@gmail.com">Email</a>
        <a href="https://github.com/sultan-a2" target="_blank" rel="noreferrer">GitHub</a>
        <Link href="/#work">Work</Link>
      </div>
    </footer>
  );
}

