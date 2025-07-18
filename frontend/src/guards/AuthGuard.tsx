import { APP_PATHS } from '@/app-paths.enum.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { useAuth } from '@/contexts/AuthContext';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth, userLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;

    if (!isAuth) {
      navigate(APP_PATHS.LOGIN);
    }
  }, [userLoading, isAuth]);

  if (userLoading) {
    return <Loading />;
  }

  return children;
};
