import { motion } from "framer-motion";
// import { useState } from "react";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import RangeSlider from "~/components/data-inputs/RangeSlider";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

const courseFormat = [
  { label: "Percentage", value: 1 },
  { label: "Advanced", value: 2 },
];

interface PaymentPlanProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

// interface FormData {
//   paymentplan: null | { value: string };
// }
const PaymentPlan = ({ formData, setFormData }: PaymentPlanProps) => {
  const { theme } = useTheme();
  // const [paymentPlan, setPaymentPlan] = useState<FormData>({
  //   paymentplan: null,
  // });
  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: option,
    }));
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  // const handleCheckboxChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   currency: string
  // ) => {
  //   if (e.target.checked) {
  //     // Add currency to the array if it's checked
  //     setFormData((prevData: any) => ({
  //       ...prevData,
  //       currency: [...prevData.currency, currency],
  //     }));
  //   } else {
  //     // Remove currency from the array if it's unchecked
  //     setFormData((prevData: any) => ({
  //       ...prevData,
  //       currency: prevData.currency.filter((item: any) => item !== currency),
  //     }));
  //   }
  // };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currencyKey: "NGN" | "USD"
  ) => {
    const isChecked = e.target.checked;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      currency: {
        ...prevFormData.currency,
        [currencyKey]: isChecked,
      },
    }));
  };

  const handleValidityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: e.target.checked,
    }));
  };

  // Access all form data
  const handleSubmit = () => {
    console.log(formData);
  };

  const handleMonthChange = (selectedMonths: number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      selectedMonths,
    }));
  };

  return (
    <div className="w-full border-t-2 border-[#ddd] py-4">
      <h2 className="font-DMSans font-bold text-[22px] mb-6">PAYMENTS</h2>
      <div className="my-4 w-full lg:w-[40%] min-w-[600px]">
        <h2 className="font-DMSans font-bold text-[16px]">Program fee</h2>

        {/* Currency selection radio buttons */}
        <div className="w-full lg:w-[50%] flex flex-col justify-between items-start">
          <div className="w-full lg:w-[50%] form-control">
            <label className="flex justify-between items-center cursor-pointer label">
              <span className="mr-2 font-DMSans font-semibold text-[14px]">
                NGN
              </span>
              <input
                type="checkbox"
                checked={formData.currency?.NGN || false}
                onChange={(e) => handleCheckboxChange(e, "NGN")}
                className="checkbox checkbox-success [--chkbg:theme(colors.green.600)] [--chkfg:white]"
              />
            </label>
          </div>
          <div className="w-full lg:w-[50%] form-control">
            <label className="flex justify-between items-center cursor-pointer label">
              <span className="mr-2 font-DMSans font-semibold text-[14px]">
                USD
              </span>
              <input
                type="checkbox"
                checked={formData.currency?.USD || false}
                onChange={(e) => handleCheckboxChange(e, "USD")}
                className="checkbox checkbox-success [--chkbg:theme(colors.green.600)] [--chkfg:white]"
              />
            </label>
          </div>
        </div>

        {/* Program fee amounts */}
        <div className="flex justify-between my-4 gap-2 items-center w-full">
          {formData.currency?.NGN && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-[50%]"
            >
              <BaseInput
                label="Naira Amount"
                name="nairaAmount"
                value={formData.nairaAmount}
                onChange={handleInputChange}
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
            </motion.div>
          )}
          {formData.currency?.USD && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-[50%]"
            >
              <BaseInput
                label="Dollar Amount"
                name="dollarAmount"
                value={formData.dollarAmount}
                onChange={handleInputChange}
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
            </motion.div>
          )}
        </div>

        {/* Pass the selected currency to the RangeSlider component */}
        <div className="w-full">
          <RangeSlider
            title="Installment Plan"
            baseAmount={75000}
            formData={formData}
            setFormData={setFormData}
            // currency={formData.currency}
            onMonthChange={handleMonthChange}
          />
        </div>
        <div className="w-full border-[1px] border-[#ddd] p-4 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px]">COUPON CODE</h2>
          <div className="w-full mt-4 flex flex-col justify-between items-start">
            <BaseInput
              label="Title of the code"
              name="couponTitle"
              value={formData.couponTitle}
              onChange={handleInputChange}
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
                    checked={formData.couponValidity}
                    onChange={(e) => handleValidityChange(e, "couponValidity")}
                  />
                </label>
              </div>
              {formData.couponValidity === false && (
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[50%] border-[1px] shadow-lg border-[#ddd] p-4 mt-4"
                >
                  <BaseInput
                    label="Valid till"
                    name="couponValidTill"
                    value={formData.couponValidTill}
                    onChange={handleInputChange}
                    type="date"
                    placeholder="Valid till"
                    containerClassname="w-full"
                    labelClassName="text-[17px] font-DMSans font-semibold"
                    inputContainerClassName={cn(
                      "h-[48px]",
                      theme === "dark"
                        ? "select-secondary"
                        : "border-[0.5px] border-[#ddd]"
                    )}
                  />
                </motion.div>
              )}
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="w-full lg:w-[48%] mb-4">
                <SelectionDropdown
                  label=""
                  labelClassName="text-[14px] font-DMSans font-semibold"
                  options={courseFormat}
                  onSelect={(option) => handleSelect("discountType", option)}
                  placeholder="Percentage"
                />
              </div>
              <BaseInput
                label=""
                name="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
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
              <button
                className="h-[52px] mb-2 px-4 font-DMSans font-semibold text-[16px] text-white bg-[#1CB503]"
                onClick={handleSubmit}
              >
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
