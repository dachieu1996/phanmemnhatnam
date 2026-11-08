/* Icon SVG nét mảnh — lấy nguyên từ bản mẫu prototype để giữ đúng giao diện. */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const svg = (children, props = {}, extra = {}) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...S} {...extra} {...props}>
    {children}
  </svg>
);

export const IconPhone = (p) =>
  svg(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />, p);
export const IconMail = (p) => svg(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>, p);
export const IconPin = (p) => svg(<><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, p);
export const IconYoutube = (p) => svg(<><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" /></>, p);
export const IconArrow = (p) => svg(<path d="M5 12h14M13 6l6 6-6 6" />, p, { strokeWidth: 2.2 });
export const IconCheck = (p) => svg(<path d="M5 12l5 5L20 7" />, p, { strokeWidth: 2.4 });
export const IconMenu = (p) => svg(<path d="M3 6h18M3 12h18M3 18h18" />, p);
export const IconChevron = (p) => svg(<path d="m6 9 6 6 6-6" />, p, { strokeWidth: 2.4 });
export const IconSearch = (p) => svg(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>, p);
export const IconInfo = (p) => svg(<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>, p);
export const IconCalendar = (p) => svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>, p, { strokeWidth: 2.2 });
export const IconFileCheck = (p) =>
  svg(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><path d="M9 14l2 2 4-4" /></>, p, { strokeWidth: 2.2 });
export const IconHome = (p) => svg(<><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></>, p);

export const IconSpark = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 2l1.8 5.6L19.5 9l-5.7 1.5L12 16l-1.8-5.5L4.5 9l5.7-1.4zM19 15l.9 2.6L22.5 18l-2.6.9L19 21.5l-.9-2.6L15.5 18l2.6-.4z" />
  </svg>
);
export const IconQuote = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M10 6H5a2 2 0 0 0-2 2v5h5v5h2zm11 0h-5a2 2 0 0 0-2 2v5h5v5h2z" />
  </svg>
);

/* Chatbot */
export const IconChat = (p) =>
  svg(<><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="3" /></>, p);
export const IconClose = (p) => svg(<path d="M18 6 6 18M6 6l12 12" />, p, { strokeWidth: 2.2 });
export const IconReset = (p) => svg(<><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>, p);
export const IconSend = (p) => svg(<path d="M5 12h14M13 6l6 6-6 6" />, p, { strokeWidth: 2.2 });
export const IconUp = (p) => svg(<path d="M7 10v11H3V10zM7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.1 21H7" />, p);
export const IconDown = (p) => svg(<path d="M17 14V3h4v11zM17 14l-4 8a3 3 0 0 1-3-3v-4H4.5a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 5.9 3H17" />, p);
export const IconCopy = (p) => svg(<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>, p);
