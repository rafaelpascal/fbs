// export default CourseBuilder;
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { NewModuleModal } from "~/components/Modal/NewModuleModal";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { showAlert } from "~/utils/sweetAlert";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NewLessonModal } from "~/components/Modal/NewLessonModal";
import { NewCapstoneModal } from "~/components/Modal/NewCapstoneModal";
import { Assignment, CapstoneItem, LessonItem, QuizItems } from "./Items";
import { NewAssignmentModal } from "~/components/Modal/NewAssignmentModal";
import { NewQuizModal } from "~/components/Modal/NewQuizModal";

interface Lessons {
  id: number;
  title: string;
  description: string;
  pages: string;
}
interface Capstone {
  id: number;
  title: string;
  description: string;
  pages: string;
}
interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lessons[];
  capstone: Capstone[];
  assignment: Capstone[];
  quiz: Capstone[];
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
  const [newCapstone, setNewCapstone] = useState({
    module: 0,
    lesson: 0,
    status: false,
  });
  const [newAssignment, setNewAssignment] = useState({
    module: 0,
    lesson: 0,
    status: false,
  });
  const [newQuiz, setNewQuiz] = useState({
    module: 0,
    lesson: 0,
    status: false,
  });
  const [selectedModuleId, setSelectedModuleId] = useState(0);
  const [moduleObj, setmoduleObj] = useState<ImoduleProps>({
    moduleId: 0,
    title: "",
    description: "",
  });
  const [lessonObj, setlessonObj] = useState<ImoduleProps>({
    moduleId: 0,
    title: "",
    description: "",
  });
  const [capstoneObj, setCapstoneObj] = useState<ImoduleProps>({
    title: "",
    description: "",
  });
  const [assignmentObj, setAssignmentObj] = useState<ImoduleProps>({
    title: "",
    description: "",
  });
  const [quizObj, setQuizObj] = useState<ImoduleProps>({
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
        capstone: [],
        assignment: [],
        quiz: [],
      };

      setModules((prevModules) => [...prevModules, newModule]);
      setSelectedModuleId(newModule.id);
      setIsnewModule(false);
    }
  }, [moduleObj, isNewModule]);

  // Lesson
  useEffect(() => {
    const selectedModule = modules.find(
      (module) => module.id === selectedModuleId
    );
    if (selectedModule && lessonObj.title) {
      const newLesson: Lessons = {
        id: Date.now(),
        title: `LESSON ${selectedModule.lessons.length + 1}`,
        description: lessonObj.title,
        pages: "",
      };
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedModuleId
            ? { ...module, lessons: [...module.lessons, newLesson] }
            : module
        )
      );
      // setlessonObj({ title: "", description: "" });
    }
  }, [lessonObj]);

  // capstone
  useEffect(() => {
    const selectedModule = modules.find(
      (module) => module.id === selectedModuleId
    );
    if (selectedModule && capstoneObj.title) {
      const newCapstone: Lessons = {
        id: Date.now(),
        // title: `CAPSTONE ${selectedModule.capstone.length + 1}`,
        title: `CAPSTONE`,
        description: capstoneObj.title,
        pages: "",
      };
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedModuleId
            ? { ...module, capstone: [...module.capstone, newCapstone] }
            : module
        )
      );
      setCapstoneObj({ title: "", description: "" });
    }
  }, [capstoneObj]);

  // assignmentObj
  useEffect(() => {
    const selectedModule = modules.find(
      (module) => module.id === selectedModuleId
    );
    if (selectedModule && assignmentObj.title) {
      const newAssignment: Lessons = {
        id: Date.now(),
        // title: `ASSIGNMENT ${selectedModule.assignment.length + 1}`,
        title: `ASSIGNMENT`,
        description: assignmentObj.title,
        pages: "",
      };
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedModuleId
            ? { ...module, assignment: [...module.assignment, newAssignment] }
            : module
        )
      );
      setAssignmentObj({ title: "", description: "" });
    }
  }, [assignmentObj]);

  // Quiz
  useEffect(() => {
    console.log(quizObj);
    const selectedModule = modules.find(
      (module) => module.id === selectedModuleId
    );
    if (selectedModule && quizObj.title) {
      const newQuiz: Lessons = {
        id: Date.now(),
        // title: `ASSIGNMENT ${selectedModule.assignment.length + 1}`,
        title: `QUIZ`,
        description: quizObj.title,
        pages: "",
      };
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === selectedModuleId
            ? { ...module, quiz: [...module.quiz, newQuiz] }
            : module
        )
      );
      // setQuizObj({ title: "", description: "" });
    }
  }, [quizObj]);

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

  const addCapstone = async () => {
    setNewCapstone({
      module: 0,
      lesson: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Created!",
      "Capstone Successfully Created!",
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

  const addAssignment = async () => {
    setNewAssignment({
      module: 0,
      lesson: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Created!",
      "Assignment Successfully Created!",
      "Ok",
      "#03435F"
    );

    const selectedModule = modules.find((module) => {
      return module.id === selectedModuleId;
    });
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

  const addQuiz = async () => {
    setNewQuiz({
      module: 0,
      lesson: 0,
      status: false,
    });
    await showAlert(
      "success",
      "Created!",
      "Quiz Successfully Created!",
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
    setNewCapstone({
      module: 0,
      lesson: 0,
      status: false,
    });
    setNewAssignment({
      module: 0,
      lesson: 0,
      status: false,
    });
    setNewQuiz({
      module: 0,
      lesson: 0,
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

  // New Capstone
  const handleNewCapstone = async () => {
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
      setNewCapstone({
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      });
    }
  };

  // New Assignment
  const handleNewAssignment = async () => {
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
      setNewAssignment({
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      });
    }
  };

  // New Quiz
  const handleNewQuiz = async () => {
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
      setNewQuiz({
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      });
    }
  };

  const handlePublish = () => {
    created();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="">
        <h2 className="font-DMSans mb-2 text-[18px] font-semibold">
          CONTENT BUILDER
        </h2>
        {modules.map((module) => (
          <div className="my-2" key={module.id}>
            <div
              className={cn(
                "p-3 w-full shadow-md flex flex-row justify-between items-start mb-2",
                theme === "dark"
                  ? "bg-transparent border-[0.5px] border-[#ddd]"
                  : "bg-[#B3B3B3]/10"
              )}
            >
              <div className="flex  flex-col lg:flex-row justify-start items-start gap-2">
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
            <div>
              {module.capstone.map((lesson, index) => (
                <CapstoneItem
                  key={`${module.id}-${lesson.id}-${index}`}
                  capstone={lesson}
                  index={index}
                  moveLesson={moveLesson}
                  theme={theme}
                />
              ))}
            </div>
            <div>
              {module.assignment.map((lesson, index) => (
                <Assignment
                  key={`${module.id}-${lesson.id}-${index}`}
                  capstone={lesson}
                  index={index}
                  moveLesson={moveLesson}
                  theme={theme}
                />
              ))}
            </div>
            <div>
              {module.quiz.map((lesson, index) => (
                <QuizItems
                  key={`${module.id}-${lesson.id}-${index}`}
                  capstone={lesson}
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
              onClick={handleNewQuiz}
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
              onClick={handleNewCapstone}
              className="mb-2 px-4 py-4 rounded-[4px] bg-[#FF5050] text-white"
            >
              Capstone
            </button>
            <button
              onClick={handleNewAssignment}
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
        <NewCapstoneModal
          moduleId={newCapstone.module}
          lessonId={newCapstone.lesson}
          isOpen={newCapstone.status}
          closeModal={handleClose}
          handlecreate={addCapstone}
          moduleData={moduleObj}
          setModuleData={setCapstoneObj}
        />
        <NewAssignmentModal
          moduleId={newAssignment.module}
          lessonId={newAssignment.lesson}
          isOpen={newAssignment.status}
          closeModal={handleClose}
          handlecreate={addAssignment}
          moduleData={moduleObj}
          setModuleData={setAssignmentObj}
        />
        <NewQuizModal
          moduleId={newQuiz.module}
          lessonId={newQuiz.lesson}
          // isOpen={true}
          isOpen={newQuiz.status}
          closeModal={handleClose}
          handlecreate={addQuiz}
          moduleData={moduleObj}
          setModuleData={setQuizObj}
        />
        <div className="flex flex-row flex-wrap justify-start items-center gap-4">
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

export default CourseBuilder;
