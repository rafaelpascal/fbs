import { useEffect, useState } from "react";
import SelectionDropdown from "../Collapsible/SelectionDropdown";

interface RangeSliderProps {
  title: string;
  baseAmount: number;
  // currency: string;
  onMonthChange: (months: number) => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const paymentplan = [
  { label: "Monthly", value: 1 },
  { label: "Split", value: 2 },
];

const RangeSlider = ({
  title,
  baseAmount,
  // currency,
  onMonthChange,
  formData,
  setFormData,
}: RangeSliderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isselected, setselected] = useState(false);

  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setselected(true);
    setFormData((prev: any) => ({
      ...prev,
      [field]: option,
    }));
  };

  const totalAmount = currentStep * baseAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const months = Number(e.target.value);
    setCurrentStep(months);
    onMonthChange(months);
  };
  useEffect(() => {
    console.log("hhhhh", formData);
  }, [formData]);

  return (
    <div>
      <div>
        <div className="w-full lg:w-[48%] mb-4">
          <SelectionDropdown
            label=""
            labelClassName="text-[14px] font-DMSans font-semibold"
            options={paymentplan}
            onSelect={(option) => handleSelect("paymentplan", option)}
            placeholder="Installment plan"
          />
        </div>
      </div>
      {isselected && (
        <>
          <h2 className="font-DMSans font-bold text-[18px] my-4">
            {title} {formData.paymentplan?.label}
          </h2>
          <input
            type="range"
            min={1}
            max={12}
            value={currentStep}
            onChange={handleSliderChange}
            className="range range-error"
            step={1}
          />
          <div className="flex w-full justify-between px-2 text-xs">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="font-DMSans font-semibold text-[12px]">
                {i + 1}
              </span>
            ))}
          </div>
          <div className="flex flex-row justify-end items-center gap-4 my-4">
            <p className="font-DMSans text-[14px] lg:text-[16px] font-semibold ">
              {formatCurrency(baseAmount)}/month
            </p>
            <p className="font-DMSans text-[14px] lg:text-[16px] font-semibold text-[#F01E00]">
              Total: {formatCurrency(totalAmount)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RangeSlider;
