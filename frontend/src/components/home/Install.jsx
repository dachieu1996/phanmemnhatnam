import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "./SectionHead";

export default function Install({ data }) {
  return (
    <section className="block" id="cai-dat">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        <div className="steps">
          {data.steps.map((s, i) => (
            <Reveal className="step" key={s.title} delay={i * 80}>
              <div className="n">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.link && (
                <Link href={s.link.href} target="_blank" rel="noopener noreferrer">
                  {s.link.label}
                </Link>
              )}
            </Reveal>
          ))}
        </div>
        <div className="center-cta">
          <Link className="btn btn-dark" href="/#lien-he">
            {data.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
