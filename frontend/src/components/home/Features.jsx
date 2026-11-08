import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";
import SectionHead from "./SectionHead";

export default function Features({ data }) {
  return (
    <section className="block soft" id="tinh-nang">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        {data.items.map((it, i) => (
          <Reveal className={`feat${i % 2 ? " rev" : ""}`} key={it.title}>
            <div className="feat-art">
              <img src={`/images/svg/${it.art}`} alt="" width="340" height="210" loading="lazy" />
            </div>
            <div>
              <span className="tag">{it.tag}</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              {it.link && (
                <Link className="link-arrow" href={it.link.href} target="_blank" rel="noopener noreferrer">
                  {it.link.label} <IconArrow />
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
