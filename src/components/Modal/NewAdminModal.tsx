import { BaseModal } from "./BaseModal";
import { useCallback, useState } from "react";
import { MdCancel } from "react-icons/md";
import { cn } from "~/utils/helpers";
// import { ROUTES } from "../constants/routes";
// import { useNavigate } from "react-router-dom";
import { BaseInput } from "../data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { LoadingSpinner } from "../ui/loading-spinner";
import ImageUpload from "../data-inputs/ImageUpload";
import { useForm } from "react-hook-form";
import {
  CreateAdminFormPayload,
  createAdminSchema,
} from "~/feature/students/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Validator } from "~/utils/packages/validators";
import SelectionDropdown from "../Collapsible/SelectionDropdown";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
// import { CourseServices } from "~/api/course";

interface IModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
  handlecreate: () => void;
}

interface FormData {
  program: null | { label: string };
  roles: null | { label: string };
  description: string;
  linkedin: string;
  facebook: string;
  featuredImages: File[];
}

const roles = [
  { label: "Super admin", value: 1 },
  { label: "Assistant Admin", value: 2 },
  { label: "Supervisor/Manager", value: 3 },
  { label: "Editor/Creator", value: 4 },
  { label: "Facilitator/tutor", value: 5 },
  { label: "Guest speaker", value: 5 },
];

const programs = [
  { label: "MBA", value: 1 },
  { label: "DBA", value: 2 },
  { label: "EDBA", value: 3 },
];

const fields = [
  {
    name: "firstName" as const,
    placeholder: "Enter First name",
    label: "First name",
    type: "text",
    compulsory: true,
  },
  {
    name: "lastName" as const,
    placeholder: "Enter Last name/Surname",
    label: "Last name/Surname",
    type: "text",
    compulsory: true,
  },
  {
    name: "otherName" as const,
    placeholder: "Enter Other names",
    label: "Other names",
    type: "text",
  },
  {
    name: "email" as const,
    placeholder: "Enter Email",
    label: "Email Address",
    type: "email",
    compulsory: true,
  },
  {
    name: "phone" as const,
    placeholder: "Enter Phone Number",
    label: "Phone number",
    type: "phone",
    compulsory: true,
  },
  {
    name: "password" as const,
    placeholder: "Enter Password",
    label: "Default Password",
    type: "password",
    compulsory: true,
  },
];

export const NewAdminModal = ({
  isOpen,
  closeModal,
}: //   handlecreate,
IModalPropsType) => {
  const { theme } = useTheme();
  const [isSubmitting, setisSubmitting] = useState(false);
  const form = useForm<CreateAdminFormPayload>({
    resolver: zodResolver(createAdminSchema),
    mode: "onChange",
  });
  const { unWrapErrors } = Validator.reactHookHandler(form.formState);
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    program: null,
    roles: null,
    description: "",
    linkedin: "",
    facebook: "",
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

  const handleSelect = (
    field: string,
    option: { label: string; value: string | number }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setisSubmitting(true);
    event.preventDefault();
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
          ADD ADMINISTRATOR/FACULTY/ETC
        </h2>
        <button onClick={handleclose}>
          <MdCancel className="text-[30px] text-[#F01E00]" />
        </button>
      </div>
      <div className="flex w-full h-[600px] lg:w-[1000px] scrollbar-style overflow-y-auto p-2 lg:p-6 flex-col items-start justify-start">
        <div>
          <h2 className="text-[17px] font-DMSans font-semibold">
            PROFILE IMAGE
          </h2>
          <ImageUpload onUpload={handleImageUpload} />
        </div>
        <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {fields.map((field) => (
            <BaseInput
              key={field.name}
              {...field}
              labelClassName="text-[14px] font-DMSans font-semibold"
              containerClassname="w-full"
              {...form.register(field.name)}
              error={unWrapErrors(field.name)}
            />
          ))}
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap w-full mt-2 justify-between items-center ">
          <div className="w-full lg:w-[49%] mb-4">
            <SelectionDropdown
              label="Work Roles"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={roles}
              onSelect={(option) => handleSelect("roles", option)}
              placeholder="Select Role"
            />
          </div>
          <div className="w-full lg:w-[49%] mb-4">
            <SelectionDropdown
              label="Programs"
              labelClassName="text-[14px] font-DMSans font-semibold mb-2"
              options={programs}
              onSelect={(option) => handleSelect("programs", option)}
              placeholder="Select Programs"
            />
          </div>
        </div>
        <div className="mt-2 w-full">
          <BaseInput
            label="Description"
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
        <div className="flex flex-col lg:flex-row flex-wrap w-full justify-between items-center">
          <div className="w-full flex justify-start mt-4 items-center gap-2 lg:w-[49%] border-[0.5px]  border-[#ddd] rounded-md px-2">
            <FaLinkedin className="text-[30px]" />
            <BaseInput
              type="text"
              placeholder=""
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn("h-[45px] border-[0px]")}
              value={formData.linkedin}
              onChange={(e: any) =>
                handleInputChange("linkedin", e.target.value)
              }
            />
          </div>
          <div className="w-full flex justify-start mt-4 items-center gap-2 lg:w-[49%] border-[0.5px]  border-[#ddd] rounded-md px-2">
            <FaFacebook className="text-[30px]" />
            <BaseInput
              type="text"
              placeholder=""
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn("h-[45px] border-[0px]")}
              value={formData.facebook}
              onChange={(e: any) =>
                handleInputChange("facebook", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex mt-4 justify-start items-start gap-4">
          <button
            onClick={handleclose}
            className="w-[100px] lg:w-[151px] text-[#fff] font-semibold text-[18px] font-DMSans py-2 bg-[#928d8d] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[151px] text-[#fff] font-semibold flex justify-center items-center gap-2 text-[18px] font-DMSans py-2 bg-[#F01E00] rounded-[4px]"
          >
            <p className="font-DMSans font-semibold text-[16px] text-white">
              {" "}
              Add Admin
            </p>
            {isSubmitting && <LoadingSpinner size="xs" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
