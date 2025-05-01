import { useEffect, useState } from "react";
import Accordion from "../Collapsible/Accordion";
import CourseItem from "./CourseContent.tsx/CourseItem";
import { CourseServices } from "~/api/course";
import { LoadingSpinner } from "../ui/loading-spinner";

type CourseContentProps = {
  courseId: string;
};

const CourseContents = ({ courseId }: CourseContentProps) => {
  const [ismodule, setIsModule] = useState([]);
  const [lessons, setLessons] = useState(0);
  const [isModuleCount, setIsModuleCount] = useState(false);

  const getModule = async () => {
    try {
      setIsModuleCount(true);
      const payload = { courseid: courseId };
      const moduleResponse = await CourseServices.getModuleByCourseId(payload);
      const modules = moduleResponse.data.course_modules;
      setIsModule(modules.details);
      if (modules.details.length > 0) {
        const lessonCounts: { moduleid: number; lessonCount: number }[] =
          await Promise.all(
            modules.details.map(async (module: { moduleid: number }) => {
              const lessonPayload = { moduleid: module.moduleid };
              const lessonsResponse = await CourseServices.getLessonByModuleId(
                lessonPayload
              );
              return {
                moduleid: module.moduleid,
                lessonCount: lessonsResponse.data.course_lessons.length,
              };
            })
          );
        const totalLessons = lessonCounts.reduce(
          (sum, module) => sum + module.lessonCount,
          0
        );
        setLessons(totalLessons);
      }

      setIsModuleCount(false);
    } catch (error) {
      console.log(error);
      setIsModuleCount(false);
    }
  };

  useEffect(() => {
    getModule();
  }, [courseId]);

  const accordionItems = ismodule.map((module: any, index: number) => ({
    title: `Module ${module.module_number}: ${module.module_title}`,
    moduleId: `${module.moduleid}`,
    defaultOpen: index === 0,
    children: (
      <div>
        <CourseItem moduleId={module.moduleid} />
      </div>
    ),
  }));

  if (isModuleCount) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-DMSans font-semibold mb-4 text-[20px]">
        Description
      </h2>
      <h2 className="mb-4">
        {ismodule.length} Modules • {lessons} Lessons
      </h2>
      <Accordion
        // moduleId={module.moduleid}
        lessons={lessons}
        items={accordionItems}
        accordionName="example-accordion"
      />
    </div>
  );
};

export default CourseContents;
