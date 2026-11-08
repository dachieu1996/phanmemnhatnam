"use client";

import Link from "next/link";
import { useState } from "react";
import { formatEntry, plainText } from "@/lib/formatEntry";
import { IconCopy, IconDown, IconSpark, IconUp } from "@/components/ui/Icons";

export function Avatar({ sm }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`nnc-ava${sm ? " sm" : ""}`} aria-hidden="true">
      <span>1N</span>
      {ok && <img src="/images/logo.png" alt="" onError={() => setOk(false)} />}
    </div>
  );
}

function SourceLink({ s }) {
  const title = `${s.title || "Xem chi tiết"} →`;
  if (/^https?:/i.test(s.url)) {
    return (
      <a href={s.url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    );
  }
  const url = s.url.startsWith("/") ? s.url : "/" + s.url;
  return <Link href={url}>{title}</Link>;
}

export default function Message({ m, index, onRate, noActions }) {
  const [copied, setCopied] = useState(false);

  if (m.role === "user") {
    return (
      <div className="nnc-msg me">
        <div className="nnc-b">{m.text}</div>
      </div>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainText(m.text));
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {}
  };

  return (
    <div className="nnc-msg bot">
      <Avatar sm />
      <div className="nnc-col">
        <div className="nnc-b">
          {formatEntry(m.text, "chat")}
          {m.sources?.length > 0 && (
            <div className="nnc-src">
              {m.sources.map((s) => (
                <SourceLink key={s.url} s={s} />
              ))}
            </div>
          )}
        </div>
        {!noActions && (
          <div className="nnc-acts">
            {m.demo ? (
              <span className="nnc-tag">Cơ sở tri thức Nhất Nam</span>
            ) : m.ai ? (
              <span className="nnc-tag ai">
                <IconSpark />
                AI
              </span>
            ) : null}
            <button
              type="button"
              aria-label="Hữu ích"
              aria-pressed={m.fb === "up"}
              className={m.fb === "up" ? "on" : undefined}
              onClick={() => onRate(index, "up")}
            >
              <IconUp />
            </button>
            <button
              type="button"
              aria-label="Chưa hữu ích"
              aria-pressed={m.fb === "down"}
              className={m.fb === "down" ? "on" : undefined}
              onClick={() => onRate(index, "down")}
            >
              <IconDown />
            </button>
            <button type="button" aria-label={copied ? "Đã sao chép" : "Sao chép"} className={copied ? "on" : undefined} onClick={copy}>
              <IconCopy />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
