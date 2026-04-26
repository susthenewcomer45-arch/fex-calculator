import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuotePlaceholder from "@/components/QuotePlaceholder";
import AdsensePlaceholder from "@/components/AdsensePlaceholder";
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

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{state.name}</span>
      </nav>

      {/* ADSENSE_UNIT_START - Insert AdSense unit here (top of state page) */}
      <AdsensePlaceholder label={`State Page Ad — ${state.name} — Top`} />
      {/* ADSENSE_UNIT_END */}

      <section className="mb-8">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight mb-4">
          Final Expense Insurance Quotes in {state.name} —{" "}
          <span className="text-green-600">No Phone Calls</span>
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Final expense insurance in {state.name} provides residents with an affordable, permanent
          life insurance solution designed specifically for end-of-life costs. Whether you are
          looking to cover funeral and burial expenses, outstanding medical bills, or simply want to
          ensure your family is not left with unexpected debt, a final expense policy can offer
          peace of mind without the complexity or cost of traditional life insurance.
        </p>

        <p className="text-gray-700 leading-relaxed mt-3">
          The average cost of a funeral in {state.name} is{" "}
          <strong>${state.averageFuneralCost.toLocaleString()}</strong>. Without coverage, this
          burden falls entirely on your family — often at one of the most emotionally difficult
          times in their lives. A modest final expense policy can eliminate that financial stress
          completely, allowing your loved ones to focus on honoring your memory rather than
          worrying about how to pay for it.
        </p>

        <p className="text-gray-700 leading-relaxed mt-3">
          In {state.name}, final expense policies typically require no medical exam and accept
          applicants between ages 50 and 85. Coverage is available even for residents with
          pre-existing conditions such as diabetes, high blood pressure, or COPD. Premiums are
          fixed for life and the policy builds cash value over time, making it one of the most
          stable financial tools available to {state.name} seniors on a fixed income.
        </p>

        <p className="text-gray-700 leading-relaxed mt-3 italic border-l-4 border-blue-200 pl-4">
          {state.stateFact}
        </p>
      </section>

      {/* QUOTE_TOOL_START - Insert quote calculator scoped to this state here */}
      <QuotePlaceholder state={state.name} />
      {/* QUOTE_TOOL_END */}

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          How to Get a Free Quote in {state.name}
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="text-blue-700 font-bold text-lg">1.</span>
            <span>
              <strong>Use the calculator above</strong> — Enter your age, gender, and health
              status. Your state ({state.name}) is already selected automatically.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-700 font-bold text-lg">2.</span>
            <span>
              <strong>Choose your coverage amount</strong> — Select a benefit between $5,000 and
              $35,000 to cover estimated funeral and burial costs in {state.name}.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-700 font-bold text-lg">3.</span>
            <span>
              <strong>Get your instant estimate</strong> — See your estimated monthly premium
              immediately. No phone number required, no agents will call you.
            </span>
          </li>
        </ul>
      </section>

      {/* ADSENSE_UNIT_START - Insert AdSense unit here (bottom of state page) */}
      <AdsensePlaceholder label={`State Page Ad — ${state.name} — Bottom`} />
      {/* ADSENSE_UNIT_END */}

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-5">
          Frequently Asked Questions About Final Expense Insurance in {state.name}
        </h2>
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

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/" className="text-blue-700 hover:underline font-medium">
          ← Back to All States
        </Link>
        <Link href="/blog" className="text-blue-700 hover:underline font-medium">
          Read Our Blog →
        </Link>
      </div>
    </>
  );
}
