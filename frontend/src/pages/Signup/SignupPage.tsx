import { Signup } from '@/components/Signup/Signup.tsx';

const SignupPage = () => {
  return (
    <>
      <div className="flex bg-background min-h-svh p-5 gap-6">
        <div className="bg-accent h-auto w-1/4 rounded-3xl p-10 overflow-hidden">
          <img src="src/assets/task-flow-logo-invert.svg" alt="company logo" />
          <h2 className="text-white font-bold text-4xl my-10">Get started</h2>
          <img src="src/assets/create-account.png" alt="image create account" />
        </div>
        <Signup className="min-h-auto bg-white rounded-3xl w-full p-10"></Signup>
      </div>
    </>
  );
};

export default SignupPage;
