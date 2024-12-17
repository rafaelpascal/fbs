import { HTMLAttributes } from "react";
import { useWindowSize } from "~/hooks/useWindowSize";

type ChartWrapperProps = Omit<HTMLAttributes<HTMLDivElement>, "key">;

export const ChartWrapper = (props: ChartWrapperProps) => {
  const { width } = useWindowSize();

  return <div key={width} {...props} />;
};
