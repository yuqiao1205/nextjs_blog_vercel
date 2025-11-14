"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './admin.css';

interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  username: string;
  image?: string;
  created: string;
}

const AdminPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (error) {
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle form submission for create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
        setFormData({ title: '', body: '', image: '' });
        setEditingPost(null);
        setShowCreateForm(false);
        fetchPosts(); // Refresh the list
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save post');
      }
    } catch (error) {
      setError('Error saving post');
    }
  };

  // Handle edit
  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      body: post.body,
      image: post.image || ''
    });
    setShowCreateForm(false);
  };

  // Handle delete
  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Post deleted successfully!');
        fetchPosts(); // Refresh the list
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete post');
      }
    } catch (error) {
      setError('Error deleting post');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: '', body: '', image: '' });
    setEditingPost(null);
    setShowCreateForm(false);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return <div className="admin-container">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <h1>Admin Panel - Post Management</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="admin-actions">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="create-btn"
        >
          {showCreateForm ? 'Cancel' : 'Create New Post'}
        </button>
      </div>

      {/* Create/Edit Form */}
      {(showCreateForm || editingPost) && (
        <div className="form-container">
          <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL (optional):</label>
              <input
                type="url"
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Content:</label>
              <textarea
                id="body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                required
                rows={10}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="posts-list">
        <h2>All Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <div className="table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created</th>
                  <th>Content Preview</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td className="image-cell">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="post-thumbnail"
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td className="title-cell">{post.title}</td>
                    <td>{post.username}</td>
                    <td>{post.created}</td>
                    <td className="content-cell">
                      {post.body.length > 50 ? `${post.body.substring(0, 50)}...` : post.body}
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(post)}
                        className="edit-btn"
                        title="Edit post"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="delete-btn"
                        title="Delete post"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => router.push(`/blog/${post.id}`)}
                        className="view-btn"
                        title="View post"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
