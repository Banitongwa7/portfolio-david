export default function BlogSkeleton() {
    return (
      <div className="w-[80%] border border-gray-200 p-6 rounded-md">
        <div className="overflow-hidden rounded-md bg-gray-200 animate-pulse h-[300px]" />
        <div className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[35px] h-[35px] rounded-full bg-gray-200 animate-pulse" />
              <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="my-4 h-6 bg-gray-200 animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }