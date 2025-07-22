import { Skeleton } from '@/components/ui/skeleton.tsx';

export const ProjectsLoading = () => {
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
    </div>
  );
};
