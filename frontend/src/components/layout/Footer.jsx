import Link from "next/link";
import Brand from "@/components/ui/Brand";

export default function Footer({ site }) {
  const { company, footer } = site;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <Brand />
            <p style={{ marginTop: 14 }}>{footer.about}</p>
          </div>
          <div>
            <h4>Sản phẩm</h4>
            <ul>
              <li><Link href="/#giai-phap">Giải pháp theo lĩnh vực</Link></li>
              <li><Link href="/#tinh-nang">Tính năng</Link></li>
              <li><Link href="/#bang-gia">Bảng giá</Link></li>
              <li><Link href="/#cai-dat">Tải bộ cài</Link></li>
            </ul>
          </div>
          <div>
            <h4>Tài liệu</h4>
            <ul>
              <li><Link href="/huong-dan">Hướng dẫn sử dụng</Link></li>
              <li><Link href="/kien-thuc">Kiến thức kế toán</Link></li>
              <li><Link href="/kien-thuc/he-thong-tai-khoan">Hệ thống tài khoản</Link></li>
              <li>
                <a href={company.youtube} target="_blank" rel="noopener noreferrer">Video Youtube</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Liên hệ</h4>
            <ul>
              <li>{company.address}</li>
              <li>{company.hotline.phone} ({company.hotline.name})</li>
              <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>{footer.copyright}</span>
          <span>phanmemnhatnam.com</span>
        </div>
      </div>
    </footer>
  );
}
