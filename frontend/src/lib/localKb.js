/**
 * Cơ sở tri thức dự phòng chạy trong trình duyệt (khi backend lỗi / timeout / tắt).
 * Chuyển nguyên thuật toán askLocal + smallTalk của prototype/assets/js/chatbot.js:
 * n-gram 1–2 không dấu, bỏ từ dừng, trọng số idf, ngưỡng 0,34.
 * /chat-kb.json chỉ được tải khi người dùng mở chat lần đầu.
 */
import { norm } from "./normalize.js";

const STOP = new Set(
  "the nao la gi cho toi minh hoi voi thi va cua co khong nhu o dau duoc can lam sao ra em anh chi a nhe giup xin vay nhi".split(" "),
);

function grams(s) {
  const w = norm(s).split(" ").filter(Boolean);
  const g = {};
  for (let i = 0; i < w.length; i++) {
    if (!STOP.has(w[i])) g[w[i]] = 1;
    if (i + 1 < w.length) g[w[i] + "_" + w[i + 1]] = 1;
  }
  return g;
}

let kbPromise = null;
let IDX = null;

export function loadKb() {
  if (!kbPromise) {
    kbPromise = fetch("/chat-kb.json")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => {
        kbPromise = null;
        return [];
      });
  }
  return kbPromise;
}

function buildIndex(kb) {
  const df = {};
  const docs = kb.map((d) => {
    const q = grams(d.q.join(" "));
    const a = grams(d.a.slice(0, 600));
    Object.keys(q).forEach((k) => (df[k] = (df[k] || 0) + 1));
    return { d, q, a };
  });
  const N = docs.length;
  return { docs, idf: (k) => Math.log(1 + N / (1 + (df[k] || 0))) };
}

export function smallTalk(text, { hotline, email, address }) {
  const n = norm(text);
  if (/^(xin )?chao|^hello|^hi\b|^alo/.test(n) && n.split(" ").length <= 6)
    return "Xin chào bạn! Mình có thể giúp gì về phần mềm kế toán Nhất Nam hoặc cách hạch toán ạ?";
  if (/cam on|thank/.test(n)) return "Rất vui được hỗ trợ bạn! Nếu cần thêm, bạn cứ hỏi tiếp nhé. 😊";
  if (/(gap|noi chuyen|ket noi).*(nguoi|nhan vien|tu van)|so dien thoai|hotline|lien he/.test(n))
    return `Bạn có thể gặp tư vấn viên của Nhất Nam qua hotline **${hotline}** (Ms Thảo) — hỗ trợ 24/7, hoặc email ${email}. Trụ sở: ${address}.`;
  return null;
}

/**
 * @param {string} text
 * @param {{fellBack:boolean, hotline:string, email:string, address:string, suggestions:string[]}} cfg
 */
export async function askLocal(text, cfg) {
  const kb = await loadKb();
  const st = smallTalk(text, cfg);
  if (st) return { text: st, demo: true, suggestions: cfg.suggestions.slice(0, 3) };
  if (!IDX && kb.length) IDX = buildIndex(kb);
  const qg = Object.keys(grams(text));
  if (!qg.length || !IDX) return { text: "Bạn mô tả rõ hơn giúp mình câu hỏi nhé.", demo: true, suggestions: [] };

  const weight = (k) => IDX.idf(k) * (k.includes("_") ? 1.5 : 1);
  const max = qg.reduce((s, k) => s + weight(k), 0);
  const scored = IDX.docs
    .map((x) => {
      let s = 0;
      qg.forEach((k) => {
        if (x.q[k]) s += weight(k);
        else if (x.a[k]) s += weight(k) * 0.25;
      });
      return { x, s: s / max };
    })
    .sort((a, b) => b.s - a.s);

  const best = scored[0];
  const related = [];
  scored.slice(1, 12).forEach((r) => {
    const t = r.x.d.q[0];
    if (r.s > 0.25 && !related.includes(t) && t !== best.x.d.q[0]) related.push(t);
  });
  if (!best || best.s < 0.34) {
    return {
      demo: true,
      text: `Mình chưa tìm thấy câu trả lời thật sát cho câu hỏi này. Bạn thử diễn đạt lại (ví dụ nêu rõ nghiệp vụ, tài khoản hoặc menu trên phần mềm), hoặc gọi tư vấn viên qua hotline **${cfg.hotline}** để được hỗ trợ ngay.`,
      suggestions: related.length ? related.slice(0, 4) : cfg.suggestions,
    };
  }
  const d = best.x.d;
  const note = cfg.fellBack ? "\n\n(AI tạm thời không phản hồi – câu trả lời lấy từ cơ sở tri thức Nhất Nam.)" : "";
  return {
    demo: true,
    text: d.a + note,
    sources: d.u ? [{ title: d.ut || "Xem hướng dẫn chi tiết", url: d.u }] : [],
    suggestions: related.slice(0, 3),
  };
}
