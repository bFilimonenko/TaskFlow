import type { Task } from '@/contexts/ProjectsContext/context.tsx';

export const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="flex justify-between bg-white rounded-3xl py-5 px-8 h-auto">
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
        <div>
          <span className="text-gray-400 text-sm">Assignee</span>
          {/*<p>{task.}</p>*/}
        </div>
        <div className="w-20">
          <span className="text-gray-400 text-sm">Priority</span>
          <p>{task.priority}</p>
        </div>
      </div>
    </div>
  );
};
