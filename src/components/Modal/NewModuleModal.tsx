import { BaseModal } from "./BaseModal";
import { useCallback, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import ImageUpload from "../data-inputs/ImageUpload";
import { LoadingSpinner } from "../ui/loading-spinner";
import { CourseServices } from "~/api/course";
import { useSelector } from "react-redux";
import { RootState } from "~/redux-store/store";
import { useDispatch } from "react-redux";
import { setCourseId } from "~/redux-store/slice/course.slice";

interface IModalPropsType {
  moduleNumber: number;
  initialModuleId?: number;
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
  moduleData: any;
  setModuleData: React.Dispatch<React.SetStateAction<any>>;
}

interface FormData {
  title: string;
  description: string;
  objectives: string;
  reading: string;
  featuredImages: File[];
}

const initialFormData = {
  title: "",
  description: "",
  objectives: "",
  reading: "",
  featuredImages: [] as File[],
};

export const NewModuleModal = ({
  moduleNumber,
  initialModuleId,
  isOpen,
  closeModal,
  handlecreate,
  setModuleData,
}: IModalPropsType) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const courseId = useSelector((state: RootState) => state.course.course_id);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    objectives: "",
    reading: "",
    featuredImages: [],
  });

  const handleclose = useCallback(() => {
    setFormData(initialFormData);
    closeModal();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetModules = async () => {
    setLoading(true);
    try {
      const payload = {
        module_id: initialModuleId,
      };
      const res = await CourseServices.getModulebyId(payload);

      if (res?.data?.modules?.length > 0) {
        const module = res.data.modules[0]; // Assuming you're fetching a single module
        dispatch(setCourseId(res.data.modules[0].course_id));
        setFormData({
          title: module.module_title || "",
          description: module.module_description || "",
          objectives: module.module_objectives || "",
          reading: module.module_reading || "",
          featuredImages: module.module_image ? [module.module_image] : [], // Assuming it's an array
        });
      }
    } catch (error) {
      console.error("Error fetching module:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialModuleId) {
      fetModules();
    }
  }, [initialModuleId]);

  const handleImageUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      featuredImages: files,
    }));
  };

  const handleSubmit = async () => {
    setisSubmitting(true);
    const dataToSubmit = new FormData();

    dataToSubmit.append("course_id", courseId?.toString() || "");
    dataToSubmit.append("module_number", moduleNumber.toString());
    dataToSubmit.append("module_title", formData.title);
    dataToSubmit.append("module_description", formData.description);
    dataToSubmit.append("module_objectives", formData.objectives);
    dataToSubmit.append("module_reading", formData.reading);

    formData.featuredImages.forEach((file) => {
      dataToSubmit.append(`module_image`, file);
    });
    if (initialModuleId) {
      dataToSubmit.append("moduleid", initialModuleId.toString());
    }
    if (initialModuleId) {
      await CourseServices.updateCourseModule(dataToSubmit);
      setModuleData((prevData: any) => ({
        ...prevData,
        moduleId: initialModuleId,
        title: formData.title,
        description: formData.description,
      }));
    } else {
      const res = await CourseServices.createCourseModule(dataToSubmit);
      setModuleData((prevData: any) => ({
        ...prevData,
        moduleId: res.data.data.module_id,
        title: formData.title,
        description: formData.description,
      }));
    }
    setisSubmitting(false);
    handlecreate();
    setFormData(initialFormData);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="lg:min-w-[1000px] "
    >
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COURSE MODULE
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex w-full h-[600px] p-6 flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex w-full h-[600px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
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
          <div className="mb-4">
            <h2 className="font-DMSans font-semibold text-[18px]">
              MODULE NUMBER : {moduleNumber}
            </h2>
          </div>
          <div>
            <h2 className="text-[17px] font-DMSans font-semibold">
              MODULE IMAGE
            </h2>
            <ImageUpload onUpload={handleImageUpload} />
          </div>
          <div className="my-4 w-full">
            <BaseInput
              label="MODULE DESCRIPTION"
              type="textarea"
              placeholder="MODULE DESCRIPTION"
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
          <div className="my-4 w-full">
            <BaseInput
              label="MODULE OBJECTIVES"
              type="textarea"
              placeholder="MODULE OBJECTIVES"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.objectives}
              onChange={(e: any) =>
                handleInputChange("objectives", e.target.value)
              }
            />
          </div>
          <div className="my-4 w-full">
            <BaseInput
              label="REQUIRED READING"
              type="textarea"
              placeholder="REQUIRED READING"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] ",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.reading}
              onChange={(e: any) =>
                handleInputChange("reading", e.target.value)
              }
            />
          </div>
          <div className="flex justify-start items-start gap-4">
            <button
              onClick={handleclose}
              className="w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
            >
              <p className="font-DMSans font-semibold text-[16px] text-white">
                {" "}
                Save
              </p>
              {isSubmitting && <LoadingSpinner size="xs" />}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
