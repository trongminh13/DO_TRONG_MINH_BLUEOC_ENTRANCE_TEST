# Task 3: React-Redux Posts App

A small React + Redux Toolkit application that fetches posts from
`https://jsonplaceholder.typicode.com/posts`, displays them, and lets the
user add new posts through a `PostForm` component.

## Stack

- **React 18** with hooks and ES6+
- **Redux Toolkit** (`createSlice`, `createAsyncThunk`) for state + API calls
- **react-redux** for `<Provider>` and hooks (`useDispatch`, `useSelector`)
- **Vite** as the dev server / bundler

## Project structure

```
task-3/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx               # App entry, mounts <Provider store={store}>
    ├── store.js               # configureStore
    ├── App.jsx
    ├── styles.css
    └── features/posts/
        ├── postsSlice.js      # state, reducers, async thunk
        └── PostsView.jsx      # PostList + PostForm components
```

## State shape

```js
{
  posts: {
    items: [{ id, title, body, userId }, ...],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string,
  }
}
```

## How it works

- On mount, `PostsView` dispatches `fetchPosts()` — a `createAsyncThunk` that
  performs `fetch(API_URL)` and returns the JSON array.
- The `postsSlice` handles `pending` / `fulfilled` / `rejected` actions and
  updates `status` and `items` accordingly.
- `PostForm` dispatches the synchronous `postAdded` action. A `prepare`
  callback generates a local `id` (the API is read-only) so the new post is
  shown immediately at the top of the list.
- Selectors (`selectAllPosts`, `selectPostsStatus`, `selectPostsError`) are
  used by components via `useSelector`.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```
