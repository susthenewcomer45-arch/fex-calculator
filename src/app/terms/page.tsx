import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — NocallQuoteNow",
  description:
    "The terms that apply when you use NocallQuoteNow, including how our illustrative estimates, ads, and links work.",
  alternates: { canonical: "https://nocallquotenow.com/terms" },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Use of the Site",
    body: [
      "NocallQuoteNow provides a free premium estimator and educational articles about final expense insurance. You may use the site for your own personal, non-commercial purposes. You agree not to misuse the site, interfere with its operation, or use automated tools to scrape or overload it.",
    ],
  },
  {
    heading: "Estimates Are Illustrative and Not Binding",
    body: [
      "Every premium figure shown on this site is an illustrative estimate. Estimates are not quotes, offers, or contracts, and they do not bind us, any insurance carrier, or any agent.",
    ],
  },
  {
    heading: "No Guarantee of Coverage or Rates",
    body: [
      "We do not guarantee that you will qualify for coverage or that any rate shown will be available to you. Actual premiums and eligibility are determined by the insurance carrier and depend on factors such as your age, health, state, and the coverage amount.",
    ],
  },
  {
    heading: "Third-Party Ads and Links",
    body: [
      "This site displays advertisements, including ads served by Google AdSense, and may link to third-party websites. We do not control and are not responsible for the content, products, or practices of third parties. Your use of any third-party site or ad is at your own risk and subject to that party's own terms.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "The site and its content are provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, NocallQuoteNow and its owner are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the site or your reliance on any estimate or information on it.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these terms from time to time. The \"Last updated\" date at the top of this page shows when they last changed. Continuing to use the site after changes are posted means you accept the updated terms.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about these terms can be sent through our contact page or by email to hello@nocallquotenow.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">Terms of Use</span>
          </nav>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">Terms of Use</h1>
          <p className="text-white/60 text-sm">Last updated: October 2026</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-8">
          <p className="text-[#1e293b] text-sm leading-relaxed">
            By using NocallQuoteNow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to these terms. If you do not agree, please do not use the site.
          </p>

          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-extrabold text-[#1a2744] mb-3 border-l-4 border-[#0d9488] pl-4">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((para, i) => (
                  <p key={i} className="text-[#1e293b] text-sm leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/" className="text-[#0d9488] hover:underline font-medium">← Back to Home</Link>
          <Link href="/contact" className="text-[#0d9488] hover:underline font-medium">Contact Us</Link>
        </div>
      </article>
    </>
  );
}
