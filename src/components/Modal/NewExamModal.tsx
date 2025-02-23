import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { LoadingSpinner } from "../ui/loading-spinner";
// import { CourseServices } from "~/api/course";
import { RootState } from "~/redux-store/store";
import { useSelector } from "react-redux";
import { FaPlusSquare } from "react-icons/fa";

interface IModalPropsType {
  moduleId: number;
  lessonId: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: (moduleId: number) => void;
  moduleData: any;
  setModuleData: React.Dispatch<React.SetStateAction<any>>;
}

interface ExamQuestion {
  id: number;
  description: string;
  selectedOption: string;
  answerLimit: number;
}

interface FormData {
  score: string;
  description: string;
  title: string;
  deadline: string;
  featuredImages: File[];
  examQuestions: ExamQuestion[];
}

export const NewExamModal = ({
  moduleId,
  lessonId,
  isOpen,
  closeModal,
  handlecreate,
  setModuleData,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    score: "",
    description: "",
    title: "",
    deadline: "",
    featuredImages: [],
    examQuestions: [
      {
        id: 1,
        description: "",
        selectedOption: "red",
        answerLimit: 100,
      },
    ],
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Close modal and reset form
  const handleClose = useCallback(() => {
    setFormData(initialFormData);
    closeModal();
  }, [closeModal]);

  // Handle text inputs
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Handle exam questions
  const handleExamQuestionChange = useCallback((id: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      examQuestions: prev.examQuestions.map((q) =>
        q.id === id ? { ...q, description: value } : q
      ),
    }));
  }, []);

  const addExamQuestion = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      examQuestions: [
        ...prev.examQuestions,
        {
          id: prev.examQuestions.length + 1,
          description: "",
          selectedOption: "",
          answerLimit: 0,
        },
      ],
    }));
  }, []);

  const removeExamQuestion = useCallback((id: number) => {
    setFormData((prev) => ({
      ...prev,
      examQuestions: prev.examQuestions.filter((q) => q.id !== id),
    }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    dataToSubmit.append("course_id", courseId?.toString() || "");
    dataToSubmit.append("stream_video_audio", formData.deadline);
    dataToSubmit.append("overall_score", formData.score);
    dataToSubmit.append("module_id", moduleId.toString() || "");
    dataToSubmit.append("lesson_id", lessonId.toString() || "");
    dataToSubmit.append("assignment_title", formData.title);
    formData.featuredImages.forEach((file) => {
      dataToSubmit.append("assignment_image", file);
    });

    // Append exam questions
    formData.examQuestions.forEach((q, index) => {
      dataToSubmit.append(`exam_questions[${index}][id]`, q.id.toString());
      dataToSubmit.append(
        `exam_questions[${index}][description]`,
        q.description
      );
    });

    // await CourseServices.createCourseAssignment(dataToSubmit);

    setModuleData((prevData: any) => ({
      ...prevData,
      title: formData.title,
    }));

    setIsSubmitting(false);
    handlecreate(moduleId);
    setFormData(initialFormData);
  };

  interface OptionChangeHandler {
    (id: number, value: string): void;
  }

  const handleOptionChange: OptionChangeHandler = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      examQuestions: prevState.examQuestions.map((q) =>
        q.id === id ? { ...q, selectedOption: value } : q
      ),
    }));
  };

  interface LimitChangeHandler {
    (id: number, limit: number): void;
  }

  const handleLimitChange: LimitChangeHandler = (id, limit) => {
    setFormData((prevState) => ({
      ...prevState,
      examQuestions: prevState.examQuestions.map((q) =>
        q.id === id ? { ...q, answerLimit: limit } : q
      ),
    }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={handleClose}
      className="lg:min-w-[1000px] relative"
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          CREATE EXAMINATION
        </h2>
        <button onClick={handleClose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>

      <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
        {/* Exam Title */}
        <div className="my-4 w-full">
          <BaseInput
            label="Exam Title"
            type="text"
            placeholder="Exam Title"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[53px]",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.title}
            onChange={(e: any) => handleInputChange("title", e.target.value)}
          />
        </div>

        {/* Exam Instructions */}
        <div className="my-4 w-full">
          <BaseInput
            label="Exam Instructions"
            type="textarea"
            placeholder="Exam Instructions"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[153px]",
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

        {/* Exam Questions */}
        <div className="w-full">
          {formData.examQuestions.map((question, index) => (
            <div
              key={question.id}
              className="my-4 rounded-md border-[2px] shadow-sm border-[#ddd] p-4 w-full"
            >
              <BaseInput
                label={`Exam Question ${index + 1}`}
                type="textarea"
                placeholder="Enter question"
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[153px]",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={question.description}
                onChange={(e: any) =>
                  handleExamQuestionChange(question.id, e.target.value)
                }
              />
              <div className="flex justify-between items-center">
                <div className="flex justify-start gap-4 items-center">
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <span className="font-DMSans font-semibold text-[14px]">
                        Text
                      </span>
                      <input
                        type="radio"
                        name={`radio-${question.id}`}
                        className="radio checked:bg-red-500"
                        checked={question.selectedOption === "text"}
                        onChange={() => handleOptionChange(question.id, "text")}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <span className="font-DMSans font-semibold text-[14px]">
                        Document
                      </span>
                      <input
                        type="radio"
                        name={`radio-${question.id}`}
                        className="radio checked:bg-blue-500"
                        checked={question.selectedOption === "document"}
                        onChange={() =>
                          handleOptionChange(question.id, "document")
                        }
                      />
                    </label>
                  </div>

                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">
                      Answer Limit:{" "}
                      <span className="text-red-500">
                        {question.answerLimit}
                      </span>
                      words
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content overflow-y-auto scrollbar-style shadow-md max-h-[150px] bg-base-100 rounded-box z-[1] w-full p-2 flex flex-col"
                    >
                      <li onClick={() => handleLimitChange(question.id, 100)}>
                        <p className="font-DMSans py-1 cursor-pointer hover:bg-slate-200 px-2 rounded-box font-semibold text-[16px]">
                          100
                        </p>
                      </li>
                      <li onClick={() => handleLimitChange(question.id, 200)}>
                        <p className="font-DMSans py-1 cursor-pointer hover:bg-slate-200 px-2 rounded-box font-semibold text-[16px]">
                          350
                        </p>
                      </li>
                      <li onClick={() => handleLimitChange(question.id, 300)}>
                        <p className="font-DMSans py-1 cursor-pointer hover:bg-slate-200 px-2 rounded-box font-semibold text-[16px]">
                          800
                        </p>
                      </li>
                      <li onClick={() => handleLimitChange(question.id, 400)}>
                        <p className="font-DMSans py-1 cursor-pointer hover:bg-slate-200 px-2 rounded-box font-semibold text-[16px]">
                          1500
                        </p>
                      </li>
                      <li onClick={() => handleLimitChange(question.id, 500)}>
                        <p className="font-DMSans py-1 cursor-pointer hover:bg-slate-200 px-2 rounded-box font-semibold text-[16px]">
                          3000
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => removeExamQuestion(question.id)}
                  className="flex justify-end hover:border border-red-600 rounded-md px-2 py-1 items-center gap-2"
                >
                  <p className="font-DMSans font-semibold text-[14px] text-red-600">
                    Remove
                  </p>
                  <MdCancel className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Exam Question Button */}
        <div className="mb-4">
          <button
            onClick={addExamQuestion}
            className="flex justify-start gap-2 items-center"
          >
            <p className="font-DMSans font-semibold text-[16px]">
              Add Exam Question
            </p>
            <FaPlusSquare className="text-red-600" />
          </button>
        </div>
        {formData.examQuestions.length !== 0 && (
          <div className="mb-20">
            <span className="font-DMSans font-semibold text-[14px] italic text-red-500">
              Note: Time is in minutes
            </span>

            <div className="flex justify-start gap-4 flex-col lg:flex-row flex-wrap items-center">
              <div className="mb-4 w-full lg:w-[30%]">
                <BaseInput
                  label="Total Time Limit"
                  type="number"
                  placeholder="0"
                  containerClassname="w-full"
                  labelClassName="text-[17px] font-DMSans font-semibold"
                  inputContainerClassName={cn(
                    "h-[53px] ",
                    theme === "dark"
                      ? "select-secondary"
                      : "border-[0.5px] border-[#ddd]"
                  )}
                  value={formData.score}
                  onChange={(e: any) =>
                    handleInputChange("score", e.target.value)
                  }
                />
              </div>
              <div className="mb-4 w-full lg:w-[30%]">
                <BaseInput
                  label="Total Score"
                  type="text"
                  placeholder="100"
                  containerClassname="w-full"
                  labelClassName="text-[17px] font-DMSans font-semibold"
                  inputContainerClassName={cn(
                    "h-[53px] ",
                    theme === "dark"
                      ? "select-secondary"
                      : "border-[0.5px] border-[#ddd]"
                  )}
                  value={formData.score}
                  onChange={(e: any) =>
                    handleInputChange("score", e.target.value)
                  }
                />
              </div>
              <div className="mb-4 w-full lg:w-[30%]">
                <BaseInput
                  label="Submission Deadline"
                  type="date"
                  placeholder=""
                  containerClassname="w-full"
                  labelClassName="text-[17px] font-DMSans font-semibold"
                  inputContainerClassName={cn(
                    "h-[53px] ",
                    theme === "dark"
                      ? "select-secondary"
                      : "border-[0.5px] border-[#ddd]"
                  )}
                  value={formData.deadline}
                  onChange={(e: any) =>
                    handleInputChange("deadline", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex bg-white absolute bottom-2 justify-start items-start gap-4">
          <button
            onClick={handleClose}
            className="w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              PUBLISH EXAM
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
