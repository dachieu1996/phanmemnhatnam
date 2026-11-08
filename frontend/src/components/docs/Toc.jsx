"use client";

import { useEffect, useState } from "react";

/** Mục lục phải (h2/h3) + scrollspy. Ẩn ở < 1180px (CSS). */
export default function Toc({ items, help }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const heads = items.map((t) => document.getElementById(t.id));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let idx = 0;
        heads.forEach((h, i) => {
          if (h && h.getBoundingClientRect().top < 120) idx = i;
        });
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <aside className="toc" aria-label="Trên trang này">
      {items.length > 0 && (
        <>
          <h5>Trên trang này</h5>
          <ul>
            {items.map((t, i) => (
              <li key={t.id} className={`lv${t.level || 2}`}>
                <a href={`#${t.id}`} className={i === active ? "on" : undefined}>
                  {t.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {help && (
        <div className="help">
          <b>Cần hỗ trợ?</b>
          Gọi {help.name} <strong>{help.phone}</strong> – hỗ trợ 24/7.
        </div>
      )}
    </aside>
  );
}
