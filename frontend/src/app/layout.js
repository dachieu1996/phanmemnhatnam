import { Roboto } from "next/font/google";
import ChatProvider from "@/components/chat/ChatProvider";
import { getSite, SITE_URL } from "@/lib/content";
import "@/styles/tokens.css";
import "@/styles/site.css";
import "@/styles/chat.css";
import "@/styles/extra.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const site = getSite();

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.company.product} – ${site.company.slogan}`,
    template: "%s | Phần mềm kế toán Nhất Nam",
  },
  description:
    "Phần mềm kế toán Nhất Nam (1N) – đáp ứng đầy đủ nghiệp vụ kế toán doanh nghiệp, xây dựng, thương mại, giao thông thủy lợi, hành chính sự nghiệp và chủ đầu tư. Hỗ trợ 24/7.",
  applicationName: "Phần mềm kế toán Nhất Nam",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Phần mềm kế toán Nhất Nam",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Phần mềm kế toán Nhất Nam" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#ffd43b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  const { company, chatbot } = site;
  const chatConfig = {
    ...chatbot,
    hotline: company.hotline.phone,
    tel: company.hotline.tel,
    email: company.email,
    address: company.address,
  };
  return (
    <html lang="vi" className={roboto.variable}>
      <body>
        <a href="#noi-dung" className="skip-link">
          Bỏ qua tới nội dung chính
        </a>
        <ChatProvider config={chatConfig}>{children}</ChatProvider>
      </body>
    </html>
  );
}
