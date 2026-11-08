import Link from "next/link";
import DocsFrame from "@/components/docs/DocsFrame";
import { Breadcrumb, DocMeta, Pager } from "@/components/docs/DocParts";
import { getDocList, getDocsSidebar, getNav, getSite } from "@/lib/content";

export const metadata = {
  title: "Hướng dẫn sử dụng",
  description: "Hướng dẫn cài đặt và sử dụng phần mềm kế toán Nhất Nam (Kế toán 1N) từng bước, có hình minh họa.",
  alternates: { canonical: "/huong-dan" },
};

export default function DocsHome() {
  const nav = getNav();
  const first = getDocList()[0];
  const { company } = getSite();
  return (
    <DocsFrame space="huong-dan" groups={getDocsSidebar()} help={company.hotline}>
      <Breadcrumb items={[{ title: "Hướng dẫn sử dụng" }]} />
      <article className="doc">
        <h1>Hướng dẫn sử dụng phần mềm Nhất Nam</h1>
        <p className="subtitle">
          Tài liệu từng bước: cài đặt, nhập số dư, chứng từ, vật tư, tài sản cố định, kết chuyển và các tiện ích.
          Bấm <kbd>Ctrl</kbd> + <kbd>K</kbd> để tìm nhanh.
        </p>
        {nav.map((g) => (
          <section key={g.group}>
            <h2>{g.group}</h2>
            <div className="cards-mini">
              {g.items.map((it) => (
                <Link key={it.slug} href={`/huong-dan/${it.slug}`}>
                  <b>{it.title}</b>
                  <small>{g.group}</small>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </article>
      <Pager next={first ? { title: first.title, href: first.href } : null} />
      <DocMeta />
    </DocsFrame>
  );
}
