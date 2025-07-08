import type { User } from '@/contexts/AuthContext/context.tsx';
import { Avatar, AvatarFallback } from '../ui/avatar';

export const EmployeeCard = ({ employee }: { employee: User }) => {
  return (
    <div className="grid grid-cols-3 bg-white rounded-3xl py-5 px-8 h-auto">
      <div className="flex gap-4">
        <Avatar>
          {/*<AvatarImage src="" />*/}
          <AvatarFallback>
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p>
            {employee.firstName} {employee.lastName}
          </p>
          <span className="text-gray-400 text-sm">{employee.email}</span>
        </div>
      </div>
      <div>
        <span className="text-gray-400 text-sm">Full age</span>
        <p>{employee.age}</p>
      </div>
      <div>
        <span className="text-gray-400 text-sm">City</span>
        <p>{employee.city}</p>
      </div>
    </div>
  );
};
