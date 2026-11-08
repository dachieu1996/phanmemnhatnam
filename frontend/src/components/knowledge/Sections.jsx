import { formatEntry } from "@/lib/formatEntry";
import { EntryTabs } from "./Regime";

/** Mục dạng hỏi–đáp: h2 + chip + câu hỏi liên quan + nội dung + căn cứ. */
export function QaSection({ s }) {
  return (
    <section aria-labelledby={s.id}>
      <h2 id={s.id}>{s.title}</h2>
      {s.tag && <span className="chip">{s.tag}</span>}
      {s.related?.length > 0 && <p className="qa-related">Câu hỏi liên quan: {s.related.join(" · ")}</p>}
      {formatEntry(s.body)}
      {s.source && <p className="qa-source">Căn cứ: {s.source}</p>}
    </section>
  );
}

/** Mục hạch toán theo nghiệp vụ: h2 + chip loại hình + tab TT99/TT200/TT133. */
export function EntrySection({ s, labels }) {
  const v = s.variants || {};
  const panels = {};
  for (const k of ["tt99", "tt200", "tt133"]) panels[k] = v[k] ? formatEntry(v[k]) : null;
  return (
    <section aria-labelledby={s.id}>
      <h2 id={s.id}>{s.title}</h2>
      {s.tag && <span className="chip">{s.tag}</span>}
      {s.related?.length > 0 && <p className="qa-related">Câu hỏi liên quan: {s.related.join(" · ")}</p>}
      <EntryTabs labels={labels} panels={panels} sameForAll={!!s.same_for_all} />
      {s.source && <p className="qa-source">Căn cứ: {s.source}</p>}
    </section>
  );
}
