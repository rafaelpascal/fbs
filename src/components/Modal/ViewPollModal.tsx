import { BaseModal } from "./BaseModal";
import { useCallback } from "react";
import { MdCancel } from "react-icons/md";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCircleDot } from "react-icons/fa6";

interface IModalPropsType {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
}

const data = [
  { name: "Money and wealth (38%) ", value: 400 },
  { name: "God and universe (24%)", value: 300 },
  { name: "Happiness and health (24%)", value: 200 },
  { name: "Women and games (14%)", value: 500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <div
          key={`item-${index}`}
          className="flex w-full items-center space-x-2"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ViewPollModal = ({ id, isOpen, closeModal }: IModalPropsType) => {
  // Close modal
  const handleclose = useCallback(() => {
    console.log(id);
    closeModal();
  }, []);

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
          <span className="font-bold">Poll:</span> should display here
        </h2>
        <div className="w-full border-2 p-2 rounded-md shadow-md my-4 border-[#ddd]">
          <h2 className="text-[18px] font-normal font-DMSans">POLL ANSWERS</h2>
          <div className="flex h-full w-full lg:h-[450px] flex-col lg:flex-row justify-center items-start">
            <div className="w-full lg:w-[50%] p-4 flex flex-col justify-between items-start h-full">
              <div>
                <h2 className="text-[26px] font-DMSans font-bold">
                  What makes the world go round?
                </h2>
                {data.map((data, index) => (
                  <div
                    key={index}
                    className="flex mt-2 justify-start items-center gap-2"
                  >
                    <FaCircleDot className="text-[#F01E00B2]/70 size-4" />
                    <p className="text-[16px] font-normal font-DMSans">
                      {data.name}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-[26px] font-DMSans font-bold">Answer:</h2>
                <h2 className="text-[18px] font-DMSans font-semibold">
                  Happiness and wealth
                </h2>
                <div className="flex mt-4 justify-start items-center gap-2">
                  <div className="w-[20px] h-[20px] bg-[#00C49F] rounded-full"></div>
                  <p className="text-[14px] font-DMSans font-normal">
                    Happiness and health (24%)
                  </p>
                </div>
              </div>
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
        </div>
      </div>
    </BaseModal>
  );
};
