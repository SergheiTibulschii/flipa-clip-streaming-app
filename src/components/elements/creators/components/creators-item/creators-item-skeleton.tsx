type CreatorsItemSkeletonProps = {};

export const CreatorsItemSkeleton = ({}: CreatorsItemSkeletonProps) => {
  return (
    <div className="opacity-25">
      <div className="aspect-square rounded-full bg-gray-secondary animate-pulse"></div>
      <div className="px-2 text-center mt-2">
        <div className="text-sm leading-1.5 font-medium mt-2 bg-gray-secondary rounded-1 text-transparent animate-pulse">
          Loading...
        </div>
        <div className="mt-1 text-[9px] text-gray-secondary font-bold bg-gray-secondary rounded-1 text-transparent animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};
