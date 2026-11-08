import Advantages from "@/components/home/Advantages";
import AiSection from "@/components/home/AiSection";
import Contact from "@/components/home/Contact";
import DocsTeaser from "@/components/home/DocsTeaser";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Install from "@/components/home/Install";
import Pricing from "@/components/home/Pricing";
import Solutions from "@/components/home/Solutions";
import Stats from "@/components/home/Stats";
import SiteShell from "@/components/layout/SiteShell";
import JsonLd from "@/components/ui/JsonLd";
import { getSite, SITE_URL } from "@/lib/content";

export const metadata = {
  title: { absolute: "Phần mềm kế toán Nhất Nam – Đồng hành cùng doanh nghiệp Việt" },
  alternates: { canonical: "/" },
};

function jsonLd(site) {
  const { company, pricing } = site;
  const offers = pricing.plans
    .filter((p) => /^\d/.test(p.price))
    .map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price.replace(/\./g, ""),
      priceCurrency: "VND",
      description: p.desc,
    }));
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      foundingDate: "2008-06-09",
      email: company.email,
      telephone: `+84${company.hotline.tel.replace(/^0/, "")}`,
      address: { "@type": "PostalAddress", streetAddress: company.address, addressLocality: "Hà Nội", addressCountry: "VN" },
      sameAs: [company.youtube],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: company.product,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Accounting",
      operatingSystem: "Windows",
      inLanguage: "vi",
      publisher: { "@type": "Organization", name: company.name },
      offers,
    },
  ];
}

export default function HomePage() {
  const site = getSite();
  return (
    <SiteShell site={site}>
      <JsonLd data={jsonLd(site)} />
      <Hero hero={site.hero} />
      <Stats stats={site.stats} />
      <AiSection ai={site.ai_section} chatbot={site.chatbot} />
      <Solutions data={site.solutions} />
      <Features data={site.features} />
      <Advantages data={site.advantages} />
      <Pricing data={site.pricing} />
      <Install data={site.install} />
      <DocsTeaser data={site.docs_teaser} />
      <Contact data={site.contact} company={site.company} />
    </SiteShell>
  );
}
