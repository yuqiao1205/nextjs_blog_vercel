import { register } from '@/lib/action';
import './register.css'
import RegisterForm from '@/components/registerForm/registerForm';

const RegisterPage = () => {
  return (
    <div className='register-container'>
      <div className="register-wrapper">
       <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;