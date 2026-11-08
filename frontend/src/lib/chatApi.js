/** Gọi backend chatbot theo hợp đồng docs/CHATBOT_API.md. */

const RAW = process.env.NEXT_PUBLIC_CHAT_API ?? "/api";
/** "off" hoặc rỗng → không gọi backend, chỉ dùng cơ sở tri thức dự phòng. */
export const CHAT_API = RAW === "off" ? "" : RAW.replace(/\/$/, "");
// Chuỗi thời gian chờ: mô hình AI 40 s (chatbot_NN LLM_TIMEOUT) < backend 50 s (CHATBOT_TIMEOUT_MS) < trình duyệt 60 s
const TIMEOUT_MS = 60000;

export async function askBackend({ message, history, page, sessionId }) {
  if (!CHAT_API) throw new Error("backend-disabled");
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(`${CHAT_API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(-10), page, session_id: sessionId }),
      signal: ctrl.signal,
    });
    if (r.status === 429) {
      const d = await r.json().catch(() => ({}));
      return { text: d.detail || "Bạn gửi câu hỏi hơi nhanh, vui lòng chờ một chút nhé.", sources: [], suggestions: [], rateLimited: true };
    }
    if (!r.ok) throw new Error("HTTP " + r.status);
    const d = await r.json();
    return {
      id: d.id,
      text: d.answer || d.message || "",
      sources: Array.isArray(d.sources) ? d.sources : [],
      suggestions: Array.isArray(d.suggestions) ? d.suggestions : [],
      tier: d.tier,
    };
  } finally {
    clearTimeout(t);
  }
}

export function sendFeedback({ messageId, question, answer, rating }) {
  if (!CHAT_API) return;
  fetch(`${CHAT_API}/chat/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message_id: messageId || null, question: question || null, answer, rating }),
    keepalive: true,
  }).catch(() => {});
}
