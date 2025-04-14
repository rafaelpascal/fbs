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
import { CourseServices } from "~/api/course";
import { useDispatch } from "react-redux";
import { setBooleanState } from "~/redux-store/slice/booleanSlice";
import { RemoveItemModal } from "~/components/Modal/RemoveItemModal";

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
  module_Id: number;
  module_number?: string;
  course_id?: number;
  id: number;
  title: string;
  description?: string;
  lessons: Lessons[];
  capstone: Capstone[];
  assignment: Capstone[];
  quiz: Capstone[];
  exam: Capstone[];
  resources: Capstone[]; // Add this
  caseStudy: Capstone[]; // Add this
  poll: Capstone[]; // Add this
}

interface ImoduleProps {
  number?: number;
  moduleId?: number;
  selectedModule?: number;
  title: string;
  description: string;
}

interface CourseBuilderProps {
  created: any;
  Initialmodules: any[];
  Initiallessons: any[];
  InitialQuiz: any[];
  CreatedNewItem: () => void;
}
const CourseBuilder: React.FC<CourseBuilderProps> = ({
  created,
  Initialmodules,
  Initiallessons,
  InitialQuiz,
  CreatedNewItem,
}) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [modules, setModules] = useState<Module[]>([]);
  const [isNewModule, setIsnewModule] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    id: 0,
    status: false,
  });
  const [newModule, setNewModule] = useState({
    number: 0,
    courseId: 0,
    status: false,
  });
  const [newLesson, setNewLesson] = useState({
    number: 0,
    module: 0,
    lessonId: 0,
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
    number: 0,
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

  useEffect(() => {
    if (Initialmodules?.length > 0) {
      // setSelectedModuleId(Initialmodules.length);
      const mappedModules: Module[] = Initialmodules.map((mod) => ({
        module_Id: mod.moduleid,
        id: mod.moduleid,
        title: `MODULE ${mod.module_number}: ${mod.module_title}`,
        module_number: mod.module_number,
        course_id: mod.course_id,
        lessons: Initiallessons.filter(
          (lesson) => lesson.module_id === mod.moduleid
        ).map((lesson) => ({
          ...lesson,
          id: lesson.lessonId || Date.now(),
          module_id: lesson.module_id,
          title: lesson.title,
          description: lesson.description,
          pages: lesson.pages || "",
          category: "lessons",
        })),
        quiz: InitialQuiz.filter((quiz) => quiz.module_id === mod.moduleid).map(
          (quiz) => ({
            ...quiz,
            id: quiz.quizid || Date.now(),
            module_id: quiz.module_id,
            title: quiz.title,
            description: "",
            pages: quiz.pages || "",
            category: "quiz",
          })
        ),
        capstone: [],
        assignment: [],
        // quiz: [],
        exam: [],
        resources: [],
        caseStudy: [],
        poll: [],
      }));
      setModules([...mappedModules]);
    }
  }, [Initialmodules, Initiallessons]);

  const addModule = async () => {
    // CreatedNewItem();
    setIsnewModule(true);
    setNewModule({
      number: modules.length + 1,
      courseId: 0,
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
      setModules((prevModules) => {
        const newModule: Module = {
          module_Id: moduleObj.moduleId || 0,
          id: prevModules.length + 1,
          title: `MODULE ${prevModules.length + 1}`,
          description: moduleObj.title,
          lessons: [],
          capstone: [],
          assignment: [],
          quiz: [],
          exam: [],
          resources: [],
          caseStudy: [],
          poll: [],
        };

        return [...prevModules, newModule];
      });

      setSelectedModuleId(modules.length + 1);
      setIsnewModule(false);
      setmoduleObj({
        moduleId: 0,
        title: "",
        description: "",
      });
    }
  }, [moduleObj, isNewModule]);

  const addNewItem = (type: keyof Module, obj: any, setObj: Function) => {
    if (!obj.title) return;
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.id === selectedModuleId) {
          const existingItems = (module[type] as any[]) || [];
          // Find an existing item using `module_id` and `title`
          const existingItem = existingItems.find(
            (item) => item.module_id === obj.moduleId
          );
          const updatedItems = existingItem
            ? existingItems.map(
                (item) =>
                  item.module_id === obj.moduleId && {
                    ...item,
                    title: obj.title,
                    description: obj.description,
                  }
              )
            : [
                // Otherwise, add a new item
                ...existingItems,
                {
                  id: Date.now(), // Generate a unique ID
                  module_id: selectedModuleId,
                  title: obj.title,
                  description: obj.description || "",
                  pages: "",
                },
              ];
          return { ...module, [type]: updatedItems };
        }
        return module;
      })
    );

    // Reset input object after adding/updating
    setObj({ title: "", description: "" });
    // CreatedNewItem();
  };

  // Single useEffect for all item types
  useEffect(() => {
    addNewItem("lessons", lessonObj, setlessonObj);
  }, [lessonObj]);

  useEffect(() => {
    addNewItem("resources", resourcesObj, setResourcesObj);
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
    addNewItem("poll", pollObj, setPollObj);
  }, [pollObj]);

  const removeModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const handleClose = () => {
    setNewModule({
      number: 0,
      courseId: 0,
      status: false,
    });
    setNewLesson({
      number: 0,
      module: 0,
      lessonId: 0,
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
      [
        "lessons",
        "capstone",
        "assignment",
        "caseStudy",
        "quiz",
        "exam",
        "poll",
        "resources",
      ].flatMap(
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
    targetCategory: keyof Module
  ) => {
    setModules((prevModules) => {
      // Find the specific module that needs updating
      const updatedModules = prevModules.map((module) => {
        if (module.id !== moduleId) return module;

        let draggedItem: any = null;
        const updatedModule = { ...module };

        let draggedFromCategory: string | null = null;
        let draggedFromIndex = -1;

        // Find and remove dragged item
        [
          "lessons",
          "capstone",
          "assignment",
          "caseStudy",
          "quiz",
          "exam",
          "poll",
          "resources",
        ].forEach((category) => {
          const items = (updatedModule as any)[category] || [];
          const index = items.findIndex((item: any) => item.id === draggedId);
          if (index !== -1) {
            draggedItem = items[index];
            draggedFromCategory = category;
            draggedFromIndex = index;
            (updatedModule as any)[category] = items.filter(
              (_: any, i: number) => i !== index
            );
          }
        });

        if (!draggedItem) return module;

        // Don't update state if item is dropped at its original position
        if (
          draggedFromCategory === targetCategory &&
          draggedFromIndex === hoveredIndex
        ) {
          return module;
        }

        // Insert into new location
        draggedItem.category = targetCategory;
        const targetItems = [...(updatedModule as any)[targetCategory]];
        targetItems.splice(hoveredIndex, 0, draggedItem);
        (updatedModule as any)[targetCategory] = targetItems;

        return updatedModule;
      });

      // Only update the module that has been changed
      return updatedModules;
    });
  };

  // const moveItem = (
  //   draggedId: number,
  //   hoveredIndex: number,
  //   moduleId: number,
  //   targetCategory: string
  // ) => {
  //   const allItems = getAllItems(moduleId);
  //   const draggedItem = allItems.find((item) => item.id === draggedId);

  //   if (!draggedItem) return;
  //   const updatedItem = { ...draggedItem, category: targetCategory };
  //   const filteredItems = allItems.filter((item) => item.id !== draggedId);
  //   const updatedModules = modules.map((module) => {
  //     if (module.id !== moduleId) return module;

  //     const newModuleData = { ...module };
  //     [
  //       "lessons",
  //       "capstone",
  //       "assignment",
  //       "caseStudy",
  //       "quiz",
  //       "exam",
  //       "poll",
  //       "resources",
  //     ].forEach((category) => {
  //       const categoryItems =
  //         category === targetCategory
  //           ? [...filteredItems.filter((item) => item.category === category)]
  //           : filteredItems.filter((item) => item.category === category);

  //       if (category === targetCategory) {
  //         categoryItems.splice(hoveredIndex, 0, updatedItem);
  //       }
  //       if (category in newModuleData) {
  //         (newModuleData as any)[category] = categoryItems.map((item) => ({
  //           ...item,
  //         }));
  //       }
  //     });

  //     return newModuleData;
  //   });

  //   setModules(updatedModules);
  // };

  const handleNewModule = (
    moduleNumber?: string | number,
    courseId?: number
  ) => {
    const moduleNum =
      moduleNumber !== undefined && moduleNumber !== null
        ? Number(moduleNumber)
        : selectedModuleId + 1;
    setNewModule({
      number: moduleNum,
      courseId: courseId ?? 0,
      status: true,
    });
  };

  const handleNewItem = async (
    type: string,
    setState: Function,
    item?: any
  ) => {
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

    // Update selectedModule if item.module_id exists
    if (item?.module_id) {
      setSelectedModuleId(item?.module_id);
      setSelectedModule((prev) => ({
        ...(prev as Module),
        module_Id: item.module_id,
      }));
    }

    const defaultValues: any = {
      lesson: {
        number: (selectedModule?.lessons?.length ?? 0) + 1,
        module: selectedModule?.module_Id || item.module_id || 0,
        lessonId: item == undefined ? 0 : item.lessonid || 0,
        status: true,
      },
      capstone: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      assignment: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      quiz: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      exam: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      resources: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      caseStudy: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
      poll: {
        module: selectedModule?.module_Id || 0,
        lesson: lessonObj.moduleId || 0,
        status: true,
      },
    };

    if (!defaultValues[type]) {
      return;
    }
    setState(defaultValues[type]);
  };

  const handleNewLesson = (item?: any) =>
    handleNewItem("lesson", setNewLesson, item);
  const handleNewCapstone = (item?: any) =>
    handleNewItem("capstone", setNewCapstone, item);
  const handleNewAssignment = (item?: any) =>
    handleNewItem("assignment", setNewAssignment, item);
  const handleNewQuiz = (item?: any) => handleNewItem("quiz", setNewQuiz, item);
  const handleNewExam = (item?: any) => handleNewItem("exam", setNewExam, item);
  const handleNewResources = (item?: any) =>
    handleNewItem("resources", setNewResources, item);
  const handleNewCaseStudy = (item?: any) =>
    handleNewItem("caseStudy", setNewCaseStudy, item);
  const handleNewPoll = (item?: any) => handleNewItem("poll", setNewPoll, item);

  const addItem = async (type: string, setState: Function) => {
    // Default structure for different items
    const defaultValues: any = {
      lesson: { number: 0, module: 0, status: false },
      capstone: { module: 0, lesson: 0, status: false },
      assignment: { module: 0, lesson: 0, status: false },
      quiz: { module: 0, lesson: 0, status: false },
      exam: { module: 0, lesson: 0, status: false },
      caseStudy: { module: 0, lesson: 0, status: false },
      resources: { module: 0, lesson: 0, status: false },
      poll: { module: 0, lesson: 0, status: false },
    };

    if (!defaultValues[type]) {
      return;
    }

    // Set state dynamically
    setState(defaultValues[type]);

    await showAlert(
      "success",
      "Created!",
      `${type.charAt(0).toUpperCase() + type.slice(1)} Successfully Created!`,
      "Ok",
      "#03435F",
      () => CreatedNewItem()
    );

    // Check if the selected module exists
    // const selectedModule = modules.find(
    //   (module) => module.id === selectedModuleId
    // );

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

  const addLesson = () => addItem("lesson", setNewLesson);
  const addCapstone = () => addItem("capstone", setNewCapstone);
  const addAssignment = () => addItem("assignment", setNewAssignment);
  const addQuiz = () => addItem("quiz", setNewQuiz);
  const addExam = () => addItem("exam", setNewExam);
  const addResources = () => addItem("resources", setNewResources);
  const addCaseStudy = () => addItem("caseStudy", setNewCaseStudy);
  const addPoll = () => addItem("poll", setNewPoll);

  const handleRemoveLesson = async (id: number) => {
    const payload = { lessonid: id };
    const res = await CourseServices.deleteCourseLesson(payload);
    dispatch(setBooleanState(true));
    if (res) {
      await showAlert(
        "success",
        "Deleted!",
        "Lesson Successfully Deleted!",
        "Ok",
        "#03435F"
      );
    }
  };
  const handleRemoveModule = async (id: number) => {
    const payload = { moduleid: id };
    const res = await CourseServices.deleteCourseModule(payload);
    if (res) {
      await showAlert(
        "success",
        "Deleted!",
        "Module Successfully Deleted!",
        "Ok",
        "#03435F"
      );
    }
    removeModule(id);
  };
  const handlePublish = () => {
    created();
  };

  const buttons = [
    { label: "Module", onClick: () => handleNewModule(undefined, undefined) },
    // { label: "Lesson", onClick: handleNewLesson },
    // { label: "Quiz", onClick: handleNewQuiz },
    // { label: "Polls", onClick: handleNewPoll },
    // { label: "Capstone", onClick: handleNewCapstone },
    // { label: "Assignments", onClick: handleNewAssignment },
    // { label: "Resources" },
    // { label: "Case study" },
    // { label: "Exam", onClick: handleNewExam },
    { label: "Live streaming" },
  ];

  const componentMap: Record<string, React.ComponentType<any>> = {
    lessons: (props) => (
      <DraggableItem
        {...props}
        handleNewLesson={handleNewLesson}
        handleRemove={handleRemoveLesson}
        type="LESSON"
      />
    ),
    poll: (props) => (
      <DraggableItem {...props} handleNewLesson={handleNewPoll} type="POLL" />
    ),
    capstone: (props) => (
      <DraggableItem
        {...props}
        handleNewLesson={handleNewCapstone}
        type="CAPSTONE"
      />
    ),
    assignment: (props) => (
      <DraggableItem
        {...props}
        handleNewLesson={handleNewAssignment}
        type="ASSIGNMENT"
      />
    ),
    quiz: (props) => (
      <DraggableItem {...props} handleNewLesson={handleNewQuiz} type="QUIZ" />
    ),
    exam: (props) => (
      <DraggableItem {...props} handleNewLesson={handleNewExam} type="EXAM" />
    ),
    caseStudy: (props) => (
      <DraggableItem
        {...props}
        handleNewLesson={handleNewCapstone}
        type="CASESTUDY"
      />
    ),
    resources: (props) => (
      <DraggableItem
        {...props}
        handleNewLesson={handleNewResources}
        type="RESOURCES"
      />
    ),
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
                    {module.title}
                  </h2>
                  <h2 className="font-DMSans font-semibold text-[18px] text-[#FFFFFF]">
                    {module.description}
                  </h2>
                </div>
                <div className="flex justify-end items-end gap-2">
                  <button
                    onClick={() =>
                      handleNewModule(
                        module.module_number ? module.module_number : undefined,
                        module.id
                      )
                    }
                  >
                    <FiEdit className="text-[30px] text-[#FFFFFF]" />
                  </button>
                  <button
                    onClick={() =>
                      setIsModalOpen({
                        id: module.id,
                        status: true,
                      })
                    }
                  >
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
                )}px`,
                left: `${menuPosition.left}px`,
              }}
            >
              <div className="flex flex-col w-full">
                <button
                  onClick={() => handleNewLesson(undefined)}
                  className="w-full text-white px-4 py-3 text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Lesson
                </button>
                <button
                  onClick={() => handleNewResources(undefined)}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Resources
                </button>
                <button
                  onClick={() => handleNewCaseStudy(undefined)}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Case Study
                </button>
                <button
                  onClick={() => handleNewQuiz(undefined)}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Quiz
                </button>
                <button
                  onClick={() => handleNewCapstone(undefined)}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Capstone
                </button>
                <button
                  onClick={() => handleNewAssignment(undefined)}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Add Assignment
                </button>
                <button
                  onClick={() => handleNewPoll(undefined)}
                  className="w-full px-4 py-3 text-white text-left hover:bg-[#eb4141] dark:hover:bg-[#eb4141]"
                >
                  Poll
                </button>
                <button
                  onClick={() => handleNewExam(undefined)}
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
      <RemoveItemModal
        isOpen={isModalOpen.status}
        closeModal={() =>
          setIsModalOpen({
            id: 0,
            status: false,
          })
        }
        id={0}
        message={`Are you sure you want to remove?`}
        onConfirm={() => {
          handleRemoveModule(isModalOpen.id);
          setIsModalOpen({
            id: 0,
            status: false,
          });
        }}
      />
    </DndProvider>
  );
};

export default CourseBuilder;
