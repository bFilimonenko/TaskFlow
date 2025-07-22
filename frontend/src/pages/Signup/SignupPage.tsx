import { Signup } from '@/components/Signup/Signup.tsx';
import createAccountImg from '/create-account.png';
import logoInvert from '/task-flow-logo-invert.svg';

const SignupPage = () => {
  return (
    <>
      <div className="flex bg-background min-h-svh p-5 gap-6">
        <div className="bg-accent h-auto w-1/4 rounded-3xl p-10 overflow-hidden">
          <img src={logoInvert} alt="company logo" />
          <h2 className="text-white font-bold text-4xl my-10">Get started</h2>
          <img src={createAccountImg} alt="image create account" />
        </div>
        <Signup className="min-h-auto bg-white rounded-3xl w-full p-10"></Signup>
      </div>
    </>
  );
};

export default SignupPage;
