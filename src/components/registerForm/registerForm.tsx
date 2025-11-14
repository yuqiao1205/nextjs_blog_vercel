"use client";

import "./registerForm.css";
import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
import { use, useActionState, useEffect } from "react";
import Link from "next/link";

const RegisterForm = () => {


    // formAction 用于处理表单提交，state 包含表单的当前状态（如加载中、错误信息等）
    // register 是一个server action，用于处理注册逻辑,第二个参数暂时不需要传递任何数据所以是 undefined
    // 当调用register，也需要传之前的表单状态previousState，以便在注册过程中保留之前的状态信息（如错误消息等）
    // 在register后端实现里再增加一个参数 previousState，用于接收之前的表单状态
    const [state,formAction] = useActionState(register,undefined);

    const router =  useRouter();

    useEffect(() => {
      if (state?.success) {
        router.push("/login");
      }
    }, [state?.success, router]);

  return (
    <form className='form' action={formAction}>
              <input type="text" placeholder="username" name="username" />
              <input type="email" placeholder="email" name="email" />
              <input type="password" placeholder="password" name="password" />
              <input type="password" placeholder="repeat password" name="passwordRepeat" />
              <button>Register</button>
              {state?.error && <p className="error">{state.error}</p>}
                {state?.success && <p className="success">✅ User registered successfully!</p>}
              <Link href="/login">Already have an account? <b>Login</b></Link>
            </form>
  );
};

export default RegisterForm;