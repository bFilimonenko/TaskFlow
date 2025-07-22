import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProjects } from '@/contexts/ProjectsContext';
import { STATUS, statusColors } from '@/contexts/ProjectsContext/context.tsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const StatusDropdownMenu = () => {
  const { currentTask, updateTask } = useProjects();
  const [status, setStatus] = useState(currentTask?.status);

  if (!currentTask) return null;

  const handleStatusChange = (newStatus: STATUS) => {
    setStatus(newStatus);

    updateTask?.mutate({
      id: currentTask.id,
      values: {
        ...currentTask,
        users: currentTask.users?.map((u) => u.id) || [],
        status: newStatus,
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className={`absolute top-0 right-1 font-bold text-xs py-2 px-3.5 rounded-md ${statusColors[status as STATUS]}`}
        >
          {status}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => {
            handleStatusChange(value as STATUS);
          }}
        >
          <DropdownMenuRadioItem value={STATUS.TO_DO}>To Do</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={STATUS.IN_PROGRESS}>In Progress</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={STATUS.IN_REVIEW}>In Review</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={STATUS.DONE}>Done</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
