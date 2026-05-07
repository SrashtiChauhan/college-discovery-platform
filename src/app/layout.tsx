import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "College discovery and decision platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-50 text-zinc-900">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold">
              College Discovery Platform
            </Link>
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/colleges" className="hover:text-blue-600">
                Colleges
              </Link>
              <Link href="/compare" className="hover:text-blue-600">
                Compare
              </Link>
              <Link href="/predictor" className="hover:text-blue-600">
                Predictor
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
