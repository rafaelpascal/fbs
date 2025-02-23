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
import QuizAnswers from "../Collapsible/QuizAnswers";
import { DropResult } from "react-beautiful-dnd";

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
  title: string;
  question: string;
  thought: string;
  featuredImages: File[];
}

interface QuizAnswer {
  id: string;
  title: string;
  isCorrect: boolean;
  score: number;
}

const initialFormData = {
  title: "",
  question: "",
  thought: "",
  featuredImages: [] as File[],
};

export const NewPollModal = ({
  moduleId,
  lessonId,
  isOpen,
  closeModal,
  handlecreate,
  setModuleData,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setisSubmitting] = useState(false);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    thought: "",
    question: "",
    featuredImages: [],
  });
  //   const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([
    { id: "1", title: "", isCorrect: false, score: 0 },
  ]);

  const [isAnswerSubmitting, setIsAnswerSubmitting] = useState(false);

  // Handle Input Changes
  const handleAnswersChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setQuizAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, [field]: value } : answer
      )
    );
  };

  // Add New Answer Option
  const handleAddOption = () => {
    setQuizAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        id: Date.now().toString(),
        title: "",
        isCorrect: false,
        score: 0,
      },
    ]);
  };

  // Remove Answer
  const removeAnswer = (id: string) => {
    setQuizAnswers(
      (prevAnswers) =>
        prevAnswers
          .filter((answer) => answer.id !== id)
          .map((answer, i) => ({ ...answer, id: i.toString() })) // Reassign IDs after removal
    );
  };

  // Handle Form Submission
  const handleSubmitAnswers = () => {
    setIsAnswerSubmitting(true);
    setTimeout(() => {
      console.log("Submitted answers:", quizAnswers);
      setIsAnswerSubmitting(false);
    }, 2000);
  };
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

  const handleSubmit = async () => {
    setisSubmitting(true);

    // Create a new FormData object
    const dataToSubmit = new FormData();
    dataToSubmit.append("course_id", courseId?.toString() || "");
    dataToSubmit.append("stream_video_audio", formData.thought);
    dataToSubmit.append("overall_score", formData.question);
    dataToSubmit.append("module_id", moduleId.toString() || "");
    dataToSubmit.append("lesson_id", lessonId.toString() || "");
    dataToSubmit.append("capstone_title", formData.title);
    formData.featuredImages.forEach((file) => {
      dataToSubmit.append("capstone_image", file);
    });
    // await CourseServices.createCourseCapstone(dataToSubmit);
    setModuleData((prevData: any) => ({
      ...prevData,
      title: formData.question,
    }));

    setisSubmitting(false);
    handlecreate(moduleId);
    setFormData(initialFormData);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If no destination (dropped outside), exit function
    if (!destination) return;

    setQuizAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];

      // Remove item from its original position
      const [movedItem] = updatedAnswers.splice(source.index, 1);

      // Insert item at the new position
      updatedAnswers.splice(destination.index, 0, movedItem);

      return updatedAnswers;
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] relative"
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COURSE POLL
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
        <div className="my-4 w-full">
          <BaseInput
            label="Poll Question"
            type="textarea"
            placeholder="Poll Question"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[153px]",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.question}
            onChange={(e: any) => handleInputChange("question", e.target.value)}
          />
        </div>
        <QuizAnswers
          isOpen={isOpen}
          title="Poll"
          theme={theme}
          quizAnswers={quizAnswers}
          handleDragEnd={handleDragEnd}
          handleAnswersChange={handleAnswersChange}
          handleAddOption={handleAddOption}
          handleSubmitAnswers={handleSubmitAnswers}
          isAnswerSubmitting={isAnswerSubmitting}
          removeAnswer={removeAnswer}
        />
        <div className="mt-4 mb-20 w-full">
          <BaseInput
            label="Thoughts"
            type="textarea"
            placeholder="Thoughts"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[153px]",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.thought}
            onChange={(e: any) => handleInputChange("thought", e.target.value)}
          />
        </div>
        <div className="flex absolute bottom-2 justify-start items-start gap-4">
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
              Add Poll
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
