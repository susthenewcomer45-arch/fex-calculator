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

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NocallQuoteNow",
    "url": "https://nocallquotenow.com",
    "description": "Free final expense insurance premium estimates for seniors age 50-85. No phone number required.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nocallquotenow.com/states/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
}

export function generateWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NocallQuoteNow Final Expense Calculator",
    "url": "https://nocallquotenow.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "description": "Free final expense and burial insurance calculator for seniors age 50-85. Get instant, state-specific premium estimates with no sign-up, no phone number, no email, and no personal information required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "State-specific premium estimates",
      "Instant calculations based on age, gender, and coverage amount",
      "No personal information required",
      "No sign-up or account needed",
      "Coverage range $5,000 to $35,000"
    ]
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
