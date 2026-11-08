import { getDocList, getKnowledgeList, SITE_URL } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date("2026-11-05");
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/huong-dan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getDocList().map((d) => ({ url: `${SITE_URL}${d.href}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 })),
    ...getKnowledgeList().map((p) => ({ url: `${SITE_URL}${p.href}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 })),
  ];
}
