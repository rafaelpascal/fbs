import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { CourseServices } from "~/api/course";

type LessonProps = {
  moduleId: string;
};

type Lessons = {
  lesson_title: string;
};

const Items: Lessons[] = [];

const CourseItem = ({ moduleId }: LessonProps) => {
  const [lessons, setLessons] = useState(Items);
  const getLesson = async () => {
    try {
      const payload = {
        moduleid: moduleId,
      };
      const lessons = await CourseServices.getLessonByModuleId(payload);
      setLessons(lessons.data.course_lessons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLesson();
  }, [moduleId]);

  return (
    <div>
      {lessons.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <div className="flex justify-start gap-4 items-center">
            <div className="h-6 w-6 flex justify-center items-center rounded-full bg-[#FF3B30]/10">
              <FaPlay className="text-[#FF3B30] text-[10px]" />
            </div>
            <h2 className="font-DMSans font-semibold text-[18px]">
              {item.lesson_title}
            </h2>
          </div>
          {/* <div className="flex justify-end items-center gap-4">
            {item.started && (
              <button className="text-[#FF3B30] underline">Continue</button>
            )}
            <button>{item.duration}</button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CourseItem;
