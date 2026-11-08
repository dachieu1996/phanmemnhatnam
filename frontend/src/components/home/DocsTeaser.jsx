import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "./SectionHead";

export default function DocsTeaser({ data }) {
  return (
    <section className="block soft">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        <div className="doc-cards">
          {data.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <Link className="doc-card" href={c.href} style={{ height: "100%" }} target="_blank" rel="noopener noreferrer">
                <span className="ico">
                  <img src={`/images/svg/${c.icon}`} alt="" width="30" height="30" loading="lazy" />
                </span>
                <b>{c.title}</b>
                <span>{c.text}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="kt-list">
          {data.highlights.map((h) => (
            <Link key={h.href} href={h.href} target="_blank" rel="noopener noreferrer">
              {h.title} <span className="pill">{h.pill}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
