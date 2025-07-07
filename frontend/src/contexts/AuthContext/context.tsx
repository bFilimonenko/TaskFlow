import type { ISignupForm } from '@/components/Signup/Signup.tsx';
import type { UseMutationResult } from '@tanstack/react-query';
import { createContext } from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string | null;
  age: number | null;
  isActive: boolean;
};

type AuthContextType = {
  isAuth: boolean;
  user: User | null;
  userLoading: boolean;
  login: UseMutationResult<
    any,
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  > | null;
  signup: UseMutationResult<any, Error, ISignupForm, unknown> | null;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  userLoading: false,
  login: null,
  signup: null,
});
