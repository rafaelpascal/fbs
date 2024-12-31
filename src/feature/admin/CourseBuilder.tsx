import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { NewModuleModal } from "~/components/Modal/NewModuleModal";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { showAlert } from "~/utils/sweetAlert";

interface Module {
  id: number;
  title: string;
  description: string;
}

interface Lessons {
  id: number;
  title: string;
  description: string;
  pages: string;
}

const CourseBuilder = () => {
  const { theme } = useTheme();
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lessons[]>([]);
  const [newModule, setnewModule] = useState(false);

  const addModule = () => {
    const newModule: Module = {
      id: modules.length + 1,
      title: `MODULE ${modules.length + 1}`,
      description: "New Module Description",
    };
    setModules([...modules, newModule]);
    setnewModule(false);
  };
  const addLesson = async () => {
    if (modules.length === 0) {
      await showAlert(
        "error",
        "Unauthorized!",
        "Please create a module first!",
        "Ok",
        "#FF5050"
      );
    }
    const newLesson: Lessons = {
      id: modules.length + 1,
      title: `LESSON ${modules.length + 1}`,
      description: "New Lesson Description",
      pages: "13 pages",
    };
    setLessons([...lessons, newLesson]);
  };

  const removeModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const handleClose = () => {
    setnewModule(false);
  };

  return (
    <div className="">
      <h2 className="font-DMSans mb-2 text-[18px] font-semibold">
        CONTENT BUILDER
      </h2>

      {/* Render Modules */}
      {modules.map((module) => (
        <div className="my-2">
          <div
            key={module.id}
            className={cn(
              "p-3 w-full shadow-md flex flex-col lg:flex-row justify-between items-start mb-2",
              theme === "dark"
                ? "bg-transparent border-[0.5px] border-[#ddd]"
                : "bg-[#B3B3B3]/10"
            )}
          >
            <div className="flex justify-start items-start gap-2">
              <h2 className="font-DMSans font-semibold text-[18px] text-[#FF5050]">
                {module.title}:
              </h2>
              <h2 className="font-DMSans font-semibold text-[18px]">
                {module.description}
              </h2>
            </div>
            <div className="flex justify-end items-end gap-2">
              <button>
                <FiEdit className="text-[30px]" />
              </button>
              <button onClick={() => removeModule(module.id)}>
                <MdOutlineCancel className="text-[30px]" />
              </button>
            </div>
          </div>
          {/* LESSONS */}
          {lessons.map((lesson) => (
            <div className="px-3">
              <div
                key={lesson.id}
                className={cn(
                  "p-3 w-full shadow-md flex flex-col lg:flex-row justify-between items-start mb-2",
                  theme === "dark"
                    ? "bg-transparent border-[0.5px] border-[#ddd]"
                    : "bg-[#fff]"
                )}
              >
                <div className="flex justify-start items-start gap-2">
                  <h2 className="font-DMSans font-semibold text-[18px] text-[#FF5050]">
                    {lesson.title}:
                  </h2>
                  <h2 className="font-DMSans font-semibold text-[18px]">
                    {lesson.description}
                  </h2>
                </div>
                <div className="flex justify-end items-end gap-2">
                  <p className="font-DMSans mr-10 font-normal text-[18px]">
                    {lesson.pages}
                  </p>
                  <button>
                    <FiEdit className="text-[30px]" />
                  </button>
                  <button onClick={() => removeModule(lesson.id)}>
                    <MdOutlineCancel className="text-[30px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="flex mt-4 justify-center items-center w-full">
        <div className="w-full lg:w-[80%] grid lg:grid-cols-5 grid-cols-2 gap-4">
          <button
            onClick={() => setnewModule(true)}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Module
          </button>
          <button
            onClick={addLesson}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Lesson
          </button>
          <button
            onClick={addModule}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Quiz
          </button>
          <button
            onClick={addLesson}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Polls
          </button>
          <button
            onClick={addModule}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Capstone
          </button>
          <button
            onClick={addLesson}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Assignments
          </button>
          <button
            onClick={addModule}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Resources
          </button>
          <button
            onClick={addLesson}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Case study
          </button>
          <button
            onClick={addModule}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Exam
          </button>
          <button
            onClick={addLesson}
            className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
          >
            Live streaming
          </button>
        </div>
      </div>
      <NewModuleModal
        isOpen={newModule}
        closeModal={handleClose}
        handlecreate={addModule}
      />
    </div>
  );
};

export default CourseBuilder;
