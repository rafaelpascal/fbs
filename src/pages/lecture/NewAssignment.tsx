import { useEffect, useState } from "react";
import { DashboardArea } from "~/layouts/DashboardArea";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import useCountdown from "~/hooks/useCountdown";
// import { AuthService } from "~/api/auth";
import {
  FaArrowLeft,
  FaBell,
  FaCloudUploadAlt,
  // FaFilePdf,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { BaseInput } from "~/components/data-inputs/text-input";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { IoDocumentTextOutline } from "react-icons/io5";
import { CourseServices } from "~/api/course";
import { useParams } from "react-router-dom";

const ExamInstructions = [
  {
    title: "Important Notice",
    item: [
      "You're about to begin an Assignment that may be timed. If a time limit applies, it will be displayed once you start.",
      "Ensure you're ready before clicking Start.",
      "We recommend using a computer for the best experience.",
      "If you force exit, your answers will be automatically submitted.",
    ],
  },
];

const ExamQuestions = [
  {
    question:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
    type: "text",
    number: "1",
  },
  {
    question:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
    type: "document",
    number: "2",
  },
  {
    question:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
    type: "text",
    number: "3",
  },
  {
    question:
      "Choose a real-world business situation and analyze it using business concepts and theories. You could focus on a specific problem, decision, or strategy.",
    type: "document",
    number: "4",
  },
];
interface FormData {
  answer: string;
}
const NewAssignment = () => {
  // const navigate = useNavigate();
  const { theme } = useTheme();
  const { assignmentId } = useParams<{ assignmentId: string }>();
  //   const courseId = localStorage.getItem("course_id");
  const [examStarted, setexamStarted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<{
    [key: number]: string[];
  }>({});
  const [formData, setFormData] = useState<FormData>({
    answer: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 200;

  const handleTextChange = (e: any) => {
    const inputText = e.target.value;
    const wordsArray = inputText.trim().split(/\s+/); // Split by spaces to count words
    const count = inputText.trim() === "" ? 0 : wordsArray.length;

    if (count <= maxWords) {
      setWordCount(count);
      handleInputChange("answer", inputText);
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFileURL(url);
    }
  };

  //   const Storeduser = AuthService.getSession();
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { minutes, seconds, startCountdown } = useCountdown(3, 20);

  const handleStartExam = () => {
    setexamStarted(true);
    startCountdown();
  };

  const fetchAssignment = async () => {
    const payload = {
      lesson_id: JSON.parse(assignmentId ?? ""),
    };
    const res = await CourseServices.listAssignment(payload);
    console.log(res);
  };

  useEffect(() => {
    fetchAssignment();
  }, [assignmentId]);

  // const handlesubmit = () => {
  //   navigate(ROUTES.CONGRATULATIONS);
  // };
  return (
    <DashboardArea>
      <div>
        <div className="flex mb-4 justify-between items-center">
          <h2 className="text-[18px] font-DMSans font-semibold text-left">
            ASSIGNMENT
          </h2>
          <div className="bg-[#fff] flex justify-start items-center">
            <div className="flex justify-center items-center p-2 border-[1px] border-[#000000]">
              <p className="text-[#F01E00] text-[16px] font-DMSans font-semibold">
                {minutes.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="p-2 flex justify-center items-center border-[1px] border-[#000000]">
              <p className="text-[#F01E00] text-[16px] font-DMSans font-semibold">
                {seconds.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
        {examStarted ? (
          <div className="lg:h-[572px] overflow-y-auto h-auto border-2 shadow-md flex flex-col justify-start lg:py-10 p-4 lg:px-20 items-center mb-4 w-full border-[#ddd]">
            {ExamQuestions.map((item, index) => (
              <div
                key={index}
                className="mb-8 marker:text-[#4F547B] marker:font-bold"
              >
                {/* Flex container for radio button and question */}
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name={`exam-question-${index}`}
                      value={item.type}
                      checked={selectedTypes[index]?.includes(item.type)}
                      onChange={() =>
                        setSelectedTypes((prev) => {
                          const current = prev[index] || [];
                          const isSelected = current.includes(item.type);

                          return {
                            ...prev,
                            [index]: isSelected
                              ? current.filter((t) => t !== item.type)
                              : [...current, item.type],
                          };
                        })
                      }
                      className="peer hidden"
                    />
                    <span className="w-6 h-6 rounded-full border-2 border-gray-400 peer-checked:bg-[#F01E00] peer-checked:border-[#F01E00] transition-all"></span>
                  </label>

                  {/* <input
                  type="radio"
                  name={`exam-question-${index}`}
                  value={item.type}
                  checked={selectedTypes[index] === item.type}
                  onChange={() =>
                    setSelectedTypes((prev) => ({
                      ...prev,
                      [index]: item.type,
                    }))
                  }
                  className="mr-2 w-6 h-6"
                /> */}
                  <div className="w-[90%] ml-2 flex justify-start items-center gap-3">
                    <span className="text-[20px] font-semibold text-[#4F547B] font-DMSans">
                      {item.number}
                    </span>
                    <label
                      htmlFor={`option-${index}`}
                      className="text-[20px] font-semibold text-[#4F547B] font-DMSans"
                    >
                      {item.question}
                    </label>
                  </div>
                </div>

                {/* Conditionally render input fields based on selected type */}
                {selectedTypes[index]?.includes("text") &&
                  item.type === "text" && (
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                      <div className="mt-4 w-full">
                        <BaseInput
                          label="Answer"
                          type="textarea"
                          placeholder="Type in your answer..."
                          containerClassname="w-full"
                          labelClassName="text-[17px] font-DMSans font-semibold"
                          inputContainerClassName={cn(
                            "h-[183px] shadow-md",
                            theme === "dark"
                              ? "select-secondary"
                              : "border-[0.5px] border-[#ddd]"
                          )}
                          value={formData.answer}
                          onChange={handleTextChange}
                        />
                        <div className="flex mt-2 justify-end items-center ">
                          <span
                            className={`text-[14px] font-normal italic font-DMSans ${
                              wordCount > maxWords
                                ? "text-red-500"
                                : "text-[#4F547B]"
                            }`}
                          >
                            {wordCount}
                          </span>{" "}
                          /
                          <h2 className="text-[14px] font-normal italic text-[#4F547B] font-DMSans">
                            {maxWords}
                          </h2>
                        </div>
                      </div>
                    </div>
                  )}

                {selectedTypes[index]?.includes("document") &&
                  item.type === "document" && (
                    <div className="mt-4 w-full">
                      <div className="flex justify-between items-center gap-2 w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-[283px] py-4 shadow-md border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <FaCloudUploadAlt className="text-[10rem]" />
                          {file ? (
                            <div className="mt-3 flex items-center gap-2 p-2 bg-gray-100 border rounded-md">
                              <p className="text-sm font-medium text-gray-700">
                                {file.name}
                              </p>
                            </div>
                          ) : (
                            <>
                              <p className="text-[20px] font-semibold text-[#4F547B] font-DMSans">
                                Upload a document of your response
                              </p>
                              <p className="text-gray-600 mt-2">
                                Drag & drop or browse PDF/Word document files
                                here
                              </p>
                              <p className="text-sm text-gray-500">
                                PDF, DOC, DOCX (Max 5MB)
                              </p>
                            </>
                          )}
                        </label>
                        {/* <div className="w-auto">
                      <div className="p-2">
                        <IoDocumentTextOutline className="size-8" />
                      </div>
                      <div className="p-2 rounded-xl shadow-md border-2 border-[#FF1515]">
                        <FaFilePdf className="size-8" />
                      </div>
                    </div> */}
                      </div>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        id="file-upload"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      {/* Show preview button if a file is uploaded */}
                      {file && (
                        <button
                          className="flex mt-2 hover:border hover:border-[#FF1515] justify-start items-center gap-3 px-2 rounded-md"
                          onClick={() => window.open(fileURL, "_blank")}
                        >
                          <MdOutlineRemoveRedEye className="size-6" />
                          <p className="text-[16px] text-right font-normal italic text-[#FF1515] font-DMSans">
                            Preview
                          </p>
                        </button>
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <div className="lg:h-[572px] h-auto border-2  shadow-md flex justify-center items-center mb-4 w-full border-[#ddd]">
            {ExamInstructions.map((instructioon, index) => (
              <div key={index} className="w-[70%]">
                <div className="flex justify-start mb-4 items-center gap-3">
                  <FaBell className="size-12 text-yellow-400" />
                  <h2 className="text-[40px] text-[#F01E00] font-DMSans font-bold text-left">
                    {instructioon.title}
                  </h2>
                </div>
                {instructioon.item.map((item, index) => (
                  <ul key={index} className="list-disc">
                    <li
                      className={cn(
                        "text-[25px] py-1 text-[#000000] font-DMSans text-left",
                        index === 0 ? "font-semibold" : "font-normal"
                      )}
                    >
                      {item}
                    </li>
                  </ul>
                ))}
                <p className="text-[25px] mt-10 py-1 text-green-500 font-DMSans font-semibold text-left">
                  Good Luck!
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="py-2 mb-4 border-b-2 border-b-[#757575] flex flex-col lg:flex-row justify-between items-center w-full">
          <h2 className="text-[20px] font-semibold text-[#4F547B] font-DMSans">
            ASSIGNMENT: how can a man be a man
          </h2>
          <h2 className="text-[20px] font-semibold text-[#4F547B] font-DMSans">
            Submission deadline:{" "}
            <span className="font-normal"> 12 December 2024</span>
          </h2>
        </div>
        {examStarted ? (
          <div className="flex justify-between items-center">
            <button className="bg-[#FF1515]/50 cursor-not-allowed rounded-md flex justify-center gap-8 items-center p-2">
              <FaArrowLeft className="size-8 text-[#fff]" />
              <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                BACK
              </p>
            </button>
            <button
              onClick={handleStartExam}
              disabled={
                Object.values(selectedTypes).every((arr) => arr.length === 0) ||
                Object.keys(selectedTypes).length === 0
              }
              className={`w-[160px] flex justify-between items-center gap-3 rounded-md p-3 transition 
    ${
      Object.values(selectedTypes).every((arr) => arr.length === 0) ||
      Object.keys(selectedTypes).length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#FF1515] cursor-pointer"
    }`}
            >
              <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                SUBMIT
              </p>
              <FaArrowRightLong className="size-8 text-[#fff]" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <button className="bg-[#656565] rounded-md flex justify-center gap-8 items-center p-2">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                xlinkHref="http://www.w3.org/1999/xlink"
              >
                <rect width="30" height="30" fill="url(#pattern0_2964_18891)" />
                <defs>
                  <pattern
                    id="pattern0_2964_18891"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2964_18891"
                      transform="scale(0.0111111)"
                    />
                  </pattern>
                  <image
                    id="image0_2964_18891"
                    width="90"
                    height="90"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                TAKE LATER{" "}
              </p>
            </button>
            <button
              onClick={handleStartExam}
              className="w-[160px] flex justify-between items-center gap-3 bg-[#FF1515] rounded-md p-3"
            >
              <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
                PROCEED
              </p>
              <FaArrowRightLong className="size-8 text-[#fff]" />
            </button>
          </div>
        )}
      </div>
    </DashboardArea>
  );
};

export default NewAssignment;
