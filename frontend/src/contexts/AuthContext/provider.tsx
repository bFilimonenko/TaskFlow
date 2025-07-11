import { getMe, loginRequest } from '@/api';
import { signupRequest } from '@/api/auth/signup.ts';
import { APP_PATHS } from '@/app-paths.enum.ts';
import { AuthContext } from '@/contexts/AuthContext/context.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.replace(APP_PATHS.HOME);
    },
  });

  const signup = useMutation({
    mutationFn: signupRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.replace(APP_PATHS.HOME);
    },
  });

  const { data, isFetching } = useQuery({ queryKey: ['user'], queryFn: getMe });

  return (
    <AuthContext.Provider
      value={{ isAuth: !!data, user: data, userLoading: isFetching, login, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
