import { useState } from "react";
import { IoLogoUsd, IoTimer } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { TbCurrencyNaira } from "react-icons/tb";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
// import { useNavigate } from "react-router-dom";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

interface FormData {
  title: string;
  embed: string;
  eventype: string;
  eventDate: string;
  naira: string;
  dollar: string;
  link: string;
  startTime: string;
  endTime: string;
  program: null | { label: string };
  eventType: null | { label: string };
  featuredImages: File[];
}

const options = [
  { label: "Executive Diploma", value: 1 },
  { label: "Professional Certificate", value: 2 },
  { label: "MBA", value: 3 },
  { label: "Executive Certificate", value: 4 },
  { label: "Advanced Certificate", value: 5 },
];

const Evemt_Type = [
  { label: "Seminar", value: 1 },
  { label: "Workshop", value: 2 },
  { label: "Student Meetup ", value: 3 },
];

// const initialFormData = {
//   title: "",
//   embed: "",
//   eventype: "",
//   featuredImages: [] as File[],
// };

const ImageUploadLabel = () => {
  return (
    <label htmlFor="imageUpload" className="cursor-pointer">
      <div className="w-full flex justify-center items-center flex-col bg-[#D9D9D9] rounded-md h-[370px]">
        <div className="size-[90px] rounded-full mb-4 bg-black flex justify-center items-center">
          <LuUpload className="size-[50px] text-white" />
        </div>
        <h2 className="text-[25px] w-[182px] text-center font-DMSans font-normal">
          Upload photos And videos
        </h2>
      </div>
      <input
        id="imageUpload"
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            // Handle selected files here
            console.log(Array.from(files));
          }
        }}
      />
    </label>
  );
};

const Events = () => {
  const { theme } = useTheme();
  // const navigate = useNavigate();
  const [, setIsNewEvent] = useState(false);
  const [, setIsEventType] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    embed: "",
    eventype: "",
    eventDate: "",
    naira: "",
    link: "",
    dollar: "",
    startTime: "",
    endTime: "",
    program: null,
    eventType: null,
    featuredImages: [],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewEvent = () => {
    // navigate(ROUTES.PAYMENT);
    setIsNewEvent(true);
  };
  const handleRadioChange = (e: any, type: any) => {
    setFormData({ ...formData, eventype: e.target.value });
    if (type === "publicevent") {
      // Additional logic for "courseSchedule" if required
      console.log("Handling publicevent");
    }
  };

  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  return (
    <DashboardArea>
      <div className="w-full flex justify-between items-center ">
        <h2 className="text-[25px] font-DMSans font-semibold">Events</h2>
        <button
          onClick={handleNewEvent}
          className="py-2 px-4 bg-[#FF1515] rounded-md"
        >
          <h2 className="text-[14px] font-DMSans font-semibold text-[#fff]">
            Create New Event
          </h2>
        </button>
      </div>
      <div className="border-[0.5px] p-4 rounded-md mt-6 border-[#ddd] w-full h-full">
        <div className="my-4 w-full">
          <BaseInput
            label="Module Title"
            type="text"
            placeholder="Module Title"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[53px] ",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.title}
            onChange={(e: any) => handleInputChange("title", e.target.value)}
          />
        </div>
        <ImageUploadLabel />
        <div className="border-[1px] p-4 rounded-md mt-6 border-[#ddd]">
          <h2 className="text-[18px] font-DMSans font-semibold">
            Event Details
          </h2>
          <div className="w-full mt-4 lg:w-[400px] gap-4 flex justify-start items-center">
            <div className="bg-[#F2F2F2] p-2 rounded-md form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-eventtype"
                  className={cn(
                    "radio radio-success border-[0.5px] checked:bg-green-500",
                    theme === "dark" ? "border-[#fff]" : "border-[#333]"
                  )}
                  value="publicevent"
                  checked={formData.eventype === "publicevent"}
                  onChange={(e) => {
                    setIsEventType(false);
                    handleRadioChange(e, "publicevent");
                  }}
                />
                <span className="text-[14px] font-DMSans font-semibold uppercase ml-4">
                  Public Event
                </span>
              </label>
            </div>
            <div className="relative bg-[#F2F2F2] p-2 rounded-md form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-eventtype"
                  className={cn(
                    "radio radio-success border-[0.5px] checked:bg-green-500",
                    theme === "dark" ? "border-[#fff]" : "border-[#333]"
                  )}
                  value="exclusive"
                  checked={formData.eventype === "exclusive"}
                  onChange={(e) => {
                    setIsEventType(true);
                    handleRadioChange(e, "exclusive");
                  }}
                />
                <span className="text-[14px] font-DMSans font-semibold uppercase ml-4">
                  Exclusive Event
                </span>
              </label>
            </div>
          </div>
          <div className="w-full lg:w-[50%] mb-4">
            <SelectionDropdown
              label="Program/Course"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={options}
              onSelect={(option) => handleSelect("program", option)}
              placeholder="Select Program/Course"
            />
          </div>
          <div className="w-full lg:w-[50%] mb-4">
            <SelectionDropdown
              label="Event Type"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={Evemt_Type}
              onSelect={(option) => handleSelect("eventType", option)}
              placeholder="Select Event Type"
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row flex-wrap justify-start items-center gap-2">
            <div className="w-full lg:w-[15%] flex justify-between items-center">
              <BaseInput
                label="Dates and Time"
                type="date"
                placeholder="Dates and Time"
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.eventDate}
                onChange={(e: any) =>
                  handleInputChange("eventDate", e.target.value)
                }
              />
            </div>
            <div className="w-full lg:w-[15%] flex justify-between items-center">
              <BaseInput
                label="Start time"
                type="text"
                placeholder="Start time"
                containerClassname="w-full"
                icon={IoTimer}
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0px] rounded-[1px] bg-[#F2F2F2]"
                )}
                value={formData.startTime}
                onChange={(e: any) =>
                  handleInputChange("startTime", e.target.value)
                }
              />
            </div>
            <div className="w-full lg:w-[15%] flex justify-between items-center">
              <BaseInput
                label="End time"
                type="text"
                placeholder="End time"
                icon={IoTimer}
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0px] rounded-[1px] bg-[#F2F2F2]"
                )}
                value={formData.endTime}
                onChange={(e: any) =>
                  handleInputChange("endTime", e.target.value)
                }
              />
            </div>
          </div>
          <h2 className="text-[17px] font-DMSans font-semibold mt-4">
            Event Fee
          </h2>
          <div className="w-full flex flex-col lg:flex-row flex-wrap justify-start items-center gap-2 mt-2">
            <div className="w-full lg:w-[15%] flex justify-between items-center">
              <BaseInput
                label="Naira Amount"
                type="text"
                placeholder="naira"
                containerClassname="w-full"
                icon={TbCurrencyNaira}
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.naira}
                onChange={(e: any) =>
                  handleInputChange("naira", e.target.value)
                }
              />
            </div>
            <div className="w-full lg:w-[15%] flex justify-between items-center">
              <BaseInput
                label="Dollar Amount"
                type="text"
                placeholder="dollar"
                icon={IoLogoUsd}
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.dollar}
                onChange={(e: any) =>
                  handleInputChange("dollar", e.target.value)
                }
              />
            </div>
            <div className="w-full lg:w-[30%] flex justify-between items-center">
              <BaseInput
                label="External ticket link "
                type="text"
                placeholder="External ticket link "
                // icon={IoLogoUsd}
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px] ",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.link}
                onChange={(e: any) => handleInputChange("link", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Events;
