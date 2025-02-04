import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { LoadingSpinner } from "../ui/loading-spinner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
// import { CourseServices } from "~/api/course";
import { RootState } from "~/redux-store/store";
import { useSelector } from "react-redux";
import { LessonItem } from "~/feature/admin/Items";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaPlusSquare } from "react-icons/fa";
import { RiDragMove2Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

interface IModalPropsType {
  moduleId: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: (moduleId: number) => void;
  moduleData: any;
  setModuleData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  title: string;
  embed: string;
  featuredImages: File[];
}

interface Lessons {
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
}

const initialFormData = {
  title: "",
  embed: "",
  featuredImages: [] as File[],
};

interface Answer {
  id: number;
  title: string;
  score: string;
  isCorrect: boolean;
}
export const NewQuizModal = ({
  moduleId,
  isOpen,
  closeModal,
  handlecreate,
  setModuleData,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [modules, setModules] = useState<Module[]>([]);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [selectedPdf] = useState<File | null>(null);
  const [selectedWord] = useState<File | null>(null);
  const [selectedMediaFile] = useState<File | null>(null);
  const [isDropDown, setIsisDropDown] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAddOption = () => {
    setAnswers([
      ...answers,
      { id: Date.now(), title: "", score: "", isCorrect: false },
    ]);
  };

  const handleAnswersChange = (id: number, key: string, value: any) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, [key]: value } : answer
      )
    );
  };
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    embed: "",
    featuredImages: [],
  });
  // Close modal
  const handleclose = useCallback(() => {
    setFormData(initialFormData);
    closeModal();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //   const handleImageUpload = (files: File[]) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       featuredImages: files,
  //     }));
  //   };

  //   const handleFileSelect = (file: File | null) => {
  //     setSelectedFile(file);
  //   };

  //   const handleWordSelect = (file: File | null) => {
  //     setSelectedWord(file);
  //   };

  //   const handleMediaUpload = (file: File | null) => {
  //     setMediaFile(file);
  //   };

  const handleSubmit = async () => {
    setisSubmitting(true);

    // Create a new FormData object
    const dataToSubmit = new FormData();
    dataToSubmit.append("programme_category_id", "2");
    dataToSubmit.append("course_id", courseId?.toString() || "");
    dataToSubmit.append("stream_video_audio", formData.embed);
    dataToSubmit.append("module_id", moduleId.toString() || "");
    dataToSubmit.append("lesson_title", formData.title);
    formData.featuredImages.forEach((file) => {
      dataToSubmit.append("lesson_image", file);
    });
    if (selectedPdf) {
      dataToSubmit.append("pdf_upload", selectedPdf);
    }
    if (selectedWord) {
      dataToSubmit.append("word_file", selectedWord);
    }
    if (selectedMediaFile) {
      dataToSubmit.append("video_audio_upload", selectedMediaFile);
    }
    console.log("FormData Payload:");
    for (const [key, value] of dataToSubmit.entries()) {
      console.log(`${key}:`, value);
    }
    // const res = await CourseServices.createCourseLesson(dataToSubmit);
    setModuleData((prevData: any) => ({
      ...prevData,
      title: "formData.title",
    }));

    setisSubmitting(false);
    handlecreate(moduleId);
    setFormData(initialFormData);
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

  const buttonOptions = [
    {
      label: "True/False",
      state: activeButton === "True/False",
      setState: () => setActiveButton("True/False"),
    },
    {
      label: "Single Choice",
      state: activeButton === "Single Choice",
      setState: () => setActiveButton("Single Choice"),
    },
    {
      label: "Multiple Choice",
      state: activeButton === "Multiple Choice",
      setState: () => setActiveButton("Multiple Choice"),
    },
    {
      label: "Open ended",
      state: activeButton === "Open ended",
      setState: () => setActiveButton("Open ended"),
    },
    {
      label: "Short answer/text",
      state: activeButton === "Short answer/text",
      setState: () => setActiveButton("Short answer/text"),
    },
    {
      label: "Marching",
      state: activeButton === "Marching",
      setState: () => setActiveButton("Marching"),
    },
    {
      label: "Image Answering",
      state: activeButton === "Image Answering",
      setState: () => setActiveButton("Image Answering"),
    },
    {
      label: "Image Marching",
      state: activeButton === "Image Marching",
      setState: () => setActiveButton("Image Marching"),
    },
    {
      label: "Ordering",
      state: activeButton === "Ordering",
      setState: () => setActiveButton("Ordering"),
    },
  ];

  const handleDragEnd = (result: DropResult) => {
    console.log(result);

    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedAnswers = Array.from(answers);
    const [movedItem] = reorderedAnswers.splice(result.source.index, 1);
    reorderedAnswers.splice(result.destination.index, 0, movedItem);

    setAnswers(reorderedAnswers); // Update state
  };

  const handleNewQuestion = () => {};

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px]"
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COURSE QUIZ
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
        <div className="py-6 w-full">
          <div className="my-4 w-full">
            <BaseInput
              label="Quiz Title"
              type="text"
              placeholder="Quiz Title"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[53px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.title}
              onChange={(e: any) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <BaseInput
              label="Instructions"
              type="textarea"
              placeholder="Instructions"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.embed}
              onChange={(e: any) =>
                handleInputChange("highlight", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex justify-end items-center w-full py-6 border-b-2 border-[#ddd]">
          <h1 className="font-DMSans font-bold text-[20px]">
            CREATED QUIZZES{" "}
          </h1>
          {modules.map((module) => (
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
          ))}
        </div>
        <div className="w-full">
          <div className="my-4 w-full">
            <BaseInput
              label="Quiz Question"
              type="textarea"
              placeholder="Quiz Question"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.embed}
              onChange={(e: any) =>
                handleInputChange("highlight", e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <button
              onClick={() => setIsisDropDown(!isDropDown)}
              className="w-full flex justify-between items-center bg-[#fff] p-4 border-[1px] border-[#ddd]"
            >
              <p className="text-[18px] font-DMSans font-bold">
                Select Question Type
              </p>
              {isDropDown ? (
                <FaChevronUp className="text-[25px]" />
              ) : (
                <FaChevronDown className="text-[25px]" />
              )}
            </button>
            <AnimatePresence>
              {isDropDown && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full rounded-sm bg-[#FFA396B2] grid grid-cols-2 lg:grid-cols-3 p-4 gap-2 overflow-hidden"
                >
                  {buttonOptions.map((option, index) => (
                    <button
                      key={index}
                      className={cn(
                        "py-2 px-4 rounded-sm",
                        option.state ? "bg-[#F01E00B2]" : "bg-[#FFFFFF]"
                      )}
                      onClick={option.setState}
                    >
                      <p
                        className={cn(
                          "text-[18px] font-DMSans font-bold",
                          option.state ? "text-[#ffff]" : "text-[#333]"
                        )}
                      >
                        {option.label}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {activeButton && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full rounded-sm py-4 overflow-hidden"
                >
                  <h2 className="font-DMSans text-[18px] font-bold mb-4">
                    Quiz Answers
                  </h2>
                  <div className="w-full flex justify-between items-center bg-[#F01E00] p-4">
                    <div className="flex justify-start items-center gap-2">
                      <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                        Ordering
                      </p>
                      <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                        Answer
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                        Correct
                      </p>
                      <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                        Point
                      </p>
                      <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]"></p>
                    </div>
                  </div>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable
                      droppableId="answersList"
                      key={activeButton ? "open" : "closed"}
                    >
                      {(provided) => (
                        <div
                          className="w-full"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {answers.map((answer, index) => (
                            <Draggable
                              key={answer.id}
                              draggableId={String(answer.id)}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  key={answer.id}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="w-full flex justify-between items-center border-b-[1px] border-[#ddd]"
                                >
                                  <div className="w-full lg:w-[50%] flex justify-between items-center">
                                    <button
                                      {...provided.dragHandleProps}
                                      className="p-2 rounded text-white"
                                    >
                                      <RiDragMove2Fill
                                        className={cn(
                                          "text-[25px] cursor-grab",
                                          theme === "dark"
                                            ? "text-[#fff]"
                                            : "text-[#333]"
                                        )}
                                      />
                                    </button>
                                    <div className="my-4 w-[80%]">
                                      <BaseInput
                                        label=""
                                        type="text"
                                        placeholder="Answer"
                                        containerClassname="w-full"
                                        labelClassName="text-[17px] font-DMSans font-semibold"
                                        inputContainerClassName={cn(
                                          "h-[40px] ",
                                          theme === "dark"
                                            ? "select-secondary"
                                            : "border-[0.5px] border-[#ddd]"
                                        )}
                                        value={answer.title}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                          handleAnswersChange(
                                            answer.id,
                                            "title",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-end gap-4 items-center lg:w-[50%]">
                                    <input
                                      type="radio"
                                      name="radio-8"
                                      className="radio radio-error"
                                      checked={answer.isCorrect}
                                      onChange={(e) =>
                                        handleAnswersChange(
                                          answer.id,
                                          "isCorrect",
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <div className="my-4 w-[30%]">
                                      <BaseInput
                                        label=""
                                        type="number"
                                        placeholder="Score"
                                        containerClassname="w-full"
                                        labelClassName="text-[17px] font-DMSans font-semibold"
                                        inputContainerClassName={cn(
                                          "h-[40px] ",
                                          theme === "dark"
                                            ? "select-secondary"
                                            : "border-[0.5px] border-[#ddd]"
                                        )}
                                        value={answer.score}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                          handleAnswersChange(
                                            answer.id,
                                            "score",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="w-[10%]">
                                      <GiCancel className="text-[25px]" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  {/* Add an Option Button */}
                  <button
                    className="flex justify-start hover:border-[1px] border-[#F01E00] rounded-md p-2 items-center gap-2 my-4"
                    onClick={handleAddOption}
                  >
                    <p className="font-DMSans font-bold text-[16px]">
                      Add an option
                    </p>
                    <FaPlusSquare className="text-[#F01E00] text-[20px]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-end items-center w-full py-6 border-b-2 border-[#ddd]">
          <button
            onClick={handleNewQuestion}
            className="mb-2 px-4 py-2 font-DMSans font-semibold text-[16px] rounded-[4px] bg-[#FF5050] text-white"
          >
            Add Question
          </button>
        </div>
        <div className="flex justify-start items-start gap-4">
          <button
            onClick={handleclose}
            className="w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              {" "}
              Save
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
