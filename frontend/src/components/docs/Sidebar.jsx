"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconChevron } from "@/components/ui/Icons";

export default function Sidebar({ id, groups, open }) {
  const pathname = usePathname();
  const [closed, setClosed] = useState({});
  const ref = useRef(null);

  // Cuộn mục đang xem vào giữa nếu bị khuất
  useEffect(() => {
    const act = ref.current?.querySelector("a.active");
    if (act) {
      const r = act.getBoundingClientRect();
      if (r.top > window.innerHeight - 120) act.scrollIntoView({ block: "center" });
    }
  }, [pathname]);

  return (
    <aside id={id} ref={ref} className={`sidebar${open ? " open" : ""}`} aria-label="Mục lục tài liệu">
      {groups.map((g, gi) => {
        const isClosed = !!closed[gi];
        return (
          <div className={`grp${isClosed ? " closed" : ""}`} key={g.group}>
            <button
              type="button"
              className="grp-title"
              aria-expanded={!isClosed}
              onClick={() => setClosed((c) => ({ ...c, [gi]: !c[gi] }))}
            >
              {g.group}
              <IconChevron />
            </button>
            <ul>
              {g.items.map((it) => {
                const active = pathname === it.href;
                return (
                  <li key={it.href}>
                    <Link href={it.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
                      {it.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
