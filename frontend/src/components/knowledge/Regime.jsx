"use client";

import { createContext, useContext, useId, useRef, useSyncExternalStore } from "react";

const KEY = "nn_regime";
const EVT = "nn-regime";
const ORDER = ["tt99", "tt200", "tt133"];
const RegimeContext = createContext({ regime: "tt99", setRegime: () => {} });

/* Kho nhỏ quanh localStorage: đồng bộ giữa các bảng tab, các trang và các tab trình duyệt. */
function read() {
  try {
    const v = localStorage.getItem(KEY);
    return ORDER.includes(v) ? v : "tt99";
  } catch {
    return "tt99";
  }
}
function subscribe(cb) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}
function setRegime(v) {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  window.dispatchEvent(new Event(EVT));
}

/** Chế độ kế toán đang chọn — dùng chung cho mọi bảng tab trên trang, nhớ bằng localStorage "nn_regime". */
export function RegimeProvider({ children }) {
  const regime = useSyncExternalStore(subscribe, read, () => "tt99");
  return <RegimeContext.Provider value={{ regime, setRegime }}>{children}</RegimeContext.Provider>;
}

/**
 * Tab TT99/2025 | TT200/2014 | TT133/2016 (ARIA tabs, phím mũi tên / Home / End).
 * panels: { tt99: node, tt200: node, tt133: node }  — sameForAll → 1 tab "Áp dụng chung".
 */
export function EntryTabs({ labels, panels, sameForAll }) {
  const { regime, setRegime } = useContext(RegimeContext);
  const uid = useId();
  const btns = useRef([]);
  const keys = sameForAll ? ["all"] : ORDER.filter((k) => panels[k] != null);
  const active = sameForAll ? "all" : keys.includes(regime) ? regime : keys[0];

  const onKey = (e, i) => {
    let j = null;
    if (e.key === "ArrowRight") j = (i + 1) % keys.length;
    else if (e.key === "ArrowLeft") j = (i - 1 + keys.length) % keys.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = keys.length - 1;
    if (j === null) return;
    e.preventDefault();
    setRegime(keys[j]);
    btns.current[j]?.focus();
  };

  return (
    <div className="tt-tabs">
      <div className="tablist" role="tablist" aria-label="Chế độ kế toán">
        {keys.map((k, i) => (
          <button
            key={k}
            ref={(el) => (btns.current[i] = el)}
            type="button"
            role="tab"
            id={`${uid}-t-${k}`}
            aria-selected={k === active}
            aria-controls={`${uid}-p-${k}`}
            tabIndex={k === active ? 0 : -1}
            onClick={() => k !== "all" && setRegime(k)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {k === "all" ? "Áp dụng chung TT99 · TT200 · TT133" : labels[k]}
          </button>
        ))}
      </div>
      {keys.map((k) => (
        <div
          key={k}
          className={`panel${k === active ? " on" : ""}`}
          role="tabpanel"
          id={`${uid}-p-${k}`}
          aria-labelledby={`${uid}-t-${k}`}
          hidden={k !== active}
          tabIndex={0}
        >
          {k === "all" ? panels.tt99 ?? panels.tt200 ?? panels.tt133 : panels[k]}
        </div>
      ))}
    </div>
  );
}
