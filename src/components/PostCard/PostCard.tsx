import './postcard.css';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  body: string;
  image?: string;
  created: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="card-container">
      <div className="top-section">
        <div className="imgContainer">
          {post.image && (
            <Image 
              src={post.image} 
              alt="Card Image" 
              width={400}
              height={300}
              className="card-image"
            />
          )}
          {/* <Image 
            src="/greek salad1.jpg" 
            alt="Card Image" 
            width={400}
            height={300}
            className="card-image"
          /> */}
        </div>
   
      {/* <span className="date">12.12.24</span> */}
      <span className="date">{post.created}</span>
      </div>
      <div className="bottom-section">
        <h1 className="card-title">{post.title}</h1>
        <p className="card-description">
          {post.body}
        </p>
        <Link href={`/blog/${post.id.toString()}`} className="read-more-link">READ MORE</Link>
      </div>
    </div>
  );
};

export default PostCard;
