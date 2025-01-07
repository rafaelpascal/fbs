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
import { GrCertificate } from "react-icons/gr";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { LoadingSpinner } from "../ui/loading-spinner";
import { CourseServices } from "~/api/course";

interface IModalPropsType {
  courseId: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
}

const courseFormat = [
  { label: "Percentage", value: 1 },
  { label: "Advanced", value: 2 },
];
const Orientation = [
  { label: "Portraite", value: 1 },
  { label: "Landscape", value: 2 },
];

interface FormData {
  cohortTitle: string;
  description: string;
  sales: string;
  objectives: string;
  regularFee: string;
  reading: string;
  currency: {
    flexible: boolean;
    date: boolean;
  };
  courseStartDate: string;
  courseEndDate: string;
  paymentplan: null | { label: string };
  couponTitle: string;
  couponValidity: boolean;
  couponValidTill: string;
  discountType: string;
  orientation: string;
  discountValue: string;
  selectedMonths: number;
}

const initialFormData = {
  cohortTitle: "",
  description: "",
  regularFee: "",
  sales: "",
  objectives: "",
  reading: "",
  orientation: "",
  courseStartDate: "",
  courseEndDate: "",
  currency: {
    flexible: false,
    date: false,
  },
  paymentplan: null,
  couponTitle: "",
  couponValidity: false,
  couponValidTill: "",
  discountType: "",
  discountValue: "",
  selectedMonths: 1,
};
const DateFields = ({
  theme,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: any) => (
  <div className="flex justify-between items-center">
    <div className="flex justify-start w-[49%] items-start flex-col">
      <label htmlFor="start-date" className="font-DMSans font-bold text-[14px]">
        START DATE
      </label>
      <input
        type="date"
        className={cn(
          "border-[1px] border-[#ddd] p-2 w-full rounded-md",
          theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
        )}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </div>
    <div className="flex justify-start w-[49%] items-start flex-col">
      <label htmlFor="end-date" className="font-DMSans font-bold text-[14px]">
        END DATE
      </label>
      <input
        type="date"
        className={cn(
          "border-[1px] border-[#ddd] p-2 w-full rounded-md",
          theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
        )}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  </div>
);

export const NewCohortModal = ({
  courseId,
  isOpen,
  closeModal,
  handlecreate,
}: IModalPropsType) => {
  const { theme } = useTheme();
  const [isCertType, setIsCertType] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    cohortTitle: "",
    description: "",
    regularFee: "",
    sales: "",
    objectives: "",
    reading: "",
    orientation: "",
    courseStartDate: "",
    courseEndDate: "",
    currency: {
      flexible: false,
      date: false,
    },
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

  const handleSubmit = async (event: React.FormEvent) => {
    setisSubmitting(true);
    event.preventDefault();
    try {
      const payload = {
        course_id: courseId,
        title: formData.cohortTitle,
        flexible: formData.currency.flexible ? 1 : 0,
        start_date: formData.courseStartDate.toString(),
        end_date: formData.courseEndDate.toString(),
        regular_fee: formData.regularFee,
        sales_fee: formData.sales,
        installment: formData?.paymentplan?.label,
        duration: formData.selectedMonths,
      };

      console.log(payload);
      const res = await CourseServices.createCourseCohort(payload);
      console.log(res);
      setisSubmitting(false);
      handlecreate();
      setFormData(initialFormData);
    } catch (error) {
      setisSubmitting(false);
      console.log(error);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currencyKey: "flexible" | "date"
  ) => {
    const isChecked = e.target.checked;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      currency: {
        flexible: currencyKey === "flexible" ? isChecked : false,
        date: currencyKey === "date" ? isChecked : false,
      },
    }));
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
      <div className="flex bg-[#DEE1F4] w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-2 lg:p-6 flex-col items-start justify-start">
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
            value={formData.cohortTitle}
            onChange={(e: any) =>
              handleInputChange("cohortTitle", e.target.value)
            }
          />
        </div>
        <div className="w-full bg-white p-2 rounded-md mb-4">
          <h2 className="font-DMSans text-[18px] font-semibold text-left">
            Course schedule
          </h2>
          <div className="w-full lg:w-[50%] flex flex-col justify-between items-start">
            <div className="w-full lg:w-[50%] form-control">
              <label className="flex justify-between items-center cursor-pointer label">
                <span className="mr-2 font-DMSans font-semibold text-[14px]">
                  FLEXIBLE
                </span>
                <input
                  type="checkbox"
                  checked={formData.currency?.flexible || false}
                  onChange={(e) => handleCheckboxChange(e, "flexible")}
                  className="checkbox checkbox-success [--chkbg:theme(colors.green.600)] [--chkfg:white]"
                />
              </label>
            </div>
            <div className="w-full lg:w-[50%] form-control">
              <label className="flex justify-between items-center cursor-pointer label">
                <span className="mr-2 font-DMSans font-semibold text-[14px]">
                  PICK DATE
                </span>
                <input
                  type="checkbox"
                  checked={formData.currency?.date || false}
                  onChange={(e) => handleCheckboxChange(e, "date")}
                  className="checkbox checkbox-success [--chkbg:theme(colors.green.600)] [--chkfg:white]"
                />
              </label>
            </div>
          </div>
          {formData.currency?.date && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-[400px] border-[1px] shadow-lg border-[#ddd] p-4 mt-4"
            >
              <DateFields
                theme={theme}
                startDate={formData.courseStartDate}
                endDate={formData.courseEndDate}
                setStartDate={(date: string) =>
                  setFormData({ ...formData, courseStartDate: date })
                }
                setEndDate={(date: string) =>
                  setFormData({ ...formData, courseEndDate: date })
                }
              />
            </motion.div>
          )}
        </div>
        <div className="w-full bg-white p-2 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px] mb-7">
            PROGRAM FEE
          </h2>
          <div className="flex flex-col lg:flex-row flex-wrap gap-4 justify-start items-center">
            <BaseInput
              label="REGULAR"
              name="regularFee"
              type="number"
              value={formData.regularFee}
              onChange={(e: any) =>
                handleInputChange("regularFee", e.target.value)
              }
              placeholder="REGULAR FEE"
              containerClassname="w-full lg:w-[28%]"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[48px]",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
            />
            <BaseInput
              label="SALES"
              name="sales"
              value={formData.sales}
              onChange={(e: any) => handleInputChange("sales", e.target.value)}
              placeholder="SALES"
              type="number"
              containerClassname="w-full lg:w-[28%]"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[48px]",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
            />
          </div>
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
            <div className="flex flex-col lg:flex-row justify-start gap-4 items-center w-full">
              <div className="w-full lg:w-[20%] mb-2">
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
                  "h-[52px]",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
              />
              <button className="h-[52px] px-4 font-DMSans rounded-md font-semibold text-[16px] text-white bg-[#1CB503]">
                Activate coupon
              </button>
            </div>
            <p className="font-DMSans font-semibold text-[16px] text-[#F01E00B2] italic">
              Leave as it is if no changes.
            </p>
          </div>
        </div>
        <div className="w-full border-[1px] bg-white p-2 border-[#ddd]  mt-4 rounded-md">
          <h2 className="font-DMSans font-semibold text-[16px] mb-4">
            Select Certificate Type
          </h2>
          <div className="flex justify-start gap-[1px] items-center">
            <div className="max-w-[101px] min-w-[80px] flex justify-center items-center rounded-l-[12px] bg-[#6440FB] h-[60px]">
              <GrCertificate className="text-[30px] text-white" />
            </div>
            <button
              onClick={() => setIsCertType(!isCertType)}
              className="max-w-[101px] min-w-[80px] flex justify-center items-center rounded-r-[12px] bg-[#6440FB] h-[60px]"
            >
              {isCertType ? (
                <FaChevronDown className="text-[30px] text-white" />
              ) : (
                <FaChevronRight className="text-[30px] text-white" />
              )}
            </button>
          </div>
          {isCertType && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-[40%] p-0 mt-4"
            >
              <div className="w-full mb-2">
                <SelectionDropdown
                  label=""
                  labelClassName="text-[14px] font-DMSans font-semibold"
                  options={Orientation}
                  onSelect={(option) => handleSelect("orientation", option)}
                  placeholder="Certificate Type"
                />
              </div>
              <p className="font-DMSans font-semibold text-[16px] text-[#F01E00B2] italic">
                Leave as it is if no changes.
              </p>
            </motion.div>
          )}
        </div>
        <div className="flex mt-4 justify-start items-start gap-4">
          <button
            onClick={handleclose}
            className="w-[100px] lg:w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              {" "}
              Save
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
