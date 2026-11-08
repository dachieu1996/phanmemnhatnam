"use client";

import { useEffect, useRef, useState } from "react";

/** Đếm số khi vào khung nhìn: "20+" → 0…20+, "~100" → ~0…~100. Giá trị không phải số (24/7, 2008) giữ nguyên. */
export default function CountUp({ value, duration = 1200 }) {
  const m = String(value).match(/^([^\d]*)(\d+)([^\d]*)$/);
  const animatable = m && !/^\d{4}$/.test(value); // không đếm năm
  const target = animatable ? Number(m[2]) : 0;
  const [n, setN] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    if (!animatable || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animatable, target, duration]);

  return <b ref={ref}>{animatable ? `${m[1]}${n}${m[3]}` : value}</b>;
}
