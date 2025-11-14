// get blog posts use GET method, create post use POST method
import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { auth } from "@/lib/auth";

export const GET = async () => {
  try {
    const { rows: posts } = await sql`SELECT * FROM posts ORDER BY created DESC`;
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
};

// Create new post using POST method
export const POST = async (request: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, body, image } = await request.json();

    if (!title || !body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

    const userId = session.user.id ? parseInt(session.user.id) : null;
    const username = session.user.name || 'Admin';
    const created = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const { rows } = await sql`
      INSERT INTO posts (title, body, userId, username, image, created)
      VALUES (${title}, ${body}, ${userId}, ${username}, ${image || ''}, ${created})
      RETURNING *
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
};
