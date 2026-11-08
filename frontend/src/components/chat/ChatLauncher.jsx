"use client";

import { forwardRef, useEffect, useState } from "react";
import { IconChat, IconClose } from "@/components/ui/Icons";

const TEASER_DELAY = 5000;

/** Nút tròn mở chat (logo công ty + huy hiệu + nhãn AI) và lời chào nổi sau 5 giây (mỗi phiên 1 lần). */
const ChatLauncher = forwardRef(function ChatLauncher(
  { open, title, teaser, showTeaser, onToggle, onTeaserClose, onTeaserOpen },
  ref,
) {
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    if (!showTeaser) {
      setTeaserVisible(false);
      return;
    }
    const t = setTimeout(() => setTeaserVisible(true), TEASER_DELAY);
    return () => clearTimeout(t);
  }, [showTeaser]);

  const [hello, ...rest] = String(teaser || "").split(/(?<=👋)\s*/);

  return (
    <>
      {teaserVisible && (
        <div className="nnc-teaser" role="status" onClick={onTeaserOpen}>
          <button
            type="button"
            className="nnc-teaser-x"
            aria-label="Đóng lời chào"
            onClick={(e) => {
              e.stopPropagation();
              onTeaserClose();
            }}
          >
            <IconClose />
          </button>
          <div className="nnc-ava sm">
            <span>1N</span>
            {logoOk && <img src="/images/logo.png" alt="" onError={() => setLogoOk(false)} />}
          </div>
          <div>
            {rest.length ? <b>{hello}</b> : null} {rest.length ? rest.join(" ") : hello}
          </div>
        </div>
      )}
      <button
        ref={ref}
        type="button"
        className="nnc-launcher"
        aria-label={open ? `Thu nhỏ ${title}` : `Mở ${title}`}
        aria-expanded={open}
        aria-controls="nnc-panel"
        onClick={onToggle}
      >
        <span className="nnc-logo">
          <span>1N</span>
          {logoOk && <img src="/images/logo.png" alt="" onError={() => setLogoOk(false)} />}
        </span>
        <span className="nnc-bubble">
          <IconChat />
        </span>
        <span className="nnc-ai">AI</span>
      </button>
    </>
  );
});

export default ChatLauncher;
