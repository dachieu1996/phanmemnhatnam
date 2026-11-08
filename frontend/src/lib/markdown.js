/**
 * Markdown (GFM + một ít HTML thô) → HTML lúc build, kèm mục lục h2/h3.
 * Plugin rehypeDocs:
 *  - ảnh ../images/x.png → /docs-images/x.png; ảnh ngoài đã tải → /docs-images/external/...
 *  - ảnh đứng riêng một đoạn → <figure> + <figcaption> (từ alt)
 *  - <img class="inline-icon"> → biểu tượng nhỏ trong dòng
 *  - bảng bọc <div class="table-wrap"> để cuộn ngang trên mobile
 *  - id tiêu đề không dấu, không trùng; trích TOC
 *  - link *.md → /huong-dan/<slug>
 */
import { toString } from "hast-util-to-string";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit, SKIP } from "unist-util-visit";
import { slugify } from "./normalize.js";

function mapImage(src, externalMap) {
  if (!src) return src;
  if (externalMap[src]) return externalMap[src];
  const m = src.match(/(?:^|\/)images\/([^/?#]+)$/);
  if (m && !/^https?:/.test(src)) return `/docs-images/${m[1]}`;
  return src;
}

function isWhitespace(node) {
  return node.type === "text" && !node.value.trim();
}

function rehypeDocs({ externalMap = {}, toc = [] }) {
  return (tree) => {
    const used = new Map();
    visit(tree, "element", (node, index, parent) => {
      const p = node.properties || (node.properties = {});
      // Tiêu đề: id không dấu + mục lục
      if (/^h[1-6]$/.test(node.tagName)) {
        const text = toString(node).replace(/[:：]\s*$/, "").trim();
        let id = slugify(text) || "muc";
        const n = used.get(id) || 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        p.id = id;
        if (node.tagName === "h2" || node.tagName === "h3") toc.push({ id, text, level: Number(node.tagName[1]) });
        return;
      }
      if (node.tagName === "img") {
        p.src = mapImage(p.src, externalMap);
        const cls = [].concat(p.className || []);
        if (cls.includes("inline-icon")) p.className = ["inline-ico"];
        else {
          p.loading = "lazy";
          p.decoding = "async";
        }
        return;
      }
      if (node.tagName === "a" && typeof p.href === "string") {
        const m = p.href.match(/^(?!https?:)(?:.*\/)?([a-z0-9-]+)\.md(#.*)?$/i);
        if (m) p.href = `/huong-dan/${m[1]}${m[2] || ""}`;
        if (/^https?:/.test(p.href)) {
          p.target = "_blank";
          p.rel = "noopener noreferrer";
        }
        return;
      }
      if (node.tagName === "table" && parent && parent.tagName !== "div") {
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrap"] },
          children: [node],
        };
        return SKIP;
      }
      // Đoạn chỉ chứa 1 ảnh (không phải icon) → figure
      if (node.tagName === "p" && parent) {
        const kids = node.children.filter((c) => !isWhitespace(c));
        const img = kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img" ? kids[0] : null;
        if (img && ![].concat(img.properties?.className || []).includes("inline-icon")) {
          const alt = String(img.properties?.alt || "").trim();
          const children = [img];
          if (alt) children.push({ type: "element", tagName: "figcaption", properties: {}, children: [{ type: "text", value: alt }] });
          parent.children[index] = { type: "element", tagName: "figure", properties: {}, children };
        }
      }
    });
  };
}

/** @returns {{html: string, toc: {id:string,text:string,level:number}[]}} */
export function renderMarkdown(md, { externalMap = {} } = {}) {
  const toc = [];
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeDocs, { externalMap, toc })
    .use(rehypeStringify)
    .processSync(md)
    .toString();
  return { html, toc };
}

/** Markdown → văn bản thuần, chia theo mục h2 (cho chỉ mục tìm kiếm). */
export function markdownSections(md) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(md);
  const sections = [{ heading: "", id: "", text: [] }];
  const used = new Map();
  for (const node of tree.children) {
    if (node.type === "heading") {
      const text = toPlain(node).replace(/[:：]\s*$/, "").trim();
      let id = slugify(text) || "muc";
      const n = used.get(id) || 0;
      used.set(id, n + 1);
      if (n) id = `${id}-${n}`;
      if (node.depth === 2) sections.push({ heading: text, id, text: [] });
      else sections[sections.length - 1].text.push(text);
    } else {
      sections[sections.length - 1].text.push(toPlain(node));
    }
  }
  return sections.map((s) => ({ ...s, text: s.text.join(" ").replace(/\s+/g, " ").trim() }));
}

function toPlain(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if (node.type === "html") return node.value.replace(/<[^>]+>/g, " ");
  return (node.children || []).map(toPlain).join(" ");
}
