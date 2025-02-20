import { FaChevronRight } from "react-icons/fa";

type ModuleCardsProp = {
  moduleNumber: string;
  moduleTitle: string;
  lesson: string;
  title: string;
  courseStarted: string;
};
const ModuleCards = ({
  title,
  moduleNumber,
  moduleTitle,
  lesson,
  courseStarted,
}: ModuleCardsProp) => {
  return (
    <div>
      <div className="h-[89px] w-full flex justify-start items-center px-4 bg-[#FF1515]">
        <h2 className="text-left font-DMSans text-[20px] text-[#fff] font-semibold">
          MODULE {moduleNumber}: {moduleTitle}
        </h2>
      </div>
      <div className="p-4 border-b-2 border-[#ddd] bg-white flex flex-col justify-between items-start">
        {courseStarted === "completed" && (
          <h2 className="text-[#47C839] font-DMSans text-[18px] font-semibold text-left">
            Lesson {lesson}
          </h2>
        )}
        {courseStarted === "started" && (
          <h2 className="text-[#6440FB] font-DMSans text-[18px] font-semibold text-left">
            Lesson {lesson}
          </h2>
        )}
        {courseStarted === "not started" && (
          <h2 className="text-[#FF1515] font-DMSans text-[18px] font-semibold text-left">
            Lesson {lesson}
          </h2>
        )}
        <div className="flex justify-between items-center w-full">
          <p className="text-[15px] font-DMSans font-semibold w-full lg:w-[304px]">
            {title}
          </p>
          <FaChevronRight className="text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default ModuleCards;
