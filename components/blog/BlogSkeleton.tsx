export default function BlogSkeleton() {
  return (
    <div className="w-full border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 animate-none">
      <div className="overflow-hidden rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse h-48 md:h-60" />

      <div className="pt-4 sm:pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />

            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
          </div>

          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
        </div>

        <div className="my-3 md:my-4 w-1/2 h-[1px] bg-gray-300 dark:bg-gray-700 animate-pulse mx-auto" />

        <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-2" />

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-11/12" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-3/4" />
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
        </div>

        <div className="flex items-center justify-end gap-5 mt-4 sm:mt-5">
          <div className="w-10 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
          <div className="w-10 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
