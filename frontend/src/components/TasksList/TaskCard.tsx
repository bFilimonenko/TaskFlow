import { APP_PATHS } from '@/app-paths.enum.ts';
import type { Task } from '@/contexts/ProjectsContext/context.tsx';
import { useNavigate } from 'react-router-dom';

export const TaskCard = ({ task }: { task: Task }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${task.id}/${APP_PATHS.TASK_DETAILS}`)}
      className="flex justify-between bg-white rounded-3xl py-5 px-8 h-auto hover:shadow-md active:bg-blue-50 "
    >
      <div>
        <span className="text-gray-400 text-sm">Task Name</span>
        <p>{task.taskName}</p>
      </div>
      <div className="flex gap-11">
        <div>
          <span className="text-gray-400 text-sm">Estimate</span>
          <p>{task.estimate}</p>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Dead Line</span>
          <p>{new Date(task.deadLine).toLocaleDateString()}</p>
        </div>
        <div className="w-20">
          <span className="text-gray-400 text-sm">Priority</span>
          <p>{task.priority}</p>
        </div>
      </div>
    </div>
  );
};
