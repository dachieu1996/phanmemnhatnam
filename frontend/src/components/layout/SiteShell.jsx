import Footer from "./Footer";
import Header from "./Header";
import TopBar from "./TopBar";

// Mục menu ẩn khỏi thanh điều hướng: "Trợ lý AI" (đã có nút chat cố định ở góc màn hình), "Liên hệ"
const HIDDEN_NAV = new Set(["/#tro-ly-ai", "/#lien-he"]);

/** Khung trang marketing: thanh trên + header + nội dung + footer. */
export default function SiteShell({ site, children }) {
  return (
    <>
      <TopBar company={site.company} />
      <Header nav={site.nav.filter((it) => !HIDDEN_NAV.has(it.href))} />
      <main id="noi-dung">{children}</main>
      <Footer site={site} />
    </>
  );
}
