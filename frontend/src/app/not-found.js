import Link from "next/link";
import SearchBox from "@/components/docs/SearchBox";
import SiteShell from "@/components/layout/SiteShell";
import { IconSpark } from "@/components/ui/Icons";
import { getSite } from "@/lib/content";

export const metadata = { title: "Không tìm thấy trang", robots: { index: false } };

export default function NotFound() {
  const site = getSite();
  return (
    <SiteShell site={site}>
      <section className="nf">
        <div className="container">
          <div className="big" aria-hidden="true">404</div>
          <h1>Không tìm thấy trang bạn cần</h1>
          <p>Trang có thể đã được đổi địa chỉ khi website chuyển sang giao diện mới. Bạn thử tìm nhanh bên dưới nhé.</p>
          <div className="search-404">
            <SearchBox />
          </div>
          <div className="actions">
            <Link className="btn btn-primary" href="/">
              Về trang chủ
            </Link>
            <Link className="btn btn-ghost" href="/huong-dan">
              Hướng dẫn sử dụng
            </Link>
            <button type="button" className="btn btn-ghost" data-chat-open="">
              <IconSpark /> Hỏi Trợ lý AI
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
