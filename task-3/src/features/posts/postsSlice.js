import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
  },
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ title, body, userId = 1 }) {
        return {
          payload: {
            id: Date.now(),
            title,
            body,
            userId,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { postAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export default postsSlice.reducer;
