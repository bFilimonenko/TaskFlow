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

type UserContextType = {
  isAuth: boolean;
  user: User | null;
  userLoading: boolean;
  login: UseMutationResult<any, Error, {
    email: string
    password: string
  }, unknown> | null;
};

export const UserContext = createContext<UserContextType>({
  isAuth: false,
  user: null,
  userLoading: false,
  login: null,
});
