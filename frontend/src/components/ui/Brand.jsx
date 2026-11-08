"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Logo → trang chủ. Đang ở trang chủ thì cuộn lên đầu và bỏ #mục trên URL (Next.js không tự cuộn khi bấm cùng trang). */
export default function Brand({ className = "brand" }) {
  const pathname = usePathname();

  const onClick = (e) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (window.location.hash) window.history.pushState(null, "", "/");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <Link className={className} href="/" onClick={onClick} aria-label="Phần mềm kế toán Nhất Nam – Trang chủ">
      <img src="/images/logo.png" alt="Logo Nhất Nam" width="44" height="44" />
      <span className="brand-text">
        <b>Nhất Nam</b>
        <small>PHẦN MỀM KẾ TOÁN</small>
      </span>
    </Link>
  );
}
