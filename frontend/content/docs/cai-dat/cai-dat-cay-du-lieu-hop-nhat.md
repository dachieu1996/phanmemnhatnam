---
title: "Cài đặt cây dữ liệu hợp nhất"
description: "Hợp nhất báo cáo từ các dữ liệu riêng lẻ"
group: "Cài đặt"
order: 6
slug: "cai-dat-cay-du-lieu-hop-nhat"
source: "gitbooknhatnam-main/workspace/cai-dat/cai-dat-cay-du-lieu-hop-nhat.md"
---

## Vào dữ liệu công ty mẹ để thực hiện báo cáo hợp nhất.

## Bước 1: Thay đổi tham số trong hệ thống 

Vào **Hệ thống** -> 7. **Thay đổi các tham số** -> mật khẩu quản trị

Tại ô Diễn giải cần tìm gõ chữ "hợp nhất" rồi bấm Enter, sẽ hiện ra bảng như sau:

![](../images/h8.png)

Tại dòng **"Có hợp nhất dữ liệu"** đổi ở cột **Giá trị** thành **TRUE**

Tại dòng **"Bảng chọn đơn vị khi hợp nhất dữ liệu..."** đổi ở cột **Giá trị** thành **2**

Sau đó bấm **THOÁT** và thoát hẳn phần mềm ra đăng nhập lại

## Bước 2: Từ điển đơn vị hợp nhất dữ liệu

Vào **Hệ thống** -> **Từ điển hệ thống** -> **Từ điển đơn vị khi hợp nhất dữ liệu**

Bấm **Thêm ->** điền **Số thứ tự ->** chọn **Tên dữ liệu** muốn hợp nhất -> bấm **Chấp nhận**

_**\*Lưu ý: dữ liệu kế toán có thể nằm tập trung tại 1 máy chủ, hoặc nhiều máy chủ khác nhau.**_

![](../images/h9.png)

## Bước 3: In báo cáo hợp nhất

Vào **In báo cáo,** chọn in bất kỳ báo cáo nào tại dữ liệu công ty mẹ, sẽ đều hiện ra các nút tích **Hợp nhất báo cáo** và **Hiện bảng chọn đơn vị**

![](../images/h10.png)

Để in báo cáo hợp nhất, ta tích vào ô **Hợp nhất báo cáo** -> bấm **Thực hiện** để in, sẽ hiện ra bảng chọn các đơn vị muốn hợp nhất, muốn in báo cáo hợp nhất của những đơn vị nào thì tích vào đơn vị đó.

![](../images/h11.png)
