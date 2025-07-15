import searchForTasks from '/search-for-tasks.webp';

export const EmptyTasksList = () => {
  return (
    <div className="flex flex-col gap-1">
      <img src={searchForTasks} alt="no tasks" />
    </div>
  );
};
