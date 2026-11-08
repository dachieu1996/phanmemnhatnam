import Reveal from "@/components/ui/Reveal";
import { IconQuote } from "@/components/ui/Icons";
import SectionHead from "./SectionHead";

export default function Testimonials({ data }) {
  const n = data.items.length;
  return (
    <section className="block">
      <div className="container">
        <SectionHead kicker={data.kicker} title={data.title} text={data.text} />
        <div className="quotes" role="list">
          {data.items.map((q, i) => (
            <Reveal
              className={`quote${n % 3 === 2 && i === n - 1 ? " wide" : ""}`}
              key={i}
              role="listitem"
              delay={(i % 3) * 80}
            >
              <IconQuote className="qm" />
              <p>{q}</p>
              <div className="who">
                <span className="avatar" aria-hidden="true">KH</span>
                {data.author_label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
