/** Bỏ dấu tiếng Việt, chữ thường: "Đăng nhập" → "dang nhap". Dùng cho tìm kiếm, lọc bảng, chatbot dự phòng. */
export function stripAccents(s) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

/** Bỏ dấu + chỉ giữ chữ/số, gộp khoảng trắng. */
export function norm(s) {
  return stripAccents(s).replace(/[^a-z0-9]+/g, " ").trim();
}

/** Tạo id/anchor không dấu: "1. Số dư tài khoản:" → "1-so-du-tai-khoan". */
export function slugify(s) {
  return norm(s).replace(/\s+/g, "-");
}
