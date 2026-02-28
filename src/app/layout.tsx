import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "You Two Should Meet — The matchmaking app for mothers who know best",
    template: "%s | You Two Should Meet",
  },
  description:
    "Your mother was right about a lot of things. Maybe she's right about this too. You Too Should Meet is the matchmaking app for mothers who know best.",
  metadataBase: new URL("https://youtwoshouldmeet.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "You Two Should Meet",
    title: "You Two Should Meet — The matchmaking app for mothers who know best",
    description:
      "Your mother was right about a lot of things. Maybe she's right about this too. You Too Should Meet is the matchmaking app for mothers who know best.",
  },
  twitter: {
    card: "summary_large_image",
    title: "You Two Should Meet",
    description:
      "Your friends already know who you'd be perfect with. We make it easy for them to set you up. No swiping, no algorithms.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
};


function Footer() {
  return (
    <footer className="w-full border-t border-primary/10 bg-card/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-sm text-text-secondary sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} You Two Should Meet. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/privacy" className="transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms &amp; Conditions
          </Link>
          <Link href="/sms-terms" className="transition-colors hover:text-primary">
            SMS Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,500&family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
