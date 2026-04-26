import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { generateLocalBusinessSchema } from "@/lib/schema";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nocallquotenow.com"),
  title: {
    default: "Final Expense Insurance Quotes — No Phone Calls | NocallQuoteNow",
    template: "%s | NocallQuoteNow",
  },
  description:
    "Get instant final expense life insurance quotes in all 50 states. No phone calls, no agents, no pressure. Free burial insurance calculator online.",
  openGraph: {
    type: "website",
    siteName: "NocallQuoteNow",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
        <header className="bg-blue-900 text-white py-4 px-6 shadow-md">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              NocallQuoteNow<span className="text-blue-300">.com</span>
            </a>
            <nav className="hidden sm:flex gap-6 text-sm font-medium text-blue-200">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        <footer className="bg-blue-950 text-blue-300 text-xs text-center py-6 px-4 mt-16">
          <p className="max-w-3xl mx-auto">
            NocallQuoteNow.com provides illustrative final expense insurance estimates for educational purposes only.
            Quotes are not binding and actual premiums vary by carrier, age, health, and state regulations.
            Always review policy details before purchasing. © {new Date().getFullYear()} NocallQuoteNow.
          </p>
        </footer>
      </body>
    </html>
  );
}
