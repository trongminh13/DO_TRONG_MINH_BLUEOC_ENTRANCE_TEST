import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  postAdded,
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
} from './postsSlice';

const PostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Both title and body are required.');
      return;
    }
    dispatch(postAdded({ title: title.trim(), body: body.trim() }));
    setTitle('');
    setBody('');
    setError('');
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <h2>Add a new post</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        rows="4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  if (status === 'loading') return <p>Loading posts...</p>;
  if (status === 'failed') return <p className="error">Error: {error}</p>;

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <small>Post ID: {post.id}</small>
        </li>
      ))}
    </ul>
  );
};

const PostsView = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectPostsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <section>
      <PostList />
    </section>
  );
};

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>BlueOC Posts</h1>
        <p>React + Redux Toolkit demo using jsonplaceholder API</p>
      </header>
      <main>
        <PostForm />
        <PostsView />
      </main>
    </div>
  );
}
