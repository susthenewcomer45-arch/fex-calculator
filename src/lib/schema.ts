export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "NocallQuoteNow",
    "url": "https://nocallquotenow.com",
    "description": "Get instant final expense insurance quotes online. No phone calls, no agents, no pressure.",
    "areaServed": "US",
    "serviceType": "Final Expense Life Insurance",
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "NocallQuoteNow",
      "url": "https://nocallquotenow.com",
    },
  }
}
