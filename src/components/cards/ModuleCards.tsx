import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "../ui/loading-spinner";

type Lessons = {
  lesson_title: "";
  lessonid: 0;
};

type ModuleCardsProp = {
  moduleNumber: number;
  // lesson: string;
  // courseStarted: string;
};
const ModuleCards = ({
  moduleNumber,
}: // lesson,
// courseStarted,
ModuleCardsProp) => {
  const [moduleTitle, setModuleTitle] = useState("");
  const [newModuleNumber, setModuleNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lessonData, setLessonsData] = useState<Lessons[]>([]);
  const fetModules = async () => {
    setIsLoading(true);
    try {
      const payload = {
        module_id: moduleNumber,
      };
      const res = await CourseServices.listModulebyId(payload);
      setModuleTitle(res.data.modules[0].module_title);
      setModuleNumber(res.data.modules[0].module_number);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetLessons = async () => {
    setIsLoading(true);
    const payload = {
      moduleid: moduleNumber,
    };
    const res = await CourseServices.lessonsByModuleId(payload);
    setLessonsData(res.data.course_lessons);
    setIsLoading(false);
  };

  useEffect(() => {
    if (moduleNumber) {
      fetModules();
    }
  }, [moduleNumber]);

  useEffect(() => {
    if (moduleNumber) {
      fetLessons();
    }
  }, [moduleNumber]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="h-[89px] w-full flex justify-start items-center px-4 bg-[#FF1515]">
        <h2 className="text-left font-DMSans text-[20px] text-[#fff] font-semibold">
          MODULE {newModuleNumber}: {moduleTitle}
        </h2>
      </div>
      {lessonData.map((lesson, index) => (
        <div
          key={index}
          className="p-4 border-b-2 border-[#ddd] bg-white flex flex-col justify-between items-start"
        >
          <h2 className="text-[#47C839] font-DMSans text-[18px] font-semibold text-left">
            Lesson {index + 1}
          </h2>
          <div className="flex justify-between items-center w-full">
            <p className="text-[15px] font-DMSans font-semibold w-full lg:w-[304px]">
              {lesson.lesson_title}
            </p>
            <FaChevronRight className="text-[20px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleCards;
