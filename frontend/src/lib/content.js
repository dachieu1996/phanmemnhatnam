/** Đọc nội dung (chạy lúc build trong server component). */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { markdownSections, renderMarkdown } from "./markdown.js";

const DIR = path.join(process.cwd(), "content");
const cache = new Map();

function memo(key, fn) {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
}

function readJson(rel, fallback) {
  return memo(rel, () => {
    const f = path.join(DIR, rel);
    if (!fs.existsSync(f) && fallback !== undefined) return fallback;
    return JSON.parse(fs.readFileSync(f, "utf8"));
  });
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://phanmemnhatnam.com").replace(/\/$/, "");
export const docHref = (slug) => `/huong-dan/${slug}`;
export const ktHref = (slug) => (slug === "index" ? "/kien-thuc" : `/kien-thuc/${slug}`);

export const getSite = () => readJson("site.json");
export const getNav = () => readJson("docs/nav.json");
export const getKnowledge = () => readJson("knowledge/kien-thuc.json");
export const getAccounts = () => readJson("knowledge/accounts.json");
const getExternalMap = () => readJson("docs/external-images.json", {});

/* ------------------------- Hướng dẫn sử dụng ------------------------- */

export function getDocList() {
  return memo("doclist", () =>
    getNav().flatMap((g) => g.items.map((it) => ({ ...it, group: g.group, href: docHref(it.slug) }))),
  );
}

function readDocFile(item) {
  const raw = fs.readFileSync(path.join(DIR, "docs", item.file), "utf8");
  return matter(raw);
}

export function getDoc(slug) {
  return memo(`doc:${slug}`, () => {
    const list = getDocList();
    const i = list.findIndex((d) => d.slug === slug);
    if (i < 0) return null;
    const item = list[i];
    const { data, content } = readDocFile(item);
    const { html, toc } = renderMarkdown(content, { externalMap: getExternalMap() });
    return {
      slug,
      title: data.title || item.title,
      description: data.description || "",
      group: item.group,
      html,
      toc,
      prev: list[i - 1] || null,
      next: list[i + 1] || null,
    };
  });
}

/** Văn bản thuần theo mục h2 — cho chỉ mục tìm kiếm. */
export function getDocSections(slug) {
  const item = getDocList().find((d) => d.slug === slug);
  return item ? markdownSections(readDocFile(item).content) : [];
}

/** Cây sidebar Hướng dẫn. */
export function getDocsSidebar() {
  return getNav().map((g) => ({ group: g.group, items: g.items.map((it) => ({ title: it.title, href: docHref(it.slug) })) }));
}

/* ------------------------- Kiến thức kế toán ------------------------- */

export function getKnowledgeList() {
  return memo("ktlist", () =>
    getKnowledge().groups.flatMap((g) => g.pages.map((p) => ({ ...p, group: g.group, href: ktHref(p.slug) }))),
  );
}

export function getKnowledgePage(slug) {
  const list = getKnowledgeList();
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const strip = (p) => (p ? { title: p.title, href: p.href } : null);
  return { page: list[i], prev: strip(list[i - 1]), next: strip(list[i + 1]) };
}

export function getKnowledgeSidebar() {
  return getKnowledge().groups.map((g) => ({
    group: g.group,
    items: g.pages.map((p) => ({ title: p.slug === "index" ? "Giới thiệu" : p.title, href: ktHref(p.slug) })),
  }));
}
