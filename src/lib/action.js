"use server";
import { signIn,signOut } from "@/lib/auth";
import { getUserByEmail, createUser,getUserByUsername,addPost } from "@/lib/data";


export const handleGithubSignIn = async () => {
  try {
    return await signIn("github");
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
    throw error;
  }
};

export const handleLogout = async () => {
  await signOut();
};




export const register = async (previousState, formData) => {
  "use server";
  const { username, email, password, passwordRepeat } = Object.fromEntries(formData);
  
  try {
    // Validation
    if (!username || !email || !password || !passwordRepeat) {
      return { error: "All fields are required" };
    }

    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }

    // Check if user already exists
    const user = await getUserByEmail(email);
    const usernameTaken = await getUserByUsername(username);
    
    if (user || usernameTaken) {
      return { error: "User already exists" };
    }

    // Create new user
    await createUser(username, email, password);
    return { success: true };
    
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: error.message || "Failed to register user" };
  }
};



export const login = async (previousState, formData) => {
  "use server";
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/", // Redirect to home page after successful login
    });
  } catch (error) {
    console.error("Error logging in user:", error);

    if (error.message?.includes("Wrong credentials")) {
      return { error: "Invalid username or password" };
    }
    
    // Handle other potential errors
    throw error;
  }
};

export const createNewPost = async (previousState, formData) => {
  "use server";
  const { title, content, authorId } = Object.fromEntries(formData);

  try {
    // Validation
    if (!title || !content || !authorId) {
      return { error: "All fields are required" };
    }

    // Create new post
    await addPost(title, content, authorId);
    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: error.message || "Failed to create post" };
  }
};  
