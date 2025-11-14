import "./postUser.css";

import { getUserById } from "@/lib/data";

interface User {
  userId: string;
  username: string;
}

const getData = async (userId: string): Promise<User | null> => {
  if (!userId) {
    console.error('No userId provided');
    return null;
  }

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      cache: 'no-store', // ensures fresh data on every request
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.error(`User with ID ${userId} not found`);
        return null;
      }
      throw new Error(`Failed to fetch user with ID ${userId}`);
    }

    const data = await res.json();
    if (!data || !data.username || data.id === undefined) {
      console.error(`Invalid user data for ID ${userId}`);
      return null;
    }

    return {
      userId: data.id.toString(),
      username: data.username,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

const PostUser = async ({ userId }: { userId: string }) => {
  // fetch user data by using external API
  // const user = await getData(userId);

  // use lib function to get user data
   const user = getUserById(userId);

  return (
    <div className="post-user-container">
      <span className="post-user-title">Author</span>
      <span className="post-username">{user ? user.username : "Unknown"}</span>
    </div>
  );
};

export default PostUser;
