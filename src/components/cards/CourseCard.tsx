import React from "react";
import { BaseButton } from "../buttons/BaseButton";
import { cn } from "~/utils/helpers";

interface CourseCardProps {
  title: string;
  description: string;
  lessonsInfo: string;
  courseStarted: string;
  buttonText: string;
  progress: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onButtonClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  lessonsInfo,
  buttonText,
  courseStarted,
  progress,
  icon: Icon,
  onButtonClick,
}) => {
  return (
    <div className="relative w-full mt-4 h-[325px] bg-[#fff]">
      <div className="p-4 h-[240px] overflow-y-hidden flex justify-between items-start flex-col">
        <div className="flex justify-between w-full gap-6 mb-4 items-center">
          <h2 className="text-[20px] font-DMSans font-bold text-[#000000] w-[60%]">
            {title}
          </h2>
          {(courseStarted === "completed" || courseStarted === "started") && (
            <div className="w-[56px] bg-[#EBEDF0] h-[56px] rounded-full flex justify-center items-center">
              <Icon className={cn("bg-transparent text-[#000] text-[30px]")} />
            </div>
          )}
          {courseStarted === "not started" && (
            <div className="w-[56px] bg-[#FF5050] h-[56px] rounded-full flex justify-center items-center">
              <Icon className={cn("bg-transparent text-[#000] text-[30px]")} />
            </div>
          )}
        </div>
        {description !== "" && (
          <p className="text-[15px] w-full font-DMSans font-normal text-[#757575]">
            {description}
          </p>
        )}
        {description === "" && (
          <p className="text-[15px] font-DMSans font-normal text-[#757575] w-full">
            {lessonsInfo}
          </p>
        )}
      </div>
      <BaseButton
        containerCLassName={`absolute flex justify-start items-center bottom-0 h-[73px] w-full rounded-[0px] text-[24px] font-bold font-DMSans text-[#fff] ${
          courseStarted === "started"
            ? "bg-[#47C839]"
            : courseStarted === "completed"
            ? "bg-[#6440FB]"
            : "bg-[#FF5050]"
        }`}
        hoverScale={1.01}
        hoverOpacity={0.8}
        tapScale={0.9}
        onClick={onButtonClick}
      >
        <div className="flex justify-between items-center w-full">
          <p>{progress}</p>
          <p>{buttonText}</p>
          <p></p>
        </div>
      </BaseButton>
    </div>
  );
};

export default CourseCard;
