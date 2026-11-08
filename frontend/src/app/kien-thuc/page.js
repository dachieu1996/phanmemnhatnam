import Link from "next/link";
import DocsFrame from "@/components/docs/DocsFrame";
import { Breadcrumb, DocMeta, Pager } from "@/components/docs/DocParts";
import { IconInfo } from "@/components/ui/Icons";
import { getKnowledge, getKnowledgePage, getKnowledgeSidebar, getSite, ktHref } from "@/lib/content";
import { slugify } from "@/lib/normalize";

export const metadata = {
  title: "Kiến thức kế toán",
  description:
    "Hạch toán theo Thông tư 99/2025, 200/2014, 133/2016; hệ thống tài khoản; kế toán HCSN, HTX, hộ kinh doanh; thuế, hóa đơn, lao động – bảo hiểm.",
  alternates: { canonical: "/kien-thuc" },
};

export default function KnowledgeHome() {
  const kt = getKnowledge();
  const { page, next } = getKnowledgePage("index");
  const { company } = getSite();
  const groups = kt.groups.map((g) => ({ ...g, id: slugify(g.group), pages: g.pages.filter((p) => p.type !== "intro") }));
  const toc = groups.map((g) => ({ id: g.id, text: g.group, level: 2 }));
  const L = kt.variant_labels;
  return (
    <DocsFrame space="kien-thuc" groups={getKnowledgeSidebar()} toc={toc} help={company.hotline}>
      <Breadcrumb items={[{ title: "Kiến thức kế toán", href: "/kien-thuc" }, { title: "Tổng quan" }]} />
      <article className="doc">
        <h1>{page.title}</h1>
        <p className="subtitle">{page.subtitle}</p>
        {page.notice && (
          <div className="callout warn" role="note">
            <IconInfo />
            <div>{page.notice}</div>
          </div>
        )}
        <p>
          Mỗi nghiệp vụ được trình bày định khoản theo <span className="chip">{L.tt99}</span>
          <span className="chip">{L.tt200} – đến hết 2025</span>
          <span className="chip">{L.tt133}</span>. Bấm từng tab để xem cách hạch toán theo chế độ đơn vị đang áp dụng —
          lựa chọn được ghi nhớ cho mọi trang.
        </p>
        {groups.map((g) => (
          <section key={g.group}>
            <h2 id={g.id}>{g.group}</h2>
            <div className="cards-mini">
              {g.pages.map((p) => (
                <Link key={p.slug} href={ktHref(p.slug)}>
                  <b>{p.title}</b>
                  <small>{p.subtitle}</small>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </article>
      <Pager next={next} />
      <DocMeta />
    </DocsFrame>
  );
}
