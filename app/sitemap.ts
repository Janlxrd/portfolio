import type { MetadataRoute } from "next";

import { siteUrl } from "./_lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
