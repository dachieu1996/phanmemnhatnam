import { notFound } from "next/navigation";
import DocsFrame from "@/components/docs/DocsFrame";
import { AskAi, Breadcrumb, DocMeta, Pager } from "@/components/docs/DocParts";
import AccountsTable from "@/components/knowledge/AccountsTable";
import { RegimeProvider } from "@/components/knowledge/Regime";
import { EntrySection, QaSection } from "@/components/knowledge/Sections";
import JsonLd from "@/components/ui/JsonLd";
import {
  getAccounts,
  getKnowledge,
  getKnowledgeList,
  getKnowledgePage,
  getKnowledgeSidebar,
  getSite,
  SITE_URL,
} from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getKnowledgeList()
    .filter((p) => p.slug !== "index")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = getKnowledgePage(slug);
  if (!r) return {};
  return {
    title: r.page.title,
    description: r.page.subtitle || r.page.title,
    alternates: { canonical: `/kien-thuc/${slug}` },
    openGraph: { title: r.page.title, url: `/kien-thuc/${slug}` },
  };
}

export default async function KnowledgePage({ params }) {
  const { slug } = await params;
  const r = getKnowledgePage(slug);
  if (!r || slug === "index") notFound();
  const { page, prev, next } = r;
  const labels = getKnowledge().variant_labels;
  const { company } = getSite();
  const sections = page.sections || [];
  const toc = sections.map((s) => ({ id: s.id, text: s.title, level: 2 }));

  return (
    <DocsFrame space="kien-thuc" groups={getKnowledgeSidebar()} toc={toc} help={company.hotline}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Kiến thức kế toán", item: `${SITE_URL}/kien-thuc` },
            { "@type": "ListItem", position: 2, name: page.title, item: `${SITE_URL}/kien-thuc/${slug}` },
          ],
        }}
      />
      <Breadcrumb items={[{ title: "Kiến thức kế toán", href: "/kien-thuc" }, { title: page.group }]} />
      <RegimeProvider>
        <article className="doc">
          <h1>{page.title}</h1>
          {page.subtitle && <p className="subtitle">{page.subtitle}</p>}
          {page.type === "accounts" && (
            <>
              <p>
                Bảng đối chiếu tài khoản cấp 1 và cấp 2 giữa ba chế độ kế toán doanh nghiệp. Gõ số hiệu hoặc tên tài
                khoản để lọc nhanh.
              </p>
              <AccountsTable data={getAccounts()} />
            </>
          )}
          {sections.map((s) =>
            page.type === "entries" ? <EntrySection key={s.id} s={s} labels={labels} /> : <QaSection key={s.id} s={s} />,
          )}
        </article>
      </RegimeProvider>
      <AskAi title={page.title} />
      <Pager prev={prev} next={next} />
      <DocMeta />
    </DocsFrame>
  );
}
