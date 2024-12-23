import { useState } from "react";
import { FiEdit, FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import ImageUpload from "~/components/data-inputs/ImageUpload";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import PaymentPlan from "./PaymentPlan";
import Settings from "./Settings";

const options = [
  { label: "Executive Diploma", value: 1 },
  { label: "Professional Certificate", value: 2 },
  { label: "MBA", value: 3 },
  { label: "Executive Certificate", value: 4 },
  { label: "Advanced Certificate", value: 5 },
];

const facilitator = [
  { label: "JohnPual Aruna", value: 1 },
  { label: "JYma Luka", value: 2 },
  { label: "James Kuka", value: 3 },
];

const Createcourseform = () => {
  const { theme } = useTheme();
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);
  const [isScheduleDateChecked, setIsScheduleDateChecked] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelectDateChecked(event.target.value === "selectDate");
  };

  const handlescheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("jsjjsjsjd");
    setIsScheduleDateChecked(event.target.value === "scheduleDate");
  };

  const handleSelect = (option: { label: string; value: string | number }) => {
    console.log("Selected option:", option);
  };

  const handleImageUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };
  return (
    <div>
      <div className="my-4">
        <BaseInput
          label="COURSE TITLE"
          placeholder="COURSE TITLE"
          containerClassname="w-full"
          labelClassName="text-[17px] font-DMSans font-semibold"
          inputContainerClassName={cn(
            "h-[48px] ",
            theme === "dark"
              ? "select-secondary"
              : "border-[0.5px] border-[#ddd]"
          )}
        />
        <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[48%] mb-4">
            <SelectionDropdown
              label="COURSE TYPE"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={options}
              onSelect={handleSelect}
              placeholder="Select course type"
            />
          </div>
          <div className="w-full lg:w-[48%] mb-4">
            <SelectionDropdown
              label="FACILITATORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={facilitator}
              onSelect={handleSelect}
              placeholder="Select Facilitators"
            />
          </div>
        </div>
        <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[48%] mb-4">
            <SelectionDropdown
              label="COURSE TYPE"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={options}
              onSelect={handleSelect}
              placeholder="Select course type"
            />
          </div>
          <div className="w-full lg:w-[48%] mb-4">
            <SelectionDropdown
              label="FACILITATORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={facilitator}
              onSelect={handleSelect}
              placeholder="Select Facilitators"
            />
          </div>
        </div>
        <div>
          <h2 className="text-[17px] font-DMSans font-semibold">
            FEATURED IMAGES
          </h2>
          <ImageUpload multiple onUpload={handleImageUpload} />
        </div>
        <div className="my-4">
          <h2 className="text-[17px] font-DMSans font-semibold">
            FEATURED VIDEO (INTRO VIDEO)
          </h2>
          <div className="w-full mt-2 flex justify-between p-2 items-center border-[0.5px] border-[#ddd] rounded-md">
            <p>https://www.figma.com/proto/5ZymN0W9ROV</p>
            <div className="flex justify-end items-center gap-2">
              <FiUpload className="text-[30px]" />
              <FiEdit className="text-[30px]" />
              <IoMdClose className="text-[30px]" />
            </div>
          </div>
          <div className="my-4">
            <BaseInput
              label="COURSE DESCRIPTION"
              type="textarea"
              placeholder="COURSE DESCRIPTION"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
            />
          </div>
          <Settings
            theme={theme}
            isSelectDateChecked={isSelectDateChecked}
            isScheduleDateChecked={isScheduleDateChecked}
            handleRadioChange={handleRadioChange}
            handlescheduleChange={handlescheduleChange}
            setIsSelectDateChecked={setIsSelectDateChecked}
            setIsScheduleDateChecked={setIsScheduleDateChecked}
            options={options}
            facilitator={facilitator}
            handleSelect={handleSelect}
          />
          <div>
            <PaymentPlan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createcourseform;
