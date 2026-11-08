import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/Icons";
import SectionHead from "./SectionHead";

export default function Pricing({ data }) {
  const { offer } = data;
  return (
    <section className="block soft" id="bang-gia">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        <div className="price-grid">
          {data.plans.map((p, i) => (
            <Reveal className={`plan${p.featured ? " featured" : ""}`} key={p.name} delay={i * 80}>
              {p.ribbon && <span className="ribbon">{p.ribbon}</span>}
              <h3>{p.name}</h3>
              <div className="desc">{p.desc}</div>
              <div className="price">
                {p.price} {p.unit && <small>{p.unit}</small>}
              </div>
              <div className="note">{p.note}</div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <IconCheck />
                    {f}
                  </li>
                ))}
              </ul>
              <Link className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`} href="/#lien-he">
                Liên hệ
              </Link>
            </Reveal>
          ))}
        </div>
        {offer && (
          <Reveal className="offer">
            <img className="gift" src="/images/svg/offer-gift.svg" alt="" width="56" height="56" loading="lazy" />
            <div>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
            </div>
            <Link className="btn btn-primary" href="/#lien-he">
              {offer.cta}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
