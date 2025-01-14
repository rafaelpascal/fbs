import { useTheme } from "~/context/theme-provider";
import { useState } from "react";

type FeeProps = {
  naira: number;
  usd: number;
  installment: number;
};

const Fee = ({ naira, usd, installment }: FeeProps) => {
  const { theme } = useTheme();
  const [showNaira, setShowNaira] = useState(true);
  const monthlyPayment = showNaira ? naira / installment : usd / installment;
  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row flex-wrap justify-between">
        <h2 className="text-[24px] font-DMSans font-semibold">
          Tuition Payment Plan
        </h2>
        <button
          className="w-[130px] font-DMSans font-semibold text-[14px] border-[1px] border-[#dddd] hover:border-[#FF3B30] text-[#FF3B30] rounded"
          onClick={() => setShowNaira((prev) => !prev)}
        >
          Convert to {showNaira ? "USD" : "NGN"}
        </button>
      </div>
      <div
        className={`w-full flex justify-between items-center my-4 p-4 rounded-[8px] ${
          theme === "dark" ? "bg-[#333]" : "bg-[#F4F4F4]"
        }`}
      >
        <p className="text-[24px] font-DMSans font-normal">Full Tuition</p>
        <div>
          <p className="text-[24px] font-DMSans font-normal">
            {showNaira
              ? new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(naira)
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(usd)}
          </p>
        </div>
      </div>
      <div
        className={`w-full flex flex-col lg:flex-row flex-wrap justify-between  my-4 p-4 rounded-[8px] ${
          theme === "dark" ? "bg-[#333]" : "bg-[#F4F4F4]"
        }`}
      >
        <p className="text-[24px] font-DMSans font-normal">
          {installment} Months Installment
        </p>
        <p className="text-[24px] font-DMSans font-normal">
          {new Intl.NumberFormat(showNaira ? "en-NG" : "en-US", {
            style: "currency",
            currency: showNaira ? "NGN" : "USD",
          }).format(monthlyPayment)}
          /Month
        </p>
      </div>
    </div>
  );
};

export default Fee;
