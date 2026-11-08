import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { formatEntry } from "../src/lib/formatEntry.js";
import { norm, slugify } from "../src/lib/normalize.js";

const html = (t, v) => renderToStaticMarkup(formatEntry(t, v));

test("nhãn Nợ/Có và dòng thụt lề", () => {
  const out = html("Nợ TK 111 – Tiền mặt\n  Có TK 112 – Tiền gửi");
  assert.equal(
    out,
    '<div class="entry-text"><p><span class="dr">Nợ</span> TK 111 – Tiền mặt</p>' +
      '<p class="cr"><span class="crk">Có</span> TK 112 – Tiền gửi</p></div>',
  );
});

test("Nợ không đứng trước số tài khoản thì giữ nguyên", () => {
  assert.equal(html("Công nợ phải thu", "chat"), "<p>Công nợ phải thu</p>");
  assert.match(html("Nợ 154 – lương", "chat"), /<span class="nnc-dr">Nợ<\/span> 154/);
});

test("danh sách, in đậm, tiêu đề ▶", () => {
  const out = html("▶ Theo TT99:\n- **Bước 1**: mở menu\n- Bước 2\n\nKết thúc", "chat");
  assert.equal(
    out,
    '<p class="nnc-h">Theo TT99:</p><ul><li><b>Bước 1</b>: mở menu</li><li>Bước 2</li></ul><p>Kết thúc</p>',
  );
});

test("escape HTML (chống XSS)", () => {
  const out = html('<img src=x onerror="alert(1)"> **<b>x</b>**', "chat");
  assert.ok(!out.includes("<img"));
  assert.ok(out.includes("&lt;img"));
});

test("chuẩn hóa không dấu", () => {
  assert.equal(norm("Khấu hao TSCĐ!"), "khau hao tscd");
  assert.equal(slugify("1. Số dư tài khoản:"), "1-so-du-tai-khoan");
});
