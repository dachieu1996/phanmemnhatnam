# CLAUDE.md

Đặc tả gốc: `docs/AGENTS.md` (hợp đồng widget ↔ chatbot API: `docs/CHATBOT_API.md`). Trả lời người dùng bằng tiếng Việt.
Nội dung website sửa trực tiếp trong `frontend/content/` và `frontend/public/` (các đường dẫn `_input/...` trong AGENTS.md tương ứng với chúng).

Kiến trúc hiện tại:
- Repo này **chỉ có frontend**: `frontend/` (Next.js, xuất tĩnh `output: "export"`), tên miền `phanmemnhatnam.com`
  (`frontend/public/CNAME`).
- GitHub Pages để chế độ "Deploy from a branch: main" (không có quyền admin để đổi sang GitHub Actions).
  Nhánh `new-web` = mã nguồn; nhánh `main` = chỉ HTML đã build. Deploy bằng `npm run deploy`
  (`frontend/scripts/deploy.mjs`): build, thêm `.nojekyll`, đẩy `out/` lên `main`. Không commit mã nguồn vào `main`.
- Không có backend trong repo. Bản build Pages đặt `NEXT_PUBLIC_CHAT_API=off`: widget chat trả lời bằng
  cơ sở tri thức trong trình duyệt (`frontend/public/chat-kb.json`, thuật toán ở `frontend/src/lib/localKb.js`).
- Phase sau: chatbot chạy trên server riêng (dự án `E:\NHATNAM\chatbot_NN`), frontend gọi qua `NEXT_PUBLIC_CHAT_API`
  theo hợp đồng `docs/CHATBOT_API.md`. Không đặt key/token vào biến `NEXT_PUBLIC_*`.
- Backend Node.js cũ (Fastify: chuyển tiếp, log, rate limit, admin) đã chuyển sang `E:\NHATNAM\_archive_website_NN`.
- CSS global chuyển từ prototype (`frontend/src/styles/`), không dùng CSS Module.

Kiểm tra sau khi sửa:
- frontend: `npm run lint && npm test && npm run build` (build tự kiểm tra link)
