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
  login: () => void;
};

export const UserContext = createContext<UserContextType>({
  isAuth: false,
  user: null,
  userLoading: false,
  login: () => {},
});
