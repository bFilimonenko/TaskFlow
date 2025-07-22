import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { Role } from '../../../role.enum.ts';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const AdminControls = ({ employeeId }: { employeeId: string }) => {
  const { changeRole } = useEmployees();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-4">
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription className="grid gap-2">
            <p className="text-base text-black">You're about to change this user's role.</p>
            <p className="text-base text-black">
              Granting admin access will allow the user to manage projects, tasks, and other users.
            </p>

            <Select onValueChange={(value: Role) => setSelectedRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                <SelectItem value={Role.USER}>User</SelectItem>
              </SelectContent>
            </Select>
            <span> Use this action responsibly — it directly affects access permissions.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              type="button"
              onClick={() => changeRole?.mutate({ id: employeeId, role: selectedRole! })}
            >
              Change Role
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
