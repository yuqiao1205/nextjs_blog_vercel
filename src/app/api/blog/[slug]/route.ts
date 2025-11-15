// implement my own API route to return single blog post data based on the slug parameter
import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/data";
import { auth } from "@/lib/auth";

export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  try {
    const post = await getPostById(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
};

// Update post by id using PUT method
export const PUT = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const { title, body, image } = await request.json();

    if (!title || !body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

    const result = await updatePost(slug, title, body, image);
    return NextResponse.json(result.post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
};

// Delete post by id using DELETE method
export const DELETE = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
  try {
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const result = await deletePost(slug);
    return NextResponse.json({ message: 'Post deleted successfully', post: result.post });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
};

// // add new post use POST method
// export const POST = async (request: Request) => {
//   try {
//     const { title, content, author } = await request.json();

//     const newPost = addPost({ title, content, author });

//     return NextResponse.json(newPost, { status: 201 });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
//   }
// };