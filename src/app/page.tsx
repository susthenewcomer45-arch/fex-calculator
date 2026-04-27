import type { Metadata } from "next";
import QuotePlaceholder from "@/components/QuotePlaceholder";
import AdsensePlaceholder from "@/components/AdsensePlaceholder";
import LeadFormModal from "@/components/LeadFormModal";
import StateGrid from "@/components/StateGrid";
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
      "Monthly premiums for final expense insurance vary based on your age, gender, health status, and the coverage amount you choose. As a general guideline, a healthy 65-year-old woman might pay $30–$60 per month for $10,000 of coverage, while a 75-year-old man might pay $70–$120 for the same amount. Use our free estimator above to get a number based on your specific profile.",
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

      {/* ADSENSE_UNIT_1_START - Insert Google AdSense unit here (e.g. 728x90 leaderboard) */}
      <AdsensePlaceholder label="Leaderboard Ad — Top of Page" />
      {/* ADSENSE_UNIT_1_END */}

      {/* ── Hero ── */}
      <section className="text-center py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight mb-5">
          Free Final Expense Insurance Estimates
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Get the most accurate burial insurance estimate online based on your state, gender, and
          average local burial costs. This is a free tool providing honest numbers with zero
          obligation — no robocalls, no medical exams, and we don&apos;t expect your info or money
          in return.
        </p>
      </section>

      {/* QUOTE_TOOL_START - Insert the main quote calculator component here */}
      <QuotePlaceholder />
      {/* QUOTE_TOOL_END */}

      {/* ── Lead Gen CTA ── triggers GHL modal */}
      <LeadFormModal />

      {/* ADSENSE_UNIT_2_START - Insert Google AdSense unit here (e.g. 300x250 rectangle) */}
      <AdsensePlaceholder label="Rectangle Ad — Mid Page" />
      {/* ADSENSE_UNIT_2_END */}

      {/* ── State Selection ── */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-5">
          Coverage Available in All 50 States
        </h2>
        <StateGrid states={states} />
      </section>

      {/* ── Info Accordions ── */}
      <section className="mt-12">
        <div className="space-y-3">
          <AccordionItem title="What is Final Expense Insurance?">
            <p>
              Final expense insurance — sometimes called burial insurance or funeral insurance — is
              a type of whole life insurance policy with a smaller death benefit, typically ranging
              from $2,000 to $35,000. It is specifically designed to cover the costs that arise at
              the end of a person&apos;s life: funeral services, burial or cremation, outstanding
              medical bills, and other debts that loved ones might otherwise be forced to pay out
              of pocket.
            </p>
            <p>
              Unlike traditional life insurance, final expense policies are issued with little to
              no medical underwriting. Most applicants qualify based on a short series of health
              questions, and guaranteed-issue options are available for those with serious
              pre-existing conditions. Coverage is permanent — premiums never increase, the policy
              never expires, and the death benefit is paid to your beneficiary tax-free, usually
              within days of a claim being filed. The national average cost of a funeral with
              burial is over $9,000 — a sum that can cause serious financial hardship for families
              that are unprepared.
            </p>
          </AccordionItem>

          <AccordionItem title="Why Get a Quote Without a Phone Call?">
            <p>
              Traditional insurance shopping means filling out a form and immediately getting
              bombarded with calls from agents and lead buyers. At nocallquotenow.com, we believe
              you deserve to explore your options in peace — without your phone ringing off the hook
              for weeks afterward. Our free estimator gives you a real, data-driven premium estimate
              based on your state, gender, health status, and desired coverage amount — without
              requiring your phone number, Social Security number, or any personal information.
            </p>
            <p>
              Robocalls and aggressive agent follow-ups are one of the biggest complaints seniors
              have about shopping for life insurance. We built this tool specifically to solve that
              problem. No data is sold to third-party lead buyers. No agents will call you unless
              you explicitly request a consultation by clicking the button above. You get the
              information you need to make an informed decision, on your timeline, with zero sales
              pressure.
            </p>
          </AccordionItem>

          <AccordionItem title="How Our Free Estimator Works">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Select your state</strong> — Choose your home state from the grid below.
                Each state has different burial costs and insurance rates, which directly affects
                your estimate.
              </li>
              <li>
                <strong>Enter your profile</strong> — Select your age, gender, and current health
                status. No name, phone number, or email required.
              </li>
              <li>
                <strong>See your instant estimate</strong> — Your estimated monthly premium appears
                immediately, based on real market data for your state. No waiting, no callbacks.
              </li>
            </ol>
          </AccordionItem>
        </div>
      </section>

      {/* ── FAQs ── */}
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
