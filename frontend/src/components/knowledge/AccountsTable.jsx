"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { IconInfo } from "@/components/ui/Icons";
import { norm } from "@/lib/normalize";

const COLS = [
  ["tt99", "TT99/2025 (từ 2026)"],
  ["tt200", "TT200/2014"],
  ["tt133", "TT133/2016"],
];

function Cell({ c }) {
  if (!c) return <span className="none">— không có —</span>;
  return (
    <>
      <b>{c.name}</b>
      {c.level2?.length > 0 && (
        <ul>
          {c.level2.map((l) => (
            <li key={l.code}>
              {l.code} – {l.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Bảng đối chiếu hệ thống tài khoản TT99 – TT200 – TT133, lọc theo số hiệu/tên (không dấu). */
export default function AccountsTable({ data }) {
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);

  const rows = useMemo(
    () =>
      data.rows.map((r) => {
        const parts = [r.code, r.balance];
        for (const [k] of COLS) {
          const c = r[k];
          if (c) parts.push(c.name, ...c.level2.flatMap((l) => [l.code, l.name]));
        }
        return { r, hay: " " + norm(parts.join(" ")) + " " };
      }),
    [data.rows],
  );

  const nq = norm(dq);
  const shown = nq ? rows.filter((x) => nq.split(" ").every((w) => x.hay.includes(/^\d+$/.test(w) ? " " + w : w))) : rows;

  return (
    <>
      <label className="sr-only" htmlFor="acc-filter">
        Lọc tài khoản
      </label>
      <input
        id="acc-filter"
        className="acc-filter"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Lọc: ví dụ 642, ký quỹ, bảo hiểm thất nghiệp…"
        autoComplete="off"
      />
      <div className="acc-count" aria-live="polite">
        {nq ? `${shown.length} / ${rows.length} tài khoản khớp` : `${rows.length} tài khoản cấp 1`}
      </div>
      <div className="acc-wrap" tabIndex={0} aria-label="Bảng hệ thống tài khoản">
        <table className="acc-table">
          <thead>
            <tr>
              <th scope="col">Số hiệu</th>
              {COLS.map(([k, label]) => (
                <th scope="col" key={k}>
                  {label}
                </th>
              ))}
              <th scope="col">Số dư</th>
            </tr>
          </thead>
          <tbody>
            {shown.map(({ r }) => (
              <tr key={r.code} id={`tk-${r.code}`}>
                <td className="code">{r.code}</td>
                {COLS.map(([k]) => (
                  <td key={k}>
                    <Cell c={r[k]} />
                  </td>
                ))}
                <td>{r.balance}</td>
              </tr>
            ))}
            {!shown.length && (
              <tr>
                <td colSpan={5} className="none">
                  Không có tài khoản khớp “{q}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.note && (
        <div className="callout warn">
          <IconInfo />
          <div>{data.note}</div>
        </div>
      )}
    </>
  );
}
