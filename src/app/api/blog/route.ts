// get blog posts use GET method, create post use POST method
import { NextResponse } from "next/server";
import { getPosts, addPost } from "@/lib/data";
import { auth } from "@/lib/auth";

export const GET = async () => {
  try {
    const posts = await getPosts();
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

    const userId = session.user.id || null;
    const username = session.user.name || 'Admin';

    const result = await addPost(title, body, userId, username, image);

    return NextResponse.json(result.post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
};
