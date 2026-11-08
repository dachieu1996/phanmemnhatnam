> **Kiến trúc hiện tại:** trình duyệt → website backend Node.js (`/api/chat`, hợp đồng trong tài liệu này) → Chatbot Server riêng (`E:\NHATNAM\chatbot_NN`, hợp đồng `chatbot_NN/API.md`).
>
> **Ghi chú cho dự án Next.js:** mục 1 mô tả cách cấu hình ở bản mẫu tĩnh (`window.NHATNAM_CHAT`). Ở dự án mới, địa chỉ API cấu hình bằng `NEXT_PUBLIC_CHAT_API` (dev `http://127.0.0.1:8000/api`, production `/api`), endpoint là `POST /api/chat` và `POST /api/chat/feedback`. Trường `sources[].url` dùng route mới, không có đuôi `.html` (ví dụ `/kien-thuc/hach-toan-tien-luong-bao-hiem#...`, `/huong-dan/nhap-so-du-dau`). Response có thể thêm trường `tier` (0–3). Phần còn lại (request/response, định dạng `answer`, feedback) giữ nguyên.

# Tích hợp Trợ lý AI (chatbot) với backend

Widget chatbot nằm ở `assets/js/chatbot.js`, giao diện ở cuối file `assets/css/site.css`. Widget có trên trang chủ và trên mọi trang Hướng dẫn, Kiến thức: nút tròn màu vàng ở góc phải, bên dưới.

## 1. Bật kết nối backend

Trên mỗi trang có đoạn cấu hình sau:

```html
<script>
  window.NHATNAM_CHAT = {
    apiUrl: "/api/chat",               // địa chỉ API AI; để trống "" thì chạy chế độ demo
    feedbackUrl: "/api/chat/feedback", // tùy chọn: nhận đánh giá 👍/👎
    hotline: "096.273.1994"            // tùy chọn
  };
</script>
<script src="assets/js/chatbot.js"></script>
```

Với các trang Hướng dẫn và Kiến thức, đoạn cấu hình nằm trong template của `_src/build_site.py`. Sửa ở đó một lần rồi chạy lại `python build_site.py`.

**Khi chưa có backend, hoặc gọi backend bị lỗi:** widget tự trả lời bằng cơ sở tri thức có sẵn trong `assets/js/chat-kb.js`.
- File này gồm 1.132 mục, sinh tự động từ bộ dữ liệu `Dataset_Chatbot`.
- Cách trả lời: tìm câu hỏi gần nhất, so khớp không phân biệt dấu.
- File chỉ được tải khi người dùng mở khung chat.

## 2. API chat: `POST {apiUrl}`

**Request** (JSON):

```json
{
  "message": "Hạch toán tiền lương theo TT133 thế nào?",
  "history": [
    {"role": "user", "content": "câu hỏi trước"},
    {"role": "assistant", "content": "câu trả lời trước"}
  ],
  "page": "/kien-thuc/hach-toan-tien-luong-bao-hiem.html",
  "session_id": "lq3k9x-ab12cd"
}
```

- `history`: tối đa 10 lượt gần nhất.
- `page`: trang người dùng đang xem, để backend ưu tiên ngữ cảnh.
- `session_id`: mã phiên, giữ nguyên trong suốt phiên của tab trình duyệt.

**Response** (JSON, HTTP 200):

```json
{
  "id": "msg_123",
  "answer": "Theo Thông tư 133/2016:\nNợ TK 154 ...\n  Có TK 334 ...",
  "sources": [
    {"title": "Xem: Hạch toán tiền lương – bảo hiểm", "url": "kien-thuc/hach-toan-tien-luong-bao-hiem.html"}
  ],
  "suggestions": ["Trích bảo hiểm theo TT133", "Thuế TNCN khấu trừ từ lương"]
}
```

**Các trường bắt buộc và tùy chọn:**
- `answer`: bắt buộc.
- `id`: tùy chọn, dùng khi gửi đánh giá.
- `sources`: tùy chọn, hiện thành link ở cuối câu trả lời. `url` tương đối tính từ gốc website, hoặc là URL đầy đủ.
- `suggestions`: tùy chọn, hiện thành các nút gợi ý câu hỏi tiếp theo.

**Định dạng nội dung `answer`:** văn bản thuần.
- `\n` để xuống dòng.
- Dòng bắt đầu bằng `- ` hiển thị thành danh sách.
- Dòng bắt đầu bằng 2 dấu cách hiển thị thụt lề (dùng cho dòng "Có").
- `**chữ đậm**` hiển thị in đậm.
- Cụm "Nợ TK 154" / "Có 334" tự được tô thành nhãn Nợ/Có.

**Khi lỗi:** trả mã HTTP khác 200 (hoặc timeout) thì widget tự chuyển sang trả lời bằng cơ sở tri thức, kèm ghi chú.

## 3. API đánh giá (tùy chọn): `POST {feedbackUrl}`

```json
{"message_id": "msg_123", "question": "…", "answer": "…", "rating": "up"}
```

`rating` nhận giá trị `up` hoặc `down`. Nên lưu lại để rà soát và bổ sung dữ liệu huấn luyện.

## 4. Gợi ý phía backend

- **(Đã triển khai khác: truy hồi từ vựng + Qwen3-1.7B LoRA — xem `chatbot_NN/finetune/README.md`.) Đề xuất gốc:** tra cứu `Dataset_Chatbot/rag_knowledge.jsonl` (embedding bge-m3 hoặc multilingual-e5) → nếu độ tương đồng cao thì trả nguyên văn câu trả lời → nếu trung bình thì gửi top 3–5 tài liệu làm ngữ cảnh cho LLM local (Qwen3.5-4B/9B qua llama.cpp hoặc Ollama). Chi tiết xem `Dataset_Chatbot/README.md`.
- **Link nguồn:** trả kèm `sources` trỏ tới các trang `huong-dan/*.html`, `kien-thuc/*.html` để người dùng đọc thêm.
- **Bảo mật:** giới hạn tần suất gọi API (rate limit) theo IP và `session_id`; không ghi log thông tin cá nhân.
- **CORS:** nếu API đặt ở domain khác website, cần bật CORS cho domain của website.
