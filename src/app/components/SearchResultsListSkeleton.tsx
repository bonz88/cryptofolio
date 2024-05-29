import { Skeleton } from "../components/ui/skeleton";

export default function SearchResultsListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="pl-2 py-2">
          <Skeleton className="h-[22px] w-[220px]" />
        </li>
      ))}
    </ul>
  );
}
