import { useState } from "react";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import RangeSlider from "~/components/data-inputs/RangeSlider";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

const courseFormat = [
  { label: "Percentage", value: 1 },
  { label: "Advanced", value: 2 },
];

const PaymentPlan = () => {
  const { theme } = useTheme();

  // State to manage the selected currency
  const [currency] = useState("NGN");

  // Handle radio button change
  //   const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setCurrency(e.target.value);
  //   };

  const handleSelect = (option: { label: string; value: string | number }) => {
    console.log("Selected option:", option);
  };

  return (
    <div className="w-full border-t-2 border-[#ddd] py-4">
      <h2 className="font-DMSans font-bold text-[22px]">PAYMENTS</h2>
      <div className="my-4 lg:w-[40%]">
        <h2 className="font-DMSans font-bold text-[16px]">Program fee</h2>

        {/* Currency selection radio buttons */}
        <div className="w-[50%] flex flex-col justify-between items-start">
          {/* <div className="form-control flex flex-row items-start justify-start">
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
          </div> */}
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="mr-2 font-DMSans font-semibold text-[14px]">
                NGN
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="mr-2 font-DMSans font-semibold text-[14px]">
                USD
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-error"
              />
            </label>
          </div>
        </div>

        {/* Program fee amounts */}
        <div className="flex justify-between my-4 gap-2 items-center w-full">
          <div className="w-[50%]">
            <BaseInput
              label="Naira Amount"
              type="text"
              placeholder="Naira Amount"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[48px]",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
            />
          </div>
          <div className="w-[50%]">
            <BaseInput
              label="Dollar Amount"
              type="text"
              placeholder="Dollar Amount"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[48px]",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
            />
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
        <div className="w-full border-[1px] border-[#ddd] p-4 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px]">
            COUPON CODE{" "}
          </h2>
          <div className="w-full mt-4 flex flex-col justify-between items-start">
            <BaseInput
              label="Title of the code"
              type="text"
              placeholder="Title of the code"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[48px]",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
            />
            <div className="w-full flex flex-col items-start justify-start border-[0.5px] border-[#ddd] my-2 rounded-md p-4">
              <h2 className="font-DMSans font-semibold text-[16px]">
                Coupon Validity
              </h2>
              <div className="form-control">
                <label className="label flex flex-col justify-center items-center cursor-pointer">
                  <span className="font-DMSans font-semibold text-[14px]">
                    No end
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-error"
                    defaultChecked
                  />
                </label>
              </div>
              <BaseInput
                label="Valid till"
                type="date"
                placeholder="Valid till"
                containerClassname="w-[30%]"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[48px]",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="w-full lg:w-[48%] mb-4">
                <SelectionDropdown
                  label=""
                  labelClassName="text-[14px] font-DMSans font-semibold"
                  options={courseFormat}
                  onSelect={handleSelect}
                  placeholder="Percentage"
                />
              </div>
              <BaseInput
                label=""
                type="text"
                placeholder="Value"
                containerClassname="w-[20%]"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[52px] mb-2",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
              />
              <button className="h-[52px] mb-2 px-4 font-DMSans font-semibold text-[16px] text-white bg-[#1CB503]">
                Activate coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
