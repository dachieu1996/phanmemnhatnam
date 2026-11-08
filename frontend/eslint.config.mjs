import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    rules: {
      // Xuất tĩnh (output: "export", images.unoptimized) → next/image không tối ưu được gì thêm;
      // ảnh đã có width/height + loading="lazy".
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [".next/**", "out/**", "node_modules/**", "public/**", "content/**"],
  },
];

export default config;
