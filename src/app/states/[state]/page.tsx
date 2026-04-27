import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import AdsensePlaceholder from "@/components/AdsensePlaceholder";
import { AccordionItem } from "@/components/Accordion";
import { states } from "@/lib/states";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return states.map((state) => ({ state: state.slug }));
}

type Props = {
  params: Promise<{ state: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = states.find((s) => s.slug === slug);
  if (!state) return {};

  return {
    title: `Final Expense Insurance in ${state.name} — Free Quotes, No Phone Calls`,
    description: `Compare final expense insurance quotes in ${state.name}. No medical exam required. Average funeral costs in ${state.name} are $${state.averageFuneralCost.toLocaleString()}. Get your free quote now.`,
    alternates: { canonical: `https://nocallquotenow.com/states/${state.slug}` },
    openGraph: {
      title: `Final Expense Insurance in ${state.name} — Free Quotes, No Phone Calls`,
      description: `Instant burial insurance estimates for ${state.name} residents. No agents, no robocalls. Average funeral cost: $${state.averageFuneralCost.toLocaleString()}.`,
      url: `https://nocallquotenow.com/states/${state.slug}`,
    },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: slug } = await params;
  const state = states.find((s) => s.slug === slug);
  if (!state) notFound();

  const faqs = [
    {
      question: `How much does final expense insurance cost in ${state.name}?`,
      answer: `Final expense insurance premiums in ${state.name} vary based on your age, gender, and health status. A healthy 65-year-old woman in ${state.name} can typically expect to pay between $28 and $55 per month for $10,000 in coverage. Men and older applicants pay slightly higher rates. Use our free calculator above for a personalized estimate based on ${state.name} market data.`,
    },
    {
      question: `Is a medical exam required for final expense insurance in ${state.name}?`,
      answer: `No medical exam is required for most final expense insurance policies available in ${state.name}. Simplified-issue policies ask a few basic health questions, while guaranteed-issue policies are available to all ${state.name} residents aged 50–80 with no health questions whatsoever. This makes coverage accessible to ${state.name} seniors with diabetes, heart disease, COPD, and other pre-existing conditions.`,
    },
    {
      question: `What is the average funeral cost in ${state.name}?`,
      answer: `The average cost of a full-service funeral in ${state.name} is approximately $${state.averageFuneralCost.toLocaleString()}, which includes professional services, transportation, casket, and burial fees. Cremation services are generally less expensive, averaging $3,000–$5,000 in most areas. A final expense insurance policy ensures your family does not face this financial burden unexpectedly.`,
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://nocallquotenow.com" },
    { name: "States", url: "https://nocallquotenow.com/#states" },
    { name: state.name, url: `https://nocallquotenow.com/states/${state.slug}` },
  ];

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navy hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav className="text-sm text-white/50 mb-6 text-left">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">{state.name}</span>
          </nav>

          <h1 className="font-bold text-white leading-tight mb-4" style={{ fontSize: '2.5rem' }}>
            Final Expense Insurance
            <br />
            <span className="text-[#14b8a6]">in {state.name}</span>
          </h1>
          <p className="text-white/70 max-w-md mx-auto mb-6 leading-relaxed text-sm">
            Localized premium estimates for {state.name} residents. Rates based on{" "}
            {state.name} market data — updated for 2026.
          </p>
          <span className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1 text-white text-sm">
            🏷️ Avg. Funeral: ${state.averageFuneralCost.toLocaleString()}
          </span>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4">
        {/* ADSENSE_UNIT_1_START */}
        <AdsensePlaceholder label={`State Page Ad — ${state.name} — Top`} />
        {/* ADSENSE_UNIT_1_END */}

        {/* Calculator (client component — includes GHL modal) */}
        <Calculator stateName={state.name} />

        {/* SEO body content */}
        <section className="max-w-lg mx-auto mt-8 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-[#1e293b] leading-relaxed text-sm">
              Final expense insurance in {state.name} provides residents with an affordable,
              permanent life insurance solution designed specifically for end-of-life costs. Whether
              you are looking to cover funeral and burial expenses, outstanding medical bills, or
              simply want to ensure your family is not left with unexpected debt, a final expense
              policy can offer peace of mind without the complexity or cost of traditional life
              insurance.
            </p>
            <p className="text-[#1e293b] leading-relaxed text-sm mt-3">
              The average cost of a funeral in {state.name} is{" "}
              <strong>${state.averageFuneralCost.toLocaleString()}</strong>. Without coverage, this
              burden falls entirely on your family — often at one of the most emotionally difficult
              times in their lives. A modest final expense policy can eliminate that financial stress
              completely.
            </p>
            <p className="text-[#1e293b] leading-relaxed text-sm mt-3">
              In {state.name}, final expense policies typically require no medical exam and accept
              applicants between ages 50 and 85. Coverage is available even for residents with
              pre-existing conditions such as diabetes, high blood pressure, or COPD. Premiums are
              fixed for life and the policy builds cash value over time.
            </p>
            <p className="text-[#1e293b] leading-relaxed text-sm mt-3 italic border-l-4 border-teal-200 pl-4">
              {state.stateFact}
            </p>
          </div>
        </section>

        {/* ADSENSE_UNIT_2_START */}
        <AdsensePlaceholder label={`State Page Ad — ${state.name} — Bottom`} />
        {/* ADSENSE_UNIT_2_END */}

        {/* FAQs */}
        <section className="max-w-lg mx-auto mt-4 pb-12">
          <h2 className="text-xl font-bold text-[#1a2744] mb-4">
            Frequently Asked Questions — {state.name}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} title={faq.question}>
                <p>{faq.answer}</p>
              </AccordionItem>
            ))}
          </div>
        </section>

        <div className="max-w-lg mx-auto pb-12 flex gap-4 text-sm">
          <Link href="/" className="text-[#0d9488] hover:underline font-medium">
            ← Back to All States
          </Link>
          <Link href="/blog" className="text-[#0d9488] hover:underline font-medium">
            Read Our Blog →
          </Link>
        </div>
      </div>
    </>
  );
}
