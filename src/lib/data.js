import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const getPosts = async () => {
  const { rows } = await sql`SELECT * FROM posts ORDER BY created DESC`;
  return rows;
};

export const getPostById = async (id) => {
  const { rows } = await sql`SELECT * FROM posts WHERE id = ${parseInt(id)}`;
  return rows[0] || null;
};

export const getUserById = async (id) => {
  const { rows } = await sql`SELECT * FROM users WHERE id = ${parseInt(id)}`;
  return rows[0] || null;
};

export const getUserByEmail = async (email) => {
  const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows[0] || null;
};

export const getUserByUsername = async (username) => {
  const { rows } = await sql`SELECT * FROM users WHERE username = ${username}`;
  return rows[0] || null;
};

const saltRounds = 10;
export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const { rows } = await sql`
      INSERT INTO users (username, email, password, avatar, isAdmin)
      VALUES (${username}, ${email}, ${hashedPassword}, '/noavatar.png', false)
      RETURNING *
    `;
    return { success: true, user: rows[0] };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const addPost = async (title, body, userId, username, image = '') => {
  const created = new Date().toISOString().split('T')[0];

  try {
    const { rows } = await sql`
      INSERT INTO posts (title, body, userId, username, image, created)
      VALUES (${title}, ${body}, ${parseInt(userId)}, ${username}, ${image}, ${created})
      RETURNING *
    `;
    return { success: true, post: rows[0] };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

export const updatePost = async (id, title, body, image = '') => {
  try {
    const { rows } = await sql`
      UPDATE posts
      SET title = ${title}, body = ${body}, image = ${image}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (rows.length === 0) {
      throw new Error('Post not found');
    }

    return { success: true, post: rows[0] };
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
};

export const deletePost = async (id) => {
  try {
    const { rows } = await sql`
      DELETE FROM posts
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    if (rows.length === 0) {
      throw new Error('Post not found');
    }

    return { success: true, post: rows[0] };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};
