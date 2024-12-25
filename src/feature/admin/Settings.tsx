import React from "react";
import { motion } from "framer-motion";
import cn from "classnames";
import { BaseInput } from "~/components/data-inputs/text-input";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";

interface SettingsProps {
  theme: string;
  isSelectDateChecked: boolean;
  isScheduleDateChecked: boolean;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlescheduleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsSelectDateChecked: (value: boolean) => void;
  setIsScheduleDateChecked: (value: boolean) => void;
  options: { label: string; value: number }[];
  facilitator: { label: string; value: number }[];
  courseformat: { label: string; value: number }[];
  handleSelect: (option: { label: string; value: string | number }) => void;
}

const Settings: React.FC<SettingsProps> = ({
  theme,
  isSelectDateChecked,
  isScheduleDateChecked,
  handleRadioChange,
  handlescheduleChange,
  setIsSelectDateChecked,
  setIsScheduleDateChecked,
  options,
  facilitator,
  courseformat,
  handleSelect,
}) => {
  return (
    <div className="border-t-2 border-[#ddd] py-4">
      <h2 className="font-DMSans font-bold text-[22px]">SETTINGS</h2>
      <div className="">
        <div className="my-4 w-full lg:w-[30%]">
          <BaseInput
            label="Maximum number of students"
            type="number"
            placeholder="0"
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
        <Section
          title="Course Run"
          options={[
            { label: "Monthly", color: "blue-500" },
            { label: "Self Pace", color: "blue-500" },
          ]}
          theme={theme}
        />
        <Schedule
          title="Enrollment schedule"
          theme={theme}
          isChecked={isSelectDateChecked}
          setIsChecked={setIsSelectDateChecked}
          handleRadioChange={handleRadioChange}
        />
        <Schedule
          title="Course schedule"
          theme={theme}
          isChecked={isScheduleDateChecked}
          setIsChecked={setIsScheduleDateChecked}
          handleRadioChange={handlescheduleChange}
        />
        <Dropdowns
          theme={theme}
          options={options}
          facilitator={facilitator}
          courseformat={courseformat}
          handleSelect={handleSelect}
        />
      </div>
    </div>
  );
};

const Section = ({ title, options, theme }: any) => (
  <>
    <h2 className="font-DMSans font-bold text-[18px] mt-4">{title}</h2>
    <div className="w-full lg:w-[400px] gap-4 flex justify-start items-center">
      {options.map((option: any, index: number) => (
        <div className="form-control" key={index}>
          <label className="label cursor-pointer">
            <span className="text-[14px] font-DMSans font-semibold uppercase mr-4">
              {option.label}
            </span>
            <input
              type="radio"
              name={`radio-${title}`}
              className={cn(
                "radio border-[0.5px]",
                `checked:bg-${option.color}`,
                theme === "dark" ? "border-[#fff]" : "border-[#333]"
              )}
              defaultChecked={index === 0}
            />
          </label>
        </div>
      ))}
    </div>
  </>
);

const Schedule = ({
  title,
  theme,
  isChecked,
  setIsChecked,
}: //   handleRadioChange,
any) => (
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
              "radio border-[0.5px] checked:bg-blue-500",
              theme === "dark" ? "border-[#fff]" : "border-[#333]"
            )}
            value="allTime"
            checked={!isChecked} // Bind to isChecked
            onChange={() => setIsChecked(false)} // Update state when "All Time" is selected
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
              "radio border-[0.5px] checked:bg-blue-500",
              theme === "dark" ? "border-[#fff]" : "border-[#333]"
            )}
            value="selectDate"
            checked={isChecked} // Bind to isChecked
            onChange={() => setIsChecked(true)} // Update state when "Select Date" is selected
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
        <DateFields theme={theme} />
      </motion.div>
    )}
  </>
);

const DateFields = ({ theme }: any) => (
  <div className="flex justify-between items-center">
    <div className="flex justify-start w-[49%] items-start flex-col">
      <label htmlFor="start date" className="font-DMSans font-bold text-[14px]">
        START DATE
      </label>
      <input
        type="date"
        className={cn(
          "border-[1px] border-[#ddd] p-2 w-full rounded-md",
          theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
        )}
      />
    </div>
    <div className="flex justify-start w-[49%] items-start flex-col">
      <label htmlFor="end date" className="font-DMSans font-bold text-[14px]">
        END DATE
      </label>
      <input
        type="date"
        className={cn(
          "border-[1px] border-[#ddd] p-2 w-full rounded-md",
          theme === "dark" ? "bg-[#333]" : "bg-[#fff]"
        )}
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
}: any) => (
  <>
    <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
      <div className="w-full lg:w-[48%] mb-4">
        <SelectionDropdown
          label="Difficulty level"
          labelClassName="text-[14px] font-DMSans font-semibold mb-2"
          options={options}
          onSelect={handleSelect}
          placeholder="Select Difficulty level"
        />
      </div>
      <div className="w-full lg:w-[48%] mb-4">
        <SelectionDropdown
          label="Course type"
          labelClassName="text-[14px] font-DMSans font-semibold mb-2"
          options={facilitator}
          onSelect={handleSelect}
          placeholder="Select Course type"
        />
      </div>
    </div>
    <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
      <div className="w-full lg:w-[48%] mb-4">
        <SelectionDropdown
          label="Course Format"
          labelClassName="text-[14px] font-DMSans font-semibold mb-2"
          options={courseformat}
          onSelect={handleSelect}
          placeholder="Select Course Format"
        />
      </div>
      <div className="w-full lg:w-[48%] mb-4">
        <BaseInput
          label="Cohort tag"
          type="text"
          placeholder="Cohort tag"
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
