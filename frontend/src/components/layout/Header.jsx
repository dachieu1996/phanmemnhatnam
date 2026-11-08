"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "@/components/ui/Brand";
import { IconClose, IconMenu } from "@/components/ui/Icons";

/** Header sticky: menu theo site.json.nav, đánh dấu mục đang xem, ngăn kéo mobile (≤1060px). */
export default function Header({ nav }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onHash = () => setHash(window.location.hash);
    onScroll();
    onHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => {
    const [p, h] = href.split("#");
    if (h) return pathname === (p || "/") && hash === `#${h}`;
    return pathname === p || pathname.startsWith(p + "/");
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Brand />
        <nav id="main-nav" className={`main-nav${open ? " open" : ""}`} aria-label="Menu chính">
          {nav.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={isActive(it.href) ? "on" : undefined}
              aria-current={isActive(it.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}
