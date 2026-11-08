/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false, // ẩn nút chữ "N" của Next.js khi chạy npm run dev
};

export default nextConfig;
