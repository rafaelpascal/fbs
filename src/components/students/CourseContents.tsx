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
  const [isLoading, setLoading] = useState(false);

  const getModule = async () => {
    try {
      setLoading(true);
      const payload = { courseid: courseId };
      const module = await CourseServices.getModuleByCourseId(payload);
      setIsModule(module.data.course_modules);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModule();
  }, [courseId]);

  const accordionItems = ismodule.map((module: any, index: number) => ({
    title: `Module ${module.module_number}: ${module.module_title}`,
    defaultOpen: index === 0,
    children: (
      <div>
        <CourseItem moduleId={module.moduleid} />
      </div>
    ),
  }));

  if (isLoading) {
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
        {ismodule.length} Modules • {}lessons
      </h2>
      <Accordion
        lessons={0}
        items={accordionItems}
        accordionName="example-accordion"
      />
    </div>
  );
};

export default CourseContents;
