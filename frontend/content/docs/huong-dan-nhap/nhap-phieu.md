---
title: "Nhập phân bổ chiết khấu mua hàng"
description: ""
group: "Hướng dẫn nhập"
order: 17
slug: "nhap-phieu"
source: "gitbooknhatnam-main/workspace/huong-dan-su-dung-1/nhap-phieu.md"
---

Có 2 trường hợp chiết khấu khi mua hàng:

## Trường hợp 1: Chiết khấu trực tiếp với hóa đơn tại thời điểm mua.

Vào **Chứng từ** -> **Phiếu Nhập vật tư, hàng hóa, thành phẩm** -> Chọn **kho** -> **Tạo Mới**

Sau khi nhập các mặt hàng vào tab 1. Mặt hàng 

Ta chọn tiếp sang **tab 5. Chiết khấu: Điền các thông số cần thiết và bấm Lưu số liệu là xong.**

Chương trình sẽ tự động phân bổ chiết khấu cho từng mặt hàng có trong hóa đơn này.

![](../images/h39.png)

## Trường hợp 2: Chiết khấu khi tổng giá trị mua hàng đạt đến hạn mức.

### Bước 1: Thay đổi tham số phần mềm

Vào **Hệ thống** -> **7. Thay đổi tham số** -> mật khẩu quản trị -> điền vào diễn giải cần tìm là "**sử dụng menu phân bổ chiết khấu**" -> thay **FASLE** ở cột giá trị thành **TRUE**

![](../images/h35.png)

### **Bước 2: Hạch toán hóa đơn chiết khấu**

Vào **Chứng từ** -> **Chứng từ kế toán** -> Chọn **Phiếu khác**

Hạch toán ghi **Nợ** 331/1111 **Có** 156

![](../images/h36.png)

### **Bước 3: Phân bổ chiết khấu cho từng mặt hàng**

Vào menu **Tính toán** -> **4. Phân bổ chiết khấu nhập hàng** 

**Chọn từ ngày đến ngày phân bổ; Chọn Mã kho nhập**

Kiểm tra đúng đủ các thông tin + mặt hàng.

Bấm **PHÂN BỔ** -> **LƯU KẾT QUẢ** -> **KẾT THÚC**

![](../images/h37-1.png)

### Bước 4: Xem số liệu đã được phân bổ

Vào menu **In báo cáo** -> **2. Vật tư** -> **3. Nhật ký xuất vật tư** -> Chọn **thời gian in** -> bấm vào nút **ĐỐI TƯỢNG** để chọn đối tượng khách hàng muốn in -> Bấm **In báo cáo**

**Số tiền phân bổ chiết khấu sẽ được trừ thẳng vào đơn giá vốn xuất**

![](../images/h38.png)
