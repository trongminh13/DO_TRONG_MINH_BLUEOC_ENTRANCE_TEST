# Task 2: Tổng hai số nguyên lớn nhất

Tính tổng hai số lớn nhất trong một mảng bằng một vòng lặp O(n).

## Chạy thử

```bash
node index.js
```

## Test

12 trường hợp: 9 trường hợp dương (đúp theo đề đề bài, hai phần tử, số
âm, số trùng lặp, sắp xếp tăng/giảm, số đại misture, số 0) cộng thêm 3
trường hợp lỗi (mảng rỗng, một phần tử, không phải mảng).

## Cách hoạt động

- Dùng 2 biến `max1`, `max2` khởi tạo `-Infinity` để xử lý số âm.
- Duyệt mảng một lần: nếu `num > max1` thì dời `max1 → max2`, gán `max1 = num`.
  Còn lại nếu `num > max2` thì cập nhật `max2 = num`.
- Cuối vòng trả về `max1 + max2`.
