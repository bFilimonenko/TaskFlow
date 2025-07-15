import { Login } from '@/components/Login/Login.tsx';
import logoInvert from '/task-flow-logo-invert.svg';
import illustrationLogin from '/illustration-login.webp';

export default function LoginPage() {
  return (
    <div className="h-svh grid lg:grid-cols-2 px-10 py-5 ">
      <div className="bg-accent hidden lg:flex lg:flex-col justify-center p-14 gap-12 rounded-l-3xl h-auto">
        <div className="flex flex-row items-center gap-5">
          <img src={logoInvert} />
          <p className="text-3xl font-bold text-white">TaskFlow</p>
        </div>

        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance text-white">
          Your place to work Plan. Create. Control.
        </h1>

        <img src={illustrationLogin} alt="Image" className="w-auto" />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 items-center justify-center h-auto">
        <Login />
      </div>
    </div>
  );
}
