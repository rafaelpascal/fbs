// export default CourseBuilder;
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { NewModuleModal } from "~/components/Modal/NewModuleModal";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { showAlert } from "~/utils/sweetAlert";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "~/types/ItemTypes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RiDragMove2Fill } from "react-icons/ri";
import { NewLessonModal } from "~/components/Modal/NewLessonModal";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lessons[];
}

interface Lessons {
  id: number;
  title: string;
  description: string;
  pages: string;
}

interface ImoduleProps {
  moduleId?: number;
  selectedModule?: number;
  title: string;
  description: string;
}
const CourseBuilder = ({ created }: any) => {
  const { theme } = useTheme();
  const [modules, setModules] = useState<Module[]>([]);
  const [isNewModule, setIsnewModule] = useState(false);
  const [newModule, setNewModule] = useState({
    number: 0,
    status: false,
  });
  const [newLesson, setNewLesson] = useState({
    module: 0,
    status: false,
  });
  const [selectedModuleId, setSelectedModuleId] = useState(0);
  const [moduleObj, setmoduleObj] = useState<ImoduleProps>({
    moduleId: 0,
    title: "",
    description: "",
  });
  const [lessonObj, setlessonObj] = useState<ImoduleProps>({
    title: "",
    description: "",
  });

  const addModule = async () => {
    setIsnewModule(true);
    setNewModule({
      number: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Created!",
      "Module Successfully Created!",
      "Ok",
      "#03435F"
    );
  };

  useEffect(() => {
    if (isNewModule && moduleObj.title) {
      const newModule: Module = {
        id: modules.length + 1,
        title: `MODULE ${modules.length + 1}`,
        description: moduleObj.title,
        lessons: [],
      };

      setModules((prevModules) => [...prevModules, newModule]);
      setSelectedModuleId(newModule.id);
      setIsnewModule(false);
    }
  }, [moduleObj, isNewModule]);

  useEffect(() => {
    const selectedModule = modules.find(
      (module) => module.id === selectedModuleId
    );
    if (selectedModule && lessonObj.title) {
      const newLesson: Lessons = {
        id: Date.now(),
        title: `LESSON ${selectedModule.lessons.length + 1}`,
        description: lessonObj.title,
        pages: "13 pages",
      };
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedModuleId
            ? { ...module, lessons: [...module.lessons, newLesson] }
            : module
        )
      );
      setlessonObj({ title: "", description: "" });
    }
  }, [lessonObj]);

  const addLesson = async () => {
    setNewLesson({
      module: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Created!",
      "Lesson Successfully Created!",
      "Ok",
      "#03435F"
    );

    const selectedModule = modules.find(
      (module) => module.id === selectedModuleId
    );
    if (!selectedModule) {
      await showAlert(
        "error",
        "Module Not Found!",
        "The selected module does not exist.",
        "Ok",
        "#FF5050"
      );
      return;
    }
  };

  const removeModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const handleClose = () => {
    setNewModule({
      number: 0,
      status: false,
    });
    setNewLesson({
      module: 0,
      status: false,
    });
  };

  const getAllLessons = () => {
    return modules.flatMap((module) => module.lessons);
  };

  const moveLesson = (draggedId: number, hoveredIndex: number) => {
    const allLessons = getAllLessons();
    const draggedLesson = allLessons.find((lesson) => lesson.id === draggedId);

    if (!draggedLesson) {
      return;
    }
    const updatedLessons = allLessons.filter(
      (lesson) => lesson.id !== draggedId
    );
    updatedLessons.splice(hoveredIndex, 0, draggedLesson);

    let lessonIndex = 0;
    const updatedModules = modules.map((module) => {
      const lessonsForModule = updatedLessons.slice(
        lessonIndex,
        lessonIndex + module.lessons.length
      );
      lessonsForModule.forEach((lesson, index) => {
        lesson.title = `LESSON ${lessonIndex + index + 1}`;
      });

      lessonIndex += module.lessons.length;
      return { ...module, lessons: lessonsForModule };
    });

    setModules(updatedModules);
  };

  const handleNewModule = () => {
    setNewModule({
      number: selectedModuleId + 1,
      status: true,
    });
  };

  const handleNewLesson = async () => {
    if (modules.length === 0) {
      await showAlert(
        "error",
        "Unauthorized!",
        "Please create a module first!",
        "Ok",
        "#FF5050"
      );
      return;
    } else {
      setNewLesson({
        module: moduleObj.moduleId || 0,
        status: true,
      });
    }
  };

  const handlePublish = () => {
    created();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative lg:h-[80vh]">
        <h2 className="font-DMSans mb-2 text-[18px] font-semibold">
          CONTENT BUILDER
        </h2>
        {modules.map((module) => (
          <div className="my-2" key={module.id}>
            <div
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
            <div>
              {module.lessons.map((lesson, index) => (
                <LessonItem
                  key={`${module.id}-${lesson.id}-${index}`}
                  lesson={lesson}
                  index={index}
                  moveLesson={moveLesson}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="flex mt-4 justify-center items-center w-full">
          <div className="w-full lg:w-[80%] grid lg:grid-cols-5 grid-cols-2 gap-4">
            <button
              onClick={handleNewModule}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Module
            </button>
            <button
              onClick={handleNewLesson}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Lesson
            </button>
            <button
              // onClick={addModule}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Quiz
            </button>
            <button
              // onClick={addLesson}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Polls
            </button>
            <button
              // onClick={addModule}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Capstone
            </button>
            <button
              // onClick={addLesson}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Assignments
            </button>
            <button
              // onClick={addModule}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Resources
            </button>
            <button
              // onClick={addLesson}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Case study
            </button>
            <button
              // onClick={addModule}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Exam
            </button>
            <button
              // onClick={addLesson}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Live streaming
            </button>
          </div>
        </div>

        <NewModuleModal
          moduleNumber={newModule.number}
          isOpen={newModule.status}
          closeModal={handleClose}
          handlecreate={addModule}
          moduleData={moduleObj}
          setModuleData={setmoduleObj}
        />
        <NewLessonModal
          moduleId={newLesson.module}
          isOpen={newLesson.status}
          closeModal={handleClose}
          handlecreate={addLesson}
          moduleData={moduleObj}
          setModuleData={setlessonObj}
        />
        <div className="lg:absolute bottom-3 flex flex-row flex-wrap justify-start items-center gap-4">
          <button className="h-[52px] w-[231px] mr-4 mb-2 px-4 font-DMSans font-semibold text-[16px] rounded-md bg-transparent border-[1px] border-[#ddd]">
            PREVIEW
          </button>
          <button
            onClick={handlePublish}
            className="h-[52px] bg-[#FF5050] w-[231px] mb-2 px-4 rounded-md flex justify-center items-center gap-2"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              PUBLISH COURSE LIVE
            </p>
            {/* {isSubmitting && <LoadingSpinner size="xs" />} */}
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

// LessonItem component for drag-and-drop
const LessonItem = ({ lesson, theme, index, moveLesson }: any) => {
  if (!lesson?.id) {
    return null;
  }

  const [, drag] = useDrag({
    type: ItemTypes.LESSON,
    item: { id: lesson?.id || "", index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.LESSON,
    hover: (item: any) => {
      if (item.index !== index) {
        moveLesson(item.id, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} className="flex justify-between items-center gap-2">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={cn(
            "text-[30px]",
            theme === "dark" ? "text-[#fff]" : "text-[#333]"
          )}
        />
      </button>
      <div
        // The container div becomes the drop target
        // className="p-3 w-full shadow-md flex flex-col lg:flex-row justify-between items-start mb-2"
        className={cn(
          "p-3 w-full shadow-md flex flex-col lg:flex-row justify-between items-start mb-2",
          theme === "dark"
            ? "bg-transparent border-[0.5px] border-[#ddd]"
            : "bg-[#B3B3B3]/10"
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

        {/* The button will trigger the drag action */}
        <div className="flex justify-end items-end gap-2">
          <p className="font-DMSans mr-10 font-normal text-[18px]">
            {lesson.pages}
          </p>
          <button>
            <FiEdit className="text-[30px]" />
          </button>
          <button>
            <MdOutlineCancel className="text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;
