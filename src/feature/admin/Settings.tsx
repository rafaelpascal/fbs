import React, { useEffect } from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import { BaseInput } from "~/components/data-inputs/text-input";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";

interface Option {
  label: string;
  value: string | number;
}

interface FormData {
  courserun: { label: string; value: number } | null;
  difficultyLevel: { label: string; value: number } | null;
  instructoreType: { label: string; value: number } | null;
  courseFormat: { label: string; value: number } | null;
  selectedMonths: number;
  enrollmentEndDate: string;
  courseStartDate: string;
  courseEndDate: string;
  enrollmentSchedule: string;
  courseSchedule: string;
  maxStudents: string;
  cohortTag: string;
  enrollmentStartDate: string;
}

interface SettingsProps {
  theme: string;
  isSelectDateChecked: boolean;
  isScheduleDateChecked: boolean;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlescheduleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsSelectDateChecked: (value: boolean) => void;
  setIsScheduleDateChecked: (value: boolean) => void;
  deficultyLevel: Option[];
  instructoreType: Option[];
  courseformat: Option[];
  handleSelect: (field: string, option: Option) => void;
  formData: FormData;
  setFormData: any;
  initialValues: {
    courserun: { label: string; value: number } | null;
    difficultyLevel: { label: string; value: number } | null;
    instructoreType: { label: string; value: number } | null;
    courseFormat: { label: string; value: number } | null;
    selectedMonths: number;
    enrollmentEndDate: string;
    courseStartDate: string;
    courseEndDate: string;
  };
}

const courserun = [
  { label: "Monthly", value: 1 },
  { label: "Weekly", value: 2 },
  { label: "Daily", value: 3 },
  { label: "Semester", value: 4 },
  { label: "Trimester", value: 5 },
];

const Settings = ({
  theme,
  isSelectDateChecked,
  isScheduleDateChecked,
  // handleRadioChange,
  // handlescheduleChange,
  setIsSelectDateChecked,
  setIsScheduleDateChecked,
  deficultyLevel,
  instructoreType,
  courseformat,
  handleSelect,
  formData,
  setFormData,
  initialValues,
}: SettingsProps) => {
  // When di component mount, check if we get initial dates
  useEffect(() => {
    if (initialValues.enrollmentEndDate) {
      setIsSelectDateChecked(true);
    }
    if (initialValues.courseStartDate || initialValues.courseEndDate) {
      setIsScheduleDateChecked(true);
    }
  }, [initialValues]);

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handlenRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  // const handleSelectChange = (
  //   field: string,
  //   option: { label: string; value: string | number }
  // ) => {
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     [field]: option,
  //   }));
  // };

  return (
    <div className="border-t-2 border-[#ddd] py-4">
      <h2 className="font-DMSans font-bold text-[22px]">SETTINGS</h2>
      <div className="">
        <div className="my-4 w-full lg:w-[30%]">
          <BaseInput
            label="Maximum number of students"
            type="number"
            placeholder="0"
            name="maxStudents"
            containerClassname="w-full"
            value={formData.maxStudents}
            onChange={handleInputChange}
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[48px]",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
          />
        </div>
        <div className="w-full lg:w-[30%] mb-4">
          <SelectionDropdown
            label="Course run"
            labelClassName="text-[14px] font-DMSans font-semibold mb-2"
            options={courserun}
            onSelect={(option) => handleSelect("courserun", option)}
            placeholder="Select Course run"
            initialSelected={formData.courserun}
          />
        </div>
        <Schedule
          title="Enrollment schedule"
          theme={theme}
          isChecked={isSelectDateChecked}
          setIsChecked={setIsSelectDateChecked}
          selectedValue={formData.enrollmentSchedule}
          onChange={(e: any) => handlenRadioChange(e, "enrollmentSchedule")}
          startDate={formData.enrollmentStartDate}
          endDate={formData.enrollmentEndDate}
          setStartDate={(date: string) =>
            setFormData({ ...formData, enrollmentStartDate: date })
          }
          setEndDate={(date: string) =>
            setFormData({ ...formData, enrollmentEndDate: date })
          }
        />
        <Schedule
          title="Course schedule"
          theme={theme}
          isChecked={isScheduleDateChecked}
          setIsChecked={setIsScheduleDateChecked}
          selectedValue={formData.courseSchedule}
          onChange={(e: any) => handlenRadioChange(e, "courseSchedule")}
          startDate={formData.courseStartDate}
          endDate={formData.courseEndDate}
          setStartDate={(date: string) =>
            setFormData({ ...formData, courseStartDate: date })
          }
          setEndDate={(date: string) =>
            setFormData({ ...formData, courseEndDate: date })
          }
        />
        <Dropdowns
          theme={theme}
          options={deficultyLevel}
          facilitator={instructoreType}
          courseformat={courseformat}
          handleSelect={handleSelect}
          handleInputChange={handleInputChange}
          cohortTagValue={formData.cohortTag}
          formData={formData}
        />
      </div>
    </div>
  );
};

const Schedule = ({
  title,
  theme,
  isChecked,
  setIsChecked,
  selectedValue,
  onChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: any) => (
  <>
    <h2 className="font-DMSans font-bold text-[18px] mt-4">{title}</h2>
    <div className="w-full lg:w-[400px] gap-4 flex justify-start items-center">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="text-[14px] font-DMSans font-semibold uppercase mr-4">
            All time
          </span>
          <input
            type="radio"
            name={`radio-${title}`}
            className={cn(
              "radio  radio-success border-[0.5px] checked:bg-green-500",
              theme === "dark" ? "border-[#fff]" : "border-[#333]"
            )}
            value="allTime"
            checked={selectedValue === "allTime"}
            onChange={(e) => {
              setIsChecked(false);
              onChange(e);
            }}
          />
        </label>
      </div>
      <div className="relative form-control">
        <label className="label cursor-pointer">
          <span className="text-[14px] font-DMSans font-semibold uppercase mr-4">
            Select Date
          </span>
          <input
            type="radio"
            name={`radio-${title}`}
            className={cn(
              "radio  radio-success border-[0.5px] checked:bg-green-500",
              theme === "dark" ? "border-[#fff]" : "border-[#333]"
            )}
            value="selectDate"
            checked={selectedValue === "selectDate"}
            onChange={(e) => {
              setIsChecked(true);
              onChange(e);
            }}
          />
        </label>
      </div>
    </div>
    {isChecked && (
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[400px] border-[1px] shadow-lg border-[#ddd] p-4 mt-4"
      >
        <DateFields
          theme={theme}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </motion.div>
    )}
  </>
);

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

const Dropdowns = ({
  options,
  theme,
  facilitator,
  courseformat,
  handleSelect,
  handleInputChange,
  cohortTagValue,
  formData,
}: {
  options: Option[];
  theme: string;
  facilitator: Option[];
  courseformat: Option[];
  handleSelect: (field: string, option: Option) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cohortTagValue: string;
  formData: FormData;
}) => (
  <>
    <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
      <div className="w-full lg:w-[48%] mb-4">
        <SelectionDropdown
          label="Difficulty level"
          labelClassName="text-[14px] font-DMSans font-semibold mb-2"
          options={options}
          onSelect={(option) => handleSelect("difficultyLevel", option)}
          placeholder="Select Difficulty level"
          initialSelected={formData.difficultyLevel}
        />
      </div>
      <div className="w-full lg:w-[48%] mb-4">
        <SelectionDropdown
          label="Instructor Type"
          labelClassName="text-[14px] font-DMSans font-semibold mb-2"
          options={facilitator}
          onSelect={(option) => handleSelect("instructoreType", option)}
          placeholder="Select Instructor type"
          initialSelected={formData.instructoreType}
        />
      </div>
    </div>
    <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
      <div className="w-full lg:w-[48%] mb-4">
        <SelectionDropdown
          label="Course mode"
          labelClassName="text-[14px] font-DMSans font-semibold mb-2"
          options={courseformat}
          onSelect={(option) => handleSelect("courseFormat", option)}
          placeholder="Select Course mode"
          initialSelected={formData.courseFormat}
        />
      </div>
      <div className="w-full lg:w-[48%] mb-4">
        <BaseInput
          label="Cohort Title"
          type="text"
          placeholder="Cohort Title"
          name="cohortTag"
          value={cohortTagValue}
          onChange={handleInputChange}
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
  </>
);

export default Settings;
