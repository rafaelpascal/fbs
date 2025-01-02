import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
// import { ROUTES } from "../constants/routes";
// import { useNavigate } from "react-router-dom";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import RangeSlider from "../data-inputs/RangeSlider";
import SelectionDropdown from "../Collapsible/SelectionDropdown";
import { motion } from "framer-motion";

interface IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
}

const courseFormat = [
  { label: "Percentage", value: 1 },
  { label: "Advanced", value: 2 },
];

interface FormData {
  moduleTitle: string;
  description: string;
  objectives: string;
  reading: string;
  featuredImages: File[];
  paymentplan: null | { value: string };
  couponTitle: string;
  couponValidity: boolean;
  couponValidTill: string;
  discountType: string;
  discountValue: string;
  selectedMonths: number;
}
export const NewCohortModal = ({
  isOpen,
  closeModal,
  handlecreate,
}: IModalPropsType) => {
  const { theme } = useTheme();
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    moduleTitle: "",
    description: "",
    objectives: "",
    reading: "",
    featuredImages: [],
    paymentplan: null,
    couponTitle: "",
    couponValidity: false,
    couponValidTill: "",
    discountType: "",
    discountValue: "",
    selectedMonths: 1,
  });
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlecoupinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleMonthChange = (selectedMonths: number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      selectedMonths,
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

  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: option,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COHORT
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex bg-[#DEE1F4] w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
        <div className="my-4 bg-white p-2 rounded-md w-full">
          <BaseInput
            label="Cohort Title"
            type="text"
            placeholder="Cohort Title"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[53px] ",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.moduleTitle}
            onChange={(e: any) =>
              handleInputChange("description", e.target.value)
            }
          />
        </div>
        <div className="w-full bg-white p-2 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px]">PROGRAM FEE</h2>

          {/* Pass the selected currency to the RangeSlider component */}
          <div className="w-full lg:w-[50%]">
            <RangeSlider
              title="Installment Plan"
              baseAmount={75000}
              formData={formData}
              setFormData={setFormData}
              // currency={formData.currency}
              onMonthChange={handleMonthChange}
            />
          </div>
        </div>
        <div className="w-full border-[1px] bg-white p-2 border-[#ddd]  mt-4 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px]">COUPON CODE</h2>
          <div className="w-full mt-4 flex flex-col justify-between items-start">
            <BaseInput
              label="Title of the code"
              name="couponTitle"
              value={formData.couponTitle}
              onChange={handlecoupinInputChange}
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
                  className="w-full lg:w-[50%] border-[1px] shadow-lg border-[#ddd] p-4 mt-4"
                >
                  <BaseInput
                    label="Valid till"
                    name="couponValidTill"
                    value={formData.couponValidTill}
                    onChange={handlecoupinInputChange}
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
            <div className="flex flex-col justify-between items-start w-full">
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
                onChange={handlecoupinInputChange}
                type="text"
                placeholder="Value"
                containerClassname="w-full lg:w-[20%]"
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
        <div className="flex mt-4 justify-start items-start gap-4">
          <button
            onClick={handleclose}
            className="w-[100px] lg:w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            onClick={handlecreate}
            className="w-[100px] lg:w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            Save
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
