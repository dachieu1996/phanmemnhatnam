/**
 * Định dạng văn bản nghiệp vụ (AGENTS.md mục 1.1) → React node. Dùng chung cho Kiến thức và Chatbot.
 *  - tách theo "\n", dòng trống = ngắt đoạn
 *  - "- " / "• " đầu dòng → <li>
 *  - 2 dấu cách đầu dòng → đoạn thụt lề (dòng "Có")
 *  - "▶ ..." → tiêu đề nhỏ
 *  - "Nợ"/"Có" đứng trước số tài khoản → nhãn
 *  - **chữ** → in đậm
 * Không dùng dangerouslySetInnerHTML: mọi chữ đi qua React nên luôn được escape.
 */
import { createElement as h, Fragment } from "react";

const CLASSES = {
  entry: { root: "entry-text", indent: "cr", dr: "dr", cr: "crk", head: "ent-h" },
  chat: { root: null, indent: "nnc-indent", dr: "nnc-dr", cr: "nnc-cr", head: "nnc-h" },
};

const TOKEN = /\*\*(.+?)\*\*|\b(Nợ|Có)(?=(?: TK)? \d)/g;

/** Một dòng → mảng node (chữ thường, <b>, nhãn Nợ/Có). */
export function inline(text, cls = CLASSES.entry, keyPrefix = "") {
  const out = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}${i++}`;
    if (m[1] !== undefined) out.push(h("b", { key }, m[1]));
    else out.push(h("span", { key, className: m[2] === "Nợ" ? cls.dr : cls.cr }, m[2]));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Văn bản → khối React. variant: "entry" (trang Kiến thức) | "chat" (bong bóng chat). */
export function formatEntry(text, variant = "entry") {
  const cls = CLASSES[variant] || CLASSES.entry;
  const blocks = [];
  let list = [];
  let k = 0;
  const flush = () => {
    if (list.length) blocks.push(h("ul", { key: `u${k++}` }, list));
    list = [];
  };
  String(text ?? "")
    .split("\n")
    .forEach((raw) => {
      const line = raw.replace(/\s+$/, "");
      if (!line.trim()) return flush();
      if (/^\s*[-•]\s/.test(line)) {
        const key = `l${k++}`;
        list.push(h("li", { key }, inline(line.replace(/^\s*[-•]\s/, ""), cls, key)));
        return;
      }
      flush();
      const key = `p${k++}`;
      if (/^▶/.test(line)) {
        blocks.push(h("p", { key, className: cls.head }, inline(line.replace(/^▶\s*/, ""), cls, key)));
      } else {
        const indent = /^ {2}/.test(line);
        blocks.push(h("p", { key, className: indent ? cls.indent : undefined }, inline(line.trim(), cls, key)));
      }
    });
  flush();
  return cls.root ? h("div", { className: cls.root }, blocks) : h(Fragment, null, blocks);
}

/** Bỏ định dạng để sao chép / tìm kiếm. */
export function plainText(text) {
  return String(text ?? "").replace(/\*\*(.+?)\*\*/g, "$1");
}
