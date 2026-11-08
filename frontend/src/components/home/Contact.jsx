import Reveal from "@/components/ui/Reveal";
import { IconMail, IconPhone, IconPin, IconYoutube } from "@/components/ui/Icons";

export default function Contact({ data, company }) {
  return (
    <section className="block" id="lien-he">
      <div className="container">
        <div className="contact">
          <Reveal className="contact-card">
            <h2>{data.title}</h2>
            <p>{data.text}</p>
            <div className="ci">
              <span className="ci-ico"><IconPin /></span>
              <div>
                <b>Trụ sở chính</b>
                {company.address}
              </div>
            </div>
            <div className="ci">
              <span className="ci-ico"><IconPhone /></span>
              <div>
                <b>Hotline – {company.hotline.name}</b>
                <strong>{company.hotline.phone}</strong>
              </div>
            </div>
            <div className="ci">
              <span className="ci-ico"><IconMail /></span>
              <div>
                <b>Email</b>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
            <div className="ci">
              <span className="ci-ico"><IconYoutube /></span>
              <div>
                <b>Video hướng dẫn</b>
                <a href={company.youtube} target="_blank" rel="noopener noreferrer">
                  {company.youtube.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="support-card" delay={100}>
            <h3>Cam kết hỗ trợ</h3>
            <ul>
              {data.commitments.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
