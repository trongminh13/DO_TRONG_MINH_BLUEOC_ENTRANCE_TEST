# Task 3: Ứng dụng React-Redux hiển thị bài viết

Một ứng dụng nhỏ dùng React + Redux Toolkit để lấy danh sách bài viết từ
`https://jsonplaceholder.typicode.com/posts`, hiển thị ra giao diện,
và cho phép người dùng thêm bài viết mới qua thành phần `PostForm`.

## Công nghệ

- **React 18** với hooks và cú pháp ES6+
- **Redux Toolkit** (`createSlice`, `createAsyncThunk`) quản lý state + gọi API
- **react-redux** cung cấp `<Provider>` và hooks (`useDispatch`, `useSelector`)
- **Vite** làm dev server / bundler

## Cấu trúc thư mục

```
task-3/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx               # Entry, gắn <Provider store={store}>
    ├── store.js               # configureStore
    ├── App.jsx
    ├── styles.css
    └── features/posts/
        ├── postsSlice.js      # state, reducers, async thunk
        └── PostsView.jsx      # PostList + PostForm
```

## State

```js
{
  posts: {
    items: [{ id, title, body, userId }, ...],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string,
  }
}
```

## Cách hoạt động

- Khi trang load, `PostsView` gửi action `fetchPosts()` — một
  `createAsyncThunk` thực hiện `fetch(API_URL)` và trả về mảng JSON.
- `postsSlice` xử lý 3 trạng thái `pending` / `fulfilled` / `rejected`
  để cập nhật `status`, `items` và `error`.
- `PostForm` gửi action đồng bộ `postAdded`. Một hàm `prepare` tạo `id`
  cục bộ (vì API jsonplaceholder là **read-only**, không thể POST thực sự),
  nên bài viết mới chỉ hiện trong giao diện ngay lập tức.
- Các selector (`selectAllPosts`, `selectPostsStatus`, `selectPostsError`)
  được dùng trong component thông qua `useSelector`.

> **Lưu ý:** API jsonplaceholder không hỗ trợ ghi thực sự, nên các bài viết
> mới chỉ được thêm vào state Redux cục bộ (optimistic update).

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Mở trình duyệt tới http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```
