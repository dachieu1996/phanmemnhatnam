---
title: "Nhập định mức nguyên vật liệu cho đơn vị sản xuất theo TT200"
description: ""
group: "Hướng dẫn nhập"
order: 14
slug: "nhap-dinh-muc-nguyen-vat-lieu-cho-don-vi-san-xuat"
source: "gitbooknhatnam-main/workspace/huong-dan-su-dung-1/nhap-dinh-muc-nguyen-vat-lieu-cho-don-vi-san-xuat.md"
---

## Bước 1: Thay đổi tham số

Vào Hệ thống -> Thay đổi tham số -> mật khẩu quản trị -> search những tham số sau:

| Tại ô diễn giải cần tìm -> SEARCH -> bấm enter | Thay đôi cột GIÁ TRỊ |
| ---------------------------------------------- | -------------------- |
| Loại giá thành                                 | Điền số 3            |
| Quan hệ giữa mã vật tư và mã sản phẩm          | Điền số 3            |

## Bước 2: Tạo mã các thành phẩm

* Vào menu **Hệ thống** -> **Từ điển hệ thống** -> **Từ điển vật tư** -> Bấm **THÊM** 
* Khai báo các mã thành phẩm, ghi **tài khoản 155**, ghi **tài khoản doanh thu thành phẩm 5112** và **giá vốn thành phẩm 6323** (tự mở thêm tài khoản chi tiết này) .

![](../images/h44.png)

## **Bước 3: Nhập định mức**

* Vào menu **Số dư** -> **Định mức nguyên vật liệu và sản lượng sx** ->bấm **SỬA**

### 3.1 Tab 1. **ĐỊNH MỨC**

* Chọn thành phẩm, thêm các vật tư cần để sản xuất thành phẩm ở phần khung bên cạnh
* Đơn giá và trị giá sau khi tính toán sẽ tự nhảy ra, ở đây chỉ cần điền số lượng.

![](../images/h45.png)

### 3.2 Tab 2. Sản lượng sản xuất 

* Điền thời gian sản xuất thành phẩm, Ví dụ: 31/01/2019 rồi bấm ENTER
* Cuối tháng 1 mới làm phiếu xuất, thì điền thời gian là 31/01/2019 sau khi ấn enter -> các mã thành phẩm sẽ hiện ra ở khung bên kia, và điền sản lượng dự tính vào cột sản lượng.
* Chọn nút **TÍNH ĐỊNH MỨC**. Chọn khoảng thời gian để tính.

![](../images/h46.png)

## **Bước 4:** Phiếu xuất vật tư vào sản xuất

Sau đó vào menu **TÍNH TOÁN -> TÍNH SỐ DƯ CUỐI THÁNG** -> Tính toán thời gian vừa tính trong định mức

Chương trình sẽ **tự động tạo** ra **Phiếu xuất tư vào sản xuất** dựa trên **định mức** ứng với từng công trình thành phẩm

![](../images/h50.png)

## **Bước 5: Kết chuyển công trình** 

* Vào menu **TÍNH TOÁN** -> **KẾT CHUYỂN CÔNG TRÌNH, HỢP ĐỒNG, SẢN PHẨM** **-> Sửa tài khoản**
* Đặt kết chuyển tự động cho các tài khoản **621,622,623,627** kết chuyển sang **154**

## **Bước 6:** In bảng tính giá thành

* Vào menu **IN BÁO CÁO -> GIÁ THÀNH SẢN PHẨM SẢN XUẤT -> BẢNG TÍNH GIÁ THÀNH SẢN XUẤT**
* Tích vào ô **TẠO PHIẾU NHẬP KHO THÀNH PHẨM** (nếu muốn nhập kho thành phẩm tự động), bấm **IN BÁO CÁO**

_**\*Lưu ý: Phiếu nhập kho thành phẩm sẽ được tạo theo ngày/tháng/năm cuối cùng in báo cáo.**_  
_**Ví dụ: In báo cáo từ tháng 01/2019 đến 01/2019, phiếu nhập sẽ tạo vào 31/01/2019**_  
_**Còn in báo cáo từ tháng 01/2019 đến 02/2019, phiếu nhập của tháng 1 sẽ bị xóa và gộp vào phiếu ngày 28/02/2019**_ 

![](../images/h48.png)

#### **VỀ PHIẾU NHẬP KHO THÀNH PHẨM**

Vào menu **Chứng từ -> Phiếu nhập vật tư hàng hóa, thành phẩm** -> chọn kho **Thành phẩm**

![](../images/h51.png)

Muốn xuất bán luôn các phiếu nhập này, chọn nút _XUẤT BÁN_ -> chương trình sẽ cho ra 1 phiếu xuất bán hết số lượng thành phẩm đã nhập -> Lưu số liệu.

Sau khi xuất bán, phần mềm sẽ tự động tạo phiếu XUẤT GIÁ VỐN ghi có 155/nợ 6323.
