import type { Metadata } from "next";
import Link from "next/link";
import QuotePlaceholder from "@/components/QuotePlaceholder";
import AdsensePlaceholder from "@/components/AdsensePlaceholder";
import { states } from "@/lib/states";
import { generateFAQSchema, generateWebPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Final Expense Insurance Quotes — No Phone Calls | NocallQuoteNow",
  description:
    "Get instant final expense life insurance quotes in all 50 states. No phone calls, no agents, no pressure. Free burial insurance calculator online.",
  alternates: { canonical: "https://nocallquotenow.com" },
  openGraph: {
    title: "Final Expense Insurance Quotes — No Phone Calls | NocallQuoteNow",
    description:
      "Instant final expense life insurance quotes. No robocalls, no agents, no medical exam required.",
    url: "https://nocallquotenow.com",
  },
};

const faqs = [
  {
    question: "What does final expense insurance cover?",
    answer:
      "Final expense insurance, also called burial insurance or funeral insurance, is a type of whole life insurance designed to cover end-of-life costs. This includes funeral and burial services, caskets or urns, cemetery plots, headstones, cremation fees, and any outstanding medical bills or small debts. Benefits are paid directly to your named beneficiary as a tax-free lump sum, giving your family the flexibility to use the funds however they need most.",
  },
  {
    question: "Do I need a medical exam to get coverage?",
    answer:
      "No — most final expense insurance policies require no medical exam. Coverage is typically issued based on a few health questions or on a guaranteed-issue basis with no health questions at all. This makes it one of the most accessible forms of life insurance available to seniors aged 50–85, including those with pre-existing conditions like diabetes, COPD, or heart disease.",
  },
  {
    question: "How much does burial insurance cost per month?",
    answer:
      "Monthly premiums for final expense insurance vary based on your age, gender, health status, and the coverage amount you choose. As a general guideline, a healthy 65-year-old woman might pay $30–$60 per month for $10,000 of coverage, while a 75-year-old man might pay $70–$120 for the same amount. Use our free calculator above to get an estimate based on your specific profile.",
  },
  {
    question: "Can I get coverage if I have pre-existing conditions?",
    answer:
      "Yes. Final expense insurance is specifically designed to be accessible to seniors who may not qualify for traditional life insurance. Many carriers offer simplified-issue policies that ask a few basic health questions, and guaranteed-issue policies that accept all applicants regardless of health history — typically for ages 50–80. Guaranteed-issue policies may include a 2-year waiting period before full benefits apply.",
  },
  {
    question: "What is the difference between final expense and whole life insurance?",
    answer:
      "Final expense insurance is a form of whole life insurance but with smaller face amounts (typically $2,000–$35,000) and simplified underwriting. Both build cash value over time and provide permanent coverage with fixed premiums. Traditional whole life policies offer larger death benefits (often $100,000+) and require a full medical exam. Final expense policies prioritize ease of qualification and affordability for seniors on fixed incomes.",
  },
];

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);
  const pageSchema = generateWebPageSchema(
    "Final Expense Insurance Quotes — No Phone Calls",
    "Get instant final expense life insurance quotes in all 50 states. No phone calls, no agents, no pressure.",
    "https://nocallquotenow.com"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ADSENSE_UNIT_1_START - Insert Google AdSense unit here (e.g. 728x90 leaderboard) */}
      <AdsensePlaceholder label="Leaderboard Ad — Top of Page" />
      {/* ADSENSE_UNIT_1_END */}

      <section className="text-center py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight mb-4">
          Instant Final Expense Insurance Quotes —{" "}
          <span className="text-green-600">No Phone Calls Required</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get an accurate burial insurance estimate in under 60 seconds. No agents, no robocalls,
          no medical exam. Just honest numbers you can actually use.
        </p>
      </section>

      {/* QUOTE_TOOL_START - Insert the main quote calculator component here */}
      <QuotePlaceholder />
      {/* QUOTE_TOOL_END */}

      {/* ADSENSE_UNIT_2_START - Insert Google AdSense unit here (e.g. 300x250 rectangle) */}
      <AdsensePlaceholder label="Rectangle Ad — Mid Page" />
      {/* ADSENSE_UNIT_2_END */}

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">What is Final Expense Insurance?</h2>
          <p className="text-gray-700 leading-relaxed mt-2">
            Final expense insurance — sometimes called burial insurance or funeral insurance — is a
            type of whole life insurance policy with a smaller death benefit, typically ranging from
            $2,000 to $35,000. It is specifically designed to cover the costs that arise at the end
            of a person&apos;s life: funeral services, burial or cremation, outstanding medical
            bills, and other debts that loved ones might otherwise be forced to pay out of pocket.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Unlike traditional life insurance, final expense policies are issued with little to no
            medical underwriting. Most applicants qualify based on a short series of health
            questions, and guaranteed-issue options are available for those with serious
            pre-existing conditions. Coverage is permanent — premiums never increase, the policy
            never expires, and the death benefit is paid to your beneficiary tax-free, usually
            within days of a claim being filed. Final expense insurance is most popular among
            Americans aged 50 to 85 who are on fixed incomes and want a simple, affordable way to
            ensure their family is not burdened by funeral costs. The national average cost of a
            funeral with burial is over $9,000 — a sum that can cause serious financial hardship
            for families that are unprepared.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-900">
            Why Get a Quote Without a Phone Call?
          </h2>
          <p className="text-gray-700 leading-relaxed mt-2">
            Traditional insurance shopping means filling out a form and immediately getting
            bombarded with calls from agents and lead buyers. At NocallQuoteNow.com, we believe you
            deserve to explore your options in peace — without your phone ringing off the hook for
            weeks afterward. Our free calculator gives you a real, data-driven premium estimate
            based on your age, gender, health status, and desired coverage amount — without
            requiring your phone number, Social Security number, or any personal information.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Robocalls and aggressive agent follow-ups are one of the biggest complaints seniors
            have about shopping for life insurance. We built this tool specifically to solve that
            problem. No data is sold to third-party lead buyers. No agents will call you unless you
            explicitly request a consultation. You get the information you need to make an informed
            decision, on your timeline, with zero sales pressure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-900">How Our Free Calculator Works</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 mt-2">
            <li>
              <strong>Enter your basic information</strong> — Select your state, age, gender, and
              current health status. No name, phone number, or email required.
            </li>
            <li>
              <strong>Choose your coverage amount</strong> — Use the slider to select a death
              benefit between $5,000 and $35,000 based on your estimated final expense needs.
            </li>
            <li>
              <strong>See your instant estimate</strong> — Your estimated monthly premium appears
              immediately, based on real market data for your state. No waiting, no callbacks.
            </li>
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Coverage Available in All 50 States
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              className="bg-white border border-gray-200 rounded-lg px-3 py-3 text-sm font-medium text-blue-800 hover:bg-blue-50 hover:border-blue-400 transition-colors text-center shadow-sm"
            >
              {state.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <h3 className="font-bold text-blue-900 mb-2">{faq.question}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
