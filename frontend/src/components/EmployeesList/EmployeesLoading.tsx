import { Skeleton } from '@/components/ui/skeleton.tsx';

export const EmployeesLoading = () => {
  return (
    <div className="flex items-center gap-20">
      <div className="flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-[150px]" />
          <Skeleton className="h-2 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-2 w-[100px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-2 w-[100px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-2 w-[100px]" />
        <Skeleton className="h-3 w-[50px]" />
      </div>
    </div>
  );
};
