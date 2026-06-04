import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — NocallQuoteNow",
  description:
    "Questions or feedback about NocallQuoteNow? Send us an email at hello@nocallquotenow.com.",
  alternates: { canonical: "https://nocallquotenow.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">Contact</span>
          </nav>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">Contact</h1>
          <p className="text-white/60 text-sm">We keep it simple.</p>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-4">
          <p className="text-[#1e293b] text-sm leading-relaxed">
            For questions, feedback, or anything else, email us at{" "}
            <a
              href="mailto:hello@nocallquotenow.com"
              className="text-[#0d9488] font-semibold hover:underline"
            >
              hello@nocallquotenow.com
            </a>
            .
          </p>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            For privacy-related inquiries, use{" "}
            <a
              href="mailto:privacy@nocallquotenow.com"
              className="text-[#0d9488] font-semibold hover:underline"
            >
              privacy@nocallquotenow.com
            </a>
            .
          </p>
          <p className="text-[#64748b] text-sm">
            We are a small team and respond to most messages within a few business days.
          </p>
        </div>

        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/" className="text-[#0d9488] hover:underline font-medium">← Back to Home</Link>
          <Link href="/about" className="text-[#0d9488] hover:underline font-medium">About</Link>
        </div>
      </div>
    </>
  );
}
