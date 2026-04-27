import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import AdsensePlaceholder from "@/components/AdsensePlaceholder";
import { AccordionItem } from "@/components/Accordion";
import { states } from "@/lib/states";
import { generateFAQSchema, generateWebPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Final Expense Insurance Estimates — No Phone Calls | NocallQuoteNow",
  description:
    "Get the most accurate burial insurance estimate online based on your state, gender, and average local burial costs. Free tool. No robocalls, no medical exams required.",
  alternates: { canonical: "https://nocallquotenow.com" },
  openGraph: {
    title: "Free Final Expense Insurance Estimates — No Phone Calls | NocallQuoteNow",
    description:
      "Honest burial insurance numbers with zero obligation. No robocalls, no medical exams, and we don't expect your info or money in return.",
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
      "Monthly premiums for final expense insurance vary based on your age, gender, health status, and the coverage amount you choose. As a general guideline, a healthy 65-year-old woman might pay $30–$60 per month for $10,000 of coverage, while a 75-year-old man might pay $70–$120 for the same amount. Use our free estimator to get a number based on your specific profile.",
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
  {
    question: "Why does waiting cost me more?",
    answer:
      "Final expense insurance premiums are calculated primarily based on your age at the time you apply. Insurers use actuarial tables that assign higher risk — and therefore higher monthly premiums — to older applicants. A policy you lock in at 65 will cost meaningfully less per month than the same coverage applied for at 70 or 75, and that lower rate stays fixed for life regardless of how your health changes. Because funeral costs also increase with inflation year over year, waiting means you may need more coverage at a higher premium — a compounding cost that grows the longer the decision is deferred.",
  },
  {
    question: "Is it smarter to lock in a rate now?",
    answer:
      "For most people between 50 and 75 who are considering final expense insurance, the financial math favors acting sooner rather than later. Every year you wait, you will pay a higher monthly premium for the same coverage — and you will have fewer years to benefit from the lower rate you locked in earlier. That said, the smartest move is to get an accurate estimate first, then speak with a licensed agent to review your specific health profile and state-approved options. Use the calculator on any state page to see your personalized estimate, and click 'Get the Approved Rate' to connect with a local expert at no cost.",
  },
];

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);
  const pageSchema = generateWebPageSchema(
    "Free Final Expense Insurance Estimates — No Phone Calls",
    "Get the most accurate burial insurance estimate online. No robocalls, no medical exams, zero obligation.",
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

      {/* Hero + State Grid (client — handles search filtering) */}
      <HomeHero states={states} />

      {/* SEO Content */}
      <section className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#1a2744] mb-3">What is Final Expense Insurance?</h2>
          <p className="text-[#1e293b] leading-relaxed text-sm">
            Final expense insurance — sometimes called burial insurance or funeral insurance — is a
            type of whole life insurance policy with a smaller death benefit, typically ranging from
            $2,000 to $35,000. It is specifically designed to cover the costs that arise at the end
            of a person&apos;s life: funeral services, burial or cremation, outstanding medical
            bills, and other debts that loved ones might otherwise be forced to pay out of pocket.
          </p>
          <p className="text-[#1e293b] leading-relaxed text-sm mt-3">
            Unlike traditional life insurance, final expense policies are issued with little to no
            medical underwriting. Most applicants qualify based on a short series of health
            questions, and guaranteed-issue options are available for those with serious
            pre-existing conditions. Coverage is permanent — premiums never increase, the policy
            never expires, and the death benefit is paid to your beneficiary tax-free, usually
            within days of a claim being filed.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#1a2744] mb-3">Why Get a Quote Without a Phone Call?</h2>
          <p className="text-[#1e293b] leading-relaxed text-sm">
            Traditional insurance shopping means filling out a form and immediately getting
            bombarded with calls from agents and lead buyers. At nocallquotenow.com, we believe you
            deserve to explore your options in peace — without your phone ringing off the hook for
            weeks afterward. Our free estimator gives you a real, data-driven premium estimate based
            on your state, gender, health status, and desired coverage amount — without requiring
            your phone number, Social Security number, or any personal information.
          </p>
          <p className="text-[#1e293b] leading-relaxed text-sm mt-3">
            No data is sold to third-party lead buyers. No agents will call you unless you
            explicitly request a consultation. You get the information you need to make an informed
            decision, on your timeline, with zero sales pressure.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-2xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-[#1a2744] mb-5">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} title={faq.question}>
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* ADSENSE_UNIT_2_START - Below FAQ section */}
      <div className="max-w-2xl mx-auto px-4">
        <AdsensePlaceholder label="Homepage Ad — Below FAQ Section" />
      </div>
      {/* ADSENSE_UNIT_2_END */}

      {/* Mission Note */}
      <section className="max-w-3xl mx-auto px-4 pb-12 border-t border-gray-200 pt-10">
        <p className="text-sm text-[#64748b] text-center leading-relaxed italic">
          nocallquotenow.com is a free resource because we believe financial literacy is the
          backbone of a resilient economy. By providing transparent, state-accurate data, we empower
          families to protect future generations from financial setbacks.
        </p>
      </section>
    </>
  );
}
