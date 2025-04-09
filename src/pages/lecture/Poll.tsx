import { useState } from "react";
import { DashboardArea } from "~/layouts/DashboardArea";
// import useCountdown from "~/hooks/useCountdown";
// import { AuthService } from "~/api/auth";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomLegend } from "~/components/Modal/ViewPollModal";

const ExamQuestions = [
  {
    question: "What makes the world go round?",
    answers: [
      "Money and wealth",
      "Happiness and health",
      "Women and games",
      "God and universe",
    ],
  },
];

const data = [
  { name: "Money and wealth (38%) ", value: 400 },
  { name: "God and universe (24%)", value: 300 },
  { name: "Happiness and health (24%)", value: 200 },
  { name: "Women and games (14%)", value: 500 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// interface FormData {
//   answer: string;
// }
const Polls = () => {
  const [selectedType, setSelectedType] = useState("");
  //   const [formData, setFormData] = useState<FormData>({
  //     answer: "",
  //   });

  //   const { minutes, seconds, startCountdown } = useCountdown(3, 20);

  //   const handleStartExam = () => {
  //     startCountdown();
  //   };

  // const handlesubmit = () => {
  //   navigate(ROUTES.CONGRATULATIONS);
  // };
  return (
    <DashboardArea>
      <div>
        {/* <div className="flex mb-4 justify-between items-center">
          <h2 className="text-[18px] font-DMSans font-semibold text-left">
            POLLS
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
        </div> */}
        <div className="lg:h-[572px] h-auto border-2 shadow-md flex flex-col lg:flex-row justify-start py-4 lg:py-10 px-4 lg:px-20 items-center mb-4 w-full border-[#ddd]">
          <div className="w-full lg:w-[50%]">
            {ExamQuestions.map((question, index) => (
              <div key={index} className="w-full">
                <h2 className="text-[36px] font-bold text-left font-DMSans mb-10">
                  {question.question}
                </h2>
                {question.answers.map((item, index) => (
                  <div className="flex my-2 justify-start items-center gap-4">
                    <input
                      key={index}
                      type="radio"
                      id={`option-${index}`}
                      name="exam-question"
                      value={item}
                      checked={selectedType === item}
                      onChange={() => setSelectedType(item)}
                      className="mr-2 w-6 h-6"
                    />
                    <p className="text-[20px] font-bold text-left font-DMSans">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            ))}
            <h2 className="font-DMSans font-bold text-lg mt-4">Thoughts...</h2>
            <p className="bg-[#F8F8F8] p-10 font-DMSans text-sm text-[#000000] shadow-md rounded-md w-full lg:w-[420px]">
              Create free online polls with this quick and easy polling tool.
              Make voting polls in minutes and start capturing opinion in real
              time.
            </p>
          </div>
          <div className="flex w-full lg:w-[50%] flex-col items-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="40%"
                  outerRadius="60%"
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 border-b-[2px] border-[#ddd] mb-2">
          <h2 className="text-[18px] font-DMSans font-semibold text-left">
            Introduction to Business consulting And Strategy... {" "}
          </h2>
          <div className="flex justify-end items-center gap-4">
            <button>
              <HiOutlineHandThumbUp className="hover:text-[#FF1515] text-[22px]" />
            </button>
            <button>
              <HiOutlineHandThumbDown className="hover:text-[#FF1515] text-[22px]" />
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <HiDotsHorizontal className="text-[#1B1919] text-[22px]" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li className="font-DMSans text-[14px] font-semibold">
                  <a>Add note</a>
                </li>
                <li className="font-DMSans text-[14px] font-semibold">
                  <a>Feedback</a>
                </li>
                <li className="font-DMSans text-[14px] font-semibold">
                  <a>View Capstone</a>
                </li>
                <li className="font-DMSans text-[14px] font-semibold">
                  <a>Open discussion</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-[#FF1515]/50 cursor-not-allowed rounded-md flex justify-center gap-8 items-center p-2">
            <FaArrowLeft className="size-8 text-[#fff]" />
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              BACK
            </p>
          </button>
          <button className="w-[160px] flex justify-between items-center gap-3 bg-[#FF1515] rounded-md p-3">
            <p className="text-[20px] font-DMSans font-semibold text-[#fff]">
              SUBMIT
            </p>
            <FaArrowRightLong className="size-8 text-[#fff]" />
          </button>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Polls;
