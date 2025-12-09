
import PostCard from '@/components/PostCard/PostCard';
import './blog.css';
import { getPosts } from '@/lib/data';

export const dynamic = "force-dynamic";

const BlogPage = async () => {
    // Fetch posts directly from database using getPosts()
    // This is better than fetching from API route for Server Components
    const posts = await getPosts();

    if (!posts || posts.length === 0) {
        return (
            <div className="blog-container">
                <h2>No posts available</h2>
                <p>Please check back later for new content.</p>
            </div>
        );
    }
  return (
    <div className="blog-container">
        {posts.map((post: any) => (
            <div  className="post" key={post.id}>
                <PostCard post={post} />
            </div>
        ))}
    </div>
  )
}



export default BlogPage;
