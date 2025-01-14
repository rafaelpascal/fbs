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
import { useDispatch } from "react-redux";
import { setCourseId } from "~/redux-store/slice/course.slice";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { setCourseUrl } from "~/redux-store/slice/url.slice";

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

const creators = [
  { label: "JohnPual Aruna", value: 1 },
  { label: "JYma Pascal", value: 2 },
  { label: "Raphael Pascal", value: 3 },
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

const Orientation = [
  { label: "Portraite", value: 1 },
  { label: "Landscape", value: 2 },
];

interface Option {
  label: string;
  value: string | number;
}

// Define the type for formData
interface FormData {
  courseTitle: string;
  courseType: null | { label: string };
  facilitator: Option[] | null;
  editors: Option[] | null;
  supervisors: Option[] | null;
  description: string;
  highlight: string;
  featuredImages: File[];
  featuredVideo: string;
  orientation: string;
  //
  maxStudents: string;
  courseRun: string;
  enrollmentSchedule: string;
  courseSchedule: string;
  difficultyLevel: null | { label: string };
  courserun: null | { label: string };
  instructoreType: null | { label: string };
  courseFormat: null | { label: string };
  cohortTag: string;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  courseStartDate: string;
  courseEndDate: string;
  //
  currency: {
    NGN: boolean;
    USD: boolean;
  };
  nairaAmount: string;
  dollarAmount: string;
  couponTitle: string;
  couponValidity: boolean;
  couponValidTill: string;
  // currentStep: number;
  discountType: string;
  discountValue: string;
  paymentplan: null | { value: string };
  selectedMonths: number;
}

const Createcourseform = ({ created }: any) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCertType, setIsCertType] = useState(false);
  const [isScheduleDateChecked, setIsScheduleDateChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    courseTitle: "",
    courseType: null,
    facilitator: null,
    editors: null,
    supervisors: null,
    description: "",
    highlight: "",
    featuredImages: [],
    featuredVideo: "",
    orientation: "",
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
    currency: {
      NGN: false,
      USD: false,
    },
    nairaAmount: "",
    dollarAmount: "",
    couponTitle: "",
    couponValidity: false,
    paymentplan: null,
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
  const handleEditorSelect = (selectedOptions: Option[]) => {
    setFormData((prevData) => ({
      ...prevData,
      editors: selectedOptions,
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

  const isFormValid = (): boolean => {
    // Required fields to validate
    const requiredFields = [
      "courseTitle",
      "courseType",
      "description",
      "maxStudents",
    ];
    return requiredFields.every(
      (field) => formData[field as keyof FormData] !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("programme_category_id", "2");
      formDataToSend.append("course_title", formData.courseTitle);
      formDataToSend.append("course_type", formData.courseType?.label || "");
      formDataToSend.append("description", formData.description);
      formDataToSend.append("course_highlight", formData.highlight);

      formData.facilitator?.forEach((item) =>
        formDataToSend.append("facilitators[]", item.label.toString())
      );

      formData.editors?.forEach((item) =>
        formDataToSend.append("creators[]", item.label.toString())
      );
      formData.supervisors?.forEach((item) =>
        formDataToSend.append("supervisors[]", item.label.toString())
      );
      formData.featuredImages.forEach((file) => {
        formDataToSend.append("course_image", file);
      });

      formDataToSend.append("video_url", formData.featuredVideo);

      formDataToSend.append("max_students", formData.maxStudents);
      // formDataToSend.append("course_run", formData.courseRun);
      formDataToSend.append(
        "difficulty_level",
        formData.difficultyLevel?.label || ""
      );
      formDataToSend.append("course_run", formData.courserun?.label || "");
      formDataToSend.append(
        "instructoreType",
        formData.instructoreType?.label || ""
      );
      formDataToSend.append("course_mode", formData.courseFormat?.label || "");
      formDataToSend.append("course_format", "digital");
      // formDataToSend.append("certificate_type", "digital");
      formDataToSend.append("program_fee", "");
      formDataToSend.append("program_plan", formData.paymentplan?.value || "");
      formDataToSend.append("usd", formData.currency.USD ? "1" : "0");
      formDataToSend.append(
        "enrollment_all_times",
        formData.enrollmentSchedule === "allTime" ? "1" : "0"
      );
      formDataToSend.append(
        "enrollment_startdate",
        formData.enrollmentStartDate
      );
      formDataToSend.append("enrollment_enddate", formData.enrollmentEndDate);
      formDataToSend.append(
        "course_flexible",
        formData.courseSchedule === "allTime" ? "1" : "0"
      );
      formDataToSend.append("course_startdate", formData.courseStartDate);
      formDataToSend.append("course_enddate", formData.courseEndDate);
      formDataToSend.append("naira", formData.currency.NGN ? "1" : "0");
      formDataToSend.append("naira_amount", formData.nairaAmount);
      formDataToSend.append("usd_amount", formData.dollarAmount);
      formDataToSend.append("installment", formData.selectedMonths.toString());
      console.log("FormData Payload:");
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }
      const res = await CourseServices.createCourse(formDataToSend);
      console.log("ccc", res);

      dispatch(setCourseId(res.data.course_id));
      dispatch(setCourseUrl(res.data.course_url));
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
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      await showAlert("error", "Failed!", "Failed to create!", "Ok", "#FF5050");
    }
  };

  const handleSettingsSelect = (key: string, option: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: option.value,
    }));
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
          value={formData.courseTitle}
          onChange={(e: any) =>
            handleInputChange("courseTitle", e.target.value)
          }
        />
        <div className="my-4 w-full flex flex-col lg:flex-row flex-wrap justify-start gap-4 items-center">
          <div className="w-full lg:w-[30%] mb-4">
            <SelectionDropdown
              label="COURSE TYPE"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={options}
              onSelect={(option) => handleSelect("courseType", option)}
              placeholder="Select course type"
            />
          </div>
          <div className="w-full lg:w-[60%] mb-4">
            <MultipleSelectionDropdown
              label="FACILITATORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={facilitator}
              onSelect={handleMultipleSelect}
              placeholder="Select Facilitators"
            />
          </div>
        </div>
        <div className="my-4 w-full flex flex-col justify-start gap-4 items-center">
          <div className="w-full mb-4">
            <MultipleSelectionDropdown
              label="CREATORS/EDITORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={creators}
              onSelect={handleEditorSelect}
              placeholder="Select Creators/editors"
            />
          </div>
          <div className="w-full mb-4">
            <MultipleSelectionDropdown
              label="SUPERVISORS"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={supervisors}
              onSelect={handleSupervisorSelect}
              placeholder="Select Supervisors"
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
              label="COURSE HIGHLIGHT"
              type="textarea"
              placeholder="COURSE HIGHLIGHT"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.highlight}
              onChange={(e: any) =>
                handleInputChange("highlight", e.target.value)
              }
            />
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
          <div className="w-full my-4 p-2">
            <h2 className="font-DMSans font-semibold text-[16px] mb-4">
              Select Certificate Type
            </h2>
            <div className="flex justify-start gap-[1px] items-center">
              <div className="w-full lg:w-[80px] flex justify-center items-center rounded-l-[12px] bg-[#6440FB] h-[60px]">
                <GrCertificate className="text-[30px] text-white" />
              </div>
              <button
                onClick={() => setIsCertType(!isCertType)}
                className="w-full lg:w-[80px] flex justify-center items-center rounded-r-[12px] bg-[#6440FB] h-[60px]"
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
          <div className="flex flex-row justify-start items-center">
            <button className="h-[52px] w-[231px] mr-4 mb-2 px-4 font-DMSans font-semibold text-[16px] rounded-md bg-transparent border-[1px] border-[#ddd]">
              PREVIEW
            </button>
            <button
              onClick={handleSubmit}
              className={`h-[52px] w-[231px] mb-2 px-4 rounded-md flex justify-center items-center gap-2 ${
                isFormValid() ? "bg-[#FF5050]" : "bg-gray-400"
              }`}
              disabled={!isFormValid()}
            >
              <p className="font-DMSans font-semibold text-[14px] lg:text-[16px] text-white">
                SAVE ALL CHANGES
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createcourseform;
