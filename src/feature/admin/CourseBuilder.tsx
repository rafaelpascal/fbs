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
//import { R } from "node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o";

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
  resources: Capstone[]; // Add this
  caseStudy: Capstone[]; // Add this
  polls: Capstone[]; // Add this
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
  const [newResources, setNewResources] = useState({
    module: 0,
    lesson: 0,
    status: false,
  });

  const [newCaseStudy, setNewCaseStudy] = useState({
    module: 0,
    lesson: 0,
    status: false,
  });

  const [newPoll, setNewPoll] = useState({
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
  const [resourcesObj, setResourcesObj] = useState<ImoduleProps>({
    title: "",
    description: "",
  });

  const [caseStudyObj, setCaseStudyObj] = useState<ImoduleProps>({
    title: "",
    description: "",
  });

  const [pollObj, setPollObj] = useState<ImoduleProps>({
    title: "",
    description: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  console.log(selectedModule);
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
        resources: [], // Add this
        caseStudy: [], // Add this
        polls: [], // Add this
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
                ...((module[type] as any[]) || []),
                {
                  id: Date.now(),
                  moduleId: selectedModuleId,
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
    addNewItem("lessons", resourcesObj, setResourcesObj);
  }, [resourcesObj]);
  useEffect(() => {
    addNewItem("caseStudy", caseStudyObj, setCaseStudyObj);
  }, [caseStudyObj]);

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

  useEffect(() => {
    addNewItem("polls", pollObj, setPollObj);
  }, [pollObj]);

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
    setNewResources({
      module: 0,
      lesson: 0,
      status: false,
    });
    setNewCaseStudy({
      module: 0,
      lesson: 0,
      status: false,
    });
    setNewPoll({
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
      ["lessons", "capstone", "assignment", "quiz", "exam", "poll"].flatMap(
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
      ["lessons", "capstone", "assignment", "quiz", "exam", "poll"].forEach(
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
      resources: {
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      caseStudy: {
        module: moduleObj.moduleId || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      poll: {
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
  const handleNewResources = () => handleNewItem("resources", setNewResources);
  const handleNewCaseStudy = () => handleNewItem("caseStudy", setNewCaseStudy);
  const handleNewPoll = () => handleNewItem("poll", setNewPoll);

  const addItem = async (type: string, setState: Function) => {
    // Default structure for different items
    const defaultValues: any = {
      lesson: { module: 0, status: false },
      capstone: { module: 0, lesson: 0, status: false },
      assignment: { module: 0, lesson: 0, status: false },
      quiz: { module: 0, lesson: 0, status: false },
      exam: { module: 0, lesson: 0, status: false },
      caseStudy: { module: 0, lesson: 0, status: false },
      resources: { module: 0, lesson: 0, status: false },
      poll: { module: 0, lesson: 0, status: false },
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
  const addResources = () => addItem("resources", setNewResources);
  const addCaseStudy = () => addItem("caseStudy", setNewCaseStudy);
  const addPoll = () => addItem("poll", setNewPoll);

  const handlePublish = () => {
    created();
  };

  const buttons = [
    { label: "Module", onClick: handleNewModule },
    // { label: "Lesson", onClick: handleNewLesson },
    // { label: "Quiz", onClick: handleNewQuiz },
    { label: "Polls", onClick: handleNewPoll },
    // { label: "Capstone", onClick: handleNewCapstone },
    // { label: "Assignments", onClick: handleNewAssignment },
    { label: "Resources" },
    { label: "Case study" },
    // { label: "Exam", onClick: handleNewExam },
    { label: "Live streaming" },
  ];

  const componentMap: Record<string, React.ComponentType<any>> = {
    lessons: (props) => <DraggableItem {...props} type="LESSON" />,
    capstone: (props) => <DraggableItem {...props} type="CAPSTONE" />,
    assignment: (props) => <DraggableItem {...props} type="ASSIGNMENT" />,
    quiz: (props) => <DraggableItem {...props} type="QUIZ" />,
    exam: (props) => <DraggableItem {...props} type="EXAM" />,
    caseStudy: (props) => <DraggableItem {...props} type="CASE_STUDY" />,
    resources: (props) => <DraggableItem {...props} type="RESOURCES" />,
  };

  const handleOpenSidebar = (module: Module, event: React.MouseEvent) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    const position = {
      top: rect.bottom + window.scrollY,
      left: isMobile
        ? (window.innerWidth - 192) / 2
        : Math.max(0, rect.right - 80),
    };

    setMenuPosition(position);
    setSelectedModule(module);
    // Add this line to update selectedModuleId
    setSelectedModuleId(module.id);
    setIsSidebarOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <h2 className="font-DMSans mb-2 text-[18px] font-semibold">
          CONTENT BUILDER
        </h2>

        {modules.map((module) => (
          <div
            key={module.id}
            className="flex justify-center items-center w-full"
          >
            <div className="my-2 w-[90%] " key={module.id}>
              <div
                className={cn(
                  "p-3 w-full shadow-md flex flex-row justify-between items-start mb-2 relative bg-[#FF5050]"
                  // theme === "dark"
                  //   ? "bg-transparent border-[0.5px] border-[#ddd]"
                  //   : "bg-[#B3B3B3]/10"
                )}
              >
                <div className="flex flex-col lg:flex-row justify-start items-start gap-2">
                  <h2 className="font-DMSans font-semibold text-[18px] text-[#FFFFFF]">
                    {module.title}:
                  </h2>
                  <h2 className="font-DMSans font-semibold text-[18px] text-[#FFFFFF]">
                    {module.description}
                  </h2>
                </div>
                <div className="flex justify-end items-end gap-2">
                  <button>
                    <FiEdit className="text-[30px] text-[#FFFFFF]" />
                  </button>
                  <button onClick={() => removeModule(module.id)}>
                    <MdOutlineCancel className="text-[30px] text-[#FFFFFF]" />
                  </button>
                  <button
                    onClick={(e) => handleOpenSidebar(module, e)}
                    className="px-4 py-2 bg-[#eb4141] text-white rounded-md hover:bg-[#03435F]/80"
                  >
                    New
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
          </div>
        ))}

        <ButtonGrid buttons={buttons} />
        <ModalContainer
          modals={{
            newModule,
            newPoll,
            newLesson,
            newCapstone,
            newAssignment,
            newQuiz,
            newExam,
            newResources,
            newCaseStudy,
          }}
          handleClose={handleClose}
          addModule={addModule}
          addPoll={addPoll}
          addLesson={addLesson}
          addResources={addResources}
          addCaseStudy={addCaseStudy}
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
          setPollObj={setPollObj}
          setResourcesObj={setResourcesObj}
          setCaseStudyObj={setCaseStudyObj}
        />
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div
              className={cn(
                "fixed z-50 w-48 py-1 rounded-md shadow-lg border border-gray-200",
                "max-h-[90vh] overflow-y-auto",
                theme === "dark"
                  ? "bg-[#FF5050] text-white border-gray-700"
                  : "bg-[#FF5050]"
              )}
              style={{
                top: `${Math.min(
                  menuPosition.top,
                  window.innerHeight - 300
                )}px`, // Prevent overflow at bottom
                left: `${menuPosition.left}px`, // Use calculated left position
              }}
            >
              <div className="flex flex-col w-full">
                <button
                  onClick={handleNewLesson}
                  className="w-full text-white px-4 py-3 text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Lesson
                </button>
                <button
                  onClick={handleNewResources}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Resources
                </button>
                <button
                  onClick={handleNewCaseStudy}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Case Study
                </button>
                <button
                  onClick={handleNewQuiz}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Quiz
                </button>
                <button
                  onClick={handleNewCapstone}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Capstone
                </button>
                <button
                  onClick={handleNewAssignment}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Assignment
                </button>
                <button
                  onClick={handleNewExam}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Exam
                </button>
              </div>
            </div>
          </>
        )}
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
