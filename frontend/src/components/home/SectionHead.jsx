import Reveal from "@/components/ui/Reveal";

export default function SectionHead({ kicker, title, text }) {
  return (
    <Reveal className="section-head">
      {kicker && <div className="kicker">{kicker}</div>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
