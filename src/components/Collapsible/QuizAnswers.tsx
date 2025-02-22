import { AnimatePresence, motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RiDragMove2Fill } from "react-icons/ri";
import { FaPlusSquare } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { BaseInput } from "../data-inputs/text-input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { cn } from "~/utils/helpers";

interface QuizAnswer {
  id: string;
  title: string;
  isCorrect: boolean;
  score: number;
}

interface QuizAnswersProps {
  isOpen: boolean;
  theme: string;
  title: string;
  quizAnswers: QuizAnswer[];
  handleDragEnd: (result: any) => void;
  handleAnswersChange: (
    id: string,
    field: string,
    value: string | boolean
  ) => void;
  handleAddOption: () => void;
  handleSubmitAnswers: () => void;
  isAnswerSubmitting: boolean;
  removeAnswer: (id: string) => void;
}

const QuizAnswers: React.FC<QuizAnswersProps> = ({
  isOpen,
  title,
  theme,
  quizAnswers,
  handleDragEnd,
  handleAnswersChange,
  handleAddOption,
  handleSubmitAnswers,
  isAnswerSubmitting,
  removeAnswer,
}) => {
  return (
    <div className="w-full">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full rounded-sm py-4 overflow-hidden"
          >
            <h2 className="font-DMSans text-[18px] font-bold mb-4">
              {title} Answers
            </h2>
            <div className="w-full flex justify-between items-center bg-[#F01E00] p-4">
              <div className="flex w-[30%] justify-start items-center gap-2">
                <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                  Ordering
                </p>
                <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                  Answer
                </p>
              </div>
              <div className="flex w-[30%] justify-start items-center gap-2">
                <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                  Correct
                </p>
                <p className="w-[80px] text-[#fff] font-DMSans font-bold text-[16px]">
                  Point
                </p>
              </div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="answersList">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="w-full"
                  >
                    {quizAnswers.map((answer, index) => (
                      <Draggable
                        key={answer.id}
                        draggableId={String(answer.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full flex justify-between items-center border-b-[1px] border-[#ddd]"
                          >
                            <div className="w-full lg:w-[50%] flex justify-between items-center">
                              <button className="p-2 rounded">
                                <RiDragMove2Fill className="text-[25px] cursor-grab" />
                              </button>
                              <div className="my-4 w-[80%]">
                                <BaseInput
                                  type="text"
                                  placeholder="Answer"
                                  value={answer.title}
                                  inputContainerClassName={cn(
                                    "h-[43px]",
                                    theme === "dark"
                                      ? "select-secondary"
                                      : "border-[0.5px] border-[#ddd]"
                                  )}
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
                                name="correctAnswer"
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
                                  type="number"
                                  placeholder="Score"
                                  value={answer.score}
                                  inputContainerClassName={cn(
                                    "h-[43px]",
                                    theme === "dark"
                                      ? "select-secondary"
                                      : "border-[0.5px] border-[#ddd]"
                                  )}
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
                                <GiCancel
                                  className="text-[25px] cursor-pointer"
                                  onClick={() => removeAnswer(answer.id)}
                                />
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

            <div className="w-full flex justify-between items-center">
              <button
                className="hover:border-[1px] flex justify-start items-center gap-4 border-[#F01E00] rounded-md p-2"
                onClick={handleAddOption}
              >
                <p className="font-DMSans font-bold text-[14px]">
                  Add an option
                </p>
                <FaPlusSquare className="text-[#F01E00] text-[20px]" />
              </button>
              <div className="flex justify-end items-center py-6">
                <button
                  onClick={handleSubmitAnswers}
                  className="px-4 py-2 flex items-center font-DMSans font-semibold text-[16px] rounded bg-[#FF5050] text-white"
                >
                  Save Answer{" "}
                  {isAnswerSubmitting && <LoadingSpinner size="xs" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizAnswers;
