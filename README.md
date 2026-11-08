# Website Phần mềm kế toán Nhất Nam

Website tĩnh viết bằng Next.js 16 (`output: "export"`), deploy lên **GitHub Pages** tại https://phanmemnhatnam.com.

| Thư mục | Nội dung |
|---|---|
| `frontend/` | Mã nguồn Next.js: trang chủ, 29 bài Hướng dẫn, 35 trang Kiến thức, widget Trợ lý |
| `frontend/content/` | Nội dung: `site.json` (trang chủ), `docs/` (hướng dẫn, markdown), `knowledge/` (kiến thức) |
| `frontend/public/` | Ảnh, `chat-kb.json` (cơ sở tri thức của widget chat), `CNAME` (tên miền) |
| `docs/` | Đặc tả gốc `AGENTS.md`, hợp đồng API chatbot `CHATBOT_API.md` (dùng ở phase sau) |
| `frontend/scripts/deploy.mjs` | `npm run deploy`: build rồi đẩy bản build lên nhánh `main` (GitHub Pages) |

**Hai nhánh:** `new-web` chứa mã nguồn (nhánh làm việc hằng ngày). `main` chỉ chứa HTML đã build mà
GitHub Pages phục vụ (chế độ "Deploy from a branch"). Không sửa tay nhánh `main`.

## Chạy ở máy cá nhân

```bash
cd frontend
npm install                       # lần đầu
copy .env.example .env.local      # lần đầu (Windows; macOS/Linux dùng cp)
npm run dev                       # http://localhost:3000
```

| Lệnh (trong `frontend/`) | Việc |
|---|---|
| `npm run build` | xuất tĩnh ra `frontend/out/` và kiểm tra link |
| `npm start` | xem thử bản build trong `out/` tại http://localhost:3000 |
| `npm run lint` / `npm test` | ESLint / test |

## Deploy

Mỗi lần thay đổi:

```bash
# trên nhánh new-web, đã commit và push mã nguồn
cd frontend
npm run deploy               # lint + test + build + đẩy bản build lên main
npm run deploy -- --dry-run  # (tùy chọn) làm hết các bước nhưng không push
```

Script tự làm những việc dễ quên:
- build với `NEXT_PUBLIC_CHAT_API=off` và `NEXT_PUBLIC_SITE_URL=https://phanmemnhatnam.com` (bỏ qua `.env.local`);
- thêm `.nojekyll` (thiếu file này GitHub Pages bỏ thư mục `_next/`, site mất CSS/JS);
- giữ `CNAME` để giữ tên miền;
- từ chối chạy nếu còn thay đổi chưa commit, để mỗi bản deploy ứng với một commit nguồn (`Deploy new-web@<sha>`).

Sau 1–2 phút site cập nhật. Site đi qua Cloudflare: nếu vẫn thấy bản cũ, xóa cache Cloudflare.
Quay lại bản trước: `git revert` commit deploy mới nhất trên `main` rồi push.

## Widget chat

- Hiện tại (`NEXT_PUBLIC_CHAT_API=off`): trả lời ngay trong trình duyệt bằng cách so khớp câu hỏi với
  `frontend/public/chat-kb.json` (`frontend/src/lib/localKb.js`). Không cần server, không ghi log, nút 👍/👎 không lưu.
- Phase sau: dựng chatbot server riêng theo hợp đồng `docs/CHATBOT_API.md`, rồi đổi `NEXT_PUBLIC_CHAT_API`
  trong `frontend/scripts/deploy.mjs` thành URL HTTPS của server. Server phải cho phép CORS từ `https://phanmemnhatnam.com`.
  Nếu server lỗi, widget tự quay về `chat-kb.json`.
- Mọi biến `NEXT_PUBLIC_*` đều lộ ra trình duyệt: **không** đặt key hay token vào đó.

## Cập nhật nội dung
- **Trang chủ**: `frontend/content/site.json`
- **Hướng dẫn**: `frontend/content/docs/<nhóm>/<bài>.md` + `nav.json`, ảnh ở `frontend/public/docs-images/`
- **Kiến thức**: `frontend/content/knowledge/*.json`
- **Câu trả lời của widget chat**: `frontend/public/chat-kb.json`

Sửa xong: commit và push lên `new-web`, rồi `npm run deploy`.

## Ghi chú
- CSS chuyển gần như nguyên văn từ bản mẫu thành các file global (`frontend/src/styles/`), không dùng CSS Module.
- Nhãn bút toán theo AGENTS.md 4.1: **Nợ** nền navy chữ trắng, **Có** nền vàng nhạt.
- 6 ảnh cũ trên `phanmemnhatnam.com/wp-content/...` đã 404 nên được ẩn tự động.
