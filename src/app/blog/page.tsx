
import { baseUrl } from '@/lib/base';
import PostCard from '@/components/PostCard/PostCard';
import './blog.css';
import { getPosts } from '@/lib/data';
import { url } from 'inspector';

// const baseUrl = "";

export const dynamic = "force-dynamic";

    // {
    //     "_id": "6917f1e94983ec5eb63587e9",
    //     "id": "6",
    //     "title": "Robot world",
    //     "body": "Eploring robot",
    //     "userId": "2",
    //     "username": "Admin",
    //     "image": "https://images.pexels.com/photos/8849289/pexels-photo-8849289.jpeg",
    //     "created": "2025-11-13"
    // },


interface Post {
    id: string;
    title: string;
    body: string;
    image?: string;
    created?: string;
    userId?: string;
    username?: string;
}

// Fetch posts data from external API网站。
const getData = async () => {
    try {
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        //     cache: 'no-store'
        // });

         const res = await fetch(`${baseUrl}/api/blog`, {
             cache: 'no-store'
         });

        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error('Invalid posts data format');
            return [];
        }

        // Ensure each post has required fields
        //这一步确保每个 post：
	   // id 一定是字符串类型（可能后续用在 URL 路径里）
	   // 如果缺少 title 或 body，就填上默认值

    // {
    //     "_id": "6917f1e94983ec5eb63587e9",
    //     "id": "6",
    //     "title": "Robot world",
    //     "body": "Eploring robot",
    //     "userId": "2",
    //     "username": "Admin",
    //     "image": "https://images.pexels.com/photos/8849289/pexels-photo-8849289.jpeg",
    //     "created": "2025-11-13"
    // },

       return data.map(post => ({
            id: post.id.toString(),
            title: post.title || 'Untitled',
            body: post.body || 'No content available',
            image: post.image || '',
            created: post.created || '',
        }));
    } catch (error) {
        console.error('Error fetching posts 2:', error);
        return []; // Return empty array if fetch fails
    }
};

const BlogPage = async () => {
    // Fetch posts data from external API网站
    const posts = await getData();
    // 获取data用我自己创建的lib文件夹下的getData函数
    // const posts = getPosts();

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
        {posts.map((post) => (
            <div  className="post" key={post.id}>
                <PostCard post={post} />
            </div>
        ))}
    </div>
  )
}



export default BlogPage;
