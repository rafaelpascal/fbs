import { cn } from "~/utils/helpers";
import { XStack } from "./stack";

interface StatusProps {
  children?: React.ReactNode;
  text: SN;
  className?: string;
  status: StatusText;
}

export const Status = (props: StatusProps) => {
  const { children, text, className, status } = props;

  const getClassColor = () => {
    switch (status) {
      case "successful":
        return "bg-[#00A45F]/10 text-[#00A45F] capitalize w-fit";
      case "confirmed":
        return "bg-[#C2F6AE] text-[#167625] w-fit";
      case "failed":
        return "text-[#ED342B] bg-[#ED342B]/10 capitalize w-fit";
      case "rejected":
        return "text-[#F23151] bg-[#FBCCD4] w-fit";
      case "processing":
        return "text-[#ffffff] bg-[#5F9EA0] w-fit";
      case "pending":
        return "text-[#FAA86D] bg-[#FAA86D] w-fit";
      default:
        return "text-gray-500 bg-gray-200 w-fit";
    }
  };

  return (
    <XStack
      className={cn(
        " rounded-md px-3 py-1 text-center text-xs ",
        getClassColor(),
        className
      )}
    >
      {children}
      {text}
    </XStack>
  );
};
