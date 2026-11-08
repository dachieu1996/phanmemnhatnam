/**
 * Kiểm tra link & ảnh nội bộ trong out/ sau khi build (chạy tự động ở postbuild).
 *  - mọi href/src bắt đầu bằng "/" phải trỏ tới file có thật (x, x.html, x/index.html)
 *  - anchor "#id" phải tồn tại trong trang đích
 *  - kiểm tra thêm các link trong chat-kb.json (chatbot dự phòng) và search-index.json
 * Lỗi → in danh sách và thoát mã 1.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../out");
if (!fs.existsSync(OUT)) {
  console.error("[links] chưa có thư mục out/ — chạy npm run build trước");
  process.exit(1);
}

const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (f.endsWith(".html")) htmlFiles.push(f);
  }
})(OUT);

const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    const html = fs.readFileSync(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

function resolve(urlPath) {
  const p = decodeURIComponent(urlPath.split("?")[0]).replace(/\/$/, "") || "/index";
  const base = path.join(OUT, p);
  for (const f of [base, base + ".html", path.join(base, "index.html")]) {
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

const errors = [];
function check(url, from) {
  if (!url.startsWith("/") || url.startsWith("//") || url.startsWith("/api/") || url.startsWith("/_next/")) return;
  const [p, hash] = url.split("#");
  const target = p ? resolve(p) : from;
  if (!target) return errors.push(`${rel(from)} → ${url} (không có file)`);
  if (hash && target.endsWith(".html") && !idsOf(target).has(decodeURIComponent(hash)))
    errors.push(`${rel(from)} → ${url} (không có #${hash})`);
}
const rel = (f) => (typeof f === "string" && f.startsWith(OUT) ? path.relative(OUT, f) : f);

let count = 0;
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const u = m[1].replace(/&amp;/g, "&");
    if (u.startsWith("#")) {
      if (u.length > 1 && !idsOf(f).has(decodeURIComponent(u.slice(1)))) errors.push(`${rel(f)} → ${u} (anchor)`);
    } else check(u, f);
    count++;
  }
}
for (const [file, pick] of [
  ["chat-kb.json", (d) => d.map((x) => x.u).filter(Boolean)],
  ["search-index.json", (d) => d.map((x) => x.url)],
]) {
  const f = path.join(OUT, file);
  if (!fs.existsSync(f)) {
    errors.push(`thiếu ${file}`);
    continue;
  }
  for (const u of new Set(pick(JSON.parse(fs.readFileSync(f, "utf8"))))) {
    check(u, file);
    count++;
  }
}

if (errors.length) {
  console.error(`[links] ✗ ${errors.length} link hỏng / ${count} link:`);
  [...new Set(errors)].slice(0, 80).forEach((e) => console.error("  -", e));
  process.exit(1);
}
console.log(`[links] ✓ ${htmlFiles.length} trang, ${count} link/ảnh nội bộ — không có link hỏng`);
