---
title: "Phiếu nhập - xuất thẳng vật tư"
description: ""
group: "Hướng dẫn nhập"
order: 10
slug: "phieu-nhap-xuat-thang-vat-tu"
source: "gitbooknhatnam-main/workspace/huong-dan-su-dung-1/phieu-nhap-xuat-thang-vat-tu.md"
---

## Bước 1: Thay đổi tham số

Vào Hệ thống -> Thay đổi tham số -> mật khẩu quản trị -> search những tham số sau:

| Tại ô diễn giải cần tìm -> SEARCH -> bấm enter | Thay đôi cột GIÁ TRỊ                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| Có sử dụng menu phiếu nhập xuất thẳng          | False -> True                                                         |
| Cột đối tượng trong phiếu nhập xuất            | False -> True                                                         |
| Cho sửa tài khoản khi xuất vật tư              | False -> True                                                         |
| Tài khoản vật tư                               | <p>Thêm tài khoản 1541 (Theo TT133), </p><p>hoặc 621 (Theo TT200)</p> |

## Bước 2: Chứng từ -> Phiếu nhập xuất thẳng vật tư

Vào **Chứng từ** -> **Phiếu nhập - xuất thẳng vật tư** -> Chọn **Kho** (có thể tạo thêm kho nhập xuất thẳng để phân biệt với các kho khác) -> bấm **Mới**

* Tài khoản có ghi 331 hoặc 111
* Tài khoản nợ ghi 1541 (nếu theo TT133) hoặc 621 (nếu theo TT200)

![](../images/h43.png)

## Bước 3: Xem báo cáo

Vì là Nhập - Xuất thẳng nên khi hạch toán sẽ không đi qua tài khoản 152, 156, 155, 153. 

Mà xuất từ **tài khoản thanh toán** đến thẳng **tài khoản chi phí** là **Có 111,331.. và Nợ 1541,621**

Nên khi xem cân đối nhập - xuất - tồn, ta **Chọn tài khoản** là **1541** hoặc **621 -> Bấm THỰC HIỆN**
