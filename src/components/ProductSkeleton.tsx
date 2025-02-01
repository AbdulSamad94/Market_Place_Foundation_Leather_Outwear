// components/ProductSkeleton.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="lg:px-10 mx-5 mb-40">
      <div className="border-t border-slate-300">
        {/* Breadcrumbs skeleton */}
        <div className="mt-4 flex gap-x-2">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-40 h-6" />
        </div>
        {/* Main layout skeleton */}
        <div className="flex justify-center lg:flex-row flex-col gap-10 mt-12">
          <div className="flex mx-auto lg:flex-row flex-col-reverse">
            {/* Small image skeleton */}
            <div className="w-full h-full lg:h-32 mt-10 lg:mt-0 flex justify-center">
              <Skeleton className="w-20 h-20" />
            </div>
            {/* Large image skeleton */}
            <div className="lg:w-[450px]">
              <Skeleton className="w-[350px] h-[450px]" />
            </div>
          </div>
          {/* Right side content skeleton */}
          <div className="lg:w-1/2 space-y-4">
            <Skeleton className="w-3/4 h-10" />
            <div className="flex gap-x-1 items-center">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-[2px]" />
            <Skeleton className="w-40 h-6" />
            <div className="grid grid-cols-2 gap-5">
              <Skeleton className="w-full h-12 rounded-full" />
              <Skeleton className="w-full h-12 rounded-full" />
              <Skeleton className="w-full h-12 rounded-full" />
              <Skeleton className="w-full h-12 rounded-full" />
            </div>
            <Skeleton className="w-full h-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
