import { Skeleton } from '../components/ui/skeleton';

export default function MarketDataHeaderSkeleton() {
  return (
    <div className="mx-auto flex w-full justify-center gap-2 bg-[#353570] px-4 py-5 dark:bg-[#1E1932] sm:gap-7 md:gap-8 lg:px-[72px]">
      <div className="flex items-center gap-1">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-[34px]" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-[63px]" />
        <Skeleton className="h-4 w-[28px]" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="sm:h-4 sm:w-[66px]" />
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="sm:h-4 sm:w-[42px]" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-[48px]" />
        <Skeleton className="sm:h-4 sm:w-[53px]" />
      </div>
      <div className="hidden lg:flex lg:items-center lg:gap-1">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-[53px]" />
      </div>
      <div className="hidden lg:flex lg:items-center lg:gap-1">
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-[53px]" />
      </div>
    </div>
  );
}
