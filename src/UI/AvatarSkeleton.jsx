import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AvatarSkeleton() {
  return (
    <div>
      <Skeleton className="w-[40px] h-[40px] rounded-full" />
    </div>
  );
}

export default AvatarSkeleton;
