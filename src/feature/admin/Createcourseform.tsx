import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";

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

  const handleSelect = (option: { label: string; value: string | number }) => {
    console.log("Selected option:", option);
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
              : "border-[0.5px] border-[#000]"
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
      </div>
    </div>
  );
};

export default Createcourseform;
