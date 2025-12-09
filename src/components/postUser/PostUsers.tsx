import "./postuser.css";

import { getUserById } from "@/lib/data";

const PostUser = async ({ userId }: { userId: string }) => {
  const user = await getUserById(userId);
  console.log("PostUser user:", user);
  console.log("PostUser userId:", userId);
  console.log("PostUser username:", user?.username);

  return (
    <div className="post-user-container">
      <span className="post-user-title">Author</span>
      <span className="post-username">{user ? user.username : "Unknown"}</span>
    </div>
  );
};

export default PostUser;
