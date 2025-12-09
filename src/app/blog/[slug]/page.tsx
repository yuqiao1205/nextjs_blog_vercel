import Image from "next/image";
import './singlePost.css';
import Link from "next/link";
import { getPostById } from "@/lib/data";

interface Post {
  id: string;
  title: string;
  body: string;
  image?: string;
  created?: string;
  userId?: string;
  username?: string;
}

// 实现动态metadata的title和描述
export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 150),
  };
};

const SinglePostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // ✅ Unwrap params (required in Next.js 15+)
  const { slug } = await params;

  if (!slug) {
    return (
      <div className="singlepage-container">
        <h1>Invalid post ID</h1>
        <Link href="/blog">Back to Blog</Link>
      </div>
    );
  }

  // Fetch post data directly from database
  const post = await getPostById(slug);

  if (!post) {
    return (
      <div className="singlepage-container">
        <h1>Post not found</h1>
        <Link href="/blog">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="singlepage-container">
      <div className="img-container">
        {post.image && (
          <Image
            src={post.image}
            alt="Blog Image"
            width={800}
            height={600}
            className="image"
            priority
          />
        )}
        {/* <Image
          src="/greek salad1.jpg"
          alt="Blog Image"
          width={800}
          height={600}
          className="image"
          priority
        /> */}
      </div>
      <div className="text-container">
        <h1 className="singlepage-title">{post.title}</h1>
        <div className="singlepage-details">
      
          <Image src="/noavatar.png" alt="Author" width={30} height={30} className="author-image" />
          <div className="details-text">
            <span className="detail-title">Author</span>
            <span className="detail-value">{post.username || "Unknown"}</span>
          </div>
          <div className="details-text">
            <span className="detail-title">Published</span>
            <span className="detail-value">{post.created}</span>
          </div>
        </div>
        <p className="singlepage-content">{post.body}</p>
      </div>
    </div>
  );
};

// ✅ Static params for SSG
// export async function generateStaticParams() {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       next: { revalidate: 3600 } // Cache for 1 hour
//     });

//     if (!res.ok) throw new Error('Failed to fetch posts for static params');
 
//     const posts = await res.json();
//     if (!Array.isArray(posts)) return [];

//     return posts.map(post => ({
//       slug: post.id.toString(),
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

export default SinglePostPage;
