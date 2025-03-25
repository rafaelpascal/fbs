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

export const ViewExamModal = ({ isOpen, closeModal }: IModalPropsType) => {
  const [showAnswer, setShowAnswer] = useState(false);
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
          <span className="font-bold">Exam:</span> should display here
        </h2>
        <div className="border-2 p-2 my-4 rounded-md shadow-sm border-[#ddd]">
          <h2 className="text-[18px] text-[#F01E00] font-bold font-DMSans">
            Exam Instructions
          </h2>
          <p className="text-[18px] font-normal font-DMSans">
            Detailed information about how something should be done or operated.
            "always study the instructions supplied". Detailed information about
            how something should be done or operated."always study the
            instructions supplied"
          </p>
        </div>
        <div>
          <h2 className="text-[18px] font-normal font-DMSans">
            <span className="font-bold"> Question:</span> Choose a real-world
            business situation and analyze it using business concepts and
            theories. You could focus on a specific problem, decision, or
            strategy.
          </h2>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="hover:border hover:border-[#F01E00] bg-[#F01E00] hover:bg-transparent hover:text-[#F01E00] rounded-md p-2 my-4 text-[#fff] font-DMSans font-semibold text-[14px]"
          >
            Show answer
          </button>
        </div>
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="w-full h-[450px] border-2 p-2 flex justify-center items-center rounded-md shadow-md mt-4 border-[#ddd]">
                <h2 className="text-[18px] font-normal font-DMSans">
                  Text or PDF answer display
                </h2>
              </div>
              <p className="text-right w-full text-[14px] font-bold text-[#757575] font-DMSans">
                500 words
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
            Submit
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
