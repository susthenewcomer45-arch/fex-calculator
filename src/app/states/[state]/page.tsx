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
        {/* Calculator (client component — includes GHL modal) */}
        <Calculator stateName={state.name} />

        {/* ADSENSE_UNIT_1_START - Between calculator and body content */}
        <div className="max-w-lg mx-auto">
          <AdsensePlaceholder label={`State Page Ad — ${state.name}`} />
        </div>
        {/* ADSENSE_UNIT_1_END */}

        {/* SEO body content */}
        <section className="max-w-lg mx-auto mt-4 space-y-4">
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
              The estimate you see in the calculator above is built on real {state.name} market data
              — not a generic national average. With an average funeral in {state.name} running{" "}
              <strong>${state.averageFuneralCost.toLocaleString()}</strong>, the premiums shown
              reflect actual rate trends for {state.name} residents based on age, gender, and health
              profile. Because final expense insurance is age-rated — meaning the older you are when
              you apply, the higher your monthly premium — the estimate you see today represents the
              best rate currently available to you for this coverage amount. Think of it as a
              data-backed starting point. If the number looks right for your budget, the green{" "}
              <strong>Get the Approved Rate</strong> button connects you with a licensed{" "}
              {state.name} insurance expert who can confirm your exact, carrier-approved monthly
              premium — no commitment, no pressure.
            </p>
            <p className="text-[#1e293b] leading-relaxed text-sm mt-3">
              Two facts are worth keeping in mind as you consider your options. First, final expense
              premiums increase with age — every year you wait, the same coverage costs more, and
              that higher rate is then locked in for life. A policy secured at 65 will carry
              meaningfully lower premiums than the same policy applied for at 70 or 75. Second,
              funeral costs in {state.name} — like most states — rise with inflation each year.
              Waiting does not reduce your need for coverage; it typically increases both the
              coverage amount you will need and the monthly premium you will pay. The good news is
              that {state.name} policies require no medical exam and accept applicants aged 50–85,
              including those with pre-existing conditions like diabetes, COPD, or heart disease —
              so there is no health-related reason to wait.
            </p>
            <p className="text-[#1e293b] leading-relaxed text-sm mt-3 italic border-l-4 border-teal-200 pl-4">
              {state.stateFact}
            </p>
          </div>
        </section>

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
