import { useState } from "react";
import { LuUpload } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { cn } from "~/utils/helpers";

interface FormData {
  title: string;
  embed: string;
  eventype: string;
  featuredImages: File[];
}

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
        </div>
      </div>
    </DashboardArea>
  );
};

export default Events;
