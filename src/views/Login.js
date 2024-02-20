import RegistrationForm from '../components/customer/RegistrationForm';
import LoginForm from '../components/customer/LoginForm';

function Login() {
  document.title = `Log In or Sign up`;

  return (
    <div className="flex gap-8 flex-col sm:flex-row max-w-6xl px-5 mx-auto mt-6">
      <div className="basis-1/2 flex flex-col items-center">
        <h2 className="font-semibold my-4 text-2xl">Log In</h2>
        <LoginForm />
      </div>
      <div className="basis-1/2 flex flex-col items-center mt-10 sm:mt-0">
        <h2 className="font-semibold my-4 text-2xl">Sign Up</h2>
        <RegistrationForm />
      </div>
    </div>
  );
}
export default Login;