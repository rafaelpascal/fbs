import { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import PDFUploader from "~/components/data-inputs/UploadPDF";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

const quiz = [
  {
    id: "1",
    value: "A",
    answer:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
  },
  {
    id: "2",
    value: "B",
    answer:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
  },
  {
    id: "3",
    value: "C",
    answer:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
  },
];

const Assignment = () => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <DashboardArea>
      <div>
        {selectedOption !== null ? (
          <div className="w-full overflow-y-auto p-4 flex flex-col justify-start items-center bg-white">
            <h2 className="text-[18px] lg:text-[20px] font-DMSans font-bold mb-4">
              {quiz.find((item) => item.value === selectedOption)?.answer}
            </h2>
            <PDFUploader />
          </div>
        ) : (
          <div className="w-full overflow-y-auto p-10 flex justify-start items-center bg-white">
            <div className="flex justify-between items-start flex-col">
              {quiz.map((item, index) => (
                <div key={index} className="my-[4%] form-control">
                  <label className="label flex justify-start items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="quiz" // Single group name to allow only one selection
                      className={`radio checked:bg-[#FF3B30] ${
                        theme === "dark" ? "bg-[#fff]" : ""
                      }`}
                      checked={selectedOption === item.value}
                      onChange={() => handleOptionChange(item.value)}
                    />
                    <span
                      className={cn(
                        "label-text text-[18px] lg:text-[20px] font-DMSans font-normal",
                        theme === "dark" ? "text-[#fff]" : "",
                        selectedOption === item.value
                          ? "text-red-500 font-bold"
                          : ""
                      )}
                    >
                      {item.value}. {item.answer}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
          <h2 className="text-[18px] font-DMSans font-semibold text-left">
            Assignment
          </h2>
          <div className="flex justify-end items-center gap-4">
            <button>
              <HiOutlineHandThumbUp className="hover:text-[#FF1515] text-[22px]" />
            </button>
            <button>
              <HiOutlineHandThumbDown className="hover:text-[#FF1515] text-[22px]" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2">
            <GrLinkPrevious className="text-[20px] font-DMSans font-semibold text-[#fff]" />
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              PREVIOUS
            </p>
          </button>
          <button className="bg-[#FF1515] rounded-md flex justify-center gap-8 items-center p-2">
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              SUBMIT NOW
            </p>
          </button>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Assignment;
