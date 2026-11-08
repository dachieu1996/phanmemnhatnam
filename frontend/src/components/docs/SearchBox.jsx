"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useId, useMemo, useRef, useState } from "react";
import { IconSearch } from "@/components/ui/Icons";
import { norm, stripAccents } from "@/lib/normalize";

let indexPromise = null;

/** Tải lười /search-index.json và dựng MiniSearch (không phân biệt dấu). */
function loadIndex() {
  if (!indexPromise) {
    indexPromise = Promise.all([fetch("/search-index.json").then((r) => r.json()), import("minisearch")])
      .then(([docs, { default: MiniSearch }]) => {
        const ms = new MiniSearch({
          fields: ["title", "headings", "text"],
          storeFields: ["title", "page", "space", "url", "text"],
          processTerm: (t) => norm(t) || null,
          tokenize: (s) => stripAccents(s).split(/[^a-z0-9]+/),
          searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3, headings: 2 }, combineWith: "AND" },
        });
        ms.addAll(docs);
        return ms;
      })
      .catch((e) => {
        indexPromise = null;
        throw e;
      });
  }
  return indexPromise;
}

/** Tô đậm từ khớp (so khớp không dấu nhưng giữ nguyên chữ có dấu khi hiển thị). */
function Highlight({ text, words }) {
  if (!words.length || !text) return text;
  const plain = stripAccents(text);
  const marks = [];
  for (const w of words) {
    let i = 0;
    while (w && (i = plain.indexOf(w, i)) > -1) {
      marks.push([i, i + w.length]);
      i += w.length;
    }
  }
  if (!marks.length) return text;
  marks.sort((a, b) => a[0] - b[0]);
  const out = [];
  let last = 0;
  marks.forEach(([s, e], k) => {
    if (s < last) return;
    if (s > last) out.push(<Fragment key={`t${k}`}>{text.slice(last, s)}</Fragment>);
    out.push(<mark key={`m${k}`}>{text.slice(s, e)}</mark>);
    last = e;
  });
  out.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return out;
}

function snippet(text, words, len = 120) {
  if (!text) return "";
  const plain = stripAccents(text);
  const pos = Math.max(0, ...words.map((w) => plain.indexOf(w)).filter((i) => i >= 0).slice(0, 1));
  const start = Math.max(0, pos - 30);
  return (start ? "…" : "") + text.slice(start, start + len) + (start + len < text.length ? "…" : "");
}

export default function SearchBox({ className = "search", autoFocus = false }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const [ms, setMs] = useState(null);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const listId = useId();

  const ensure = () => {
    if (ms || error) return;
    loadIndex().then(setMs, () => setError(true));
  };

  // Ctrl/⌘ + K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    const onDoc = (e) => !boxRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, []);

  const words = useMemo(() => norm(q).split(" ").filter((w) => w.length > 1), [q]);
  const results = useMemo(() => {
    if (!ms || norm(q).length < 2) return [];
    let r = ms.search(q);
    if (!r.length) r = ms.search(q, { combineWith: "OR" });
    return r.slice(0, 14);
  }, [ms, q]);
  const groups = useMemo(() => {
    const g = { "Hướng dẫn": [], "Kiến thức": [] };
    results.forEach((r) => (g[r.space] || (g[r.space] = [])).push(r));
    return Object.entries(g).filter(([, v]) => v.length);
  }, [results]);
  const flat = groups.flatMap(([, v]) => v);

  const go = (r) => {
    if (!r) return;
    setOpen(false);
    inputRef.current?.blur();
    router.push(r.url);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, Math.min(flat.length - 1, s + (e.key === "ArrowDown" ? 1 : -1))));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[sel] || flat[0]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  let n = -1;
  return (
    <div className={className} ref={boxRef} role="search">
      <IconSearch />
      <input
        ref={inputRef}
        type="search"
        value={q}
        autoFocus={autoFocus}
        placeholder="Tìm hướng dẫn, nghiệp vụ, tài khoản…"
        aria-label="Tìm kiếm tài liệu"
        role="combobox"
        aria-expanded={open && norm(q).length >= 2}
        aria-controls={listId}
        aria-autocomplete="list"
        onFocus={() => {
          ensure();
          setOpen(true);
        }}
        onChange={(e) => {
          ensure();
          setQ(e.target.value);
          setSel(0);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      />
      <kbd>Ctrl K</kbd>
      <div id={listId} role="listbox" className={`search-results${open && norm(q).length >= 2 ? " open" : ""}`}>
        {error && <div className="empty">Không tải được chỉ mục tìm kiếm.</div>}
        {!error && !ms && <div className="empty">Đang tải chỉ mục…</div>}
        {ms && !flat.length && <div className="empty">Không tìm thấy kết quả cho “{q}”.</div>}
        {groups.map(([name, items]) => (
          <div key={name}>
            <div className="grp-h">{name}</div>
            {items.map((r) => {
              n++;
              const i = n;
              return (
                <a
                  key={r.id}
                  href={r.url}
                  role="option"
                  aria-selected={i === sel}
                  className={i === sel ? "sel" : undefined}
                  onMouseEnter={() => setSel(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(r);
                  }}
                >
                  {r.page && r.page !== r.title && <span className="pg">{r.page}</span>}
                  <b>
                    <Highlight text={r.title} words={words} />
                  </b>
                  <small>
                    <Highlight text={snippet(r.text, words)} words={words} />
                  </small>
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
