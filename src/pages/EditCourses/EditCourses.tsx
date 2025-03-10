import { useState, useEffect } from "react";
import { FiEdit, FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import ImageUpload from "~/components/data-inputs/ImageUpload";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { cn } from "~/utils/helpers";
import PaymentPlan from "~/feature/admin/PaymentPlan";
import Settings from "~/feature/admin/Settings";
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
import {
  //  useNavigate,
  useParams,
} from "react-router-dom";
import { DashboardArea } from "~/layouts/DashboardArea";
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
  courseid?: number;
  courseTitle: string;
  courseType: { label: string; value: number } | null;
  facilitator: Option[] | null;
  editors: Option[] | null;
  supervisors: Option[] | null;
  description: string;
  highlight: string;
  featuredImages: File[];
  featuredVideo: string;
  orientation: string;
  maxStudents: string;
  courseRun: string;
  enrollmentSchedule: string;
  courseSchedule: string;
  difficultyLevel: { label: string; value: number } | null;
  courserun: { label: string; value: number } | null;
  instructoreType: { label: string; value: number } | null;
  courseFormat: { label: string; value: number } | null;
  cohortTag: string;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  courseStartDate: string;
  courseEndDate: string;
  currency: {
    NGN: boolean;
    USD: boolean;
  };
  nairaAmount: string;
  dollarAmount: string;
  couponTitle: string;
  couponValidity: boolean;
  couponValidTill: string;
  discountType: string;
  discountValue: string;
  paymentplan: { value: string } | null;
  selectedMonths: number;
}

interface CreatecourseformProps {
  created: (data: any) => void;
  initialData?: any;
}

const EditCourses = ({ initialData = {} }: CreatecourseformProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  //   const navigate = useNavigate();
  const { theme } = useTheme();
  const [isSelectDateChecked, setIsSelectDateChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCertType, setIsCertType] = useState(false);
  const [isScheduleDateChecked, setIsScheduleDateChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    courseid: initialData.courseid || undefined,
    courseTitle: initialData.courseTitle || "",
    courseType: initialData.courseType || null,
    facilitator: initialData.facilitator || null,
    editors: initialData.editors || null,
    supervisors: initialData.supervisors || null,
    description: initialData.description || "",
    highlight: initialData.highlight || "",
    featuredImages: initialData.featuredImages || [],
    featuredVideo: initialData.featuredVideo || "",
    orientation: initialData.orientation || "",
    maxStudents: initialData.maxStudents || "",
    courseRun: initialData.courseRun || "",
    enrollmentSchedule: initialData.enrollmentSchedule || "",
    courseSchedule: initialData.courseSchedule || "",
    difficultyLevel: initialData.difficultyLevel || null,
    courserun: initialData.courserun || null,
    instructoreType: initialData.instructoreType || null,
    courseFormat: initialData.courseFormat || null,
    cohortTag: initialData.cohortTag || "",
    enrollmentStartDate: initialData.enrollmentStartDate || "",
    enrollmentEndDate: initialData.enrollmentEndDate || "",
    courseStartDate: initialData.courseStartDate || "",
    courseEndDate: initialData.courseEndDate || "",
    currency: initialData.currency || { NGN: false, USD: false },
    nairaAmount: initialData.nairaAmount || "",
    dollarAmount: initialData.dollarAmount || "",
    couponTitle: initialData.couponTitle || "",
    couponValidity: initialData.couponValidity || false,
    couponValidTill: initialData.couponValidTill || "",
    discountType: initialData.discountType || "",
    discountValue: initialData.discountValue || "",
    paymentplan: initialData.paymentplan || null,
    selectedMonths: initialData.selectedMonths || 0,
  });

  const fetchCourse = async (id: number) => {
    setIsLoading(true);
    try {
      if (!id) return;

      const payload = {
        course_id: id,
      };

      const res = await CourseServices.getCreatedCourse(payload);

      if (!res?.data?.success) {
        throw new Error("Failed to fetch course data");
      }
      console.log(res?.data?.course_details);
      const courseData = res?.data?.course_details;
      const Facilitators =
        courseData.facilitators?.map((facilitator: any) => ({
          label: facilitator.facilitator_name,
          value: facilitator.facilitatorid,
        })) || [];
      const mappedCreators =
        courseData.creators?.map((creator: any) => ({
          label: creator.creator,
          value: creator.creatorid,
        })) || [];
      const mappedSupervisors =
        courseData.supervisors?.map((supervisor: any) => ({
          label: supervisor.supervisor,
          value: supervisor.supervisorid,
        })) || [];
      setFormData((prevData) => ({
        ...prevData,
        courseid: courseData.coursesid,
        courseTitle: courseData.course_title || "",
        editors: mappedCreators,
        courseType: courseData.course_type
          ? {
              label: courseData.course_type,
              value: 1,
            }
          : null,
        description: courseData.description || "",
        highlight: courseData.course_highlight || "",
        featuredVideo: courseData.video_url || "",
        maxStudents: courseData.max_students || "",
        cohortTag: courseData.cohort_title || "",
        supervisors: mappedSupervisors,
        difficultyLevel: courseData.difficulty_level
          ? {
              label: courseData.difficulty_level,
              value: 1,
            }
          : null,

        courseFormat: courseData.course_mode
          ? {
              label: courseData.course_mode,
              value: 1,
            }
          : null,
        facilitator: Facilitators,
        enrollmentStartDate: courseData.enrollment_startdate || "",
        enrollmentEndDate: courseData.enrollment_enddate || "",
        courseStartDate: courseData.course_startdate || "",
        courseEndDate: courseData.course_enddate || "",
        currency: {
          NGN: Boolean(courseData.naira),
          USD: Boolean(courseData.usd),
        },
        nairaAmount: courseData.naira_amount || "",
        dollarAmount: courseData.usd_amount || "",
        selectedMonths: courseData.installment || 0,
        courserun: courseData.course_run
          ? {
              label: courseData.course_run,
              value: 1,
            }
          : null,
      }));
    } catch (error) {
      console.error("Error fetching course:", error);
      await showAlert(
        "error",
        "Failed!",
        "Failed to fetch course data!",
        "Ok",
        "#FF5050"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add useEffect to fetch course data when component mounts
  useEffect(() => {
    if (id) {
      fetchCourse(Number(id));
    }
  }, [id]);

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

  const isFormValid = (): any => {
    const requiredFields = [
      "courseTitle",
      "courseType",
      "description",
      "maxStudents",
      "cohortTag",
      "facilitator",
    ];

    const hasValidDates =
      formData.enrollmentSchedule === "allTime" ||
      (formData.enrollmentStartDate && formData.enrollmentEndDate);

    const hasValidCourse =
      formData.courseSchedule === "allTime" ||
      (formData.courseStartDate && formData.courseEndDate);

    const hasValidPayment =
      (formData.currency.NGN && formData.nairaAmount) ||
      (formData.currency.USD && formData.dollarAmount);

    return (
      requiredFields.every((field) => {
        const value = formData[field as keyof FormData];
        return (
          value !== "" &&
          value !== null &&
          (Array.isArray(value) ? value.length > 0 : true)
        );
      }) &&
      hasValidDates &&
      hasValidCourse &&
      hasValidPayment
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Basic course information
      formDataToSend.append("programme_category_id", "2");
      formDataToSend.append("course_title", formData.courseTitle.trim());
      formDataToSend.append("course_type", formData.courseType?.label || "");
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("course_highlight", formData.highlight.trim());

      // Arrays handling
      if (formData.facilitator?.length) {
        formData.facilitator.forEach((item) =>
          formDataToSend.append("facilitators[]", item.label)
        );
      }

      if (formData.editors?.length) {
        formData.editors.forEach((item) =>
          formDataToSend.append("creators[]", item.label)
        );
      }

      if (formData.supervisors?.length) {
        formData.supervisors.forEach((item) =>
          formDataToSend.append("supervisors[]", item.label)
        );
      }

      // File handling
      formData.featuredImages.forEach((file) => {
        formDataToSend.append("course_image", file);
      });

      // Course details
      formDataToSend.append("video_url", formData.featuredVideo.trim());
      formDataToSend.append("max_students", formData.maxStudents);
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
      formDataToSend.append("cohort_title", formData.cohortTag.trim());

      // Dates and schedules
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

      // Payment information
      formDataToSend.append("naira", formData.currency.NGN ? "1" : "0");
      formDataToSend.append("usd", formData.currency.USD ? "1" : "0");
      formDataToSend.append("naira_amount", formData.nairaAmount);
      formDataToSend.append("usd_amount", formData.dollarAmount);
      formDataToSend.append("installment", formData.selectedMonths.toString());
      formDataToSend.append("program_plan", formData.paymentplan?.value || "");

      // Handle update vs create
      let response;
      if (formData.courseid) {
        formDataToSend.append("courseid", formData.courseid.toString());
        for (const [key, value] of formDataToSend.entries()) {
          console.log(`${key}:`, value);
        }
        response = await CourseServices.updataCreatedCourse(formDataToSend);
      } else {
        for (const [key, value] of formDataToSend.entries()) {
          console.log(`${key}:`, value);
        }
        response = await CourseServices.createCourse(formDataToSend);
      }

      if (response.data.success) {
        dispatch(setCourseId(response.data.course_id));
        dispatch(setCourseUrl(response.data.course_url));

        setFormData((prev) => ({
          ...prev,
          courseid: response.data.course_id,
        }));

        await showAlert(
          "success",
          "Created!",
          "Proceed with Course requirements!",
          "Ok",
          "#03435F"
        );

        // created({
        //   ...formData,
        //   courseid: response.data.course_id,
        // });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      await showAlert("error", "Failed!", "Failed to create!", "Ok", "#FF5050");
    } finally {
      setIsSubmitting(false);
    }
  };

  //   const handleSettingsSelect = (key: string, option: any) => {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [key]: option.value,
  //     }));
  //   };

  return (
    <DashboardArea>
      {isLoading && id ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="relative">
          <div className="w-full">
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
                      initialSelected={
                        formData.courseType ? formData.courseType : null
                      }
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
                      initialSelected={formData.facilitator || []}
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
                      initialSelected={formData.editors || []}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <MultipleSelectionDropdown
                      label="SUPERVISORS"
                      labelClassName="text-[14px] font-DMSans font-semibold mb-2"
                      options={supervisors}
                      onSelect={handleSupervisorSelect}
                      placeholder="Select Supervisors"
                      initialSelected={formData.supervisors || []}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] font-DMSans font-semibold">
                    FEATURED IMAGES
                  </h2>
                  <ImageUpload multiple onUpload={handleImageUpload} />
                  {formData.featuredImages.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {formData.featuredImages.map((image, index) => (
                        <div key={index} className="relative w-20 h-20">
                          <img
                            src={
                              typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            }
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
                    handleSelect={handleSelect}
                    formData={formData}
                    setFormData={setFormData}
                    initialValues={{
                      courserun: formData.courserun,
                      difficultyLevel: formData.difficultyLevel,
                      instructoreType: formData.instructoreType,
                      courseFormat: formData.courseFormat,
                      selectedMonths: formData.selectedMonths,
                      enrollmentStartDate: formData.enrollmentStartDate,
                      enrollmentEndDate: formData.enrollmentEndDate,
                      courseStartDate: formData.courseStartDate,
                      courseEndDate: formData.courseEndDate,
                    }}
                  />
                  <div>
                    <PaymentPlan
                      formData={formData}
                      setFormData={setFormData}
                    />
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
                            onSelect={(option) =>
                              handleSelect("orientation", option)
                            }
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
          </div>
        </div>
      )}
    </DashboardArea>
  );
};

export default EditCourses;
