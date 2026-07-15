import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/db/data";

const BASE = "https://irps.edu.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/phd-programs",
    "/research-domains",
    "/universities",
    "/admission-process",
    "/eligibility",
    "/scholarships",
    "/testimonials",
    "/blogs",
    "/faq",
    "/contact",
    "/consultation",
    "/apply",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const { programs, blogs } = await sitemapEntries();
    dynamicRoutes = [
      ...programs.map((p) => ({
        url: `${BASE}/phd-programs/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...blogs.map((b) => ({
        url: `${BASE}/blogs/${b.slug}`,
        lastModified: b.publishedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // sitemap still works with static routes when DB is unavailable
  }

  return [...staticRoutes, ...dynamicRoutes];
}
