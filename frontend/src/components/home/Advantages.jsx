import Reveal from "@/components/ui/Reveal";
import SectionHead from "./SectionHead";

export default function Advantages({ data }) {
  return (
    <section className="block">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        <div className="adv-grid">
          {data.items.map((it, i) => (
            <Reveal className="adv" key={it.title} delay={(i % 4) * 60}>
              <span className="dot">
                <img src={`/images/svg/${it.icon}`} alt="" width="19" height="19" loading="lazy" />
              </span>
              <div>
                <b>{it.title}</b>
                <span>{it.text}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
