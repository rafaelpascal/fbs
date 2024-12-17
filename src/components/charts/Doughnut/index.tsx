import { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartWrapper } from "../chart-wrapper";
import "chart.js/auto";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Doughnut Chart",
    },
  },
};

const data: ChartData<"doughnut"> = {
  labels: ["Tubers", "Grains", "Bulbs", "Fruits", "Livestock"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100, 200, 400],
      weight: 1,
      backgroundColor: [
        "rgb(173, 216, 230)",
        "rgb(144, 238, 144)",
        "rgb(240, 128, 128)",
        "rgb(238, 232, 170)",
        "rgb(230, 230, 250)",
      ],
      hoverOffset: 8,
    },
  ],
};

const CustomLegend = ({ chartData }: { chartData: ChartData<"doughnut"> }) => {
  const backgroundColors = chartData.datasets[0].backgroundColor as string[];
  const dataValues = chartData.datasets[0].data as number[];
  return (
    <div className="flex flex-col  justify-center items-start">
      <h2 className="bg-inherit text-[10px] mt-2 mb-4 font-bold font-DMSans">
        Categories
      </h2>
      {chartData.labels?.map((label, index) => (
        <div className="flex justify-between bg-inherit items-center">
          <div
            key={index}
            className="flex justify-start bg-inherit items-center mr-4"
          >
            <div className="flex justify-start bg-inherit items-start gap-2 mr-4">
              <div
                className="w-10 rounded-md bg-inherit h-[7px] mt-1 mr-2"
                style={{
                  backgroundColor: backgroundColors[index],
                }}
              ></div>
              <span className="bg-inherit w-[40px] text-[10px] p-0 mb-0 font-normal font-DMSans">
                {label as string}
              </span>
            </div>
          </div>
          <span className="bg-inherit text-left text-[10px] ml-3 w-[200px] font-semibold font-DMSans">
            ₦ {dataValues[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export function DoughnutChartDemo() {
  const { theme } = useTheme();
  const chartRef = useRef<any>(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  }, [data]);

  return (
    <ChartWrapper
      className={cn(
        "h-full rounded-xl mt-4 lg:mt-0 px-3 w-full",
        theme === "dark" ? "bg-[#333]" : " bg-white"
      )}
    >
      <div className="flex h-full flex-row  justify-between items-center py-2">
        <div>
          <h2 className=" text-[14px] font-bold">Produce Sales</h2>
          <p className=" text-[14px] font-normal">All users</p>
        </div>
        <div className="bg-inherit">
          <label
            htmlFor="options"
            className="bg-inherit mr-2 text-[14px] font-DMSans"
          >
            Sort by
          </label>
          <select
            id="options"
            className="bg-inherit border-[1px] border-[#8F94A8] rounded-[4px] text-[14px] font-DMSans focus:outline-none"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="" className="bg-inherit text-[12px] font-DMSans">
              Select
            </option>
            <option
              value="option1"
              className="bg-inherit text-[12px] font-DMSans"
            >
              Jan
            </option>
            <option
              value="option2"
              className="bg-inherit text-[12px] font-DMSans"
            >
              Feb
            </option>
            <option
              value="option3"
              className="bg-inherit text-[12px] font-DMSans"
            >
              March
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row  justify-between items-center">
        <CustomLegend chartData={data} />
        <div className="w-1/2 h-1/2  rounded-xl">
          <Doughnut
            className="w-full bg-inherit p-2 rounded-xl"
            ref={chartRef}
            options={{
              ...options,
              responsive: true,
              maintainAspectRatio: true,
            }}
            data={data}
            key={JSON.stringify(data)}
          />
        </div>
      </div>
    </ChartWrapper>
  );
}
