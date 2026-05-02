import { MetadataRoute } from "next";
import { states } from "@/lib/states";
import { blogPosts } from "@/lib/blog-posts";
import generatedPostsRaw from "@/lib/generated-posts.json";

const generatedPosts = generatedPostsRaw as { slug: string; date: string }[];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nocallquotenow.com";

  const stateUrls = states.map((state) => ({
    url: `${baseUrl}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPostUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const generatedPostUrls = generatedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
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
    ...generatedPostUrls,
    ...blogPostUrls,
    ...stateUrls,
  ];
}
