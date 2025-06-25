import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export function Login({ className, ...props }: React.ComponentProps<'form'>) {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      validationSchema
        .validate(loginValues)
        .then((valid) => {
          console.log('Validation passed:', valid);
        })
        .catch((error) => {
          console.log('Validation failed:', error);
        });

      const response = await axios.post('http://localhost:3000/auth/login', loginValues, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      console.log(response.data);

    } catch (error) {
      console.error('Помилка під час виконання запиту:', error);

    }
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email Address</Label>
          <Input
            value={loginValues.email}
            onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
            id="email"
            type="email"
            placeholder="youremail@gmail.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            value={loginValues.password}
            onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
            id="password"
            type="password"
            required
          />
        </div>
        <Button onClick={handleSubmit} type="submit" className="w-full " variant="custom">
          Login
          <ArrowRight />
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
