import { BaseInput } from "~/components/data-inputs/text-input";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

import { useState } from "react";
import { useTheme } from "~/context/theme-provider";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { FaImage } from "react-icons/fa";

const Conversations = () => {
  const [formData, setFormData] = useState({ subject: "", question: "" });
  const { theme } = useTheme();
  const [isSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function isFormValid() {
    return formData.subject.trim() !== "" && formData.question.trim() !== "";
  }

  return (
    <DashboardArea>
      <div>
        <h2 className="font-DMSans mb-4 text-2xl font-bold text-left">
          Start Conversation
        </h2>
        <div
          role="alert"
          className="alert alert-info alert-dash flex flex-col justify-start items-start gap-4 px-10"
        >
          <h2 className="font-DMSans text-lg font-bold ">
            Tips on getting good answers quickly
          </h2>
          <ul className="list-disc">
            <li className="font-DMSans text-sm font-normal italic ">
              Make sure your question has not been asked already
            </li>
            <li className="font-DMSans text-sm font-normal italic ">
              Keep your question short and to the point
            </li>
            <li className="font-DMSans text-sm font-normal italic ">
              {" "}
              Double-check grammar and spelling
            </li>
          </ul>
        </div>
        <div className="my-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <BaseInput
              label="Subject of discusion"
              placeholder="Subject of discusion"
              containerClassname="w-full lg:w-[48%]"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[48px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.subject}
              onChange={(e: any) =>
                handleInputChange("subject", e.target.value)
              }
            />
            <button className="h-[52px] w-[231px] mb-2 bg-[#FF5050] px-4 rounded-md flex justify-center items-center gap-2">
              <p className="font-DMSans font-semibold text-[14px] lg:text-[16px] text-white">
                Upload Image
              </p>
              <FaImage />
            </button>
          </div>

          <div className="my-4">
            <BaseInput
              label="COURSE HIGHLIGHT"
              type="textarea"
              placeholder="COURSE HIGHLIGHT"
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
          <div className="flex justify-end items-center gap-4">
            <button className="bg-gray-400 h-[52px] w-[231px] mb-2 px-4 rounded-md flex justify-center items-center gap-2">
              <p className="font-DMSans font-semibold text-[14px] lg:text-[16px] text-white">
                Cancel
              </p>
            </button>
            <button
              // onClick={handleSubmit}
              className={`h-[52px] w-[231px] mb-2 bg-[#FF5050] px-4 rounded-md flex justify-center items-center gap-2 ${
                isFormValid() ? "" : "opacity-60 cursor-not-allowed"
              }`}
              disabled={!isFormValid()}
            >
              <p className="font-DMSans font-semibold text-[14px] lg:text-[16px] text-white">
                Add Question/comment
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Conversations;
