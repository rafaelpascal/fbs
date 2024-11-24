import { useTheme } from "~/context/theme-provider";

const Fee = () => {
  const { theme } = useTheme();

  return (
    <div>
      <h2 className="text-[24px] font-DMSans font-semibold">
        Tuition Payment Plan
      </h2>
      <div
        className={`w-full flex justify-between items-center my-4 p-4 lg:w-[875px] rounded-[8px] ${
          theme === "dark" ? "bg-[#333]" : "bg-[#F4F4F4]"
        }`}
      >
        <p className="text-[24px] font-DMSans font-normal">Full Tuition</p>
        <p className="text-[24px] font-DMSans font-normal">N350,000</p>
      </div>
      <div
        className={`w-full flex justify-between items-center my-4 p-4 lg:w-[875px] rounded-[8px] ${
          theme === "dark" ? "bg-[#333]" : "bg-[#F4F4F4]"
        }`}
      >
        <p className="text-[24px] font-DMSans font-normal">
          Installment 2-4 months
        </p>
        <p className="text-[24px] font-DMSans font-normal">N80,000/month</p>
      </div>
    </div>
  );
};

export default Fee;
