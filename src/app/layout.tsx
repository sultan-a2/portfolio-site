import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sultan Ali | Design + Frontend",
    template: "%s | Sultan Ali",
  },
  description: "Websites, identities, and digital experiments by Sultan Ali in Dubai.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}

