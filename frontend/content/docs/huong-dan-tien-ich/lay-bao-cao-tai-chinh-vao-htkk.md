---
title: "Lấy Báo cáo tài chính vào HTKK"
description: ""
group: "Hướng dẫn tiện ích"
order: 27
slug: "lay-bao-cao-tai-chinh-vao-htkk"
source: "gitbooknhatnam-main/workspace/huong-dan-tien-ich/lay-bao-cao-tai-chinh-vao-htkk.md"
---

**Bước 1.** Trước tiên tạo 1 thư mục chứa dữ liệu thuế như Thue200 (hoặc Thue133) **tên của thư mục phải viết liền không dấu**

**Bước 2.** Vào HTKK, chọn TT200 (hoặc TT133-B01a), **nhớ bỏ dấu tích LCTTGT**

* Bấm nút Kết xuất XML
* Nếu có thông báo lỗi -> Thì nhập số 1 vào dòng tài sản (1. Tiền) và số 1 vào 1 dòng nguồn vốn (- Cổ phiếu phổ thông)
* Sau đó bấm nút **Kết xuất XML.** Chọn nơi lưu là **thư mục vừa tạo ở bước 1** với tên là TT200.xml (đây là file nền đã có thông tin doanh nghiệp). Mỗi công ty đều Kết xuất XML như thế.

**Bước 3.** Chạy phần mềm kế toán -> Vào menu "IN BÁO CÁO" -> chọn "BÁO CÁO TÀI CHÍNH" 

* Chọn nút <img class="inline-icon" src="../images/h30.png" alt="" /> để in từng bảng "Cân đối kế toán", "Lưu chuyển tiền tệ", "Kết quả kinh doanh" 
* Bấm vào biểu tượng   <img class="inline-icon" src="../images/image-1.png" alt="" /> (ghi ra excel) ở góc trái phía trên màn hình 
* Lưu từng báo cáo vào **thư mục vừa tạo** (nhớ đặt tên theo từng báo cáo cho dễ nhớ)

**Bước 4.** Menu “**Tiện ích**” -> “**Xuất XML, chuyển Excel vào phần mềm**”

* Nếu là TT200 chọn ô "**1. Thông tư 200**". Nếu là TT133 thì chọn "**2. Thông tư 133-B01a**"
* Bấm vào <img class="inline-icon" src="../images/h32.png" alt="" /> để chọn file tương ứng

![](../images/h31.png)

**Bước 5.** Sau khi chọn xong bấm “Thực hiện”

**Bước 6.** Sau khi “Thực hiện” xong sẽ tạo ra file XML trong thư mục . Vào HTKK và bấm nút “**Nhập từ XML"**
