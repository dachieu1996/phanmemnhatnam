import Link from "next/link";
import { IconArrow, IconCalendar, IconFileCheck, IconSpark } from "@/components/ui/Icons";

const CHIP_ICONS = [IconCalendar, IconFileCheck];

export default function Hero({ hero }) {
  return (
    <section className="hero">
      <div className="container">
        <div>
          {hero.eyebrow && (
            <span className="eyebrow">
              <span className="star" aria-hidden="true">★</span> {hero.eyebrow}
            </span>
          )}
          <h1>
            {hero.title} <span className="hl">{hero.highlight}</span>
          </h1>
          <div className="tagline">{hero.tagline}</div>
          <p className="lead">{hero.lead}</p>
          <div className="actions">
            <Link className="btn btn-primary" href={hero.cta_primary.href}>
              {hero.cta_primary.label} <IconArrow />
            </Link>
            <button type="button" className="btn btn-light" data-chat-open="">
              <IconSpark /> {hero.cta_secondary.label}
            </button>
          </div>
          <div className="badges">
            {hero.badges.map((b) => (
              <span className="badge-tt" key={b}>{b}</span>
            ))}
          </div>
        </div>
        <div className="hero-art">
          <img
            className="box"
            src="/images/box-nhat-nam.png"
            alt="Hộp phần mềm kế toán Nhất Nam 1N"
            width="1048"
            height="812"
            fetchPriority="high"
          />
          {hero.float_chips.map((c, i) => {
            const Icon = CHIP_ICONS[i % CHIP_ICONS.length];
            return (
              <div className={`float-chip c${i + 1}`} key={c.title}>
                <span className="fi"><Icon /></span>
                <div>
                  <b>{c.title}</b>
                  {c.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
