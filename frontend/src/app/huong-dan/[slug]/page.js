import { notFound } from "next/navigation";
import DocArticle from "@/components/docs/DocArticle";
import DocsFrame from "@/components/docs/DocsFrame";
import { AskAi, Breadcrumb, DocMeta, Pager } from "@/components/docs/DocParts";
import JsonLd from "@/components/ui/JsonLd";
import { getDoc, getDocList, getDocsSidebar, getSite, SITE_URL } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocList().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description || `${doc.title} – hướng dẫn sử dụng phần mềm kế toán Nhất Nam (${doc.group}).`,
    alternates: { canonical: `/huong-dan/${slug}` },
    openGraph: { title: doc.title, url: `/huong-dan/${slug}` },
  };
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const { company } = getSite();
  const crumbs = [{ title: "Hướng dẫn sử dụng", href: "/huong-dan" }, { title: doc.group }];
  return (
    <DocsFrame space="huong-dan" groups={getDocsSidebar()} toc={doc.toc} help={company.hotline}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Hướng dẫn sử dụng", item: `${SITE_URL}/huong-dan` },
            { "@type": "ListItem", position: 2, name: doc.title, item: `${SITE_URL}/huong-dan/${slug}` },
          ],
        }}
      />
      <Breadcrumb items={crumbs} />
      <article className="doc">
        <DocArticle html={doc.html}>
          <h1>{doc.title}</h1>
          {doc.description && <p className="subtitle">{doc.description}</p>}
        </DocArticle>
      </article>
      <AskAi title={doc.title} />
      <Pager prev={doc.prev} next={doc.next} />
      <DocMeta />
    </DocsFrame>
  );
}
