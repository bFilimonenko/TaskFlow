import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { ErrorMessage, Field, Formik } from 'formik';
import { ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

interface ILoginForm {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export function Login({ className, ...props }: ComponentProps<'form'>) {
  const { login } = useAuth();

  return (
    <Formik<ILoginForm>
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        login?.mutate(values);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email Address</Label>
              <Field name="email" id="email" placeholder="youremail@gmail.com" as={Input} />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Field id="password" type="password" name="password" as={Input} />
              <ErrorMessage name="password" component="div" />
            </div>
            <Button type="submit" className="w-full" variant="custom">
              Login
              <ArrowRight />
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <NavLink to="/signup" className="underline underline-offset-4">
              Sign up
            </NavLink>
          </div>
        </form>
      )}
    </Formik>
  );
}
