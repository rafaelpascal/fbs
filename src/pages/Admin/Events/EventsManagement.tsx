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
import { motion } from "framer-motion";
import Tabs from "~/components/Tabs/Tabs";
import { FaMapMarkerAlt } from "react-icons/fa";
import EventMultiselect from "~/components/Collapsible/EventMultiselect";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { EventPublished } from "~/components/Modal/EventPublished";

interface FormData {
  title: string;
  embed: string;
  eventype: string;
  eventDate: string;
  naira: string;
  totalNumber: string;
  location: string;
  dollar: string;
  description: string;
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

const tabsData = [
  { title: "Venue" },
  { title: "Online" },
  { title: "To-be-announced" },
];

// const initialFormData = {
//   title: "",
//   embed: "",
//   eventype: "",
//   featuredImages: [] as File[],
// };

const ImageUploadLabel = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file
      setUploadedFile(file);
    }
  };
  return (
    <label htmlFor="imageUpload" className="cursor-pointer">
      {uploadedFile && uploadedFile.type.startsWith("image") ? (
        <img
          src={URL.createObjectURL(uploadedFile)}
          alt="Uploaded"
          className="w-[90px] h-[90px] object-cover rounded-md"
        />
      ) : (
        <div className="w-full flex justify-center items-center flex-col bg-[#D9D9D9] rounded-md h-[370px]">
          <div className="size-[90px] rounded-full mb-4 bg-black flex justify-center items-center">
            <LuUpload className="size-[50px] text-white" />
          </div>
          <h2 className="text-[25px] w-[182px] text-center font-DMSans font-normal">
            Upload photos And videos
          </h2>
        </div>
      )}
      <input
        id="imageUpload"
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};

const Events = () => {
  const { theme } = useTheme();
  // const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsNewEvent] = useState(false);
  const [ispublished, setIspublished] = useState(false);
  const [, setIsEventType] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    embed: "",
    eventype: "",
    location: "",
    eventDate: "",
    totalNumber: "",
    naira: "",
    description: "",
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

  const isFormValid = (): boolean => {
    // Required fields to validate
    const requiredFields = ["title", "location", "eventDate", "naira"];
    return requiredFields.every(
      (field) => formData[field as keyof FormData] !== ""
    );
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

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIspublished(true);
    }, 1000);
    setIsSubmitting(false);
  };

  const handleclose = () => {
    setIspublished(false);
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
      <div className="p-4 rounded-md mt-6  w-full h-full">
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
        <div className="border-[1px] p-4 rounded-md mt-6 border-[#ddd]">
          <h2 className="text-[18px] w-full font-DMSans font-semibold">
            Total number of registrations accepted{" "}
          </h2>
          <div className="w-full flex flex-col gap-4 lg:flex-row flex-wrap justify-start items-start">
            <BaseInput
              label=""
              type="number"
              placeholder="totalNumber"
              // icon={IoLogoUsd}
              containerClassname="w-full lg:w-[40%]"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[53px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.totalNumber}
              onChange={(e: any) =>
                handleInputChange("totalNumber", e.target.value)
              }
            />
            {formData.totalNumber !== "" && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-[300px]"
              >
                <p className="text-left  text-[#757575] font-DMSans font-semibold text-[14px] italic">
                  Registration to this event will close after this number is
                  reached.
                </p>
              </motion.div>
            )}
          </div>
        </div>
        <div className="border-[1px] p-4 rounded-md mt-6 border-[#ddd]">
          <h2 className="text-[18px] w-full font-DMSans font-semibold">
            Event location
          </h2>
          <Tabs tabs={tabsData}>
            <div>
              <BaseInput
                label=""
                type="text"
                placeholder="Link or address of the event"
                icon={FaMapMarkerAlt}
                containerClassname="w-full"
                labelClassName="text-[17px] font-DMSans font-semibold"
                inputContainerClassName={cn(
                  "h-[53px]",
                  theme === "dark"
                    ? "select-secondary"
                    : "border-[0.5px] border-[#ddd]"
                )}
                value={formData.location}
                onChange={(e: any) =>
                  handleInputChange("location", e.target.value)
                }
              />
            </div>
          </Tabs>
        </div>
        <div className="border-[1px] p-4 rounded-md mt-6 border-[#ddd]">
          <h2 className="text-[18px] w-full font-DMSans font-semibold">
            Event description
          </h2>
          <BaseInput
            label=""
            type="textarea"
            placeholder="Description"
            containerClassname="w-full"
            labelClassName="text-[17px] font-DMSans font-semibold"
            inputContainerClassName={cn(
              "h-[153px] ",
              theme === "dark"
                ? "select-secondary"
                : "border-[0.5px] border-[#ddd]"
            )}
            value={formData.description}
            onChange={(e: any) =>
              handleInputChange("description", e.target.value)
            }
          />
        </div>
        <div className="border-[1px] p-4 rounded-md mt-6 border-[#ddd]">
          <h2 className="text-[18px] w-full font-DMSans font-semibold">
            Add guest speakers
          </h2>
          <EventMultiselect />
        </div>
        <button
          onClick={handleSubmit}
          className={`h-[52px] w-[231px] my-4 px-4 rounded-md flex justify-center items-center gap-2 ${
            isFormValid() ? "bg-[#FF5050]" : "bg-gray-400"
          }`}
          disabled={!isFormValid()}
        >
          <p className="font-DMSans font-semibold text-[14px] lg:text-[16px] text-white">
            SAVE ALL CHANGES
          </p>
          {isSubmitting && <LoadingSpinner size="xs" />}
        </button>
        <EventPublished isOpen={ispublished} closeModal={handleclose} />
      </div>
    </DashboardArea>
  );
};

export default Events;
