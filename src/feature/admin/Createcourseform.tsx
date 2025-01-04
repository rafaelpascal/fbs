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
import MultipleSelectionDropdown from "~/components/Collapsible/MultipleSelectionDropdown";
import { CourseServices } from "~/api/course";
import { showAlert } from "~/utils/sweetAlert";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

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

const editors = [
  { label: "Executive Diploma", value: 1 },
  { label: "Professional Certificate", value: 2 },
  { label: "MBA", value: 3 },
  { label: "Executive Certificate", value: 4 },
  { label: "Advanced Certificate", value: 5 },
];

const supervisors = [
  { label: "JohnPual Aruna", value: 1 },
  { label: "JYma Pascal", value: 2 },
  { label: "Raphael Pascal", value: 3 },
];

const deficultyLevel = [
  { label: "Beginner", value: 1 },
  { label: "Advanced", value: 2 },
  { label: "Intermediate", value: 3 },
];

const instructoreType = [
  { label: "Blended ", value: 1 },
  { label: "Instructor-led", value: 2 },
  { label: "Self-Paced", value: 3 },
];
const courseFormat = [
  { label: "Online + Onsite", value: 1 },
  { label: "Onsite", value: 2 },
  { label: "Online", value: 3 },
  { label: "Lecture-Based", value: 4 },
  { label: "Case Study", value: 5 },
  { label: "Project-Based", value: 6 },
];

interface Option {
  label: string;
  value: string | number;
}

// Define the type for formData
interface FormData {
  courseTitle: string;
  courseType: null | { value: string };
  facilitator: Option[] | null;
  editors: null | { value: string };
  supervisors: Option[] | null;
  description: string;
  featuredImages: File[];
  featuredVideo: string;
  //
  maxStudents: string;
  courseRun: string;
  enrollmentSchedule: string;
  courseSchedule: string;
  difficultyLevel: null | { value: string };
  courserun: null | { value: string };
  instructoreType: null | { value: string };
  courseFormat: null | { value: string };
  cohortTag: string;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  courseStartDate: string;
  courseEndDate: string;
  //
  currency: string[];
  nairaAmount: string;
  dollarAmount: string;
  couponTitle: string;
  couponValidity: boolean;
  couponValidTill: string;
  discountType: string;
  discountValue: string;
  selectedMonths: number;
}

const Createcourseform = ({ created }: any) => {
  const { theme } = useTheme();
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScheduleDateChecked, setIsScheduleDateChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    courseTitle: "",
    courseType: null,
    facilitator: null,
    editors: null,
    supervisors: null,
    description: "",
    featuredImages: [],
    featuredVideo: "",
    //
    maxStudents: "",
    courseRun: "Monthly",
    enrollmentSchedule: "allTime",
    courseSchedule: "allTime",
    difficultyLevel: null,
    courserun: null,
    instructoreType: null,
    courseFormat: null,
    cohortTag: "",
    enrollmentStartDate: "",
    enrollmentEndDate: "",
    courseStartDate: "",
    courseEndDate: "",
    //
    currency: [],
    nairaAmount: "",
    dollarAmount: "",
    couponTitle: "",
    couponValidity: false,
    couponValidTill: "",
    discountType: "",
    discountValue: "",
    selectedMonths: 1,
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelectDateChecked(event.target.value === "selectDate");
  };

  const handlescheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsScheduleDateChecked(event.target.value === "scheduleDate");
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

  // Handle the selected options from the dropdown
  const handleMultipleSelect = (selectedOptions: Option[]) => {
    setFormData((prevData) => ({
      ...prevData,
      facilitator: selectedOptions,
    }));
  };

  const handleSupervisorSelect = (selectedOptions: Option[]) => {
    setFormData((prevData) => ({
      ...prevData,
      supervisors: selectedOptions,
    }));
  };

  const handleImageUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      featuredImages: files,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("programme_category_id", "2");
    formDataToSend.append("course_title", formData.courseTitle);
    formDataToSend.append("course_type", formData.courseType?.value || "");
    formDataToSend.append("creators", formData.editors?.value || "");
    formDataToSend.append("description", formData.description);

    formData.facilitator?.forEach((item) =>
      formDataToSend.append("facilitators[]", item.value.toString())
    );
    formData.supervisors?.forEach((item) =>
      formDataToSend.append("supervisors[]", item.value.toString())
    );
    formData.featuredImages.forEach((file) => {
      formDataToSend.append("course_image[]", file);
    });

    formDataToSend.append("video_url", formData.featuredVideo);

    formDataToSend.append("max_students", formData.maxStudents);
    // formDataToSend.append("course_run", formData.courseRun);
    formDataToSend.append(
      "difficulty_level",
      formData.difficultyLevel?.value || ""
    );
    formDataToSend.append("course_run", formData.courserun?.value || "");
    formDataToSend.append(
      "instructoreType",
      formData.instructoreType?.value || ""
    );
    formDataToSend.append("course_mode", formData.courseFormat?.value || "");
    formDataToSend.append("course_format", "digital");
    formDataToSend.append("program_plan", "2");
    formDataToSend.append("currency", formData.currency.join(","));
    formDataToSend.append("program_fee", formData.nairaAmount);
    formDataToSend.append("dollarAmount", formData.dollarAmount);

    const res = await CourseServices.createCourse(formDataToSend);
    console.log(res);
    if (res.data.success === true) {
      setIsSubmitting(false);
      await showAlert(
        "success",
        "Created!",
        "Proceed with Course requirements!",
        "Ok",
        "#03435F"
      );
      created();
    }
  };

  const handleSettingsSelect = (key: string, option: any) => {
    // Update formData based on the selected option
    setFormData((prevData) => ({
      ...prevData,
      [key]: option.value, // Assuming `option` has a `value` field
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={formData.courseTitle}
          onChange={(e: any) =>
            handleInputChange("courseTitle", e.target.value)
          }
        />
        <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[48%] mb-4">
            <SelectionDropdown
              label="COURSE TYPE"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={options}
              onSelect={(option) => handleSelect("courseType", option)}
              placeholder="Select course type"
            />
          </div>
          <div className="w-full lg:w-[48%] mb-4">
            <MultipleSelectionDropdown
              label="FACILITATORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={facilitator}
              onSelect={handleMultipleSelect}
              placeholder="Select Facilitators"
            />
          </div>
        </div>
        <div className="my-4 w-full lg:w-[70%] flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[48%] mb-4">
            <SelectionDropdown
              label="CREATORS/EDITORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={editors}
              onSelect={(option) => handleSelect("editors", option)}
              placeholder="Select Editors"
            />
          </div>
          <div className="w-full lg:w-[48%] mb-4">
            <MultipleSelectionDropdown
              label="SUPERVISORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={supervisors}
              onSelect={handleSupervisorSelect}
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
            <input
              type="text"
              placeholder="Video URL"
              value={formData.featuredVideo}
              onChange={(e) =>
                handleInputChange("featuredVideo", e.target.value)
              }
              className="w-full p-2 border-none bg-transparent focus:outline-none"
            />
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
              value={formData.description}
              onChange={(e: any) =>
                handleInputChange("description", e.target.value)
              }
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
            deficultyLevel={deficultyLevel}
            instructoreType={instructoreType}
            courseformat={courseFormat}
            handleSelect={handleSettingsSelect}
            formData={formData}
            setFormData={setFormData}
          />
          <div>
            <PaymentPlan formData={formData} setFormData={setFormData} />
          </div>
          <div className="flex flex-row justify-start items-center">
            <button className="h-[52px] w-[231px] mr-4 mb-2 px-4 font-DMSans font-semibold text-[16px] rounded-md bg-transparent border-[1px] border-[#ddd]">
              PREVIEW
            </button>
            <button
              type="submit"
              className="h-[52px] w-[231px] mb-2 px-4 rounded-md flex justify-center items-center gap-2 bg-[#FF5050]"
            >
              <p className="font-DMSans font-semibold text-[16px] text-white">
                {" "}
                SAVE ALL CHANGES
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Createcourseform;
