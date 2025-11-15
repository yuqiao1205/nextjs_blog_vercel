import clientPromise from './mongodb';
import bcrypt from 'bcryptjs';

export const getPosts = async () => {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection('posts').find({}).sort({ created: -1 }).toArray();
  return posts;
};

export const getPostById = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const post = await db.collection('posts').findOne({ id: id });
  return post;
};

export const getUserById = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ id: id });
  return user;
};

export const getUserByEmail = async (email) => {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ email: email });
  return user;
};

export const getUserByUsername = async (username) => {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ username: username });
  return user;
};

const saltRounds = 10;
export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const client = await clientPromise;
  const db = client.db();

  // Get the next id
  const lastUser = await db.collection('users').find({}).sort({ id: -1 }).limit(1).toArray();
  const nextId = lastUser.length > 0 ? (parseInt(lastUser[0].id) + 1).toString() : '1';

  try {
    const result = await db.collection('users').insertOne({
      id: nextId,
      username,
      email,
      password: hashedPassword,
      avatar: '/noavatar.png',
      isAdmin: false,
      created_at: new Date()
    });
    const user = await db.collection('users').findOne({ _id: result.insertedId });
    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const addPost = async (title, body, userId, username, image = '') => {
  const created = new Date().toISOString().split('T')[0];
  const client = await clientPromise;
  const db = client.db();

  // Get the next id
  const lastPost = await db.collection('posts').find({}).sort({ id: -1 }).limit(1).toArray();
  const nextId = lastPost.length > 0 ? (parseInt(lastPost[0].id) + 1).toString() : '1';

  try {
    const result = await db.collection('posts').insertOne({
      id: nextId,
      title,
      body,
      userId,
      username,
      image,
      created
    });
    const post = await db.collection('posts').findOne({ _id: result.insertedId });
    return { success: true, post };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

export const updatePost = async (id, title, body, image = '') => {
  const client = await clientPromise;
  const db = client.db();

  try {
    const result = await db.collection('posts').updateOne(
      { id: id },
      { $set: { title, body, image } }
    );

    if (result.matchedCount === 0) {
      throw new Error('Post not found');
    }

    const post = await db.collection('posts').findOne({ id: id });
    return { success: true, post };
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
};

export const deletePost = async (id) => {
  const client = await clientPromise;
  const db = client.db();

  try {
    const post = await db.collection('posts').findOne({ id: id });
    if (!post) {
      throw new Error('Post not found');
    }

    await db.collection('posts').deleteOne({ id: id });
    return { success: true, post };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};
