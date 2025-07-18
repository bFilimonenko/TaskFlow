import { APP_PATHS } from '@/app-paths.enum.ts';
import { useAuth } from '@/contexts/AuthContext';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RoleGuardProps extends PropsWithChildren {
  allowedRoles: string[]; // наприклад ['ADMIN']
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
      //todo: navigate
    }
  }, [user, userLoading, allowedRoles]);

  if (userLoading) {
    return <div>loading...</div>;
  }

  return children;
};
