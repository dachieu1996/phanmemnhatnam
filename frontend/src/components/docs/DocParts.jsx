import Link from "next/link";
import { IconSpark } from "@/components/ui/Icons";

export function Breadcrumb({ items }) {
  return (
    <nav className="crumbs" aria-label="Đường dẫn">
      {items.map((it, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href ? <Link href={it.href}>{it.title}</Link> : <span aria-current="page">{it.title}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Pager({ prev, next }) {
  if (!prev && !next) return null;
  return (
    <nav className="pager" aria-label="Trang trước / sau">
      {prev && (
        <Link className="prev" href={prev.href}>
          <small>← Trước</small>
          <b>{prev.title}</b>
        </Link>
      )}
      {next && (
        <Link className="next" href={next.href}>
          <small>Tiếp theo →</small>
          <b>{next.title}</b>
        </Link>
      )}
    </nav>
  );
}

/** Nút "Hỏi Trợ lý AI về trang này" — mở chat và hỏi luôn. */
export function AskAi({ title }) {
  return (
    <div className="ask-ai">
      <p>Còn thắc mắc về “{title}”?</p>
      <button type="button" className="btn btn-primary btn-sm" data-chat-ask={title}>
        <IconSpark /> Hỏi Trợ lý AI về trang này
      </button>
    </div>
  );
}

export function DocMeta() {
  return (
    <div className="doc-meta">
      <span>Cập nhật: 05/11/2026</span>
      <span>
        Công ty TNHH Tin học Nhất Nam · <Link href="/#lien-he">Liên hệ hỗ trợ</Link>
      </span>
    </div>
  );
}
