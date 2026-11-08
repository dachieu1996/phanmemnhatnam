---
title: "Sử dụng menu Tiện ích"
description: ""
group: "Hướng dẫn tiện ích"
order: 25
slug: "su-dung-thanh-menu-tien-ich"
source: "gitbooknhatnam-main/workspace/huong-dan-tien-ich/su-dung-thanh-menu-tien-ich.md"
---

## THAO TÁC VỚI MENU TIỆN ÍCH

### I. LỌC CHỨNG TỪ KẾ TOÁN:

Chọn thời gian “Từ tháng”, “Đến tháng”, sau đó theo _T.K nợ hay T.K có_. Nếu không nhập tài khoản nợ, tài khoản có thì chương trình sẽ lọc toàn bộ các tài khoản.

**Lọc theo các bút toán:**

**+ Bút toán không trùng**_**:**_ Là các bút toán mà chương trình đã xử lý không còn trùng lặp

**+ Bút toán trùng**_**:**_ Là các bút toán nhập trùng lặp. Ví dụ như phần hành tiền mặt nhập phiếu chi mua vật tư định khoản nợ tài khoản tiền mặt/ có tài khoản vật tư, sau đó phần hành vật tư nhập phiếu nhập vật tư cũng có định khoản này thì chương trình sẽ cho biết chứng từ nào bị loại bỏ (tức là sẽ không lấy vào báo cáo tài chính).

**+ Cả hai bút toán**_**:**_ Cả hai bút toán trùng và không trùng.

**+ Bút toán sai tài khoản**_**:**_ Là các phát sinh mà tài khoản không có trong hệ thống tài khoản hoặc tài khoản hạch toán chưa đến cấp thấp nhất.

\+ Nút chọn “**Không xét đối tượng**”: ở dưới nút lệnh tìm kiếm sẽ là danh sách để lọc với các chứng từ đã nhập đối tượng như thế nào.

### 2. KIỂM TRA CHÊNH LỆCH CÁC TÀI KHOẢN:

Sử dụng chức năng này để đối chiếu, kiểm tra tìm ra các bút toán hạch toán sai hoặc chưa hạch toán (đây là ưu điểm của phần mềm giúp kế toán tìm ra các vấn đề chưa hợp lý trong hạch toán và xử lý số liệu).

Cho biết giữa các tài khoản chênh lệch như thế nào và chi tiết nào. Từ đây kế toán sẽ đối chiếu chi tiết để tìm ra các bút toán hạch toán sai hoặc chưa hạch toán. Nếu muốn xem chi tiết phát sinh bấm vào nút tích “Chọn in” của dòng đó, sau đó bấm nút “Chi tiết”

### **3. SAO CHÉP DỮ** **LIỆU (BACKUP)**

\- Việc sao chép dữ liệu thường xuyên là cực kỳ quan trọng, sau khi sao chép xong nên copy ra ổ lưu bên ngoài và cất đi. Sau này khi dữ liệu có vấn đề hoặc mất (do nhiều nguyên nhân như ổ cứng hỏng, cài đặt hệ thống sai, hoặc thậm chí mất trộm cả máy tính …) thì phục hồi lại.

\- Nếu muốn sao chép nhiều dữ liệu cùng 1 lúc bấm nút “…” ở ô chọn “Tên dữ liệu”

\- Mặc định nơi lưu là D:\Backup\_Ketoan nếu muốn lưu sang nơi khác bấm ‘…’ ở bên phải ô “Nơi lưu backup”

\- Tên file backup: mặc định là tên dữ liệu, phía cuối là năm + tháng + ngày

\- Số ngày thông báo: mặc định là 5, kế toán có thể thay số ngày này theo như ý muốn. Khi quá số ngày này thì khi kết thúc chương trình sẽ hiện màn hình này để thông báo.

### **4. SAO CHÉP SỐ** **LIỆU SANG CƠ SỞ DỮ LIỆU KHÁC**

Tiện ích -> Sao chép số liệu sang cơ sở dữ liệu khác

![](https://phanmemnhatnam.com/wp-content/uploads/2018/03/1-2.png)

Khi hiện bảng dữ liệu cần sao chép, đánh dấu các dòng được sao chép xong bấm “**Copy**” sau đó bấm “**Paste**” sẽ hiện màn hình để chọn dữ liệu đích cần copy đến

![](https://phanmemnhatnam.com/wp-content/uploads/2018/03/1-4.png)

**Lưu ý:** Nếu copy dữ liệu tại máy trạm thì **Tên Server** là tên của Máy chủ

Nếu tích vào “Khi copy dữ liệu thì copy luôn từ điển” thì các **mã đối tượng** có trong dữ liệu nguồn mà không có trong dữ liệu đích sẽ được copy.

### **4. DANH SÁCH SỐ PHIẾU TỰ ĐỘNG ĐÃ TẠO**

Khi muốn số phiếu tự động bắt đầu từ bao nhiêu thì vào tiện ích này

Chọn phần hành, bấm nút “Sửa” và cho số phiếu trên cùng có số thứ tự nhỏ hơn 1 đơn vị

### **5. NHẬT KÝ SỬ DỤNG, CHỨNG TỪ XÓA SỬA**

Ghi lại nhật ký sử dụng. Muốn ghi lại bao nhiêu dòng thì vào “Thay đổi tham số” -> “Ghi nhật ký số dòng tối đa” mặc định là 500

Trong danh sách các chứng từ xóa, sửa, nếu muốn phục hồi lại chứng từ nào thì bấm nút copy sau đó bấm nút paste và sẽ xóa chứng từ đó khỏi danh sách này.

### **6. TẠO LẠI SỐ PHIẾU**

Trong quá trình nhập chứng từ, có thể số phiếu chưa có hoặc việc đánh số phiếu chưa ưng ý. Muốn tạo lại số phiếu thì chọn tiện ích này

![](https://phanmemnhatnam.com/wp-content/uploads/2018/03/1-5.png)

Điền vào ô **Tiếp đầu số phiếu** (nếu có) ví dụ phiếu chi sẽ có tiếp đầu là PC

Điền vào ô **Bắt đầu từ số** (bắt buộc) ví dụ phiếu chi bắt đầu từ số 1

-> chương trình sẽ tự động đánh số phiếu cho các chứng từ phiếu chi từ PC001 - PC999

Muốn đánh lại số phiếu của loại chứng từ nào thì **tích vào ô** loại chứng từ đó -> bấm **Thực hiện**
