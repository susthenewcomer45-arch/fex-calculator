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
            and you get a real, data-driven monthly premium estimate in seconds. Nothing is sold to
            you. Nobody will call you. The number is yours to keep.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-5">
          <h2 className="text-2xl font-extrabold text-[#1a2744]">Why We Built It</h2>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            NocallQuoteNow was built by a licensed final expense insurance agent who got tired of
            watching people get harassed just for wanting a number.
          </p>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            The insurance industry runs on lead generation. Most quote sites are not quote sites —
            they are lead capture forms that sell your phone number to four or five agents at once,
            triggering a flood of calls that can last for weeks. The people most affected are seniors
            on fixed incomes who just wanted to understand their options in peace.
          </p>
          <p className="text-[#1e293b] text-sm leading-relaxed">
            This tool exists to fix that. Final expense premiums are calculated from a small set of
            actuarial variables. There is no reason your phone number needs to be part of the
            equation just to see a number.
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
