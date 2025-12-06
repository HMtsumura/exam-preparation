"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress };
