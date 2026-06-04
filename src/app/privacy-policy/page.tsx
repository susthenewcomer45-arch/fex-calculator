import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — NocallQuoteNow",
  description:
    "Read the NocallQuoteNow privacy policy. Learn how we handle your data, our use of Google AdSense, and your rights as a visitor.",
  alternates: { canonical: "https://nocallquotenow.com/privacy-policy" },
};

const sections = [
  {
    heading: "What Information We Collect",
    body: [
      "NocallQuoteNow does not require you to create an account or provide any personal information to use our free premium estimator tool. The calculator collects only non-identifying inputs — your age range, gender, health status, and desired coverage amount — to produce an illustrative estimate. These inputs are not stored, logged, or associated with any individual.",
      "If you voluntarily choose to connect with a licensed insurance agent by clicking \"Get the Approved Rate,\" you will be asked to provide your name, email address, and phone number. That information is transmitted directly to a licensed agent and is used solely to fulfill your request for an official quote.",
      "Like most websites, our servers automatically receive standard technical data when you visit, including your IP address, browser type, referring URL, and pages viewed. This data is used in aggregate for site analytics and is not sold or linked to your identity.",
    ],
  },
  {
    heading: "How We Use Information",
    body: [
      "We use anonymized, aggregate usage data to understand how visitors interact with the site so we can improve it. We do not build individual profiles, sell visitor data, or share your information with insurance carriers, lead buyers, or marketers unless you explicitly request a consultation by submitting the lead form.",
      "If you submit the optional lead form, your contact information is shared with a licensed insurance agent in your state for the purpose of providing you with a carrier-approved quote. We do not sell this information to third-party lead aggregators.",
    ],
  },
  {
    heading: "Google AdSense and Cookies",
    body: [
      "NocallQuoteNow participates in Google AdSense (publisher ID: ca-pub-4437016471828719). Google AdSense may serve advertisements on this site and uses cookies and similar technologies to display ads based on your prior visits to this and other websites.",
      "Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the internet. You may opt out of personalized advertising by visiting Google's Ads Settings at adssettings.google.com.",
      "We also use Google Analytics, which sets cookies to help us understand traffic patterns and visitor behavior in aggregate. No personally identifying information is transmitted to Google Analytics.",
      "You can control or disable cookies through your browser settings. Disabling cookies may affect some site functionality.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "Our site may contain links to external websites, including insurance carrier sites and reference resources. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "Because we do not collect or store personal information through the estimator tool itself, there is no personal data to retain or delete on our end. If you submitted the optional lead form, your contact information is held by the receiving agent and subject to their retention policies.",
      "Server log data (IP addresses, visit timestamps) is retained for up to 90 days for security and operational purposes, then deleted.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Depending on your state of residence, you may have rights regarding your personal information under laws such as the California Consumer Privacy Act (CCPA) or other applicable state privacy laws. Because NocallQuoteNow does not collect personal information to use our core tool, most of these rights are not triggered by ordinary use of the site.",
      "If you submitted the optional lead form and wish to request deletion or correction of your contact information, please email us at the address below and we will coordinate with the receiving agent on your behalf.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have questions or concerns about this privacy policy or how your information is handled, please contact us at privacy@nocallquotenow.com. We will respond within a reasonable timeframe.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl font-bold text-white leading-tight mb-3">Privacy Policy</h1>
          <p className="text-white/60 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-8">
          <p className="text-[#1e293b] text-sm leading-relaxed">
            NocallQuoteNow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
            protecting your privacy. This policy explains what information we collect, how we use it,
            and your choices. By using this site you agree to the practices described here.
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
