import { HTMLAttributes } from "react";
import { cn } from "~/utils/helpers";

// YStack Component
export const YStack = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn("flex flex-col gap-2", props.className)} />
  );
};

// XStack Component
export const XStack = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cn("flex gap-2", props.className)} />;
};
