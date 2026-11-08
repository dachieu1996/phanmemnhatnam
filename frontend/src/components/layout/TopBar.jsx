import { IconMail, IconPhone } from "@/components/ui/Icons";

export default function TopBar({ company }) {
  return (
    <div className="topbar">
      <div className="container">
        <div className="tb-left">
          <span className="tb-item">
            <IconPhone />
            Hotline: <b>{company.hotline.phone}</b>
          </span>
          <span className="tb-item">
            <IconMail />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </span>
        </div>
        <div className="tb-right">
          <span className="tb-item">
            Hỗ trợ 24/7 kể cả ngày lễ ·{" "}
            <a href={company.youtube} target="_blank" rel="noopener noreferrer">
              Kênh Youtube
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
