import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About NocallQuoteNow — No Spam, No Agents, No Pressure",
  description:
    "NocallQuoteNow is a free final expense insurance estimator built by a licensed agent who got tired of watching seniors get harassed for just wanting a number.",
  alternates: { canonical: "https://nocallquotenow.com/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">About</span>
          </nav>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">
            About NocallQuoteNow
          </h1>
          <p className="text-white/60 text-sm">A free tool built for people, not lead buyers.</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">What This Site Is</h2>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            NocallQuoteNow is a free tool that gives seniors and their families honest final expense
            insurance estimates across all 50 states — no phone number required, no agents, no
            pressure.
          </p>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            You pick your state, enter your age, gender, health status, and desired coverage amount,
            and you get an estimated monthly premium in seconds. Nothing is sold to
            you. Nobody will call you. The number is yours to keep.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">Why We Built It</h2>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            NocallQuoteNow was built by Jesus Gonzalez after more than 20 years in customer service
            and sales. Over that time he has trained sales teams, developed his own sales
            methodology, and become licensed in life and annuities. You can read more on the{" "}
            <Link href="/authors" className="text-[#0d9488] font-semibold hover:underline">
              author page
            </Link>
            .
          </p>
          {/* TODO (Jesus): add any extra personal background you want shared here — for example
              how you got started, what you've learned from working with families, or why this
              work matters to you. Only add facts you are comfortable publishing. */}
          <p className="text-[#1e293b] text-sm leading-relaxed">
            The reason this site exists is simple. Most insurance sales rely on high-pressure
            tactics, and those tactics push away people who are not ready to buy right now. Many of
            those people never look into life insurance again after a bad experience, which leaves
            them and their families without a plan. NocallQuoteNow is a different starting point:
            anyone in the country can get a premium range without giving up their contact
            information first.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">What the Calculator Does</h2>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            The calculator takes a handful of inputs — your state, age, gender, health status, and
            the amount of coverage you want — and shows an estimated monthly premium on the spot.
            There is no form to fill out first and no phone number to hand over. The number is yours
            to keep, whether you do anything with it or not.
          </p>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            It is built for adults between 40 and 85, and for the family members who are helping
            them plan ahead. Whether you are thinking about final expenses for yourself or trying to
            understand what a parent might pay, the goal is the same: give you a realistic sense of
            the range so you can decide what to do next on your own timeline.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">What to Expect</h2>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            Please keep in mind that every estimate on this site is illustrative. Your actual
            premium depends on the carrier and on your individual circumstances, so treat the
            calculator result as a starting point rather than an offer.
          </p>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            If you decide to move forward, you can request your exact quote. When you do, Jesus or
            someone from his team will reach out within 8 hours with an accurate number. If you
            never submit that request, nobody contacts you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">What We Do Not Do</h2>
          <ul className="space-y-2 text-sm text-[#1e293b]">
            {[
              "We do not collect your phone number to use the calculator.",
              "We do not sell your information to lead buyers or agents.",
              "We do not receive commissions from carriers for directing traffic.",
              "We do not require sign-up, account creation, or payment of any kind.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#0d9488] font-bold mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            If you choose to connect with a licensed agent after seeing your estimate, that is
            entirely your decision. The option is there, it is optional, and it is free.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[#f0fdfa] border border-teal-200 rounded-2xl p-6 text-center">
          <p className="font-bold text-[#1a2744] text-lg mb-2">Try the Calculator</p>
          <p className="text-[#64748b] text-sm mb-4">
            Select your state and get an instant estimate. No sign-up. No phone number.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#0d9488] hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            View State Estimates →
          </Link>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-[#0d9488] hover:underline font-medium">← Back to Home</Link>
          <Link href="/contact" className="text-[#0d9488] hover:underline font-medium">Contact</Link>
        </div>
      </article>
    </>
  );
}
