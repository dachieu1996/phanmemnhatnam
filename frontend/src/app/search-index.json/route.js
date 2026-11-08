/**
 * /search-index.json — sinh lúc build (xuất tĩnh). Mỗi bài + mỗi mục h2 (có anchor) là một kết quả.
 * Gồm: Hướng dẫn sử dụng, Kiến thức kế toán (từng mục), Hệ thống tài khoản (từng tài khoản).
 */
import {
  getAccounts,
  getDoc,
  getDocList,
  getDocSections,
  getKnowledgeList,
  ktHref,
} from "@/lib/content";

export const dynamic = "force-static";

const clip = (s, n = 600) => String(s || "").replace(/\s+/g, " ").trim().slice(0, n);

function build() {
  const out = [];
  let id = 0;
  // Hướng dẫn
  for (const d of getDocList()) {
    const doc = getDoc(d.slug);
    const secs = getDocSections(d.slug);
    out.push({
      id: id++,
      space: "Hướng dẫn",
      title: doc.title,
      page: d.group,
      url: d.href,
      headings: doc.toc.map((t) => t.text).join(" · "),
      text: clip(secs.map((s) => s.text).join(" ")),
    });
    for (const s of secs) {
      if (!s.heading) continue;
      out.push({ id: id++, space: "Hướng dẫn", title: s.heading, page: doc.title, url: `${d.href}#${s.id}`, headings: "", text: clip(s.text, 400) });
    }
  }
  // Kiến thức
  for (const p of getKnowledgeList()) {
    out.push({
      id: id++,
      space: "Kiến thức",
      title: p.title,
      page: p.group,
      url: p.href,
      headings: (p.sections || []).map((s) => s.title).join(" · "),
      text: clip(p.subtitle || p.notice),
    });
    for (const s of p.sections || []) {
      const body = s.body || s.variants?.tt99 || s.variants?.tt200 || s.variants?.tt133 || "";
      out.push({
        id: id++,
        space: "Kiến thức",
        title: s.title,
        page: p.title,
        url: `${ktHref(p.slug)}#${s.id}`,
        headings: [s.tag, ...(s.related || [])].filter(Boolean).join(" · "),
        text: clip(body, 400),
      });
    }
  }
  // Tài khoản
  for (const r of getAccounts().rows) {
    const c = r.tt99 || r.tt200 || r.tt133;
    if (!c) continue;
    const lv2 = [r.tt99, r.tt200, r.tt133].flatMap((x) => x?.level2 || []).map((l) => `${l.code} ${l.name}`);
    out.push({
      id: id++,
      space: "Kiến thức",
      title: `TK ${r.code} – ${c.name}`,
      page: "Hệ thống tài khoản",
      url: `/kien-thuc/he-thong-tai-khoan#tk-${r.code}`,
      headings: [...new Set([r.tt99?.name, r.tt200?.name, r.tt133?.name].filter(Boolean))].join(" · "),
      text: clip([...new Set(lv2)].join(" · "), 300),
    });
  }
  return out;
}

export function GET() {
  return Response.json(build());
}
