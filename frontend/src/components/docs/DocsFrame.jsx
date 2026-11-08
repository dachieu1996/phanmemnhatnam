"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "@/components/ui/Brand";
import { IconClose, IconHome, IconMenu } from "@/components/ui/Icons";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";
import Toc from "./Toc";

/**
 * Khung tài liệu kiểu GitBook: thanh trên (logo, tab không gian, tìm kiếm) · sidebar trái · nội dung · mục lục phải.
 * @param {{space:"huong-dan"|"kien-thuc", groups:{group:string,items:{title:string,href:string}[]}[], toc?:{id,text,level}[], children:any}} props
 */
export default function DocsFrame({ space, groups, toc = [], help, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Đóng ngăn kéo khi chuyển trang
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="docs-header">
        <div className="bar">
          <button
            type="button"
            className="docs-burger"
            aria-label={open ? "Đóng mục lục" : "Mở mục lục"}
            aria-expanded={open}
            aria-controls="docs-sidebar"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
          <Brand />
          <nav className="space-tabs" aria-label="Không gian tài liệu">
            <Link href="/huong-dan" className={space === "huong-dan" ? "on" : undefined}>
              Hướng dẫn sử dụng
            </Link>
            <Link href="/kien-thuc" className={space === "kien-thuc" ? "on" : undefined}>
              Kiến thức kế toán
            </Link>
            <Link href="/">Trang chủ</Link>
          </nav>
          <SearchBox />
          <Link href="/" className="btn btn-ghost btn-sm home-btn" aria-label="Về trang chủ">
            <IconHome />
          </Link>
        </div>
      </header>
      <div className="docs-layout">
        <Sidebar id="docs-sidebar" groups={groups} open={open} />
        <div className={`sb-backdrop${open ? " on" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
        <main className="doc-main" id="noi-dung">
          {children}
        </main>
        <Toc items={toc} help={help} />
      </div>
    </>
  );
}
