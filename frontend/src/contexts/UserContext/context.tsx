import { createContext } from 'react';

type UserContextType = {
  isAuth: boolean;
  user: any;
  userLoading: boolean;
  login: any;
};

export const UserContext = createContext<UserContextType>({
  isAuth: false,
  user: null,
  userLoading: false,
  login: () => {},
});
