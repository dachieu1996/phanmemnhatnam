"use client";

import { useEffect, useRef } from "react";
import { IconClose, IconPhone, IconReset, IconSend } from "@/components/ui/Icons";
import { useChat } from "./ChatProvider";
import Message, { Avatar } from "./Message";

const MAX_LEN = 1000;
const MAX_H = 120; // ~4 dòng

export default function ChatPanel({ hidden }) {
  const { msgs, chips, busy, config, ask, reset, closeChat, rate } = useChat();
  const bodyRef = useRef(null);
  const taRef = useRef(null);

  // Cuộn xuống cuối khi có tin mới
  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [msgs, busy, hidden]);

  // Mở → focus ô nhập; Esc → đóng
  useEffect(() => {
    if (hidden) return;
    const t = setTimeout(() => taRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && closeChat();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [hidden, closeChat]);

  const autosize = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, MAX_H) + "px";
    ta.style.overflowY = ta.scrollHeight > MAX_H ? "auto" : "hidden";
  };

  const submit = (e) => {
    e?.preventDefault();
    const ta = taRef.current;
    const v = ta.value.trim();
    if (!v || busy) return;
    ta.value = "";
    autosize();
    ask(v);
  };

  const list = chips === null ? (msgs.length ? [] : config.suggestions) : chips;

  return (
    <section
      id="nnc-panel"
      className="nnc-panel"
      role="dialog"
      aria-modal="false"
      aria-label={config.title}
      hidden={hidden}
    >
      <header className="nnc-head">
        <Avatar />
        <div className="nnc-title">
          <b>{config.title}</b>
          <small>
            <i />
            {config.status}
          </small>
        </div>
        <button type="button" className="nnc-ib" title="Cuộc trò chuyện mới" aria-label="Cuộc trò chuyện mới" onClick={reset}>
          <IconReset />
        </button>
        <button type="button" className="nnc-ib" title="Thu nhỏ" aria-label="Thu nhỏ trợ lý" onClick={closeChat}>
          <IconClose />
        </button>
      </header>

      <div className="nnc-body" ref={bodyRef} aria-live="polite">
        <div className="nnc-day">Hôm nay</div>
        {!msgs.length && <Message m={{ role: "bot", text: config.welcome }} noActions />}
        {msgs.map((m, i) => (
          <Message key={i} m={m} index={i} onRate={rate} />
        ))}
        {busy && (
          <div className="nnc-msg bot nnc-typing" aria-label="Trợ lý đang trả lời">
            <Avatar sm />
            <div className="nnc-b">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      {list.length > 0 && (
        <div className="nnc-chips" aria-label="Gợi ý câu hỏi">
          {list.slice(0, 5).map((s) => (
            <button type="button" key={s} onClick={() => ask(s)} disabled={busy}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form className="nnc-form" onSubmit={submit}>
        <textarea
          ref={taRef}
          rows={1}
          maxLength={MAX_LEN}
          placeholder="Nhập câu hỏi của bạn…"
          aria-label="Nội dung câu hỏi"
          readOnly={busy}
          onInput={autosize}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button type="submit" className="nnc-send" aria-label="Gửi" disabled={busy}>
          <IconSend />
        </button>
      </form>
      <div className="nnc-foot">
        {config.disclaimer} ·{" "}
        <span className="nnc-hotline">
          <IconPhone /> {config.handoff}: <b>{config.hotline}</b>
        </span>
      </div>
    </section>
  );
}
