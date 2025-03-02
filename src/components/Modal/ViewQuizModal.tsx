import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
// import { useTheme } from "~/context/theme-provider";
import { LoadingSpinner } from "../ui/loading-spinner";
// import { CourseServices } from "~/api/course";
import { RootState } from "~/redux-store/store";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "~/utils/helpers";

interface IModalPropsType {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
}

interface FormData {
  score: string;
}

const initialFormData = {
  score: "",
};

const Questions = [
  {
    questionNumber: 1,
    question: "Julius is a man?",
    andswer: ["Yes", "No", "Maybe"],
    iscorrect: "correct",
  },
  {
    questionNumber: 2,
    question: "Julius is a man?",
    andswer: ["Yes", "No", "Maybe"],
    iscorrect: "correct",
  },
  {
    questionNumber: 3,
    question: "Julius is a man?",
    andswer: ["Yes", "No", "Maybe"],
    iscorrect: "correct",
  },
];

export const ViewQuizModal = ({ id, isOpen, closeModal }: IModalPropsType) => {
  const [isConfirmScore, setisConfirmScore] = useState(false);
  //   const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setisSubmitting] = useState(false);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    score: "",
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

  const handleSubmit = async () => {
    console.log(id);
    setisSubmitting(true);

    // Create a new FormData object
    const dataToSubmit = new FormData();
    dataToSubmit.append("course_id", courseId?.toString() || "");
    dataToSubmit.append("capstone_title", formData.score);

    setisSubmitting(false);
    setFormData(initialFormData);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] scrollbar-style relative"
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          SCORE STUDENT
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex w-full lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
        <h2 className="text-[18px] font-normal font-DMSans">
          <span className="font-bold">Program title:</span> should display here
        </h2>
        <h2 className="text-[18px] font-normal font-DMSans">
          <span className="font-bold">Module 4:</span> should display here
        </h2>
        <h2 className="text-[18px] font-normal font-DMSans">
          <span className="font-bold">Quiz:</span> should display here
        </h2>
        {Questions.map((question, index) => (
          <div
            key={index}
            className="w-full border-y-2  p-2 flex flex-col justify-center items-start my-4 border-[#ddd]"
          >
            <h2 className="text-[20px] font-normal font-DMSans">
              <span className="font-bold">
                Question {question.questionNumber} :
              </span>{" "}
              {question.question}
            </h2>
            <div className="flex flex-col my-4 w-full">
              {question.andswer.map((answer, index) => (
                <div
                  key={index}
                  className="flex justify-start my-1 items-center gap-2 w-full"
                >
                  <input
                    type="radio"
                    name={`question-${question.questionNumber}`}
                    id={`q${question.questionNumber}-${answer}`}
                    className="w-6 h-6 radio radio-error opacity-100 cursor-not-allowed"
                    checked={answer === "Yes"}
                  />
                  <label
                    htmlFor={answer}
                    className="text-[20px] font-DMSans font-normal"
                  >
                    {answer}
                  </label>
                </div>
              ))}
            </div>
            <h2 className="text-[20px] font-normal font-DMSans">
              <span className="font-bold">Result :</span> {question.iscorrect}
            </h2>
          </div>
        ))}

        <div className="flex flex-col lg:flex-row justify-start gap-4 items-center w-full">
          <div className="flex border-2 border-[#ddd] px-2 rounded-md h-[53px] justify-between items-center w-full lg:w-[15%]">
            <input
              type="text"
              name="score"
              value={formData.score}
              placeholder="Score"
              onChange={(e: any) => handleInputChange("score", e.target.value)}
              className="outline-none h-full font-semibold text-[20px] w-[50%] font-DMSans"
            />
            <div className="flex ">
              <p className="font-semibold text-[20px] font-DMSans ">/</p>
              <p className="font-semibold text-[20px] font-DMSans ">100</p>
            </div>
          </div>
          <button
            onClick={() => setisConfirmScore(!isConfirmScore)}
            disabled={formData.score == ""}
            className={cn(
              "bg-[#F01E00] h-[48px] w-full lg:w-[15%] rounded-md px-4 text-[#fff] font-DMSans font-semibold text-[14px]",
              formData.score === "" ? "cursor-not-allowed opacity-50" : ""
            )}
          >
            Marked
          </button>
          <AnimatePresence>
            {isConfirmScore && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-[30%] w-full border-2 border-[#ddd] rounded-md p-2"
              >
                <h2 className="font-semibold mb-4 text-[16px] font-DMSans">
                  You’re scoring this student{" "}
                  <span className="text-[#F01E00]">3/10</span> this decision
                  cannot be changed.
                </h2>
                <div className="flex justify-start items-center gap-2 w-full">
                  <button className="bg-[#F2F2F2] p-2 rounded-md px-4 text-[#000] font-DMSans font-semibold text-[14px]">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-[#F01E00] gap-2 flex justify-center items-center  p-2 ml-3 rounded-md px-4"
                  >
                    <p className="font-DMSans font-semibold text-[14px] text-white">
                      Proceed
                    </p>
                    {isSubmitting && <LoadingSpinner size="xs" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BaseModal>
  );
};
