import CountUp from "@/components/ui/CountUp";

// Số liệu ẩn khỏi trang chủ (theo nhãn trong site.json)
const HIDDEN = new Set(["Nhân viên chính thức"]);

export default function Stats({ stats }) {
  const items = stats.filter((s) => !HIDDEN.has(s.label));
  return (
    <div className="stats">
      <div className="container">
        <div className={`grid n${items.length}`}>
          {items.map((s) => (
            <div className="stat" key={s.label}>
              <CountUp value={s.value} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
