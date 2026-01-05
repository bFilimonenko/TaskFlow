import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils.ts';
import { ErrorMessage, Field, Formik } from 'formik';
import { ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import * as Yup from 'yup';

export interface ISignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number | null;
  city?: string | null;
}

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name must be at least 2 letters')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Name can only contain Latin letters.',
    )
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Name must be at least 2 letters')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Name can only contain Latin letters.',
    )
    .required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  age: Yup.number().min(18).notRequired(),
  city: Yup.string().notRequired(),
});

export const Signup = ({ className }: ComponentProps<'form'>) => {
  const { signup } = useAuth();
  return (
    <div className={className}>
      <Formik<ISignupForm>
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          age: undefined,
          city: undefined,
        }}
        validationSchema={signupSchema}
        onSubmit={(values, { setSubmitting }) => {
          signup?.mutate(values);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6')}>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create your account</h1>
            </div>
            <div className="flex flex-col sm:grid grid-cols-2 gap-6 items-start">
              <div className="w-full grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="firstName">First Name *</Label>
                </div>
                <Field name="firstName" id="firstName" as={Input} />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <div className="w-full grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="lastName">Last Name *</Label>
                </div>
                <Field name="lastName" id="lastName" as={Input} />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <div className="w-full grid col-span-2 gap-3 relative">
                <Label htmlFor="email">Email Address *</Label>
                <Field name="email" id="email" placeholder="youremail@gmail.com" as={Input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <div className="w-full grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Create Password *</Label>
                </div>
                <Field type="password" name="password" id="password" as={Input} />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <div className="w-full grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="confirm">Confirm Password *</Label>
                </div>
                <Field type="password" name="confirm" id="confirm" as={Input} />
                <ErrorMessage
                  name="confirm"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <div className="w-full grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="age">Age</Label>
                </div>
                <Field type="number" name="age" id="age" as={Input} />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <div className="w-full grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="city">City</Label>
                </div>
                <Field name="city" id="city" as={Input} />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-700  absolute -bottom-5 left-4 text-xs"
                />
              </div>
              <Button type="submit" className="w-full" variant="custom">
                Create
                <ArrowRight />
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
