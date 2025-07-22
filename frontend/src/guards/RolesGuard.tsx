import { APP_PATHS } from '@/app-paths.enum.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { useAuth } from '@/contexts/AuthContext';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RoleGuardProps extends PropsWithChildren {
  allowedRoles: string[];
}

export const RoleGuard: FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      navigate(APP_PATHS.LOGIN);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      toast.warning('You don’t have permission to view this content.');
      //You can add navigate or something else
    }
  }, [user, userLoading, allowedRoles]);

  if (userLoading) {
    return <Loading />;
  }

  return children;
};
