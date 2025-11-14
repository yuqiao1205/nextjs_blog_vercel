import { auth } from "@/lib/auth";
import { handleGithubSignIn } from "@/lib/action";
import LoginForm from "@/components/loginForm/loginForm";
import "./login.css";


const LoginPage = async () => {
  // const session = await auth();
  // console.log("Current session details:", {
  //   user: session?.user,
  //   expires: session?.expires,
  //   authenticated: !!session
  // });

  // if (session) {
  //   return <div>Already logged in</div>;
  // }


  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2 >Login</h2>
        <form action={handleGithubSignIn}>
          <button className="github">Sign in with GitHub</button>
        </form>
        <LoginForm />
      </div>
      </div>
  
  
  );
};

export default LoginPage;
