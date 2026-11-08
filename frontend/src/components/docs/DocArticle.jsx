"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Nội dung HTML của bài hướng dẫn (render từ markdown lúc build — nguồn tin cậy).
 * - Bấm ảnh → lightbox (Esc đóng, ←/→ chuyển ảnh)
 * - Ảnh hỏng (link cũ) → ẩn
 * - Link nội bộ → điều hướng phía client
 */
export default function DocArticle({ html, children }) {
  const ref = useRef(null);
  const router = useRouter();
  const [imgs, setImgs] = useState([]);
  const [cur, setCur] = useState(-1);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const list = [...root.querySelectorAll(".doc-html img:not(.inline-ico)")];
    setImgs(list.map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })));
    const hide = (img) => (img.closest("figure") || img).classList.add("img-missing");
    list.forEach((img, i) => {
      img.dataset.i = String(i);
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", img.alt ? `Phóng to ảnh: ${img.alt}` : "Phóng to ảnh");
      if (img.complete && img.naturalWidth === 0) hide(img);
      img.addEventListener("error", () => hide(img), { once: true });
    });
    root.querySelectorAll(".doc-html img.inline-ico").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) img.classList.add("img-missing");
      img.addEventListener("error", () => img.classList.add("img-missing"), { once: true });
    });
  }, [html]);

  const onClick = (e) => {
    const img = e.target.closest?.("img[data-i]");
    if (img) return setCur(Number(img.dataset.i));
    const a = e.target.closest?.("a[href^='/']");
    if (a && !e.ctrlKey && !e.metaKey && !e.shiftKey && a.target !== "_blank") {
      e.preventDefault();
      router.push(a.getAttribute("href"));
    }
  };
  const onKeyDown = (e) => {
    const img = e.target.closest?.("img[data-i]");
    if (img && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setCur(Number(img.dataset.i));
    }
  };

  const close = useCallback(() => setCur(-1), []);
  useEffect(() => {
    if (cur < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setCur((c) => (c + 1) % imgs.length);
      if (e.key === "ArrowLeft") setCur((c) => (c - 1 + imgs.length) % imgs.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cur, imgs.length, close]);

  return (
    <div ref={ref} onClick={onClick} onKeyDown={onKeyDown}>
      {children}
      {html && <div className="doc-html" dangerouslySetInnerHTML={{ __html: html }} />}
      {cur >= 0 && imgs[cur] && (
        <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Xem ảnh" onClick={close}>
          <img src={imgs[cur].src} alt={imgs[cur].alt} />
          <button type="button" aria-label="Đóng" onClick={close} autoFocus>
            ×
          </button>
          {imgs.length > 1 && (
            <>
              <button
                type="button"
                className="lb-nav lb-prev"
                aria-label="Ảnh trước"
                onClick={(e) => {
                  e.stopPropagation();
                  setCur((c) => (c - 1 + imgs.length) % imgs.length);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lb-nav lb-next"
                aria-label="Ảnh sau"
                onClick={(e) => {
                  e.stopPropagation();
                  setCur((c) => (c + 1) % imgs.length);
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
