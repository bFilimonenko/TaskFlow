import { APP_PATHS } from '@/app-paths.enum.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { useAuth } from '@/contexts/AuthContext';
import { type FC, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps extends PropsWithChildren {
  reversed?: boolean;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children, reversed = false }) => {
  const { isAuth, userLoading } = useAuth();

  if (userLoading) {
    return <Loading />;
  }

  // Regular guard: redirect to login if not authenticated
  if (!isAuth && !reversed) {
    return <Navigate to={APP_PATHS.LOGIN} replace />;
  }

  // Reversed guard: redirect to home if authenticated
  if (isAuth && reversed) {
    return <Navigate to={`/${APP_PATHS.HOME}`} replace />;
  }

  return children;
};
