import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
// import { ROUTES } from "../constants/routes";
// import { useNavigate } from "react-router-dom";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import ImageUpload from "../data-inputs/ImageUpload";

interface IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
}

interface FormData {
  moduleTitle: string;
  description: string;
  objectives: string;
  reading: string;
  featuredImages: File[];
}
export const NewModuleModal = ({
  isOpen,
  closeModal,
  handlecreate,
}: IModalPropsType) => {
  const { theme } = useTheme();
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    moduleTitle: "",
    description: "",
    objectives: "",
    reading: "",
    featuredImages: [],
  });
  // Close modal
  const handleclose = useCallback(() => {
    closeModal();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      featuredImages: files,
    }));
  };
  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full flex px-2 justify-between items-center bg-[#b8b6b6] py-3">
        <h2 className="font-DMSans text-[#fff] text-[18px] font-semibold text-center">
          NEW COURSE MODULE
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-6 flex-col items-start justify-start">
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
            value={formData.moduleTitle}
            onChange={(e: any) =>
              handleInputChange("description", e.target.value)
            }
          />
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
              handleInputChange("description", e.target.value)
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
              handleInputChange("description", e.target.value)
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
            onClick={handlecreate}
            className="w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            Save
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
