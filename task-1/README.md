# Task 1: Tần suất độ dài chuỗi

Tìm các chuỗi có độ dài xuất hiện **nhiều nhất** trong một mảng.

## Chạy thử

```bash
node index.js
```

## Test

8 trường hợp kiểm tra bao gồm: mảng rỗng, tất cả cùng độ dài, một phần tử,
độ dài thắng rõ, độ dài dài hơn thắng, chuỗi rỗng `""`, và
đúp theo đề đề bài.

## Cách hoạt động

1. Đếm số lần xuất hiện của từng độ dài (`counts[length]++`).
2. Tìm giá trị đếm lớn nhất (`maxCount`).
3. Lấy ra **tập hợp** các độ dài có số lần bằng `maxCount`.
4. Lọc mảng gốc, giữ lại các phần tử thuộc nhóm độ dài này.
