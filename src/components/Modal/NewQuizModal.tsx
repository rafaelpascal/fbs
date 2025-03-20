import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaPlusSquare } from "react-icons/fa";
import { RiDragMove2Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { CourseServices } from "~/api/course";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";

interface IModalPropsType {
  moduleId: number;
  lessonId: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: (moduleId: number) => void;
  moduleData: any;
  setModuleData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  question: string;
  title: string;
  description: string;
  timelimit: string;
  feedback: { [key: string]: boolean };
}

// interface Lessons {
//   id: number;
//   title: string;
//   description: string;
//   pages: string;
// }
// interface Module {
//   id: number;
//   title: string;
//   description: string;
// }

const initialFormData: FormData = {
  question: "",
  title: "",
  description: "",
  timelimit: "",
  feedback: {},
};

interface Answer {
  id: number;
  title: string;
  score: string;
  isCorrect: boolean;
}

const feedbackMode = [
  {
    id: 1,
    title: "Answers show after all quiz is completed",
  },
  {
    id: 2,
    title: "Show results after each quiz attempt",
  },
];
export const NewQuizModal = ({
  moduleId,
  lessonId,
  isOpen,
  closeModal,
  handlecreate,
  setModuleData,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  //   const [modules, setModules] = useState<Module[]>([]);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isFeedbackMode, setisFeedbackMode] = useState(false);
  const [isquestionSaved, setisquestionSaved] = useState(false);
  const [IsAnswer, setIsAnswer] = useState(false);
  const [isDropDown, setIsisDropDown] = useState(false);
  const [questionsubmitting, setQuestionsubmitting] = useState(false);
  const [answerAdded, setAnswerAdded] = useState(false);
  const [isAnswerSubmitting, setIsAnswerSubmitting] = useState(false);
  const [isQuizId, setisQuizId] = useState(0);
  const [isQuestionId, setisQuestionId] = useState(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [quizanswers, setAnswers] = useState<Answer[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleAddOption = () => {
    setAnswers([
      ...quizanswers,
      { id: Date.now(), title: "", score: "", isCorrect: false },
    ]);
  };

  const handleAnswersChange = (id: number, field: string, value: any) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, [field]: value } : answer
      )
    );
  };

  const [formData, setFormData] = useState<FormData>({
    question: "",
    title: "",
    description: "",
    feedback: {},
    timelimit: "",
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

  useEffect(() => {
    console.log(lessonId, "lessonId");
  }, [lessonId]);

  const checkedTitles = Object.keys(formData.feedback || {}).filter(
    (key) => formData.feedback[key]
  );
  const handleSubmit = async () => {
    setisSubmitting(true);

    const payload = {
      // course_id: 8,
      course_id: courseId,
      module_id: moduleId,
      lesson_id: lessonId,
      title: formData.title,
      description: formData.description,
      time: parseInt(formData.timelimit),
      display_status: "",
      point_status: "",
      feedback_mode: checkedTitles,
    };
    const res = await CourseServices.createCourseQuiz(payload);
    setModuleData((prevData: any) => ({
      ...prevData,
      title: formData.title,
    }));
    setisQuizId(res.data.data.quiz_id);
    const newQuiz = {
      title: formData.title,
      description: formData.description,
      timelimit: formData.timelimit,
      feedback: formData.feedback,
    };
    setisquestionSaved(true);
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    setisSubmitting(false);
  };

  const handleQuestionSubmit = async () => {
    try {
      setQuestionsubmitting(true);
      const payload = {
        quiz_title_id: isQuizId,
        questions: formData.question,
        question_type: activeButton,
      };
      const res = await CourseServices.createCourseQuizQuestion(payload);
      setIsAnswer(true);
      setisquestionSaved(false);
      setisQuestionId(res.data.data.question_id);
      const newQuiz = {
        title: formData.question,
        description: activeButton,
      };
      setQuestions((prevQuizzes) => [...prevQuizzes, newQuiz]);
      setQuestionsubmitting(false);
      setFormData(initialFormData);
    } catch (error) {
      setQuestionsubmitting(false);
    }
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
    if (!result.destination) return;
    const reorderedAnswers = Array.from(quizanswers);
    const [movedItem] = reorderedAnswers.splice(result.source.index, 1);
    reorderedAnswers.splice(result.destination.index, 0, movedItem);

    setAnswers(reorderedAnswers);
  };

  const handleCheckboxChange = (title: string) => {
    setFormData((prevData) => ({
      ...prevData,
      feedback: { [title]: true },
    }));
  };

  const handleSubmitAnswers = async () => {
    setIsAnswerSubmitting(true);
    try {
      const formattedAnswers = quizanswers.map(
        ({ title, isCorrect, score }) => ({
          question_id: isQuestionId,
          answer_text: title,
          is_correct: isCorrect ? 1 : 0,
          answer_score: Number(score),
        })
      );
      const payload = {
        answers: formattedAnswers,
      };
      await CourseServices.createCourseQuizAnswers(payload);
      setIsAnswerSubmitting(false);
      setAnswerAdded(true);
      setIsAnswer(false);
      setAnswers([]);
      setActiveButton(null);
    } catch (error) {
      setIsAnswerSubmitting(false);
      setQuestionsubmitting(false);
      console.error("Error submitting answers:", error);
    }
  };

  const finalize = async () => {
    handlecreate(moduleId);
    setFormData(initialFormData);
    setQuizzes([]);
    setQuestions([]);
    setisQuizId(0);
  };

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
        {quizzes.length !== 0 && (
          <div className="flex justify-end flex-col items-center w-full py-6 ">
            <h1 className="font-DMSans text-left w-full font-bold text-[20px]">
              CREATED QUIZZES{" "}
            </h1>
            <div className="w-full">
              {quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="p-2 border border-gray-300 rounded-md my-2"
                >
                  <h2 className="font-semibold text-lg">{quiz.title}</h2>
                  {/* <p className="text-sm">{quiz.description}</p> */}
                  <p className="text-sm">
                    Time Limit:{" "}
                    {quiz.timelimit === "0" ? "No time limit" : quiz.timelimit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full">
          {isQuizId === 0 && (
            <>
              <div className="w-full">
                <div className="my-4 w-full">
                  <BaseInput
                    label="Quiz Title"
                    type="text"
                    placeholder="Quiz Title"
                    containerClassname="w-full"
                    labelClassName="text-[17px] font-DMSans font-semibold"
                    inputContainerClassName={cn(
                      "h-[53px] ",
                      theme === "dark" ? "select-secondary" : ""
                    )}
                    value={formData.title}
                    onChange={(e: any) =>
                      handleInputChange("title", e.target.value)
                    }
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
                    value={formData.description}
                    onChange={(e: any) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="w-full flex justify-between lg:w-[20%]">
                <BaseInput
                  label="TIME LIMIT (MINUTES)"
                  type="text"
                  placeholder="TIME LIMIT"
                  containerClassname="w-full"
                  labelClassName="text-[17px] font-DMSans font-semibold"
                  inputContainerClassName={cn(
                    "h-[53px] ",
                    theme === "dark"
                      ? "select-secondary"
                      : "border-[0.5px] border-[#ddd]"
                  )}
                  value={formData.timelimit}
                  onChange={(e: any) =>
                    handleInputChange("timelimit", e.target.value)
                  }
                />
              </div>
              <p className="font-DMSans font-semibold text-[16px] my-2">
                Time limit for this quiz, 0 means no time limit
              </p>
              <div className="w-full my-4 border-[1px] border-[#B3B3B3] rounded-md p-4">
                <button
                  onClick={() => setisFeedbackMode(!isFeedbackMode)}
                  className="w-full p-2 flex justify-between items-center"
                >
                  <p className="font-DMSans font-semibold text-[18px]">
                    QUIZ FEEDBACK MODE
                  </p>
                  {isFeedbackMode ? (
                    <BiUpArrow className="size-[20px]" />
                  ) : (
                    <BiDownArrow className="size-[20px]" />
                  )}
                </button>
                {isFeedbackMode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {feedbackMode.map((option, index) => (
                      <div
                        key={index}
                        className="w-full my-4 p-2 rounded-md bg-[#f5f5f5] border-[2px] border-[#ddd]"
                      >
                        <label className="flex justify-start items-center gap-4 cursor-pointer label">
                          <input
                            type="checkbox"
                            checked={
                              formData.feedback &&
                              formData.feedback[option.title] === true
                            }
                            onChange={() => handleCheckboxChange(option.title)}
                            className="checkbox checkbox-success [--chkbg:theme(colors.green.600)] [--chkfg:white]"
                          />
                          <span className="font-DMSans text-[18px] font-semibold">
                            {option.title}
                          </span>
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              {/* <div className="flex justify-end items-center w-full py-6">
                <button
                  onClick={handleSubmit}
                  className="mb-2 px-4 py-2 flex justify-center items-center gap-3 font-DMSans font-semibold text-[16px] rounded-[4px] bg-[#FF5050] text-white"
                >
                  <p>Create Quiz</p>
                  {isSubmitting && <LoadingSpinner size="xs" />}
                </button>
              </div> */}
            </>
          )}
        </div>
        {questions.length !== 0 && (
          <div className="flex justify-end flex-col items-center w-full pb-6 ">
            <h1 className="font-DMSans text-left w-full font-bold text-[20px]">
              QUIZ QUESTION{" "}
            </h1>
            <div className="w-full">
              {questions.map((quiz, index) => (
                <div
                  key={index}
                  className="p-2 border border-gray-300 rounded-md my-2"
                >
                  <h2 className="font-semibold text-lg">{quiz.title}</h2>
                  <p className="text-sm">{quiz.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Question */}
        {isquestionSaved && (
          <div className="w-full">
            <div className="mb-4 w-full">
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
                value={formData.question}
                onChange={(e: any) =>
                  handleInputChange("question", e.target.value)
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
              <div className="flex justify-end items-center w-full py-6">
                <button
                  onClick={handleQuestionSubmit}
                  className="mb-2 px-4 py-2 flex justify-center items-center gap-3 font-DMSans font-semibold text-[16px] rounded-[4px] bg-[#FF5050] text-white"
                >
                  <p> Save Question</p>
                  {questionsubmitting && <LoadingSpinner size="xs" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Answer */}
        <div className="w-full">
          <AnimatePresence>
            {IsAnswer && (
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
                        {quizanswers.map((answer, index) => (
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
                                    checked={!!answer.isCorrect}
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
                                  <div className="w-[15%] flex justify-between items-center gap-3">
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

                <div className="w-full flex justify-between items-center">
                  <button
                    className="flex justify-start hover:border-[1px] border-[#F01E00] rounded-md p-2 items-center gap-2 my-4"
                    onClick={handleAddOption}
                  >
                    <p className="font-DMSans font-bold text-[16px]">
                      Add an option
                    </p>
                    <FaPlusSquare className="text-[#F01E00] text-[20px]" />
                  </button>
                  <div className="flex justify-end items-center py-6">
                    <button
                      onClick={handleSubmitAnswers}
                      className="mb-2 px-4 py-2 flex justify-between gap-4 items-center font-DMSans font-semibold text-[16px] rounded-[4px] bg-[#FF5050] text-white"
                    >
                      Save Answer
                      {isAnswerSubmitting && <LoadingSpinner size="xs" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!isquestionSaved && isQuizId !== 0 && (
          <div className="flex justify-end items-center w-full py-6">
            <button
              onClick={() => setisquestionSaved(true)}
              className="mb-2 px-4 py-2 font-DMSans font-semibold text-[16px] rounded-[4px] bg-[#FF5050] text-white"
            >
              Add Question
            </button>
          </div>
        )}
        <div className="flex justify-start items-start gap-4">
          <button
            onClick={handleclose}
            className="w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            Cancel
          </button>
          {isQuizId === 0 && (
            <button
              onClick={handleSubmit}
              className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
            >
              <p className="font-DMSans font-semibold text-[16px] text-white">
                {" "}
                Create Quiz
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          )}
          {answerAdded && (
            <button
              onClick={finalize}
              className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
            >
              <p className="font-DMSans font-semibold text-[16px] text-white">
                {" "}
                Save
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
