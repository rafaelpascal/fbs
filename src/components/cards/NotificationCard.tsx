import moment from "moment";
import React from "react";
import { cn } from "~/utils/helpers";

type NotificationCardProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  containerClass: string;
  title: string;
  time: string;
};
const NotificationCard = ({
  icon: Icon,
  containerClass,
  title,
  time,
}: NotificationCardProps) => {
  return (
    <div className="flex justify-start items-center gap-4 p-2">
      <div
        className={cn(
          "w-[40px] flex justify-center items-center h-[40px] rounded-full",
          containerClass
        )}
      >
        <Icon className={cn("bg-transparent text-[20px] text-[#fff]")} />
      </div>
      <div>
        <h2 className="font-DMSans font-semibold text-[15px]">{title}</h2>
        <p className="font-DMSans font-normal text-[13px]">
          {moment(time).format("MM/DD/YYYY")}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
