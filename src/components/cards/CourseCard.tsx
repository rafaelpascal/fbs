import React, { useEffect, useState } from "react";
import { BaseButton } from "../buttons/BaseButton";
import { cn } from "~/utils/helpers";
import { CourseServices } from "~/api/course";
import { FaLock } from "react-icons/fa";

interface CourseCardProps {
  title: string;
  moduleNumber: string;
  payment_status: number;
  moduleId: number;
  description: string;
  lessonsInfo: string;
  courseStarted: string;
  buttonText: string;
  progress: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onButtonClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  moduleNumber,
  title,
  description,
  payment_status,
  moduleId,
  lessonsInfo,
  buttonText,
  courseStarted,
  icon: Icon,
  onButtonClick,
}) => {
  const [lessonsCount, setLessonsData] = useState(0);

  const fetLessons = async () => {
    const payload = {
      moduleid: moduleId,
    };
    const res = await CourseServices.lessonsByModuleId(payload);
    setLessonsData(res.data.course_lessons.length);
  };

  useEffect(() => {
    if (moduleId) {
      fetLessons();
    }
  }, [moduleId]);
  return (
    <div className="relative lg:min-w-[600px] mt-4 h-[325px] bg-[#fff]">
      <div className="p-4 h-[240px] overflow-y-hidden flex justify-between items-start flex-col">
        <div className="flex justify-between w-full mb-4 items-center">
          <div className="lg:w-[90%] w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-[16px] w-full lg:w-[20%] font-DMSans font-bold text-[#000000]">
              MODULE {moduleNumber}
            </h2>
            <h2 className="text-[16px] w-full lg:w-[80%] font-DMSans font-bold text-[#000000]">
              {title}
            </h2>
          </div>
          <div className="w-[30%] flex justify-end items-center">
            {payment_status === 1 && (
              <div className="w-[40px] bg-[#EBEDF0] h-[40px] rounded-full flex justify-center items-center">
                <Icon
                  className={cn("bg-transparent text-[#000] text-[45px]")}
                />
              </div>
            )}
            {payment_status === 0 && (
              <div className="w-[40px] bg-[#FF5050] h-[40px] rounded-full flex justify-center items-center">
                {/* <Icon className={cn("bg-transparent text-[#000] ")} /> */}
                <FaLock className="text-[25px]" />
              </div>
            )}
          </div>
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
        <div>
          <h2 className="text-[12px] font-DMSans font-bold w-full text-[#000000]">
            43 Lessons | 3 Case Study | 2 Quizzes | 2 Poll
          </h2>
        </div>
      </div>
      {payment_status === 1 ? (
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
            <p>0/{lessonsCount}</p>
            <p>{buttonText}</p>
            <p></p>
          </div>
        </BaseButton>
      ) : (
        <BaseButton
          containerCLassName={`absolute flex justify-start items-center bottom-0 h-[73px] w-full rounded-[0px] text-[24px] font-bold font-DMSans text-[#fff] cursor-not-allowed opacity-50 bg-gray-500`}
          hoverScale={1.01}
          hoverOpacity={0.8}
          tapScale={0.9}
          disabled
        >
          <div className="flex justify-between items-center w-full">
            <p>0/{lessonsCount}</p>
            <p>Complete payment</p>
            <p></p>
          </div>
        </BaseButton>
      )}
    </div>
  );
};

export default CourseCard;
