import { getMe, loginRequest, logoutRequest } from '@/api';
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

  const logout = useMutation({
    mutationFn: () => {
      return logoutRequest({
        id: data?.id,
        refreshToken: localStorage.getItem('refreshToken'),
      });
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.replace(APP_PATHS.LOGIN);
    },
  });

  const { data, isFetching } = useQuery({ queryKey: ['user'], queryFn: getMe });

  return (
    <AuthContext.Provider
      value={{ isAuth: !!data, user: data, userLoading: isFetching, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
