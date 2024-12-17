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
} from "chart.js";
import { Line } from "react-chartjs-2"; // Replace Bar with Line
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Disable x-axis grid lines
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Sales Data",
      data: [300, 100, 200, 320, 600, 500, 100],
      borderColor: "#00A45F",
      backgroundColor: "rgba(0, 164, 95, 0.2)", // Optional for filling below the line
      tension: 0.4, // Smoothness of the line
      pointBackgroundColor: "#00A45F",
    },
  ],
};

export function LineChartDemo() {
  const { theme } = useTheme();
  const chartRef = useRef<any>(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, [data]);

  return (
    <ChartWrapper
      className={cn(
        "h-full px-3 w-full flex flex-col justify-end shadow-lg items-center rounded-xl",
        theme === "dark" ? "bg-[#333]" : " bg-white"
      )}
    >
      <div
        className={cn(
          "flex w-full flex-row justify-between items-center py-2",
          theme === "dark" ? "bg-[#333]" : " bg-white"
        )}
      >
        <div>
          <h2 className="text-[14px] font-bold">Sales Analytic</h2>
          <p className="text-[14px] font-normal">All users</p>
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
      <Line
        className={cn(
          "w-full p-2 rounded-xl",
          theme === "dark" ? "bg-[#333]" : " bg-white"
        )}
        ref={(ref) => {
          chartRef.current = ref; // Store the ref to chartRef.current
        }}
        options={options}
        data={data}
        key={JSON.stringify(data)}
      />
    </ChartWrapper>
  );
}
