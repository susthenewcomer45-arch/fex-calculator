import { MetadataRoute } from "next";
import { states } from "@/lib/states";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nocallquotenow.com";

  const stateUrls = states.map((state) => ({
    url: `${baseUrl}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...stateUrls,
  ];
}
