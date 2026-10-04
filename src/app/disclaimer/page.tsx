import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — NocallQuoteNow",
  description:
    "NocallQuoteNow provides educational information and illustrative estimates only. Read how estimates, contact requests, and compensation work.",
  alternates: { canonical: "https://nocallquotenow.com/disclaimer" },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "General Information Only",
    body: [
      "NocallQuoteNow provides general educational information and illustrative estimates. Nothing on this site is insurance, legal, tax, or financial advice, and nothing here creates an advisor-client relationship. Consider speaking with a qualified professional about your own situation.",
    ],
  },
  {
    heading: "Estimates Vary",
    body: [
      "Actual premiums depend on the carrier, your age, your health, and your state. The estimates shown by the calculator are illustrative and may differ from the rate you are ultimately offered, if you are offered coverage at all.",
    ],
  },
  {
    heading: "The Get My Exact Quote Form",
    body: [
      "Submitting the \"Get My Exact Quote\" form is a request to be contacted by Jesus or his team. If you do not submit the form, you will not be contacted. See our Privacy Policy for how the information you submit is handled.",
    ],
  },
  {
    heading: "Compensation Disclosure",
    body: [
      // TODO (Jesus): confirm the exact wording of this compensation disclosure. It must
      // accurately describe how you are paid if a policy is purchased (for example, whether
      // you earn commissions from carriers, and whether the site earns anything beyond
      // advertising revenue). The sentences below are generic placeholders — review them
      // before relying on them.
      "If a policy is purchased after you request your exact quote, the licensed agent who sells it may be compensated as a result. This site also displays third-party advertising, which may generate advertising revenue.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">Disclaimer</span>
          </nav>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">Disclaimer</h1>
          <p className="text-white/60 text-sm">Last updated: October 2026</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-8">
          <p className="text-[#1e293b] text-sm leading-relaxed">
            Please read this disclaimer together with our Terms of Use and Privacy Policy.
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
