import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
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
  verification: { google: "MAVHjJSFKyedq_BN9w9hPGAONxLRSB_PxT16Lq-R-SM" },
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
      <body className={`${geist.className} antialiased`} style={{ background: "#f1f5f9", color: "#1e293b" }}>
        <NavBar />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4437016471828719"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <main>{children}</main>

        <footer className="bg-teal-600 text-white text-xs text-center py-6 px-4 mt-16">
          <p className="max-w-3xl mx-auto opacity-90">
            NocallQuoteNow.com provides illustrative final expense insurance estimates for educational purposes only.
            Quotes are not binding and actual premiums vary by carrier, age, health, and state regulations.
            Always review policy details before purchasing. © {new Date().getFullYear()} NocallQuoteNow.
          </p>
        </footer>
      </body>
    </html>
  );
}
