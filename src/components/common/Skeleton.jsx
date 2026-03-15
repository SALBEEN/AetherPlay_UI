import clsx from "clsx";

const Skeleton = ({ className = "" }) => {
  return (
    <div className={clsx("bg-[#272727] animate-pulse rounded-lg", className)} />
  );
};

export const VideoCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="flex gap-3">
        <Skeleton className="w-9 h-9 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
