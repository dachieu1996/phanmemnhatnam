import Reveal from "@/components/ui/Reveal";
import SectionHead from "./SectionHead";

export default function Solutions({ data }) {
  return (
    <section className="block" id="giai-phap">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        <div className="sol-grid">
          {data.items.map((it, i) => (
            <Reveal className="sol" key={it.title} delay={(i % 3) * 80}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div className="ico">
                <img src={`/images/svg/${it.icon}`} alt="" width="30" height="30" loading="lazy" />
              </div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
