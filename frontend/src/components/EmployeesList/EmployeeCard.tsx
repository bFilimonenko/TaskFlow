import { AdminControls } from '@/components/AdminControls/AdminControls.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/contexts/AuthContext/context.tsx';
import { Role } from '../../../role.enum.ts';
import { Avatar, AvatarFallback } from '../ui/avatar';

export const EmployeeCard = ({ employee }: { employee: User }) => {
  const { user } = useAuth();
  return (
    <div className="flex items-center bg-white rounded-3xl py-5 px-8 h-auto">
      <div className="flex gap-4 w-2/4">
        <div className="relative">
          <Avatar>
            {/*<AvatarImage src="" />*/}
            <AvatarFallback>
              {employee.firstName.charAt(0)}
              {employee.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Badge
            className={`${employee.isActive ? 'bg-green-600' : 'bg-red-600'} p-1 border-background absolute end-0 bottom-0.5 size-3 rounded-full border-2 `}
          />
        </div>
        <div>
          <p>
            {employee.firstName} {employee.lastName}
          </p>
          <span className="text-gray-400 text-sm">{employee.email}</span>
        </div>
      </div>
      <div className="w-2/12">
        <span className="text-gray-400 text-sm">Full age</span>
        <p>{employee.age ? employee.age : 'Not specified'}</p>
      </div>
      <div className="w-1/6">
        <span className="text-gray-400 text-sm">City</span>
        <p>{employee.city ? employee.city : 'Not specified'}</p>
      </div>

      {user?.role === Role.ADMIN && <AdminControls employeeId={String(employee.id)} />}
    </div>
  );
};
