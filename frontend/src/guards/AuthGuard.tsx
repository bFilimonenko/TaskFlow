import { useUser } from '@/contexts/UserContext';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;
    if (!isAuth) {
      navigate('/login');
    }
  }, [userLoading, isAuth]);

  if (userLoading) {
    return <div>loading...</div>;
  }

  return children;
};
