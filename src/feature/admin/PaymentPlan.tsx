import { useState } from "react";
import RangeSlider from "~/components/data-inputs/RangeSlider";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

const PaymentPlan = () => {
  const { theme } = useTheme();

  // State to manage the selected currency
  const [currency, setCurrency] = useState("USD");

  // Handle radio button change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="w-full border-t-2 border-[#ddd] py-4">
      <h2 className="font-DMSans font-bold text-[22px]">PAYMENTS</h2>
      <div className="my-4 lg:w-[40%]">
        <h2 className="font-DMSans font-bold text-[16px]">Program fee</h2>

        {/* Currency selection radio buttons */}
        <div className="w-[50%] flex flex-row">
          <div className="form-control flex flex-row items-start justify-start">
            <label className="label cursor-pointer">
              <span className="font-DMSans font-semibold text-[14px] mr-4">
                NGN
              </span>
              <input
                type="radio"
                name="currency"
                value="NGN"
                className="radio checked:bg-blue-500"
                checked={currency === "NGN"}
                onChange={handleCurrencyChange}
              />
            </label>
          </div>
          <div className="form-control flex flex-row items-start justify-start">
            <label className="label cursor-pointer">
              <span className="font-DMSans font-semibold text-[14px] mr-4">
                USD
              </span>
              <input
                type="radio"
                name="currency"
                value="USD"
                className="radio checked:bg-blue-500"
                checked={currency === "USD"}
                onChange={handleCurrencyChange}
              />
            </label>
          </div>
        </div>

        {/* Program fee amounts */}
        <div className="flex justify-between my-4 gap-2 items-center w-full">
          <div className="w-[50%]">
            <h2 className="font-DMSans font-semibold text-[16px]">REGULAR</h2>
            <div className="border-[1px] rounded-md p-4 border-[#ddd]">
              <p className="font-DMSans font-semibold text-[16px]">225,000</p>
            </div>
          </div>
          <div className="w-[50%]">
            <h2 className="font-DMSans font-semibold text-[16px]">SALES</h2>
            <div
              className={cn(
                "border-[1px] rounded-md p-4 border-[#ddd]",
                theme === "dark" ? "bg-transparent" : "bg-[#F2F2F2]"
              )}
            >
              <p className="font-DMSans font-semibold text-[16px]">145,000</p>
            </div>
          </div>
        </div>

        {/* Pass the selected currency to the RangeSlider component */}
        <div>
          <RangeSlider
            title="Installment Plan (monthly)"
            baseAmount={75000}
            currency={currency}
          />
        </div>
        <div className="h-[191px] w-full border-[1px] border-[#ddd] p-4 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px]">
            COUPON CODE{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
