import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "You Two Should Meet — The best relationships start with 'you two should meet'",
    template: "%s | You Two Should Meet",
  },
  description:
    "Your friends already know who you'd be perfect with. We make it easy for them to set you up. No swiping, no algorithms — just people who love you.",
  metadataBase: new URL("https://youtwoshouldmeet.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "You Two Should Meet",
    title: "You Two Should Meet — The best relationships start with 'you two should meet'",
    description:
      "Your friends already know who you'd be perfect with. We make it easy for them to set you up. No swiping, no algorithms — just people who love you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "You Two Should Meet",
    description:
      "Your friends already know who you'd be perfect with. We make it easy for them to set you up. No swiping, no algorithms.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

function Header() {
  return (
    <header className="w-full border-b border-primary/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary">
          <span className="text-2xl">💕</span>
          <span>You Two Should Meet</span>
        </Link>
      </div>
    </header>
  );
}

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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
