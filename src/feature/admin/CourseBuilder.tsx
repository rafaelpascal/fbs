// export default CourseBuilder;
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import { showAlert } from "~/utils/sweetAlert";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableItem } from "./Items";
import ButtonGrid from "./BuilderButtons";
import ModalContainer from "./ModalContainer";

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
  exam: Capstone[];
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
  const [newExam, setNewExam] = useState({
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
  const [examObj, setExamObj] = useState<ImoduleProps>({
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
        exam: [],
      };

      setModules((prevModules) => [...prevModules, newModule]);
      setSelectedModuleId(newModule.id);
      setIsnewModule(false);
    }
  }, [moduleObj, isNewModule]);

  const addNewItem = (type: keyof Module, obj: any, setObj: Function) => {
    if (!obj.title) return;

    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === selectedModuleId
          ? {
              ...module,
              [type]: [
                ...((module[type] as any[]) || []), // Keep existing items of this module
                {
                  id: Date.now(),
                  moduleId: selectedModuleId, // Store moduleId instead of module
                  title: type.toUpperCase(),
                  description: obj.title,
                  pages: "",
                },
              ],
            }
          : module
      )
    );

    setObj({ title: "", description: "" });
  };

  // Single useEffect for all item types
  useEffect(() => {
    addNewItem("lessons", lessonObj, setlessonObj);
  }, [lessonObj]);

  useEffect(() => {
    addNewItem("capstone", capstoneObj, setCapstoneObj);
  }, [capstoneObj]);

  useEffect(() => {
    addNewItem("assignment", assignmentObj, setAssignmentObj);
  }, [assignmentObj]);

  useEffect(() => {
    addNewItem("quiz", quizObj, setQuizObj);
  }, [quizObj]);

  useEffect(() => {
    addNewItem("exam", examObj, setExamObj);
  }, [examObj]);

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
    setNewExam({
      module: 0,
      lesson: 0,
      status: false,
    });
  };

  const getAllItems = (moduleId?: number) => {
    const relevantModules = moduleId
      ? modules.filter((m) => m.id === moduleId)
      : modules;
    return relevantModules.flatMap((module) =>
      ["lessons", "capstone", "assignment", "quiz", "exam"].flatMap(
        (category) =>
          (module as Record<string, any>)[category]?.map((item: any) => ({
            ...item,
            category,
            moduleId: module.id,
          })) || []
      )
    );
  };

  const moveItem = (
    draggedId: number,
    hoveredIndex: number,
    moduleId: number,
    targetCategory: string
  ) => {
    const allItems = getAllItems(moduleId);
    const draggedItem = allItems.find((item) => item.id === draggedId);

    if (!draggedItem) return;
    const updatedItem = { ...draggedItem, category: targetCategory };
    const filteredItems = allItems.filter((item) => item.id !== draggedId);
    const updatedModules = modules.map((module) => {
      if (module.id !== moduleId) return module;

      const newModuleData = { ...module };
      ["lessons", "capstone", "assignment", "quiz", "exam"].forEach(
        (category) => {
          const categoryItems =
            category === targetCategory
              ? [...filteredItems.filter((item) => item.category === category)]
              : filteredItems.filter((item) => item.category === category);

          if (category === targetCategory) {
            categoryItems.splice(hoveredIndex, 0, updatedItem);
          }
          if (category in newModuleData) {
            (newModuleData as any)[category] = categoryItems.map((item) => ({
              ...item,
            }));
          }
        }
      );

      return newModuleData;
    });

    setModules(updatedModules);
  };

  const handleNewModule = () => {
    setNewModule({
      number: selectedModuleId + 1,
      status: true,
    });
  };

  const handleNewItem = async (type: string, setState: Function) => {
    if (modules.length === 0) {
      await showAlert(
        "error",
        "Unauthorized!",
        "Please create a module first!",
        "Ok",
        "#FF5050"
      );
      return;
    }
    const defaultValues: any = {
      lesson: { module: moduleObj.moduleId || 0, status: true },
      capstone: {
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      assignment: {
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      quiz: {
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      exam: {
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
    };

    if (!defaultValues[type]) {
      console.error("Invalid type provided:", type);
      return;
    }
    setState(defaultValues[type]);
  };

  const handleNewLesson = () => handleNewItem("lesson", setNewLesson);
  const handleNewCapstone = () => handleNewItem("capstone", setNewCapstone);
  const handleNewAssignment = () =>
    handleNewItem("assignment", setNewAssignment);
  const handleNewQuiz = () => handleNewItem("quiz", setNewQuiz);
  const handleNewExam = () => handleNewItem("exam", setNewExam);

  const addItem = async (type: string, setState: Function) => {
    // Default structure for different items
    const defaultValues: any = {
      lesson: { module: 0, status: false },
      capstone: { module: 0, lesson: 0, status: false },
      assignment: { module: 0, lesson: 0, status: false },
      quiz: { module: 0, lesson: 0, status: false },
      exam: { module: 0, lesson: 0, status: false },
    };

    if (!defaultValues[type]) {
      console.error("Invalid type provided:", type);
      return;
    }

    // Set state dynamically
    setState(defaultValues[type]);

    await showAlert(
      "success",
      "Created!",
      `${type.charAt(0).toUpperCase() + type.slice(1)} Successfully Created!`,
      "Ok",
      "#03435F"
    );

    // Check if the selected module exists
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

  const addLesson = () => addItem("lesson", setNewLesson);
  const addCapstone = () => addItem("capstone", setNewCapstone);
  const addAssignment = () => addItem("assignment", setNewAssignment);
  const addQuiz = () => addItem("quiz", setNewQuiz);
  const addExam = () => addItem("exam", setNewExam);

  const handlePublish = () => {
    created();
  };

  const buttons = [
    { label: "Module", onClick: handleNewModule },
    { label: "Lesson", onClick: handleNewLesson },
    { label: "Quiz", onClick: handleNewQuiz },
    { label: "Polls" },
    { label: "Capstone", onClick: handleNewCapstone },
    { label: "Assignments", onClick: handleNewAssignment },
    { label: "Resources" },
    { label: "Case study" },
    { label: "Exam", onClick: handleNewExam },
    { label: "Live streaming" },
  ];

  const componentMap: Record<string, React.ComponentType<any>> = {
    lessons: (props) => <DraggableItem {...props} type="LESSON" />,
    capstone: (props) => <DraggableItem {...props} type="CAPSTONE" />,
    assignment: (props) => <DraggableItem {...props} type="ASSIGNMENT" />,
    quiz: (props) => <DraggableItem {...props} type="QUIZ" />,
    exam: (props) => <DraggableItem {...props} type="EXAM" />,
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
              <div className="flex flex-col lg:flex-row justify-start items-start gap-2">
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
              {getAllItems(module.id).map((item, index) => {
                const Component = componentMap[item.category];
                return (
                  <Component
                    key={`${item.id}-${index}`}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                    theme={theme}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <ButtonGrid buttons={buttons} />
        <ModalContainer
          modals={{
            newModule,
            newLesson,
            newCapstone,
            newAssignment,
            newQuiz,
            newExam,
          }}
          handleClose={handleClose}
          addModule={addModule}
          addLesson={addLesson}
          addCapstone={addCapstone}
          addAssignment={addAssignment}
          addQuiz={addQuiz}
          addExam={addExam}
          moduleObj={moduleObj}
          setModuleObj={setmoduleObj}
          setLessonObj={setlessonObj}
          setCapstoneObj={setCapstoneObj}
          setAssignmentObj={setAssignmentObj}
          setQuizObj={setQuizObj}
          setExamObj={setExamObj}
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
