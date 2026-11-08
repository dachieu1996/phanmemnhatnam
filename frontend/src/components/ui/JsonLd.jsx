/** Dữ liệu có cấu trúc (schema.org). Escape "<" để không thoát khỏi thẻ script. */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
