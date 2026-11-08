---
title: "Cài đặt máy trạm"
description: ""
group: "Cài đặt"
order: 5
slug: "cai-dat-may-tram"
source: "gitbooknhatnam-main/workspace/cai-dat/cai-dat-may-tram.md"
---

## **Cài máy trạm mới**

> Nếu máy trạm đã được cài đặt trên máy tính, nhưng bị mất shortcut từ máy chủ có thể bỏ quả mục này, xem chi tiết cách làm ở mục sau.

**Bước 1:** Thao tác tại máy chủ:

* Copy thư mục Ketoan\_Info ở ổ C và file setup.exe trong bộ cài vào thư mục Ketoan trong C:\Program Files (x86)\Ketoan (một số máy là win 32 bit sẽ là C:\Program Files\Ketoan)
* Chuột phải vào thư mục Ketoan (C:\Program Files (x86)\Ketoan) -> properties -> chọn tab Sharing -> Advanced Sharing -> chọn ô Share this folder -> ok

![](https://phanmemnhatnam.com/wp-content/uploads/2018/03/7-1.png)

**Bước 2:** Thao tác tại máy trạm:

* Thao tác xem thư mục Ketoan tại máy chủ tương tự Kiểu thứ nhất -> chạy file setup.exe ở thư mục ketoan -> sent to account ra desktop.
*  Copy thư mục Ketoan\_info vào ổ C.
*  Xóa biểu tượng 1N có tên KETOAN, và xóa thư mục Ketoan tại ổ C:\Program Files (x86)
*  Khởi động lại máy -> xong

## **Mất shortcut từ máy chủ**

**Bước 1:** Click vào My computer (trên desktop) hoặc chọn File explorer ở thanh taskbar -> click This PC (một số máy sẽ là "My computer") -> search \\\tên\_máy\_chủ. Ví dụ máy chủ tên là maychu -> search \\\maychu -> bấm enter.

![](https://phanmemnhatnam.com/wp-content/uploads/2018/03/7.png)

**Bước 2:** Chọn thư mục Ketoan đã được share từ máy chủ -> click chuột phải vào "account" -> chọn sent to -> desktop -> xong
