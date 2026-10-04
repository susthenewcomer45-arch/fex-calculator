import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Author — Jesus Gonzalez | NocallQuoteNow",
  description:
    "Meet Jesus Gonzalez, the licensed life and annuities agent behind NocallQuoteNow, a no-pressure final expense insurance estimator.",
  alternates: { canonical: "https://nocallquotenow.com/authors" },
};

export default function AuthorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">Authors</span>
          </nav>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">
            About the Author
          </h1>
          <p className="text-white/60 text-sm">Jesus Gonzalez, founder of NocallQuoteNow.</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">Jesus Gonzalez</h2>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            Jesus Gonzalez built NocallQuoteNow after 20+ years in customer service and sales,
            including training sales teams and developing his own sales methodology. He&apos;s
            licensed in life and annuities and has seen firsthand how most insurance sales are
            built around high-pressure tactics that push away anyone who isn&apos;t ready to buy
            right now — and how that approach breaks trust in an industry where scams are common.
            Realizing those customers might never look into life insurance again after an
            experience like that, Jesus built NocallQuoteNow.com: a site where anyone in the
            country can get a real idea of their premium range, and if they decide to move
            forward, Jesus or someone from his team will reach out within 8 hours with an accurate number.
          </p>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-[#0d9488] hover:underline font-medium">← Back to Home</Link>
          <Link href="/about" className="text-[#0d9488] hover:underline font-medium">About the Site</Link>
        </div>
      </article>
    </>
  );
}
